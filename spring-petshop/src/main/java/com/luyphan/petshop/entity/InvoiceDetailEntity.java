package com.luyphan.petshop.entity;

import com.luyphan.petshop.entity.key.FKInvoiceDetailKey;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "invoice_detail")
public class InvoiceDetailEntity {

    @EmbeddedId
    private FKInvoiceDetailKey id = new FKInvoiceDetailKey();

    @ManyToOne
    @MapsId("invoice_main_id")
    @JoinColumn(name="invoice_main_id")
    private InvoiceMainEntity invoiceMainId;

    @ManyToOne
    @MapsId("product_id")
    @JoinColumn(name="product_id")
    private ProductEntity product;

    @Column(name = "quality")
    private Long quality;

    @Column(name = "timestamp")
    private Date timestamp;


}