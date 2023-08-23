import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditAsset = ({ token }) => {
  const loggedUser = JSON.parse(sessionStorage.getItem("user"));
  const username = loggedUser.user["firstname"];
  const [newNotes, setNewNotes] = useState("");
  const [asset, setAsset] = useState([]);
  const allNotes = asset.notes + "\n" + username + ":\n" + newNotes;
  const [formData, setFormData] = useState({
    asset_name: asset.asset_name,
    model: asset.model,
    asset_tag: asset.asset_tag,
    serial_no: asset.serial_no,
    category: asset.category,
    status: asset.status,
    purchase_price: asset.purchase_price,
    notes: allNotes,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchAsset = async () => {
      const res = await fetch(`http://localhost:4000/assets/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAsset(data);
      setFormData(data);
    };
    fetchAsset();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleNoteChange(e) {
    setNewNotes(e.target.value);
    setFormData({ ...formData, notes: allNotes });
  }
  function handleUpdate() {
    fetch(`http://localhost:4000/assets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setFormData(data);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
    navigate(`/assets/${id}`);
  }

  let displayErrs = Object.keys(errors).map(function (property) {
    return errors[property];
  });

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          {asset.asset_name + ": " + asset.model}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Asset Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                value={formData.asset_name}
                name="asset_name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Model</label>
              <input
                onChange={handleChange}
                type="text"
                name="model"
                value={formData.model}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Asset Tag</label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="asset_tag"
                value={formData.asset_tag}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Serial Number
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="serial_no"
                value={formData.serial_no}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Category</label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="category"
                value={formData.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Select Status
              </label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                defaultValue={formData.status}
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
                Assigned To
              </label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="assigned_to"
                value={
                  !asset.users || asset.users.length === 0
                    ? "N/A"
                    : asset.users[0].firstname
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Department
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="department"
                value={
                  !asset.users || asset.users.length === 0
                    ? "N/A"
                    : asset.users[0].department
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Assigned By
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="assigned_by"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].assigned_by
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Return Date
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="return_date"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].return_date
                }
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Received By
              </label>
              <input
                onChange={handleChange}
                name="received_by"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].received_by
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Purchase Price
              </label>
              <input
                readOnly
                onChange={handleChange}
                type="number"
                name="purchase_price"
                value={formData.purchase_price}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Notes</label>
              <textarea
                readOnly
                name="notes"
                type="textarea"
                value={formData.notes}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Add Notes</label>
              <textarea
                name="notes"
                onChange={handleNoteChange}
                type="textarea"
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

          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              <Link to={`/assets/${id}`}>Cancel</Link>
            </button>
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditAsset;
