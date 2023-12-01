import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    db.collection("contacts").onSnapshot(
      (Snapshot) => {
        let list = [];
        Snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    let filteredData;
    if (!value) {
      db.collection("contacts")
        .get()
        .then((Snapshot) => {
          let list = [];
          Snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      filteredData = data.filter((item) => {
        return (
          item.FirstName.toLowerCase().includes(value) ||
          item.LastName.toLowerCase().includes(value)
        );
      });
      setData(filteredData);
    }
  };

  return (
    <>
      <div className="container">
        <div className="Box">
          <Link to="/add">
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </Link>
          <h1>Contacts</h1>
          <div className="search">
            <div className="mb-3">
              <input
                type="text"
                className="form-control-1"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div
              className="card"
              style={{ width: "86%", marginLeft: "8%", marginTop: "-2%" }}
            >
              <div className="card-body">
                <ul>
                  {data.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/view/${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.FirstName} {item.LastName}
                        <hr style={{ width: "105%", marginLeft: "-13px" }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
