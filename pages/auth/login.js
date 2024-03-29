import React, { useEffect } from "react";
import Link from "next/link";

import { app, database } from "../../components/firebase";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { get, ref, set } from "firebase/database";

import Auth from "layouts/Auth.js";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const auth = await getAuth(app);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        get(ref(database, 'users/' + userCredential.user.uid))
          .then((snapshot) => {
            if (snapshot.exists()) {
              window.location.href = "/user/workspace";
              console.log("Logged in successfully");
            } else {
              set(ref(database, 'users/' + userCredential.user.uid), {
                email: email,
                name: email.split("@")[0],
                uid: userCredential.user.uid,
              })
            }
          })


        // ...
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code == "auth/user-not-found") {
          alert("User not found Please register")
        }
        else if (error.code == "auth/wrong-password") {
          alert("Wrong password!")
        }
      });

    // await setEmail("");
    // await setPassword("");
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
              "credential: " + credential
            );
          });
      })
  }

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.href = "/user/workspace";
      }
    });
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign In
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
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
                <form>
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
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => login()}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/auth/reset">
                  <a
                    href="#ForgotPassword"
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#CreateAccount" className="text-blueGray-200">
                    <small>Create new account</small>
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

Login.layout = Auth;
