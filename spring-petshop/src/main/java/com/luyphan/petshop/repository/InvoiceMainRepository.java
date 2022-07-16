package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.InvoiceMainEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceMainRepository extends JpaRepository<InvoiceMainEntity, Integer> {
}