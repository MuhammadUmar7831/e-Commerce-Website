import React, { useState } from 'react';
import axios from 'axios';
function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contact: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.post('http://localhost:3000/signup', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="bg-gradient-to-b from-blue-700 to-blue-900  flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for an account</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1">
                  <input name="name" type="text" required value={formData.name} onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 flex items-center rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500">
                  <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} className=" focus:outline-none w-11/12 px-2 py-3 mt-1 block  sm:text-sm" />
                  <button type="button" onClick={togglePasswordVisibility} className='h-fit w-7'>{showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}</button>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1">
                  <input name="address" type="text" value={formData.address} onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                <div className="mt-1">
                  <input name="contact" type="tel" value={formData.contact} onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-gradient-to-b from-green-500 to-yellow-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
