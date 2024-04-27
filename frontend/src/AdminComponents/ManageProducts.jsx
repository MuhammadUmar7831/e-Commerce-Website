import React, { useState, useEffect } from "react";

const ManageProducts = () => {
    const host = "localhost:3000";
    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setproductQuantity] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProductName, setUpdatedProductName] = useState("");
    const [updatedProductPrice, setUpdatedProductPrice] = useState("");
    const [updatedProductDescription, setUpdatedProductDescription] = useState("");
    const [updatedQuantity, setupdatedQuantity] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [highlightFields, setHighlightFields] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [deleteid, setdeleteid] = useState("");
    const [deletep, setdeletep] = useState("");
    const openEditModal = (id, name, price, des, q) => {
        setSelectedProduct(id);
        setUpdatedProductName(name);
        setUpdatedProductPrice(price);
        setUpdatedProductDescription(des);
        setupdatedQuantity(q);
        setShowUpdateModal(true);
    };
    const handledeleteProduct = (id, name) => {
        setdeleteid(id);
        setdeletep(name);
        setshowDeleteModal(true);
        console.log("Notme");
    };
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://${host}/Product/deleteProduct/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to delete product");
            console.log("Product deleted successfully");
            setProducts(products.filter((product) => product.ID !== id));
            setdeleteid("");
            setdeletep("");
            setshowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${host}/Product/allProducts`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

  const handleAddProduct = async () => {
    try {
      setErrorMessage("");
      setHighlightFields(false);

            if (!productName || !productPrice || !productDescription) {
                const price = parseFloat(productPrice);
                if (isNaN(price) || price <= 0) {
                    setErrorMessage("Please enter a valid product price.");
                    setHighlightFields(true); // Highlight fields if error occurs
                    return;
                }
                setErrorMessage("Please fill in all fields.");
                setHighlightFields(true); // Highlight fields if error occurs
                return;
            }
            setErrorMessage("");
            const productData = {
                pname: productName,
                price: productPrice,
                pdesc: productDescription,
                pquantity: productQuantity,
            };
            const response = await fetch(`http://${host}/Product/addproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const responseData = await response.json();

            const newProduct = {
                ID: responseData.product.ID,
                Name: responseData.product.Name,
                Price: responseData.product.Price,
                Description: responseData.product.Description,
                Quantity: responseData.product.Quantity,
            };

            setProducts([...products, newProduct]); // Add the new product to the existing list
            console.log(products);
            console.log(newProduct);
            setProductName("");
            setProductPrice("");
            setProductDescription("");
            setproductQuantity("");
            setShowModal(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const handleUpdateProduct = async () => {
        try {
            setErrorMessage("");
            setHighlightFields(false);

            if (!updatedProductName || !updatedProductPrice || !updatedProductDescription || !updatedQuantity) {
                const price = parseFloat(updatedProductPrice);
                if (isNaN(price) || price <= 0) {
                    setErrorMessage("Please enter a valid product price.");
                    setHighlightFields(true); // Highlight fields if error occurs
                    return;
                }
                if (updatedQuantity <= 0) {
                    setErrorMessage("Please enter a valid Quantity.");
                    setHighlightFields(true); // Highlight fields if error occurs
                    return;
                }

                setErrorMessage("Please fill in all fields.");
                setHighlightFields(true); // Highlight fields if error occurs
                return;
            }
            setErrorMessage("");

            const updatedProductData = {
                pname: updatedProductName,
                pdesc: updatedProductDescription,
                price: updatedProductPrice,
                pquantity: updatedQuantity,
            };
            const response = await fetch(`http://${host}/Product/updateProduct/${selectedProduct}`, {
                method: "PUT", // Change method to 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProductData),
            });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully");

            // Close the modal
            setShowUpdateModal(false);
            const updatedProducts = products.map((product) => {
                if (product.ID === selectedProduct) {
                    return {
                        ...product,
                        Name: updatedProductName,
                        Price: updatedProductPrice,
                        Description: updatedProductDescription,
                        Quantity: updatedQuantity,
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Button to open the modal */}
            <div className="fixed bottom-10 right-10 z-40">
                <button
                    className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center text-white text-3xl "
                    onClick={() => setShowModal(true)}
                >
                    +
                </button>
            </div>
            {/* UpdateModal */}
            {showUpdateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields && !updatedProductName ? "border-red-500" : ""
                            }`}
                            value={updatedProductName}
                            onChange={(e) => setUpdatedProductName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Product Price"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields &&
                                (!updatedProductPrice ||
                                    isNaN(parseFloat(productPrice)) ||
                                    parseFloat(productPrice) <= 0)
                                    ? "border-red-500"
                                    : ""
                            }`}
                            value={updatedProductPrice}
                            onChange={(e) => setUpdatedProductPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Product Quantity"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields && (!updatedQuantity || updatedQuantity <= 0) ? "border-red-500" : ""
                            }`}
                            value={updatedQuantity}
                            onChange={(e) => setupdatedQuantity(e.target.value)}
                        />

                        <textarea
                            placeholder="Product Description"
                            className={`w-full border rounded-md mb-4 p-2 ${
                                highlightFields && !updatedProductDescription ? "border-red-500" : ""
                            }`}
                            value={updatedProductDescription}
                            onChange={(e) => setUpdatedProductDescription(e.target.value)}
                        />

                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={handleUpdateProduct}
                            >
                                OK
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                onClick={() => setShowUpdateModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
            )}
            {/* Delete */}
            {showDeleteModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">{`This will delete ${deletep}`}</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={() => deleteProduct(deleteid)} // Pass a function reference
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                onClick={() => setshowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields && !productName ? "border-red-500" : ""
                            }`}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Product Price"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields &&
                                (!productPrice || isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0)
                                    ? "border-red-500"
                                    : ""
                            }`}
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Product Quantity"
                            className={`w-full border rounded-md mb-2 p-2 ${
                                highlightFields &&
                                (!productQuantity ||
                                    isNaN(parseFloat(productQuantity)) ||
                                    parseFloat(productQuantity) <= 0)
                                    ? "border-red-500"
                                    : ""
                            }`}
                            value={productQuantity}
                            onChange={(e) => setproductQuantity(e.target.value)}
                        />
                        <textarea
                            placeholder="Product Description"
                            className={`w-full border rounded-md mb-4 p-2 ${
                                highlightFields && !productDescription ? "border-red-500" : ""
                            }`}
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />

                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={handleAddProduct}
                            >
                                OK
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
            )}
            {/*  */}
            <div className="mx-4 mt-4">
                    <h5 className="text-4xl mt-4">Products</h5>
                    <hr class="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
                </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                {products.map((product, index) => (
                    <div className="rounded overflow-hidden shadow-lg flex flex-col m-2">
                        <div className="relative">
                            <a href="#">
                                <img
                                    className="w-full"
                                    src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                                    alt="Sunset in the mountains"
                                />
                                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                            </a>
                            <a href="#!">
                            <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                                    SALE
                                </div>
                            </a>
                        </div>
                        <div className="px-6 py-4 mb-auto">
                            <a
                                href="#"
                                className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
                            >
                                {product.Name}
                            </a>
                            <p className="text-gray-500 text-sm">{product.Description}</p>
                        </div>
                        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                            <span
                                href="#"
                                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                            >
                                <img src="/star.svg" alt="PKR Icon" className="w-5" />
                                <span className="ml-1 text-lg">{product.Rating !== null ? product.Rating : 0}</span>
                            </span>

                            <span
                                href="#"
                                className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                            >
                                <img src="/pkr.svg" alt="PKR Icon" className="w-5" />
                                <span className="ml-1 text-xl font-bold">{product.Price}</span>
                            </span>
                        </div>
                        <div className="flex justify-end pb-4 bg-gray-100">
                            <button
                                class=" mx-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handledeleteProduct(product.ID, product.Name)}
                            >
                                Delete
                            </button>
                            <button
                                class="bg-blue-500 hover:bg-blue-600 mr-2 text-white font-bold py-2 px-4 rounded"
                                onClick={() =>
                                    openEditModal(
                                        product.ID,
                                        product.Name,
                                        product.Price,
                                        product.Description,
                                        product.Quantity
                                    )
                                }
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/*  */}

         </div>
    );
};

export default ManageProducts;
