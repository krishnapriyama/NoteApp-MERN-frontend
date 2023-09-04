import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import backImg from "../assets/backImg.jpeg";
import logo from "../assets/logo.png";

const Signin = () => {
  const navigateto = useNavigate();

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validate: (values) => {
      const error = {};

      if (!values.fullname) {
        error.fullname = "Name is Required";
      } else if (!/^[A-Za-z\s]+$/.test(values.fullname)) {
        error.fullname = "Alphabetic characters only";
      } else if (values.fullname.length > 50) {
        error.fullname = "Maximum length is 50 characters";
      }

      if (!values.email) {
        error.email = "Email is Required";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i.test(values.email)
      ) {
        error.email = "Invalid email format";
      }

      if (!values.password) {
        error.password = "Password Required";
      } else if (
        !/^(?=.*[A-Z]).{8,}$/.test(values.password)

      ) {
        error.password =
          "Minimum of 1 uppercase and 8 characters";
      }
      if (values.password != values.confirmpassword) {
        error.confirmpassword = "Password Mismatch";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/register",
          {
            ...values,
          }
        );

        if (!response.data.created) {
          console.log(response.data.created, "Created False");
          if (response.data.errors) {
            const { email, password } = response.data.errors;
            if (email) {
              generateError(email);
            } else if (password) {
              generateError(password);
            }
          }
        } else {
          console.log(response.data.created, "Created True");
          navigateto("/");
        }
      } catch (error) {
        console.log(error, "Error from Axios");
      }
    },
  });

  return (
    <div className="bg-white h-screen flex">
      {/* Left Column */}
      <div className="w-1/2 hidden md:block p-6">
        <img
          src={backImg}
          alt="backImg"
          className="object-cover h-full rounded-2xl"
        />
        <div className="absolute top-20 left-10">
          <img src={logo} alt="logo" className="" />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 md:justify-normal justify-center flex items-center mr-7 overflow-hidden">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="m-4 md:m-10 w-full p-10 md:p-8">
            <h1 className="text-[#06070a] text-2xl md:text-xl mb-2 lg:mb-4 flex flex-col">
              Welcome{" "}
              <span className="text-[#131926] text-4xl font-bold">Sign up</span>
            </h1>

            <div className="flex gap-9 w-full flex-col xl:flex-row text-[#4D5E80] mt-10 ">
              <div className="flex flex-col w-full">
                <label>Full name</label>
                <input
                  {...formik.getFieldProps("fullname")}
                  name="fullname"
                  type="text"
                  placeholder="John Doe"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.fullname ? (
                  <div className="text-red-500">{formik.errors.fullname}</div>
                ) : null}
              </div>
              <div className="flex flex-col w-full">
                <label>Email</label>
                <input
                  {...formik.getFieldProps("email")}
                  name="email"
                  type="email"
                  placeholder="John.snow@gmail.com"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="flex gap-9 flex-col xl:flex-row w-full text-[#4D5E80] mt-5">
              <div className="flex flex-col w-full">
                <label>Password</label>
                <input
                  {...formik.getFieldProps("password")}
                  name="password"
                  type="password"
                  placeholder="**********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.password ? (
                  <div className="text-red-500 w-64">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col w-full">
                <label>Confirm Password</label>
                <input
                  {...formik.getFieldProps("confirmpassword")}
                  name="confirmpassword"
                  type="password"
                  placeholder="**********"
                  className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                />
                {formik.errors.confirmpassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmpassword}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 md:mt-10 gap-3 flex flex-col">
              <button className="bg-[#194DFF] w-full md:w-72 lg:w-80  rounded-md px-3 py-3 text-white">
                Sign up
              </button>
              <h1 className="text-md text-[#A0ABC0]">
                Already have an account ?{" "}
                <Link to="/">
                  <span className="text-[#3361FF] text-lg">Login</span>
                </Link>
              </h1>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
