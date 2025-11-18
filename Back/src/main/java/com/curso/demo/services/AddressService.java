package com.curso.demo.services;

import com.curso.demo.entity.Address;
import com.curso.demo.entity.User;
import com.curso.demo.exception.ResourceNotFoundException;
import com.curso.demo.repositories.AddressRepository;
import com.curso.demo.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    public Address getById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address", id));
    }

    public List<Address> findByUserId(Long userId) {
        return addressRepository.findByUserIdOrderByIsDefaultAddressDesc(userId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }

    public Address create(Address address, User user) {
        address.setUser(user);
        return addressRepository.save(address);
    }

    public Address update(Long id, Address input) {
        Address existing = getById(id);
        if (input.getFullName() != null) existing.setFullName(input.getFullName());
        if (input.getPhone() != null) existing.setPhone(input.getPhone());
        if (input.getLine1() != null) existing.setLine1(input.getLine1());
        if (input.getLine2() != null) existing.setLine2(input.getLine2());
        if (input.getCity() != null) existing.setCity(input.getCity());
        if (input.getState() != null) existing.setState(input.getState());
        if (input.getPostalCode() != null) existing.setPostalCode(input.getPostalCode());
        if (input.getCountryCode() != null) existing.setCountryCode(input.getCountryCode());
        existing.setDefaultAddress(input.isDefaultAddress());
        return addressRepository.save(existing);
    }

    public void delete(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new ResourceNotFoundException("Address", id);
        }
        addressRepository.deleteById(id);
    }
}
