package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.PaymentMethodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PaymentMethodRepository extends JpaRepository<PaymentMethodEntity, Integer> {
}