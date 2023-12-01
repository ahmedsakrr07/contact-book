import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddUser() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Zip, setZip] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAnyFieldEmpty =
      !FirstName ||
      !LastName ||
      !Email ||
      !Phone ||
      !Address ||
      !City ||
      !State ||
      !Zip;
    const userData = {
      FirstName,
      LastName,
      Email,
      Phone,
      Address,
      City,
      State,
      Zip,
    };

    if (isAnyFieldEmpty) {
      toast.error("Please fill in all fields");
    } else {
      await addDoc(collection(db, "contacts"), userData);
      setFirstName(null);
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      toast.success("Contact added successfully");
      window.location.href = `/`;
    }
  };

  return (
    <div>
      <>
        <div className="container">
          <div className="Box">
            <div className="content">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="arrow"
                  style={{ margin: "28px", width: "20px" }}
                />
              </Link>
              <p className="title">contacts</p>
            </div>
            <div className="form">
              <h1> New Contact </h1>
              <div className="container">
                <div className="card">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="FirstName"
                          placeholder="First Name"
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="LastName"
                          placeholder="Last Name"
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="Phone"
                          placeholder="Phone"
                          value={Phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Address"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          placeholder="city"
                          value={City}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          placeholder="state"
                          value={State}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder="zipCode"
                          value={Zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      className="btn btn-primary"
                    >
                      Add Contact
                    </button>
                    <button type="button" className="btn-1 ">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
