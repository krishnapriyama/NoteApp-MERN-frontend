import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

const Model = () => {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("userToken");

  const generateSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validate: (values) => {
      const error = {};
      if (!values.title) {
        error.title = "Title is Required";
      }
      if (!values.description) {
        error.description = "Description is Required";
      } else if (values.description.length < 10) {
        error.description = "Must be at least 10 characters";
      }
      return error;
    },
    onSubmit: async (values, { resetForm }) => { 
      setShowModal(false);
      try {
        const response = await axios.post(
          "http://localhost:4000/addNotes",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Credentials: true,
            },
          }
        );
  
        if (response.data.created === true) {
          console.log("Success");
          resetForm(); // Reset the form
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
  });
  
  return (
    <>
      <button
        className="ml-2 underline text-blue-600 font-bold"
        onClick={() => setShowModal(true)}
      >
        Click Here
      </button>

      {token ? (
        <>
          {" "}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[40%]">
                  {/*content*/}
                  <form action="" onSubmit={formik.handleSubmit}>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <button
                        className="bg-transparent text-3xl text-black ml-auto mt-3 mr-3"
                        onClick={() => setShowModal(false)}
                      >
                        <span>×</span>
                      </button>

                      {/*body*/}
                      <div className="relative ml-9 mr-9 flex-auto">
                        <div className="flex flex-col gap-2 w-full">
                          <label>
                            Title <span className="text-red-600">*</span>
                          </label>
                          <input
                            {...formik.getFieldProps("title")}
                            name="title"
                            type="text"
                            placeholder="Lorem ipsum"
                            className="px-4 py-2 border rounded-md placeholder-[#C3CBDE] outline-none"
                          />
                          {formik.errors.title ? (
                            <div className="text-red-500">
                              {formik.errors.title}
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-col mt-2 md:mt-5 gap-2 w-full ">
                          <label>
                            Description <span className="text-red-600">*</span>
                          </label>
                          <input
                            {...formik.getFieldProps("description")}
                            name="description"
                            type="text"
                            placeholder="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface."
                            className="px-4 py-2 border rounded-md truncate placeholder-[#C3CBDE] outline-none"
                          />
                          {formik.errors.description ? (
                            <div className="text-red-500">
                              {formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b gap-3">
                        <button
                          className="bg-red-600 px-3 py-2 text-white text-sm rounded-lg "
                          type="submit" onClick={()=>setShowModal(false)
                          }
                        >
                          Close
                        </button>
                        <button
                          className="bg-blue-600 px-3 py-2 text-white text-sm rounded-lg "
                          type="submit"
                        >
                          Add Notes{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      ) : (
        <>{generateSuccess("Login before adding notes")}</>
      )}
    </>
  );
};

export default Model;
