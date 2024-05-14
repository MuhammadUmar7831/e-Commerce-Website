import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Not Enough Product Quantity"
  );

  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/Orders/allOrders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();

      // Format date strings in the orders data
      const formattedOrders = data.map((order) => {
        // Convert ISO date string to Date object
        const date = new Date(order.Date);
        // Extract day, month, and year components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        // Format date as d/m/y
        const formattedDate = `${day}/${month}/${year}`;

        // Return updated order object with formatted date

        return { ...order, Date: formattedDate };
      });

      setOrders(formattedOrders);
      console.log(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const rejectOrder = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/Orders/rejectOrder/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to approve order");
      }
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
      // Handle error
    }
  };
  const completeOrder = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/Orders/completeOrder/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to approve order");
      }
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
      // Handle error
    }
  };
  const aprroveOrder = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/Orders/approveOrder/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        if (response.status === 400) {
          setShowModal(true);
          throw new Error("Insufficient quantity available");
        } else {
          throw new Error("Failed to approve order");
        }
      }
      fetchOrders(); // Assuming this function fetches orders again to update UI
    } catch (error) {
      console.error("Error approving order:", error);
      // Handle error
    }
  };
  return (
    <div>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 012 0v5a1 1 0 11-2 0V7zm1 9a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div class="sm:px-6 w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
          <div class="flex items-center justify-between mt-5">
            <p
              tabindex="0"
              class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Orders
            </p>
          </div>
        </div>
        <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div class="mt-7 overflow-x-auto">
            <table class="w-full whitespace-nowrap">
              {orders.length > 0 ? (
                <thead className="">
                  <tr>
                    <th className="">Product</th>
                    <th className="">Customer Name</th>
                    <th className="">Address</th>
                    <th className="">Date</th>
                    <th className="">Contact</th>
                    <th className="">Quantity</th>
                    <th className="">Price</th>
                    <th className="">Actions</th>
                  </tr>
                </thead>
              ) : (
                <tr>
                  <td className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800s">
                    Message: No Orders
                  </td>
                </tr>
              )}
              <tbody>
                {orders.map((order) => (
                  <tr
                    tabindex="0"
                    class="focus:outline-none h-16 border border-gray-100 rounded"
                  >
                    <td class="">
                      <div class="flex items-center pl-5">
                        <p class="text-base font-medium leading-none text-gray-700 mr-2">
                          {order.ProductName}
                        </p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                            stroke="#3B82F6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                            stroke="#3B82F6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </td>
                    <td class="">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="7.50004"
                            cy="7.49967"
                            r="1.66667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                        </svg>
                        <p class="text-base font-medium leading-none text-gray-700 mr-2">
                          {order.Name}
                        </p>
                      </div>
                    </td>
                    <td class="">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <circle
                            cx="7.50004"
                            cy="7.49967"
                            r="1.66667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></circle>
                        </svg>
                        <p class="text-sm leading-none text-gray-600 ml-2">
                          {order.Address}
                        </p>
                      </div>
                    </td>
                    <td class="pl-5">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7.5 5H16.6667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.5 10H16.6667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.5 15H16.6667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.16669 5V5.00667"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.16669 10V10.0067"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.16669 15V15.0067"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <p class="text-sm leading-none text-gray-600 ml-2">
                          {order.Date}
                        </p>
                      </div>
                    </td>
                    <td class="pl-5">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M10 9.1665V9.17484"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M6.66669 9.1665V9.17484"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M13.3333 9.1665V9.17484"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <p class="text-sm leading-none text-gray-600 ml-2">
                          {order.Contact}
                        </p>
                      </div>
                    </td>
                    <td class="pl-5">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                            stroke="#52525B"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <p class="text-sm leading-none text-gray-600 ml-2">
                          {order.Quantity}
                        </p>
                      </div>
                    </td>
                    <td class="pl-5">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-currency-dollar"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          {/* <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />{" "} */}
                        </svg>
                        <p class="text-sm leading-none text-gray-600 ml-2">
                          Rs. {order.TotalBill}
                        </p>
                      </div>
                    </td>
                    <td class="pl-5">
                      {order.Status === "pending" && (
                        <button
                          class="py-3 hover:bg-green-700 px-3 text-sm focus:outline-none leading-none text-white bg-green-500 rounded"
                          onClick={() => aprroveOrder(order.ID)}
                        >
                          Approve
                        </button>
                      )}
                      {order.Status === "approved" && (
                        <button
                          onClick={() => completeOrder(order.ID)}
                          class="py-3 px-3 text-sm hover:bg-green-900  focus:outline-none leading-none text-white bg-green-700 rounded"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                    <td class="pl-4">
                      <button
                        onClick={() => rejectOrder(order.ID)}
                        class="py-3 px-3 text-sm hover:bg-red-900 focus:outline-none leading-none text-white bg-red-500 rounded"
                      >
                        Reject
                      </button>
                    </td>

                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
