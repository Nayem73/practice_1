package com.nayem.RentAnything.dao;

import com.nayem.RentAnything.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Page<Vehicle> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Vehicle> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
