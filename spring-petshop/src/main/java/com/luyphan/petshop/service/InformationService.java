package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddInfoRequest;
import com.luyphan.petshop.entity.InformationEntity;

import javax.validation.Valid;
import java.util.List;


public interface InformationService {
    InformationEntity getInfoById(Long infoId);


    List<InformationEntity> getInfos();


    InformationEntity saveInfo(AddInfoRequest Info);

    InformationEntity updateInfo(@Valid InformationEntity infoDetail, Long infoId);

    Boolean deleteInfo(Long infoId);
}
