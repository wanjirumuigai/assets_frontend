import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewLicenseForm({ token }) {
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState({
    license_name: "",
    purchase_date: "",
    expiry_date: "",
    number_of_users: 1,
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/licenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => navigate("/licenses"));
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    });
  }

  const today = new Date().toISOString().split("T")[0];
  return (
    <form className="w-full max-w-sm mx-auto">
      {errors ? (
        <p style={{ textAlign: "center", margin: "10px auto", color: "red" }}>
          {errors}
        </p>
      ) : null}
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-license-name"
          >
            License Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-license-name"
            type="text"
            name="license_name"
            value={formData.license_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-purchase-date"
          >
            Purchase Date
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-purchase-date"
            type="date"
            placeholder="YYYY-MM-DD"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            max={today}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-expiry-date"
          >
            Expiry Date
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-expiry-date"
            type="date"
            placeholder="YYYY-MM-DD"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
            min={formData.purchase_date}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-users"
          >
            No of Users
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-users"
            type="number"
            name="number_of_users"
            min={1}
            value={formData.number_of_users}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={handleSubmit}
          >
            Add License
          </button>
        </div>
      </div>
    </form>
  );
}
