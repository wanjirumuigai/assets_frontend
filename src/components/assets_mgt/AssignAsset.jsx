import { openSpotlight } from "@mantine/spotlight";
import React, { useState, useEffect, useCallback } from "react";
import { Table } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import { BiSearch, BiTrash, BiDesktop } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import SearchUser from "../users/SearchUser";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "email"],
};

const AssignAsset = ({ user }) => {
  const [assets, setAssets] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [assignedItem, setAssignedItems] = useState([]);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Add user");
  const loggedUser = user.user;
  // const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const [userId, setUserId] = useState(0);
  const [assignee, setAssignee] = useState({});
  const [location, setLocation] = useState("");
  const [assign_date, setAssignDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState([]);
  const token = user.jwt;
  const fuse = new Fuse(users, options);
  const ths = (
    <tr>
      <th>Asset Name</th>
      <th>Model</th>
      <th>Tag Number</th>
      <th>Serial Number</th>
    </tr>
  );

  useEffect(() => {
    const fetchAssigns = async () => {
      const res = await fetch("http://localhost:4000/assigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAssigns(data);
    };

    fetchAssigns();
  }, []);
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

  // Get the unassigned and undisposed assets only
  const issued_assets = assigns
    .filter((asset) => asset.is_returned === false)
    .map((assign) => assign.asset_id);
  const available_assets = assets.filter(
    (asset) =>
      !issued_assets.includes(asset.id) && asset.marked_for_disposal === false
  );

  const [assetsId, setAssetsID] = useState([]);

  function handleAddAsset(asset) {
    if (!assetsId.includes(asset.id)) {
      // Prevent adding an asset twice
      setSearchItems([...searchItems, asset]);
      setAssetsID([...assetsId, asset.id]);
      setFormData([
        ...formData,
        {
          user_id: assignee.id,
          department: assignee.department,
          asset_id: asset.id,
          location: location,
          assign_date: assign_date,
          assigned_by: `${loggedUser.firstname} ${loggedUser.lastname}`,
        },
      ]);
    } else {
      console.log("Already Picked");
    }
  }

  useEffect(() => {
    formData.forEach((element) => {
      element.user_id = assignee.id;
      element.department = assignee.department;
      element.location = location;
      element.assign_date = assign_date;
    });
  }, [assignee, location, assign_date]);

  // const sentIds = JSON.parse(searchParams.get("assetIds"));
  // if (sentIds) {
  //   const sentAssets = available_assets.filter((asset) =>
  //     sentIds.includes(asset.id)
  //   );
  //   sentAssets.forEach((element) => {
  //     handleAddAsset(element);
  //   });
  // }
  console.log(formData);

  function handleDelete(id) {
    const afterDeletion = searchItems.filter((item) => item.id != id);
    setSearchItems(afterDeletion);
    setAssetsID(afterDeletion.map((item) => item.id));
    setFormData(formData.filter((element) => element.asset_id !== id));
  }

  function handleView(id) {
    navigate(`/assets/${id}`);
  }

  const actions = available_assets.map((asset) => ({
    title: asset.asset_name + " " + asset.model,
    description: "Tag: " + asset.asset_tag + " " + "Serial: " + asset.serial_no,
    onTrigger: () => handleAddAsset(asset),
    icon: <BiDesktop size="1.2rem" />,
  }));

  const rows = searchItems.map((element) => (
    <tr key={element.id}>
      <td>{element.asset_name}</td>
      <td>{element.model}</td>
      <td>{element.asset_tag}</td>
      <td>{element.serial_no}</td>

      <td>
        <Button
          variant="outline"
          onClick={() => handleView(element.id)}
          leftIcon={<FiEye size="1rem" />}
        >
          View
        </Button>
        <Button
          variant="outline"
          // eslint-disable-next-line no-unused-expressions
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            handleDelete(element.id), open;
          }}
          leftIcon={<BiTrash size="1rem" />}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  function handleSubmit() {
    fetch("http://localhost:4000/assigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _json: formData }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          setFormData({
            user_id: "",
            department: "",
            asset_id: "",
            location: "",
            assign_date: "",
            assigned_by: "",
          });
          navigate("/assets")
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
    navigate(`/users/${userId}`);
  }

  function getUser(obj) {
    setSelectedUser(obj[0].firstname + " " + obj[0].lastname);
    setUserId(obj[0].id);
    setAssignee(obj[0]);
  }

  function handleChange(e) {
    setLocation(e.target.value);
  }

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
          <Link to={`/assets`}>Cancel</Link>
        </button>
      </div>
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Assign Asset
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white dark:text-gray-200">Select User</label>
            <select
              value={selectedUser}
              name=""
              onClick={open}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>{selectedUser}</option>
            </select>
          </div>

          <div>
            <label className="text-white dark:text-gray-200">Location</label>
            <input
              name="location"
              value={location}
              type="text"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-white dark:text-gray-200">Assign date</label>
            <input
              required
              name="assign_date"
              value={assign_date}
              type="date"
              onChange={(e) => setAssignDate(e.target.value)}
              max={today}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>
        <div>
          <label className="text-white dark:text-gray-200">Add Assets</label>
          <select
            name=""
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            onClick={spotlight.open}
          >
            <option defaultValue={true}>Add Assets</option>
          </select>
        </div>

        <div className=" bg-slate-300 mt-6 ">
          <div>
            {searchItems.length === 0 ? (
              <h5>Add Items to Assign</h5>
            ) : (
              <h5>Items to be Assigned</h5>
            )}
          </div>
          <div>
            <Table>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
      <SpotlightProvider
        actions={actions}
        searchIcon={<BiSearch size="1.2rem" />}
        searchPlaceholder="Search..."
        shortcut="mod + shift + 1"
        nothingFoundMessage="Nothing found..."
      ></SpotlightProvider>
      <SearchUser open={open} opened={opened} close={close} getUser={getUser} />
    </section>
  );
};

export default AssignAsset;
