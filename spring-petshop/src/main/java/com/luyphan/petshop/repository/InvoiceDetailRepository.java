package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.InvoiceDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetailEntity, Long>{

}
