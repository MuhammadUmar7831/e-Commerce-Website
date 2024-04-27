import React, {useState} from "react";

export default function SignUp() {
  const [contact, setContact] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    // Only update the state if the entered value is numeric
    if (!isNaN(value)) {
      setContact(value);
    }
  };

  return (
    <>
      <div class="h-full bg-gray-400 dark:bg-gray-900">
        <div class="mx-auto">
          <div class="flex justify-center px-6 py-12">
            <div class="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                class="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2016/12/08/19/08/bread-1892907_1280.jpg')",
                }}
              ></div>
              <div class="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 class="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  Create an Account!
                </h3>
                <form class="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                  <div class="mb-4 md:flex md:justify-between">
                    <div class="mb-4 md:mr-2 md:mb-0">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="Name"
                      >
                        Name
                      </label>
                      <input
                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="Name"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="email"
                      >
                        Email
                      </label>
                      <input
                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div class="md:ml-2">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="Address"
                      >
                        Address
                      </label>
                      <input
                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="Address"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div class="md:ml-2">
                    <div class="md:ml-2">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="Contact"
                      >
                        Contact
                      </label>
                      <input
                        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="Contact"
                        type="text"
                        placeholder="Contact"
                        pattern="[0-9]*"
                        value={contact}
                        onChange={handleChange}
                        title="Please enter only numeric values"
                      />
                    </div>

                    {/* <ContactInput /> */}
                  </div>

                  <div class="mb-4 md:flex md:justify-between">
                    <div class="mb-4 md:mr-2 md:mb-0">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="password"
                      >
                        Password
                      </label>
                      <input
                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                      <p class="text-xs italic text-red-500">
                        Please choose a password.
                      </p>
                    </div>
                    <div class="md:ml-2">
                      <label
                        class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        for="c_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                  </div>
                  <div class="mb-6 text-center">
                    <button
                      class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr class="mb-6 border-t" />
                  <div class="text-center">
                    <a
                      class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div class="text-center">
                    <a
                      class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
<<<<<<< HEAD
                      href="/login"
=======
                      href="./index.html"
>>>>>>> bdb8f831919dbd2b04e8acaaebce807d712ff32a
                    >
                      Already have an account? Login!
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> bdb8f831919dbd2b04e8acaaebce807d712ff32a
