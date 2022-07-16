package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.PaymentDetailEntity;
import com.luyphan.petshop.entity.key.FKPaymentDetailKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetailEntity, FKPaymentDetailKey> {
}