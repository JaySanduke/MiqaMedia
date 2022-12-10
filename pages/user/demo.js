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
                        <Link href="/user/editprofile">
                          <button
                            className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Edit Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {userdetails.workspace
                              ? Object.keys(userdetails.workspace).length
                              : 0}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Workspaces
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-75 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="text-center mt-12">
                        <h3 className="text-4xl uppercase font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                          {user.displayName != null ? user.displayName : "Name"}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                          {userdetails.address
                            ? userdetails.address
                            : "Location"}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10">
                          <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                          {user.email}
                        </div>
                        <div className="mb-2 text-blueGray-600">
                          <i className="fa fa-building mr-2 mb-4 text-lg text-blueGray-400"></i>
                          {userdetails.company
                            ? userdetails.company
                            : "Company Name"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>