import "./newVehicle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { vehicleInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewVehicle = () => {
  const [info, setInfo] = useState({});
  const [rentalId, setRentalId] = useState(undefined);
  const [vehicles, setVehicles] = useState([]);

  const { data, loading, error } = useFetch("/rentals");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const vehicleNumbers = vehicles
      .split(",")
      .map((vehicle) => ({ number: vehicle }));
    try {
      await axios.post(`/vehicles/create/${rentalId}`, {
        ...info,
        vehicleNumbers,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New vehicle</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {vehicleInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>vehicles</label>
                <textarea
                  onChange={(e) => setVehicles(e.target.value)}
                  placeholder="give comma between vehicle numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a rental</label>
                <select
                  id="rentalId"
                  onChange={(e) => setRentalId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((rental) => (
                        <option key={rental._id} value={rental._id}>
                          {rental.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVehicle;
