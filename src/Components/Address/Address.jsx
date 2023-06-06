import React, { useState } from "react";
import "./Address.css"
export const AddressManagement = ({ setSelectedAddress }) => {
  const [showAddresses, setShowAddresses] = useState(true);
  // const [selectedAddress, setSelectedAddress] = useState();
  const [addresses, setAddresses] = useState([
    {
      name: "Test User",
      street: "street 1",
      city: "city 2",
      state: "Delhi",
      zip: "110025"
    }
  ]);
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleInputChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    setAddressFormVisible(true);
    setShowAddresses(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = { ...addressForm, id: Date.now() };
    setAddresses([...addresses, newAddress]);
    // setSelectedAddressId(newAddress.id);
    // setSelectedAddress(newAddress);
    setAddressFormVisible(false);
    setShowAddresses(true);
    setAddressForm({ street: "", city: "", state: "", zip: "" });
  };

  const handleSelectAddress = (addressId) => {
    const selectedAddress = addresses.find(
      (address) => address.id === addressId
    );
    setSelectedAddressId(addressId);
    setSelectedAddress(selectedAddress);
  };

  const handleEditAddress = (address) => {
    setAddressFormVisible(true);
    handleDeleteAddress(address.id);
    setAddressForm(address);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((address) => address.id !== addressId));
    if (selectedAddressId === addressId) {
      setSelectedAddressId(null);
      setSelectedAddress(null);
    }
  };

  return (
    <div>
      {/* {!addressFormVisible && (
        <button onClick={handleAddAddress} className="address-form-buttons">
          Add New Address
        </button>
      )} */}

      {addressFormVisible && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="address-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={addressForm.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={addressForm.street}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={addressForm.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={addressForm.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={addressForm.zip}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Save Address</button>
          </form>
        </div>
      )}
      {showAddresses && (
        <div className="address-list-container">
          <ul className="address-list">
            {showAddresses && (
              <button
                onClick={handleAddAddress}
                className="address-form-buttons"
              >
               + Add New Address
              </button>
            )}
            {showAddresses &&
              addresses.map((address) => (
                <li key={address.id} style={{ listStyle: "none" }}>
                  <label>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address.id}
                      checked={selectedAddressId === address.id}
                      onChange={() => handleSelectAddress(address.id)}
                    />
                    <strong>{address.name}</strong>
                    <p>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.zip}
                    </p>
                  </label>
                  <div className="buttons-edit">
                    <button
                      className="address-form-buttons"
                      onClick={() => handleEditAddress(address)}
                    >
                      Edit
                    </button>
                    <button
                      className="address-form-buttons"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};