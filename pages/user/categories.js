import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { getDatabase, ref, set } from "firebase/database";

// layout for page

import User from "layouts/User";

export default function Dashboard() {

  const [tasks, setTasks] = React.useState([0,0,0]);
  const [showModal, setShowModal] = React.useState(false);

  const savecategory = ()=>{
    setShowModal(false);
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Add New Category
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto" style={{ width: "80vw" }}>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => savecategory()}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                    Workspace
                  </h6>
                  <h2 className="text-blueGray-700 text-xl font-semibold">
                    Categories
                  </h2>
                </div>
                <div>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Add Categories
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-200 mt-4">
                <div className="flex flex-wrap w-full p-0">
                  <div className="xl:w-8/12 mb-12 xl:mb-0 flex items-center">
                    <div className="flex flex-wrap w-full">
                      <div className="w-full">
                        Category Name
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-4/12 mb-12 xl:mb-0">
                    <div className="w-full">
                      <div className="flex w-full">
                        <div className="w-full mb-12 xl:mb-0">
                          <p className="text-center">Options</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {tasks.map((data, key)=>{
                  return(
                    <div className="flex flex-wrap w-full p-0" style={{ borderLeft:"solid 4px #0284C7" }}>
                      <div className="xl:w-8/12 mb-12 xl:mb-0 flex items-center bg-blueGray-100 pl-4">
                        <div className="flex flex-wrap w-full py-2">
                          <div className="w-full">Text</div>
                        </div>
                      </div>
                      <div className="xl:w-4/12 mb-12 xl:mb-0">
                        <div className="w-full h-full">
                          <div className="flex w-full h-full">
                            <button
                              className="bg-blueGray-200 text-black active:bg-blueGray-400 text-xs px-3 py-1 my-2 mx-2 h-fit rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                            >
                              Sign In
                            </button>
                            <button
                              className="bg-blueGray-200 text-black active:bg-blueGray-400 text-xs px-3 py-1 my-2 mx-2 h-fit rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                            >
                              Sign In
                            </button>
                            <button
                              className="bg-blueGray-200 text-black active:bg-blueGray-400 text-xs px-3 py-1 my-2 mx-2 h-fit rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                            >
                              Sign In
                            </button>
                            <button
                              className="bg-blueGray-200 text-black active:bg-blueGray-400 text-xs px-3 py-1 my-2 mx-2 h-fit rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                            >
                              Sign In
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
    </>
  );
}

Dashboard.layout = User;
