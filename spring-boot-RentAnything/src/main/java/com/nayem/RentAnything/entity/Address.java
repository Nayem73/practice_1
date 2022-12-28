package com.nayem.RentAnything.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="address")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="Division")
    private String division;

    @Column(name="District")
    private String district;

    @Column(name="street")
    private String street;

    @Column(name="zip_code")
    private String zipCode;
}
