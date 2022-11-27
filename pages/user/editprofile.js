import React from "react";
import User from "layouts/User";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div className="flex flex-wrap">
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 text-center">
                      <Link href="/user/profile">
                        <button
                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Back
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Workspace
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">Task</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Subtask
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    <input
                      // maxLength={15}
                      className="shadow appearance-none border rounded  w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Yash Soni"
                      required
                    />
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <input
                      // maxLength={15}
                      className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Bhopal, India"
                      required
                    />
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <input
                      // maxLength={15}
                      className="shadow appearance-none border rounded  w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder=" yashsoni@gmail.com"
                      required
                    />
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <input
                      // maxLength={15}
                      className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Tesla"
                      required
                    />
                  </div>
                  <div className="py-6 px-3 mt-32 sm:mt-0 text-center">
                    <Link href="/user/workspace">
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Save Profile
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="mb-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Profile.layout = User;
