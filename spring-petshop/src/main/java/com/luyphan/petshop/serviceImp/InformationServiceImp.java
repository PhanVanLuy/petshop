package com.luyphan.petshop.serviceImp;

import com.luyphan.petshop.controller.presentation.AddInfoRequest;
import com.luyphan.petshop.entity.InformationEntity;
import com.luyphan.petshop.repository.InformationRepository;
import com.luyphan.petshop.service.InformationService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class InformationServiceImp implements InformationService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(InformationServiceImp.class);
    final
    InformationRepository informationRepository;

    public InformationServiceImp(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }


    public List<InformationEntity> getInfos(){
        List<InformationEntity> infoInfos;
        try{
            infoInfos = informationRepository.findAll(Sort.by("id").ascending());
            return infoInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list info");
            return null;
        }
    }

    @Override
    public InformationEntity getInfoById(Long infoId){
        return informationRepository.findById(infoId).orElseThrow(() -> new ResourceNotFoundException("info  not found for this id: "+ infoId));
    }

    @Override
    public  InformationEntity saveInfo(AddInfoRequest info){

        return informationRepository.save(new InformationEntity(info));
    }
    @Override
    public InformationEntity updateInfo(@Valid InformationEntity infoDetail, Long infoId){
        InformationEntity info = informationRepository.findById(infoId).orElseThrow(()
                -> new ResourceNotFoundException("Info not found for this id: "+infoId));
        info.setAddress(infoDetail.getAddress());
        info.setApartment(infoDetail.getApartment());
        info.setCity(infoDetail.getCity());
        info.setCompany(infoDetail.getCompany());
        info.setFirstName(infoDetail.getFirstName());
        info.setLastName(infoDetail.getLastName());
        info.setPhone(infoDetail.getPhone());
        info.setDob(infoDetail.getDob());
        info.setCountryName(infoDetail.getCountryName());
        info.setPostalCode(infoDetail.getPostalCode());
        info.setUid(infoDetail.getUid());
        return informationRepository.save(info);
    }
    @Override
    public  Boolean deleteInfo(Long infoId) {
        InformationEntity info = informationRepository.findById(infoId).orElseThrow(()
                -> new ResourceNotFoundException("Info not found for this id: " + infoId));
        try {
            informationRepository.delete(info);
        } catch (Exception e) {
            LOGGER.error("Error delete info log message");
            return false;
        }
        LOGGER.info("Info delete info log message");
        return  true;
    }

}
