import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Sharingcontext/Sharing";
import { toast } from "react-toastify";

const Login_page = () => {
  window.scrollTo(0, 0)
  const navigate = useNavigate();
  const { setloginButton } = useContext(Context);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (u) => u.email === values.email && u.password === values.password
      );
      const blockeduser = response.data.find(
        (u) => u.email === values.email && u.password === values.password&&u.blocked==true
      );

     const admuser=response.data.find((u)=> u.email === values.email && u.password === values.password && u.role==="admin")
  
      if (admuser) {

        localStorage.setItem("name", admuser.name);
        localStorage.setItem("id", admuser.id);
        setloginButton(true);
        navigate("/admin")
      }else if(blockeduser){
        toast.success("Blocked user")
      } else if(user){
        localStorage.setItem("name", user.name);
        localStorage.setItem("id", user.id);
        localStorage.setItem("isLoggedIn", "true");
        setloginButton(true);
        navigate("/");
      }
      else {
        toast.success("user not registered")
      }
    } catch (error) {
         error( error);
     
    }
  };
  

  return (
    <div
      className="h-screen rounded-lg m-2"
      style={{
        backgroundImage: "url('/SHOE2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "cover",
         paddingTop: "4rem" 
      }}
    >
      <div className="flex justify-end  rounded">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl underline font-bold text-black mb-6 text-center">LOGIN</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xl font-medium text-black">
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
                    className="text-black text-base mt-1"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-xl font-medium text-black">
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
                    className="text-black text-sm mt-1"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Register
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

export default Login_page;
