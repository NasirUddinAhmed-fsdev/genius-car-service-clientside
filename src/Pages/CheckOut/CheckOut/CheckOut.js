import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useServiceDetail from "../../../hooks/useServiceDetail";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);
  // const [user, setUser] = useState({
  //   name: "kolim Uddin",
  //   email: "kolim@kaku.kak",
  //   address: "kakoli road, banani",
  //   phone: "0171111111",
  // });

  // const handleAddressChange = (event) => {
  //   console.log(event.target.value);
  //   const { address, ...rest } = user;
  //   const newAddress = event.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   console.log(newUser);
  //   setUser(newUser);
  // };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios.post("http://localhost:5000/order", order).then((response) => {
      const { data } = response;
      if (data.insertedId) {
        toast("Your order is booked");
        event.target.reset();
      }
    });
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Please Order: {service.name}</h2>
      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          value={user?.displayName}
          name="name"
          placeholder="name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          value={user?.email}
          name="email"
          placeholder="email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="service"
          readOnly
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          placeholder="address"
          autoComplete="off"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          placeholder="phone"
          required
        />
        <br />
        <input
          className="btn btn-outline-primary"
          type="submit"
          value="Place Order"
        />
      </form>
    </div>
  );
};

export default CheckOut;
