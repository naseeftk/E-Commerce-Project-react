import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register_page = () => {
  window.scrollTo(0, 0)
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please re-enter your password"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const userExists = response.data.some((u) => u.email === values.email);

      if (userExists) {
        alert("Email already exists!");
      } else {
        await axios.post("http://localhost:5000/users", {
          name: values.name,
          email: values.email,
          password: values.password,
          orders: [],
          cart: [],
          blocked:false
         
        });

        toast.success("Registration successful!");
        navigate("/"); 
      }
    } catch (error) {
      (error);
    }
  };

  return (
    <div
      className="h-screen rounded-lg m-2"
      style={{
        backgroundImage: "url('/SHOE1.webp')",  
        backgroundSize: "cover",
        backgroundPosition: "cover",
        paddingTop: "4rem" 
      }}
    >
      <div className="flex justify-start ">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl underline font-bold text-black mb-6 text-center">
            Register
          </h1>
          <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-1xl font-medium ">
                    Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-1xl font-medium text-black">
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-1xl font-medium text-black">
                    Password:
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-1xl font-medium text-black">
                    Confirm Password:
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Back to Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register_page;
