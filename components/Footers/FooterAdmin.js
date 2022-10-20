import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}
              <a href="/" className="text-blueGray-500 hover:text-blueGray-800">
                Miqa Media | All rights reserved.
                <br />
                This website is made with by TDPVista.
              </a>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                {/* <li>
                  <a
                    href="/"
                    className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                  >
                    Creative Tim
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
