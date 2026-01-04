package com.vista.compliance.control.repository;

import com.vista.compliance.control.model.ComplianceControl;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ControlRepository extends JpaRepository<ComplianceControl, Long> {
}
