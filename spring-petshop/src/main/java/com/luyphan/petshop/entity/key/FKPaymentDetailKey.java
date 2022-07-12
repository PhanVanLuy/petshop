package com.luyphan.petshop.entity.key;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class FKPaymentDetailKey implements Serializable {

    @Column(name =  "user_id")
    private Integer userId;

    @Column (name = "invoice_main_id")
    private  Integer invoiceMainId;
}