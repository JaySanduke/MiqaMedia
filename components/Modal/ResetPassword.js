import { EmailAuthProvider, reauthenticateWithCredential, signInWithCredential, updatePassword } from "firebase/auth";
import React, { useState } from "react";

import { app } from "../../components/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export default function ResetPassword() {
  const [showModal, setShowModal] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);

  function changePassword() {

    if (newpassword === confirmpassword) {
      console.log("passwords match");
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        updatePassword(auth.currentUser, newpassword).then(() => {
          console.log("Password updated!");
        })
        .then(setShowModal(false))
        .catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          alert("wrong current password");
        }
      });
    }
    else {
      alert("new and current passwords do not match");
    }
  }

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
                    onSubmit={(e) => {
                      e.preventDefault();
                      changePassword()
                    }}
                    className="bg-white rounded px-8 pt-4 pb-4"
                  >
                    {/* {!recentcredential && */}
                      <div>
                        {/* <div className="relative w-full mb-3">
                          <label
                            className="block text-left uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div> */}
                        <div className="mb-4">
                          <label
                            className="block text-left uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="currentpassword"
                          >
                            Current Password
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="currentpassword"
                            type="text"
                            placeholder="Current Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    {/* } */}
                    {/* {recentcredential && */}
                      <div>
                        <div className="mb-6">
                          <label
                            className="block text-left uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="newpassword"
                          >
                            New Password
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="newpassword"
                            type="text"
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-left uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="confirmnewpassword"
                          >
                            Confirm New Password
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="confirmnewpassword"
                            type="text"
                            placeholder="Confirm New Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    {/* } */}
                    <div className="flex items-center justify-center pt-4 px-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none "
                        type="submit"
                      // onClick={() => changePassword()}
                      >
                        Reset Password
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
