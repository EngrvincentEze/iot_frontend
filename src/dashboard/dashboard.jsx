import React, { useEffect, useState } from "react";
import "../assets/dashboard.css";
import {Link} from "react-router-dom"

const Dashboard = () => {
  const [currentCommand, setCurrentCommand] = useState("OFF");
  const [deviceStatus, setDeviceStatus] = useState("OFFLINE");

  // =========================
  // SEND COMMAND
  // =========================
  const sendCommand = async (command) => {
    try {
      const response = await fetch("https://iot-backend-ksmm.onrender.com/api/device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (data.command) {
        setCurrentCommand(data.command);
      }
    } catch (error) {
      console.log("Error Sending Command:", error);
    }
  };

  const getDeviceStatus = async () => {

    try {

      const response = await fetch(
        "https://iot-backend-ksmm.onrender.com/api/device/status"
      );

      const data = await response.json();
      setDeviceStatus(data.status);

    } catch (error) {

      console.log(error);

      setDeviceStatus("OFFLINE");
    }
  };
  // =========================
  // FETCH LATEST COMMAND
  // =========================
  const getLatestCommand = async () => {
    try {
      const response = await fetch("https://iot-backend-ksmm.onrender.com/api/device");
      const data = await response.json();

      console.log("Latest Command:", data);

      if (data.command) {
        setCurrentCommand(data.command);
      }
    } catch (error) {
      console.log("Error Fetching Command:", error);
    }
  };

  // =========================
  // AUTO UPDATE (EVERY 2s)
  // =========================
  useEffect(() => {
    // initial fetch
    getLatestCommand();

    // interval polling
    const interval = setInterval(() => {
      getLatestCommand();
    }, 2000);

    // cleanup
    return () => clearInterval(interval);
  }, []);

  //this is the new guy

  // =========================
  // FETCH ESP32 STATUS
  // =========================
  

  // =========================
  // CHECK STATUS EVERY 5 SEC
  // =========================
  useEffect(() => {

    getDeviceStatus();

    const interval = setInterval(() => {

      getDeviceStatus();

    }, 5000);

    return () => clearInterval(interval);

  }, []);




  return (
    <div className="dashboard-container">
   <Link to= "/login">
     <button className="logout">
      Logout
    </button>
   </Link>

      <div className="text-div">
        <h2>Electric Fence Status:</h2>
        <p>{
          deviceStatus == "ONLINE" ? currentCommand : "ON"
        }</p>

         <h2>
        ESP32 Status:
        <span
          style={{
            marginLeft: "10px",
            color:
              deviceStatus === "ONLINE"
                ? "green"
                : "red"
          }}
        >
          {deviceStatus}
        </span>
      </h2>
      </div>

      <div className="btn-div">
        <button
          className="on_btn"
          onClick={() => sendCommand("ON")}
        >
          Turn ON
        </button>

        <button
          className="off_btn"
          onClick={() => sendCommand("OFF")}
        >
          Turn OFF
        </button>
      </div>

    </div>
  );
};

export default Dashboard;