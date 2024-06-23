import React, { useState } from "react";
import "./Address.css";
import { AddressModal } from "./AddressModal";
import { AddressCard } from "./AddressCard";
export const AddressManagement = ({ setSelectedAddress, selectedAddress }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Test User",
      street: "Street 1",
      city: "City 1",
      state: "Delhi",
      zip: "110053",
    },
    {
      id: 2,
      name: "Test User2",
      street: "Street 2",
      city: "City 2",
      state: "Goa",
      zip: "180275",
    },
  ]);
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleAddAddress = () => {
    setAddressFormVisible(true);
  };

  const handleSelectAddress = (addressSelected) => {
    const selectedAddress = addresses.find(
      (address) => address.id === addressSelected.id
    );
    setSelectedAddress(selectedAddress);
  };

  const handleEditAddress = (address) => {
    setAddressFormVisible(true);
    setAddressForm(address);
  };

  return (
    <div className="address-management">
      {addressFormVisible && (
        <AddressModal
          showAddressModal={setAddressFormVisible}
          setAddresses={setAddresses}
          addressForm={addressForm}
          setAddressForm={setAddressForm}
        />
      )}
      {
        <div className="address-list-container">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              setSelectedAddress={setSelectedAddress}
              addresses={addresses}
              setAddresses={setAddresses}
              selectedAddress={selectedAddress}
              handleSelectAddress={handleSelectAddress}
              handleEditAddress={handleEditAddress}
            />
          ))}
          {
            <button onClick={handleAddAddress} className="address-form-buttons">
              + Add New Address
            </button>
          }
        </div>
      }
    </div>
  );
};
