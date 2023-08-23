import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAsset({ token }) {
  const loggedUser = JSON.parse(sessionStorage.getItem("user"));
  const username = loggedUser.user["firstname"];
  const [newNotes, setNewNotes] = useState("");
  const allNotes = username + ":\n" + newNotes;
  const [formData, setFormData] = useState({
    asset_name: "",
    model: "",
    asset_tag: "",
    serial_no: "",
    category: "",
    status: "",
    purchase_price: "",
    notes: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function handleNoteChange(e) {
    setNewNotes(e.target.value);
    setFormData({ ...formData, notes: allNotes });
  }

  const handleSubmit = () => {
    fetch("http://localhost:4000/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setFormData({
            asset_name: "",
            model: "",
            asset_tag: "",
            serial_no: "",
            category: "",
            status: "",
            purchase_price: "",
            notes: "",
          });
          navigate(`/assets/${data.id}`)
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  };
  let displayErrs = Object.keys(errors).map(function (property) {
    return errors[property];
  });

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            <Link to="/assets">Cancel</Link>
          </button>
        </div>
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Add Asset
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Asset Name
              </label>
              <input
                type="text"
                value={formData.asset_name}
                name="asset_name"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Asset Tag</label>
              <input
                type="text"
                name="asset_tag"
                value={formData.asset_tag}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Serial Number
              </label>
              <input
                name="serial_no"
                value={formData.serial_no}
                type="text"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Select Category
              </label>
              <select
                onChange={handleChange}
                name="category"
                value={formData.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              >
                <option defaultValue={true}>Select Category</option>
                <option>Accessories</option>
                <option>Laptops</option>
                <option>Desktops</option>
                <option>Servers</option>
                <option>Networking</option>
                <option>Audio/Visual</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Select Status
              </label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option defaultValue={true}>Select Status</option>
                <option value="working">Working</option>
                <option value="damaged">Damaged</option>
                <option value="in_repair">Out for Repair</option>
                <option value="obsolete">Obsolete</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Purchase Price
              </label>
              <input
                type="number"
                name="purchase_price"
                value={formData.purchase_price}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Notes</label>
              <textarea
                name="notes"
                type="textarea"
                onChange={handleNoteChange}
                value={newNotes}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            {displayErrs.length > 0 && (
              <ul style={{ color: "red" }}>
                {displayErrs.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default AddAsset;
