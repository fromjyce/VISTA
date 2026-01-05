import json
import operator
from pathlib import Path
from typing import Annotated, Literal

import google.generativeai as genai
from langchain_core.documents import Document
from langgraph.graph import END, START, StateGraph
from langgraph.types import Send
from pydantic import BaseModel, Field

from document_ai_agents.image_utils import pil_image_to_base64_jpeg
from document_ai_agents.logger import logger
from document_ai_agents.schema_utils import prepare_schema_for_gemini


class ComplianceItem(BaseModel):
    section_title: str = Field(..., description="Section or clause title (e.g., 'Requirement 3.4.1', 'Section 8(6)')")
    obligation: str = Field(..., description="Text of the compliance obligation or requirement.")
    control: str = Field(..., description="Required control or safeguard (e.g., 'Encrypt PAN at rest', 'Mask Aadhaar').")
    penalty: str = Field("", description="Penalty or consequence for non-compliance, if present.")
    regulation: str = Field(..., description="Name of the regulation (e.g., 'PCI DSS 4.0', 'DPDP Act').")


class ComplianceElements(BaseModel):
    items: list[ComplianceItem] = Field(default_factory=list)


class DocumentLayoutParsingState(BaseModel):
    document_path: str
    pages_as_base64_jpeg_images: list[str] = Field(default_factory=list)
    documents: Annotated[list[Document], operator.add] = Field(default_factory=list)


class FindLayoutItemsInput(BaseModel):
    document_path: str
    base64_jpeg: str
    page_number: int


class DocumentParsingAgent:
    def __init__(self, model_name="gemini-1.5-flash-002"):
        layout_elements_schema = prepare_schema_for_gemini(LayoutElements)

        logger.info(f"Using Gemini model with schema: {layout_elements_schema}")
        self.model_name = model_name
        self.model = genai.GenerativeModel(
            self.model_name,
            generation_config={
                "response_mime_type": "application/json",
                "response_schema": layout_elements_schema,
            },
        )
        self.graph = None
        self.build_agent()

    @classmethod
    def get_images(cls, state: DocumentLayoutParsingState):
        assert Path(state.document_path).is_file(), "File does not exist"

        images = extract_images_from_pdf(state.document_path)

        assert images, "No images extracted"

        pages_as_base64_jpeg_images = [pil_image_to_base64_jpeg(x) for x in images]

        return {"pages_as_base64_jpeg_images": pages_as_base64_jpeg_images}

    @classmethod
    def continue_to_find_layout_items(cls, state: DocumentLayoutParsingState):
        return [
            Send(
                "find_layout_items",
                FindLayoutItemsInput(
                    base64_jpeg=base64_jpeg,
                    page_number=i,
                    document_path=state.document_path,
                ),
            )
            for i, base64_jpeg in enumerate(state.pages_as_base64_jpeg_images)
        ]

    def find_compliance_items(self, state: FindLayoutItemsInput):
        logger.info(f"Extracting compliance items from page {state.page_number + 1}")
        messages = [
            f"Extract all regulatory or compliance obligations, requirements, controls, and penalties from this page of a regulatory document (such as PCI DSS, DPDP, GDPR, RBI, etc.). For each, output a JSON object with: section_title, obligation, control, penalty (if present), and regulation name. Format your answer as: {ComplianceElements.model_json_schema()}.",
            {"mime_type": "image/jpeg", "data": state.base64_jpeg},
        ]

        result = self.model.generate_content(messages)
        data = json.loads(result.text)
        documents = [
            Document(
                page_content=item["obligation"],
                metadata={
                    "page_number": state.page_number,
                    "section_title": item["section_title"],
                    "control": item["control"],
                    "penalty": item.get("penalty", ""),
                    "regulation": item["regulation"],
                    "document_path": state.document_path,
                },
            )
            for item in data["items"]
        ]

        logger.info(f"Extracted {len(data['items'])} compliance items from page {state.page_number + 1}.")

        return {"documents": documents}

    def build_agent(self):
        builder = StateGraph(DocumentLayoutParsingState)
        builder.add_node("get_images", self.get_images)
        builder.add_node("find_compliance_items", self.find_compliance_items)

        builder.add_edge(START, "get_images")
        builder.add_conditional_edges("get_images", self.continue_to_find_layout_items)
        builder.add_edge("find_compliance_items", END)
        self.graph = builder.compile()


if __name__ == "__main__":
    # Use a real regulatory PDF (e.g., PCI DSS 4.0, DPDP Act) in data/docs.pdf
    _state = DocumentLayoutParsingState(
        document_path=str(Path(__file__).parents[1] / "data" / "docs.pdf")
    )

    agent = DocumentParsingAgent()

    result_node1 = agent.get_images(_state)
    _state.pages_as_base64_jpeg_images = result_node1["pages_as_base64_jpeg_images"]
    result_node2 = agent.find_compliance_items(
        FindLayoutItemsInput(
            base64_jpeg=result_node1["pages_as_base64_jpeg_images"][0],
            page_number=0,
            document_path=str(_state.document_path),
        )
    )

    for doc in result_node2["documents"]:
        meta = doc.metadata
        print(f"Section: {meta['section_title']}")
        print(f"Obligation: {doc.page_content}")
        print(f"Control: {meta['control']}")
        print(f"Penalty: {meta['penalty']}")
        print(f"Regulation: {meta['regulation']}")
        print("---")
