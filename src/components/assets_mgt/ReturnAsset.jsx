import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DataGrid } from "@mui/x-data-grid";
import SearchUser from "../users/SearchUser";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "email"],
};
const columns = [
  { field: "id", headerName: "ID", width: 70, color: "red" },
  { field: "asset_name", headerName: "Asset Name", width: 130 },
  { field: "model", headerName: "Model", width: 130 },
  {
    field: "asset_tag",
    headerName: "Tag",

    width: 90,
  },
  {
    field: "serial_no",
    headerName: "Serial Number",

    width: 90,
  },
];

const ReturnAsset = ({ currentUser }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [user, setUser] = useState([]);
  const [assetIds, setAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState("Select user");
  const [department, setDepartment] = useState([]);
  const [userId, setUserId] = useState([]);
  const [assigns, setAssign] = useState([]);
  const loggedUser = currentUser.user;
  const token = currentUser.jwt;
  const today = new Date().toISOString().split("T")[0];

  function getUser(obj) {
    setSelectedUser(obj[0].firstname + " " + obj[0].lastname);
    setDepartment(obj[0].department);
    setUserId(obj[0].id);
    setUser(obj[0]);
  }
  useEffect(() => {
    const fetchAsset = async () => {
      const res = await fetch(`http://localhost:4000/assigns/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchAsset();
  }, [userId]);

  useEffect(() => {
    if (user.assigns) {
      const asset_ids = user.assigns
        .filter((asset) => asset.is_returned === false)
        .map((assign) => assign.asset_id);
      setAssetIds(asset_ids);
    }
  }, [user]);

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAssign(data);
    };

    fetchAssets();
  }, []);

  const userAssets = assets.filter((asset) => assetIds.includes(asset.id));
  const selected_ids = rowSelectionModel;
  const returnAssets = assigns.filter((asset) =>
    selected_ids.includes(asset.asset_id)
  );
  const assignedIds = returnAssets.map((assign) => assign.id);

  const [formData, setFormData] = useState({
    return_date: "",
    received_by: `${loggedUser.firstname} ${loggedUser.lastname}`,
    is_returned: true,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    assignedIds.forEach((id) => {
      fetch(`http://localhost:4000/assigns/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            setUserId("");
          });
        }
      });
    });
    navigate(`/users/${userId}`);
  }

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            <Link to={`/assets`}>Cancel</Link>
          </button>
        </div>
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Return Asset
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
                Select User
              </label>
              <select
                value={selectedUser}
                onChange={handleChange}
                name=""
                onClick={open}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>{selectedUser}</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Department
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="department"
                value={department}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Return Date
              </label>
              <input
                required
                onChange={handleChange}
                name="return_date"
                value={formData.return_date}
                type="date"
                max={today}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Notes</label>
              <textarea
                onChange={handleChange}
                type="textarea"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>
          <div>
            <label className="text-white dark:text-gray-200">User Assets</label>
            <DataGrid
              className="bg-white"
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              rows={userAssets}
              columns={columns}
              checkboxSelection
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Return
            </button>
          </div>
        </form>
        <SearchUser
          open={open}
          opened={opened}
          close={close}
          getUser={getUser}
        />
      </section>
    </div>
  );
};
export default ReturnAsset;
