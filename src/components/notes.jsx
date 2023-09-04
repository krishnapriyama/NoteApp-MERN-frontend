/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import icon from "../assets/icon.png";
import deleteicon from "../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import Model from "./model";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Notes = () => {
  const [data, setData] = useState([]);
  const [showColorOptions, setShowColorOptions] = useState(
    data.map(() => false)
  );
  const token = localStorage.getItem("userToken");
  const Navigate = useNavigate();

  const generateSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const fetchNotesData = useCallback(() => {
    axios
      .get("http://localhost:4000/getNotes", {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: true,
        },
      })
      .then((response) => {
        setData(response.data.notes);
        setShowColorOptions(new Array(response.data.notes.length).fill(false));
      });
  }, [token]);

  useEffect(() => {
    fetchNotesData(); // Fetch notes data on component mount
  }, [fetchNotesData]);


  const toggleColorOptions = (index) => {
    const updatedOptions = [...showColorOptions];
    updatedOptions[index] = !updatedOptions[index];
    setShowColorOptions(updatedOptions);
  };

  const handleColorChange = (index, colorClass) => {
    const updatedOptions = [...showColorOptions];
    updatedOptions[index] = false;
    setShowColorOptions(updatedOptions);

    const updatedData = [...data];
    updatedData[index].backgroundColor = colorClass;
    setData(updatedData);
  };

  const deletenote = (id) => {
    axios
      .post(
        "http://localhost:4000/deleteNote",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: true,
          },
        }
      )
      .then((response) => {
        if (response.data.deleted === true) {
          generateSuccess(response.data.message);
          setData((prevData) => prevData.filter((note) => note._id !== id));
        }
      });
  };

  return (
    <>
      <div className="w-full h-screen bg-slate-100">
        <div className="flex justify-end mr-9"></div>
        <div className="flex justify-center">
          <div className="w-[80%]">
            <div className="w-full flex justify-end p-8 items-center">
              <p className="text-lg flex items-center">
                Hey, Do you want to add some notes{" "}
                <span>
                  <Model fetchNotesData={fetchNotesData} />
                </span>
                <span className="ml-4">||</span>
                {token ? (
                  <>
                    <button
                      className="p-3 text-red-500 uppercase font-bold"
                      onClick={() => {
                        localStorage.removeItem("userToken");
                        Navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/">
                      <button className="p-3 text-red-500 uppercase font-bold">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-9">
              {data.map((datavalue, index) => {
                const rawDate = datavalue.createdAt;
                const formattedDate = new Date(rawDate)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "");

                return (
                  <div
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
                    key={datavalue._id}
                  >
                    <div
                      className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow ${
                        datavalue.backgroundColor || "bg-white"
                      }`}
                    >
                      <div className="w-full flex justify-end">
                        <img
                          src={deleteicon}
                          className="w-4 cursor-pointer"
                          alt=""
                          onClick={() => deletenote(datavalue._id)}
                        />
                        <img
                          src={icon}
                          className="w-4 cursor-pointer"
                          alt=""
                          onClick={() => toggleColorOptions(index)}
                        />
                      </div>
                      <h1>{formattedDate}</h1>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {datavalue.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {datavalue.description}
                      </p>

                      <div
                        className={`mt-4 ${
                          showColorOptions[index] ? "" : "hidden"
                        }`}
                      >
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                            onChange={() =>
                              handleColorChange(index, "bg-white")
                            }
                            checked={datavalue.backgroundColor === "bg-white"}
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-400">
                            White
                          </span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-yellow-500"
                            onChange={() =>
                              handleColorChange(index, "bg-yellow-200")
                            }
                            checked={
                              datavalue.backgroundColor === "bg-yellow-200"
                            }
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-400">
                            Yellow
                          </span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() =>
                              handleColorChange(index, "bg-green-200")
                            }
                            checked={
                              datavalue.backgroundColor === "bg-green-200"
                            }
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-400">
                            Green
                          </span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() =>
                              handleColorChange(index, "bg-blue-200")
                            }
                            checked={
                              datavalue.backgroundColor === "bg-blue-200"
                            }
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-400">
                            Blue
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Notes;
