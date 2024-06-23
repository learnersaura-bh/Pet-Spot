import { v4 as uuid } from "uuid";
import "./Address.css";
export const AddressModal = ({
  showAddressModal,
  setAddresses,
  addressForm,
  setAddressForm,
}) => {
  const handleInputChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = { ...addressForm, id: uuid() };
    setAddresses((prev) => [...prev, newAddress]);
    setAddressForm({ name: "", street: "", city: "", state: "", zip: "" });
    showAddressModal(false);
  };

  return (
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
        <button
          onClick={() => {
            showAddressModal(false);
            setAddressForm({
              name: "",
              street: "",
              city: "",
              state: "",
              zip: "",
            });
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
