import React, { useEffect } from "react";
import User from "layouts/User";
import Link from "next/link";
import ResetPassword from "components/Modal/ResetPassword";

import { app, database } from "../../components/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { get, ref, update } from "firebase/database";

const auth = getAuth(app);

export default function Profile() {

  const [user, setUser] = React.useState(null);

  const [username, setUsername] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [company, setCompany] = React.useState("");

  const [userdetails, setUserdetails] = React.useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    })
  }, [])

  useEffect(() => {
    if (user) {
      get(ref(database, "users/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserdetails(snapshot.val());
          setUsername(user.displayName);
          if (snapshot.val().address != undefined && snapshot.val().address !== null) {
            setAddress(snapshot.val().address);
          }
          if (snapshot.val().company != undefined && snapshot.val().company !== null) {
            setCompany(snapshot.val().company);
          }
        } else {
          console.log("No data available");
        }
      });
    }
  }, [user])

  async function editprofile() {
    if (user) {
      await updateProfile(user, {
        displayName: username
      })
      await update(ref(database, "users/" + user.uid), {
        name: username,
        address: address,
        company: company,
      })
      await console.log("Profile updated");
      window.location.href = await "/user/profile";

    }
  }


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
                    <div className="py-6 px-3 mt-32 sm:mt-0 text-center align-middle">
                      <ResetPassword />
                      <Link href="/user/profile">
                        <button
                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-3 rounded mx-4 outline-none focus:outline-none ease-linear transition-all duration-150"
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
                          {userdetails.workspace ? Object.keys(userdetails.workspace).length : 0}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Workspace
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-75 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* <div className="w-full px-4 max-w"> */}
                    <form className="bg-white text-center rounded px-8 pt-4 pb-4">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 mb-2 text-sm font-bold"
                          htmlFor="newpassword"
                        >
                          Name
                        </label>
                        <input
                          // maxLength={15}
                          className="shadow appearance-none border rounded  w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 mb-2 text-sm font-bold"
                          htmlFor="newpassword"
                        >
                          Location
                        </label>
                        <input
                          // maxLength={15}
                          className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="location"
                          type="text"
                          placeholder="Location"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                          required
                        />
                      </div>
                      {/* <div className="mb-4">
                        <label
                          className="block text-gray-700 mb-2 text-sm font-bold"
                          htmlFor="newpassword"
                        >
                          Email ID
                        </label>
                        <input
                          // maxLength={15}
                          className="shadow appearance-none border rounded  w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder=" yashsoni@gmail.com"
                          required
                        />
                      </div> */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 mb-2 text-sm font-bold"
                          htmlFor="newpassword"
                        >
                          Company Name
                        </label>
                        <input
                          // maxLength={15}
                          className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="company"
                          type="text"
                          placeholder="Company Name"
                          onChange={(e) => setCompany(e.target.value)}
                          value={company}
                          required
                        />
                      </div>
                      <div className="py-6 px-3 mt-32 sm:mt-0 text-center">
                        <button
                          onClick={() => editprofile()}
                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Save Profile
                        </button>
                      </div>
                    </form>
                    {/* </div> */}
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
