package com.luyphan.petshop.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "invoice_main")
public class InvoiceMainEntity {
    @Id
    @Column(name="id")
    private Integer id;

    @Column(name = "status")//Confirm->shipping->delivered
    private String status;

    @Column(name = "timestamp")
    private Integer timestamp;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "invoiceMainID")
    private Set<PaymentDetailEntity> listPayment = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "invoiceMainId")
    private Set<InvoiceDetailEntity> listDetail = new HashSet<>();




}