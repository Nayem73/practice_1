package com.nayem.RentAnything.dao;

import com.nayem.RentAnything.entity.VehicleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "vehicleCategory", path = "vehicle-category")
public interface VehicleCategoryRepository extends JpaRepository<VehicleCategory, Long> {
}
