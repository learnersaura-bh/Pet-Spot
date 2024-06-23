import { useState } from "react";
import { AddressManagement } from "../../Components/Address/Address";

import "./Checkout.css";
import { CheckoutDetails } from "./CheckoutDetails";

export const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "26px" }}>Checkout</h2>
      <div className="checkout">
        <AddressManagement
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
        <CheckoutDetails selectedAddress={selectedAddress} />
      </div>
    </div>
  );
};
