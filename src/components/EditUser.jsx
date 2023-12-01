import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function EditUser() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactRef = doc(db, "contacts", id);
        const docSnap = await getDoc(contactRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchData();
  }, [id]);

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
      toast.success("Contact deleted successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const updateContact = async () => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, data); // Use 'data' state directly to update Firestore
      toast.success("Contact updated successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error updating contact:", error);
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
              <p className="title"> contacts</p>
            </div>
            <div className="form">
              <h1> Edit contacts </h1>
              <div className="container">
                <div className="card">
                  <form>
                    <div className="row">
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="First Name"
                          value={data.FirstName || ""}
                          onChange={(e) =>
                            setData({ ...data, FirstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Last Name"
                          value={data.LastName || ""}
                          onChange={(e) =>
                            setData({ ...data, LastName: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Email"
                          value={data.Email || ""}
                          onChange={(e) =>
                            setData({ ...data, Email: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Phone"
                          value={data.Phone || ""}
                          onChange={(e) =>
                            setData({ ...data, Phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Address"
                          value={data.Email || ""}
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="city"
                          value={data.city || ""}
                          onChange={(e) =>
                            setData({ ...data, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="state"
                          value={data.state || ""}
                          onChange={(e) =>
                            setData({ ...data, state: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="zipCode"
                          value={data.zip || ""}
                          onChange={(e) =>
                            setData({ ...data, zip: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        updateContact(id, data);
                      }}
                    >
                      Update Contact
                    </button>
                    <button type="button" className="btn-1 ">
                      Cancel
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ marginTop: "20px", marginLeft: "36%" }}
                  onClick={() => {
                    deleteContact(id);
                  }}
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
