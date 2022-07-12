package com.luyphan.petshop.entity;

import javax.persistence.*;

@Entity
@Table(name="invoice_main")
public class InvoiceMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private String user;

    @Column(name="status")
    private String status;


//
//    @ManyToOne
//    @JoinColumn(name="country_id")
//    private InvoiceDetail country;

}

