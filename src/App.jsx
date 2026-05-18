import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./dashboard/dashboard"
import Home from "./home/Home"
import Signup from "./signup/Signup"
import Login from "./login/Login"

const App = () => {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;










// import React from "react";

// const App = () => {

//   const [currentCommand, setCurrentCommand] = useState("OFF");


//   // =========================
//   // SEND COMMAND
//   // =========================

//   const sendCommand = async (command) => {

//     try {

//       const response = await fetch("http://localhost:3000/api/device", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           command: command,
//         }),
//       });

//       const data = await response.json();

//       console.log("Server Response:", data);

//       // Update UI
//       setCurrentCommand(data.command);

//     } catch (error) {

//       console.log("Error Sending Command:", error);

//     }
//   };


//   // =========================
//   // FETCH LATEST COMMAND
//   // =========================

//   const getLatestCommand = async () => {

//     try {

//       const response = await fetch("http://localhost:3000/api/device");

//       const data = await response.json();

//       console.log("Latest Command:", data);

//       if (data.command) {
//         setCurrentCommand(data.command);
//       }

//     } catch (error) {

//       console.log("Error Fetching Command:", error);

//     }
//   };


//   // =========================
//   // LOAD ON START
//   // =========================

//   useEffect(() => {

//     getLatestCommand();

//   }, []);


//   return (
//     <>
//       <div className="container">

//         <h2>
//           Current Status: <span className="status">{currentCommand}</span>
//         </h2>

//         <button
//           className="on_btn"
//           onClick={() => sendCommand("ON")}
//         >
//           Turn ON
//         </button>

//         <button
//           className="off_btn"
//           onClick={() => sendCommand("OFF")}
//         >
//           Turn OFF
//         </button>

//       </div>
//     </>
//   );
// };

// export default App;



