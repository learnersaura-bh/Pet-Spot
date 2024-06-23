export const AddressCard = ({
  address,
  setSelectedAddress,
  addresses,
  setAddresses,
  selectedAddress,
  handleSelectAddress,
  handleEditAddress,
}) => {
  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((address) => address.id !== addressId));
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(null);
    }
  };

  return (
    <div
      className={`address-card ${
        selectedAddress?.id === address.id ? "selected" : ""
      }`}
    >
      {" "}
      <div className="address-info">
        <input
          type="radio"
          name="selectedAddress"
          value={address.id}
          checked={selectedAddress?.id === address.id}
          onChange={() => handleSelectAddress(address)}
          id={`address-input-${address.id}`}
        />
        <label htmlFor={`address-input-${address.id}`}>
          <div className="address-details">
            <h2>{address.name}</h2>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <p>
              {" "}
              {address.state} - {address.zip}{" "}
            </p>
          </div>
        </label>
      </div>
      <div className="buttons-edit">
        <button
          onClick={() => handleEditAddress(address)}
          className="address-form-buttons"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteAddress(address.id)}
          className="address-form-buttons delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
