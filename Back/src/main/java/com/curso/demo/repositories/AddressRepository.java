package com.curso.demo.repositories;

import com.curso.demo.entity.Address;
import com.curso.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
    List<Address> findByUserId(Long userId);
    List<Address> findByUserIdOrderByIsDefaultAddressDesc(Long userId);
}
