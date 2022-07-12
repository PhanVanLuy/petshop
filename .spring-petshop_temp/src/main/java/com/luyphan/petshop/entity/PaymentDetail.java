package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="invoice_main")
@Getter
@Setter
public class PaymentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="payment_method_id")
    private Integer paymentMethod;

    @Column(name="user_id")
    private Integer user;

    @Column(name="invoice_detail_id")
    private Integer invoiceDetail;

    @Column(name="payment_date")
    private Date payment_date;
    
//    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
