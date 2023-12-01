import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export default function ViewUser() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactRef = db.collection("contacts").doc(id);
        const doc = await contactRef.get();

        if (doc.exists) {
          setData([{ id: doc.id, ...doc.data() }]);
        } else {
          console.log("No such contact!");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <div className="container">
        <div className="Box">
          <div className="contain d-flex">
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
            <div
              className="edit"
              style={{ marginLeft: "auto", marginRight: "30px" }}
            >
              <Link to={`/update/${id}`} style={{ textDecoration: "none" }}>
                <p className="title">Edit</p>
              </Link>
            </div>
          </div>
          <div className="info">
            {data.map((data) => (
              <>
                <div key={data.id}>
                  <p className="data-title">
                    {data.FirstName} {data.LastName}
                  </p>
                  <hr />
                  <h1 className="email">Email:</h1>
                  <p className="data-email">{data.Email}</p>
                  <hr />
                  <h1 className="phone">Phone:</h1>
                  <p className="data-phone">{data.Phone}</p>
                  <hr />
                  <h1 className="address">Address:</h1>
                  <p className="data-address">
                    {" "}
                    {data.Address} <br /> {data.City}{" "}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
