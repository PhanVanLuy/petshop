package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.InformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformationRepository extends JpaRepository<InformationEntity, Long>{

}
