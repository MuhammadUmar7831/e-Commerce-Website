import React, {useState, useEffect} from "react";

const ManageProducts = () => {
    const host = "localhost:3000";
    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProductName, setUpdatedProductName] = useState("");
    const [updatedProductPrice, setUpdatedProductPrice] = useState("");
    const [updatedProductDescription, setUpdatedProductDescription] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [highlightFields, setHighlightFields] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);    
    const [deleteid, setdeleteid] = useState("");    
    const [deletep, setdeletep] = useState("");    
    const openEditModal = (id, name, price, des) => {
        setSelectedProduct(id);
        setUpdatedProductName(name);
        setUpdatedProductPrice(price);
        setUpdatedProductDescription(des);
        setShowUpdateModal(true);
    };
    const handledeleteProduct=(id,name)=>{
        setdeleteid(id);
        setdeletep(name);
        setshowDeleteModal(true);
        console.log("Notme");
    }
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
            setProducts(products.filter((product) => product.idproductinfo !== id));
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
                idproductinfo: responseData.product.idproductinfo,
                ProductName: responseData.product.ProductName,
                ProductPrice: responseData.product.ProductPrice,
                ProductDescription: responseData.product.ProductDescription,
            };

            setProducts([...products, newProduct]); // Add the new product to the existing list
            setProductName("");
            setProductPrice("");
            setProductDescription("");
            setShowModal(false);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const handleUpdateProduct = async () => {
        try {
            setErrorMessage("");
            setHighlightFields(false);

            if (!updatedProductName || !updatedProductPrice || !updatedProductDescription) {
                const price = parseFloat(updatedProductPrice);
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
          
            const updatedProductData = {
                pname: updatedProductName,
                pdesc: updatedProductDescription,
                price: updatedProductPrice,
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
                if (product.idproductinfo === selectedProduct) {
                    return {
                        ...product,
                        ProductName: updatedProductName,
                        ProductPrice: updatedProductPrice,
                        ProductDescription: updatedProductDescription,
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
        <>
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
                                (!updatedProductPrice || isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0)
                                    ? "border-red-500"
                                    : ""
                            }`}
                            value={updatedProductPrice}
                            onChange={(e) => setUpdatedProductPrice(e.target.value)}
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

            <div className="mb-4 w-[100%]">
                <div className="mx-4">
                    <h5 className="text-4xl mt-4">Products</h5>
                    <hr class="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
                </div>
                <div className="mx-4 flex flex-wrap">
                    {products.map((product, index) => (
                        <div class="bg-white mb-5  mr-5 rounded-lg overflow-hidden shadow-lg shadow-gray-600 hover:shadow-xl hover:shadow-gray-600 hover:cursor-pointer transition-shadow w-full xs:w-[48%] md:w-1/3 lg:w-2/6 sm:1/2">
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
                                <h3 class="text-lg font-medium mb-2">{product.ProductName}</h3>
                                <h3 class="text-lg font-medium mb-2">{product.ProductDescription}</h3>
                                <div class="flex items-center justify-between">
                                    <span class="font-bold text-lg">{product.ProductPrice} pkr</span>
                                    <div className="flex">
                                        <button
                                            class=" mx-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handledeleteProduct(product.idproductinfo,product.ProductName)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() =>
                                                openEditModal(
                                                    product.idproductinfo,
                                                    product.ProductName,
                                                    product.ProductPrice,
                                                    product.ProductDescription
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ManageProducts;
