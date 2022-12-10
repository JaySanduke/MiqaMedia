import React from "react";

// layout for page

import Auth from "layouts/Auth.js";

import { getAuth, createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { get, ref, set } from "firebase/database";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { database, app } from "../../components/firebase";
import Link from "next/link";

const auth = getAuth(app);
export default function Register() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [name, setName] = React.useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        console.log(userCredential);
        set(ref(database, 'users/' + userID), {
          name: name,
          email: email,
          uid: userID
        })
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
            }).then(() => {
              console.log("Profile dispaly name updated");
            }).catch((error) => {
              console.log(error);
            });

          })
          .then(() => {
            window.location.href = "/user/workspace";
          });
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;

        console.log(error);
      });
  }

  async function googleSignIn() {
    const auth = await getAuth(app);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        // Signed in  
        const user = userCredential.user;

        await get(ref(database, "users/" + user.uid))
          .then(async (snapshot) => {
            if (snapshot.exists()) {
              await console.log("Google User already exists");
              await console.log(snapshot.val());

              window.location.href = await "/user/workspace";
            }
            else {
              console.log("Google User does not exist registering in the database");
              await set(ref(database, "users/" + user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid
              });
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            console.log(
              "error code: " + errorCode, '\n',
              "error message: " + errorMessage, '\n',
              "email: " + email, '\n',
              "credential: " + credential);

          });
      })
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => googleSignIn()}
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form name="registerform" id="registerform" onSubmit={() => register()}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirm Password"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        required
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      form="registerform"
                      onClick={() => {
                        register();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-right">
                <Link href="/auth/login">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Log In</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
