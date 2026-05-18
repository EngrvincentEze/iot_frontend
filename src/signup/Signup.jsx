import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import "../assets/Signup.css"
import { Link } from 'react-router-dom'

const Signup = () => {

  const formik = useFormik({

    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({

      name: Yup.string()
        .required("Name is required"),

      phone: Yup.string()
        .required("Phone number is required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        )
        .required("Confirm your password"),

    }),

    onSubmit: async (values, {resetForm}) => {

  try {

    const response = await fetch(
      "https://iot-backend-ksmm.onrender.com/api/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert(data.message);
    resetForm();

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }
    },

  });
  return (
    <>
      <div className='sign-up-main-div'>
      <Link to= "/">
            <button className="home_btn">Home</button>
          </Link>
        <div className="signup-container">
        <div className='admin-signup'>Admin Signup</div>
        <div>
          <form onSubmit={formik.handleSubmit}>
             <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {
          formik.touched.name &&
          formik.errors.name && (
            <p>{formik.errors.name}</p>
          )
        }
             <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {
          formik.touched.phone &&
          formik.errors.phone && (
            <p>{formik.errors.phone}</p>
          )
        }

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {
          formik.touched.email &&
          formik.errors.email && (
            <p>{formik.errors.email}</p>
          )
        }

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {
          formik.touched.password &&
          formik.errors.password && (
            <p>{formik.errors.password}</p>
          )
        }

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {
          formik.touched.confirmPassword &&
          formik.errors.confirmPassword && (
            <p>{formik.errors.confirmPassword}</p>
          )
        }

        <button type="submit">
          Sign Up
        </button>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export default Signup