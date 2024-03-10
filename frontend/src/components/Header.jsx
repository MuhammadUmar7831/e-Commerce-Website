import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center m-2">
        {/* for small screen */}
        <div className="flex flex-col lg:hidden">
          <div className="flex my-3 items-center">
            {/* logo section */}
            <div className="w-3/12 m-2">
              <img src="Logo-Final-C.png" alt="Logo" />
            </div>

            {/* Cart icon and login icon */}
            <div className="w-4/6 flex items-center justify-end">
              <button className="relative inline-flex items-center p-3 text-sm font-medium text-center">
                <img src="cart.png" alt="" className="w-10" />
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold workSans bg-gray-300 border-2 border-white rounded-full bottom-0 right-3 -end-2">
                  0
                </div>
              </button>
              <button className="relative inline-flex items-center px-3 text-sm font-medium text-center">
                <img src="user.png" alt="" className="w-8" />
                <p className="text-left px-2">
                  Log in <br /> Register
                </p>
              </button>
            </div>
          </div>

          {/* search bar section */}
          <div className="border border-gray-300 h-12 rounded-md flex w-11/12 m-auto">
            <div className="w-10/12 m-auto ml-2">
              <input
                type="text"
                name=""
                id=""
                className="w-full focus:outline-none workSans text-xs text-zinc-500"
                placeholder="I'm shopping for..."
              />
            </div>

            <button className="w-2/12 bg-gray-300 flex justify-center items-center rounded-r-md coolBeans after:bg-gradient-to-r from-teal-400 to-gray-800 after:rounded-r-md hover:text-white">
              <p className=" font-bold text-sm workSans">GO</p>
            </button>
          </div>
        </div>

        {/* for large screen */}
        <div className="hidden lg:flex items-center">
          {/* logo section */}
          <div className="lg:w-1/6 hidden lg:block m-2">
            <img src="Logo-Final-C.png" alt="Logo" />
          </div>

          {/* search bar section */}
          <div className="border border-gray-300 h-12 rounded-md flex w-4/6">
            <div className="w-10/12 m-auto ml-2">
              <input
                type="text"
                name=""
                id=""
                className="w-full focus:outline-none workSans text-xs text-zinc-500"
                placeholder="I'm shopping for..."
              />
            </div>

            <button className="w-2/12 bg-gray-300 flex justify-center items-center rounded-r-md coolBeans after:bg-gradient-to-r from-teal-400 to-gray-800 after:rounded-r-md hover:text-white">
              <p className="font-bold text-sm workSans">GO</p>
            </button>
          </div>

          {/* Cart icon and login icon */}
          <div className="w-1/6 flex items-center">
            <button className="relative inline-flex items-center p-3 text-sm font-medium text-center">
              <img src="cart.png" alt="" className="w-12" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold workSans bg-gray-300 border-2 border-white rounded-full bottom-0 right-3 -end-2">
                0
              </div>
            </button>
            <button className="relative inline-flex items-center px-3 text-sm font-medium text-center">
              <img src="user.png" alt="" className="w-10" />
              <p className="text-left px-2">
                Log in <br /> Register
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
