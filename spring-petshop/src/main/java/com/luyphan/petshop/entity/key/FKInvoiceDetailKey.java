package com.luyphan.petshop.entity.key;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Embeddable

public class FKInvoiceDetailKey implements Serializable {

    @Column(name="invoice_main_id")
    private Integer invoice_main_id;

    @Column(name="product_id")
    private Integer product_id;
}
