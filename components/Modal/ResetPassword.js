import React, { useState } from "react";
export default function ResetPassword() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Reset Password
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-75 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold px-8">
                    Reset Password
                  </h3>
                </div>
                {/*body*/}
                <div className="w-full px-4 max-w">
                  <form
                    onSubmit={() => setTaskdetails()}
                    className="bg-white rounded px-8 pt-4 pb-4"
                  >
                    <div className="mb-4">
                      <label
                        className="block text-left text-gray-700 text-sm font-bold mb-2"
                        htmlFor="oldpassword"
                      >
                        Old Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="oldpassword"
                        type="text"
                        placeholder="Old Password"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-left text-gray-700 text-sm font-bold mb-2"
                        htmlFor="newpassword"
                      >
                        New Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="newpassword"
                        type="text"
                        placeholder="New Password"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-left text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmnewpassword"
                      >
                        Confirm New Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmnewpassword"
                        type="text"
                        placeholder="Confirm New Password"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-center pt-4 px-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Password
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
