import React from "react";
import "../assets/Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

   onSubmit: async (values, { resetForm }) => {
  try {
    const response = await fetch("https://iot-backend-ksmm.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    console.log("Login response:", data);

    // ✅ IMPORTANT: use response.ok OR message-based check
    if (response.ok) {
      alert(data.message || "Login successful");

      // store token if available
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // reset form FIRST
      resetForm();

      // navigate AFTER everything
      navigate("/dashboard");

    } else {
      alert(data.message || "Invalid credentials");
    }

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
}
  });

  return (
   <div className="login-main-div">
   <Link to= "/">
      <button className="home_btn">Home</button>
    </Link>
     <div className="signin-container">
    
      <div className="admin-signin-title">Admin Login</div>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
   </div>
  );
};

export default Login;