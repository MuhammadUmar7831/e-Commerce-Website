import React from "react";

export default function ProductCard(props) {
   
  const onclick = () => {
    props.setproductId(props.productId);
    props.setproductQuantity(props.quantity);
    props.setStateObject({
      ...props.stateObject,
      name: props.name,
      description: props.description,
      price: props.price,
      rating: props.rating,
      quantity: props.quantity,
      check: true,
      check2: true
    });
  };
  

  return (
    <button type="button" onClick={onclick}>
       <div className=" rounded overflow-hidden shadow-lg flex flex-col m-2">
      <div className="relative">
          <img
            className="w-[300px] h-[200px] object-cover"
            src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
            alt="Sunset in the mountains"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            View Detail
          </div>
      </div>
      <div className="px-6 py-4 mb-auto">
        <a
          href="#"
          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
        >
          {props.name}
        </a>
        <p className="text-gray-500 text-sm">
          {props.description}
        </p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
        <img src="/star.svg" alt="PKR Icon" className="w-5" />
          <span className="ml-1 text-lg">{props.rating}</span>
        </span>

        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <img src="/pkr.svg" alt="PKR Icon" className="w-5" />
          <span className="ml-1 text-xl font-bold">{props.price}</span>
        </span>
      </div>
    </div>
    </button>
  );
}