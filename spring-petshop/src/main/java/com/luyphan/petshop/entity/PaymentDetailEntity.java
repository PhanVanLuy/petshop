package com.luyphan.petshop.entity;

import com.luyphan.petshop.entity.key.FKPaymentDetailKey;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "payment_detail")
public class PaymentDetailEntity {

    @EmbeddedId
    FKPaymentDetailKey id = new FKPaymentDetailKey();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity uid;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("invoiceMainId")
    @JoinColumn(name = "invoice_main_id")
    private InvoiceMainEntity invoiceMainID;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethodEntity method;

    @Column(name = "timestamp")
    private Integer timeStamp;
}