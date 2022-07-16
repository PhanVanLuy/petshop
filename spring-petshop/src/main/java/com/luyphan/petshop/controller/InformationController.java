package com.luyphan.petshop.controller;


import com.luyphan.petshop.controller.presentation.AddInfoRequest;
import com.luyphan.petshop.entity.InformationEntity;
import com.luyphan.petshop.service.InformationService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
public class InformationController {

    private final InformationService  InformationService;

    public InformationController(InformationService InformationService) {
        this.InformationService = InformationService;
    }

    @GetMapping("infos")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(InformationService.getInfos(), HttpStatus.OK);
    }
    @GetMapping(value = "infos/{id}")
    public ResponseEntity<InformationEntity> getInfoById(@PathVariable(value = "id") Long infoId) throws ResourceNotFoundException {
        return ResponseEntity.ok(InformationService.getInfoById(infoId));
    }
    @PostMapping("/infos")
    public InformationEntity createInfo(@RequestBody AddInfoRequest infoRequest) {
        return InformationService.saveInfo(infoRequest);
    }

    @PutMapping("/infos/{id}")
    public ResponseEntity<InformationEntity> updateInfo(@PathVariable(value = "id") Long infoId,
                                                 @RequestBody InformationEntity information) throws ResourceNotFoundException {
        return ResponseEntity.ok(InformationService.updateInfo(information, infoId));
    }

    @DeleteMapping("/infos/{id}")
    public ResponseEntity<Boolean> deleteInfo(@PathVariable(value = "id") Long infoId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(InformationService.deleteInfo(infoId));
    }


}
