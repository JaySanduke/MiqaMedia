import React, { useEffect } from "react";
import Link from "next/link";

import Auth from "layouts/Auth.js";
import { useRouter } from "next/router";

import OtpInput from 'react-otp-input';
import { getAuth, sendPasswordResetEmail, } from "firebase/auth";
import { app } from "components/firebase";
// import OTPInput, { ResendOTP } from "otp-input-react";

const auth = getAuth(app);

export default function ResetPassword() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");

  const [emailv, setEmailV] = React.useState(true);
  const [otp, setOtp] = React.useState("");

  const [otpSent, setOtpSent] = React.useState("");

  async function handleOtpChange(otp) {
    setOtp(otp);
    console.log(otp);
  }

  async function sendOTP() {
    if (email) {
      console.log("send otp to: " + email);

      await fetch("http://localhost:3000/api/getotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setOtpSent(res.otp);
        });

      await setEmailV(false);
    }
  }

  async function resetPassword() {
    if (otpSent != null && otpSent == otp) {
      sendPasswordResetEmail(auth, email)
        .then(
          () => {
            console.log("reset password link sent to: " + email);
            window.location.href = "/auth/login";
          }
        )
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({
            errorCode: errorCode,
            errorMessage: errorMessage,
          });
          if (errorCode == "auth/user-not-found") {
            alert("User not found");
          }
          else if (errorCode == "auth/invalid-email") {
            alert("Invalid email");
          }
          else {
            alert({
              "errorCode": errorCode,
              "errorMessage": errorMessage,
            });
          }
        });
    }
    else {
      alert("OTP is incorrect");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Reset Password
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={
                  (e) => {
                    e.preventDefault();
                  }
                }>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Enter your registered Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      disabled={!emailv}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {!emailv &&
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Enter <b>OTP</b> sent on your email
                      </label>
                      {/* <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      disabled={emailv}
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}

                      <OtpInput
                        value={otp}
                        onChange={(value) => handleOtpChange(value)}
                        numInputs={4}
                        // separator={<span>-</span>}
                        isInputNum={true}
                        isInputSecure={true}
                        shouldAutoFocus={true}
                        isDisabled={emailv}
                        containerStyle={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          padding: "0px",
                          margin: "0px",
                        }}
                        inputStyle={{
                          width: "2.7rem",
                          // height: "2.5rem",
                          // margin: "0 1rem",
                          // fontSize: "2rem",
                          borderRadius: 4,
                          border: "2px solid rgba(0,0,0,0.3)"
                        }}
                      />
                      {/* <OTPInput value={otp} onChange={(e) => handleOtpChange(e)} autoFocus OTPLength={4} otpType="number" disabled={false} secure /> */}
                      {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                    </div>
                  }

                  <div className="text-center mt-6">
                    {emailv ?
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          sendOTP();
                        }}
                      >
                        Get OTP
                      </button>
                      :
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          resetPassword();
                        }}
                      >
                        Reset Password
                      </button>
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ResetPassword.layout = Auth;
