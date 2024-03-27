import React from "react";

export default function Popular() {
  return (
    <>
      <div className="mb-4">
        <div className="mx-4">
          <h5 className="text-4xl mt-4">Products</h5>
          <hr class="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
        </div>
        <div className="mx-4 flex">
          <div class="bg-white rounded-lg overflow-hidden shadow-lg shadow-gray-600 hover:shadow-xl hover:shadow-gray-600 hover:cursor-pointer transition-shadow duration-500 w-full xs:w-[48%] md:w-1/3 lg:w-1/4">
            <div class="relative">
              <img
                class="w-full object-cover h-56"
                src="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paul_hollywoods_crusty_83536_16x9.jpg"
                alt="Product Image"
              />
              <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                SALE
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium mb-2">Bread</h3>
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">$19.99</span>
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}