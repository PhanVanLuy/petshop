package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="invoice_detail")
@Getter
@Setter
public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="invoice_main_id")
    private Integer Invoice;

    @Column(name="product_id")
    private String product;

    @Column(name="quanlity")
    private String quanlity;

    @Column(name="update_date")
    private Date update_date;

    @Column(name="create_date")
    private String create_date;

//    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
