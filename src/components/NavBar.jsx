import { FaComputer, FaChevronLeft, FaUserGear } from "react-icons/fa6";
import { RiDashboard3Line, RiUserSettingsLine } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { Link } from "react-router-dom";
import { NavLink } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./Dashboard";
import Licenses from "./Licenses";
import NewLicenseForm from "./NewLicenseForm";
import Users from "./Users";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser"

export default function NavBar({ user, handleLogout }) {

  function handleClick(){
    handleLogout()
    sessionStorage.removeItem("user")
  }
  return (
    <div className="flex flex-row">
      <div className="navbar bg-gray-900 w-1/6 h-screen overflow-hidden">
        <h1 className="text-center font-bold text-lg text-white my-5">
          <Link to="/">ICT ASSET MANAGEMENT</Link>
        </h1>
        <hr />
        <div className="links-container flex flex-col justify-start py-4">
          <NavLink
            label="Dashboard"
            icon={<RiDashboard3Line size={28} color="white" />}
            className="text-white text-lg hover:bg-gray-950 ml-[40px] w-[244px]"
            variant="subtle"
            component={Link}
            to="/"
          />
          <NavLink
            label="Users"
            icon={<RiUserSettingsLine size={28} color="white" />}
            className="text-white text-lg hover:bg-gray-950 ml-[40px] w-[244px]"
            variant="subtle"
            rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
            childrenOffset={80}
          >
            <NavLink
              label="All Users"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/users"
            />
            <NavLink
              label="New User"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/users/new"
            />
          </NavLink>
          <NavLink
            label="Licenses"
            icon={<TbLicense size={28} color="white" />}
            className="text-white text-lg hover:bg-gray-950 ml-[40px] w-[244px]"
            variant="subtle"
            rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
            childrenOffset={80}
          >
            <NavLink
              label="All Licenses"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/licenses"
            />
            <NavLink
              label="New License"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/licenses/new"
            />
          </NavLink>
          <NavLink
            label="Assets"
            icon={<FaComputer size={28} color="white" />}
            childrenOffset={80}
            className="text-white text-lg hover:bg-gray-950 ml-[40px] w-[244px]"
            rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
          >
            <NavLink
              label="All Assets"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/assets"
            />
            <NavLink
              label="New Asset"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/assets/new"
            />
            <NavLink
              label="Assign Asset"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/assets/assign"
            />
            <NavLink
              label="Return Asset"
              className="text-white text-lg hover:bg-gray-950"
              component={Link}
              to="/assets/return"
            />
          </NavLink>
        </div>
      </div>
      <div className="main-section flex flex-col w-5/6">
        <div className="top-section">
          <div className="flex flex-row justify-between px-10 my-2.5">
            <MdMenuOpen size={48} />
            {user ? (
              <h1 className="font-bold text-xl self-end mx-2">
                Welcome, {user.user["firstname"]}
              </h1>
            ) : null}
            {/* <h1 className="font-bold text-xl self-end mx-2">Welcome, User</h1> */}
            <div className="user-menu flex flex-row">
              <FaUserGear size={48} className="mx-2" />
              {user ? (
                <h1
                  className="font-bold text-xl self-end mx-2 cursor-pointer"
                  onClick={handleClick}
                >
                  Logout
                </h1>
              ) : null}
            </div>
          </div>
          <hr className="border-zinc-900" />
        </div>
        <div className="main-body px-11 py-5">
          {
            <Routes>
              <Route path="/" element={<DashBoard token={user.jwt} />} />
              <Route
                path="/users"
                element={
                  <Users token={user.jwt} />
                }
              />
              <Route
                path="/users/new"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    Create New User
                  </h1>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <ViewUser token={user.jwt}/>
                }
              />
              <Route
                path="/users/edit/:id"
                element={
                  <EditUser token={user.jwt}/>
                }
              />
              <Route
                path="/licenses"
                element={
                  <Licenses token={user.jwt}/>
                }
              />
              <Route
                path="/licenses/new"
                element={
                  <NewLicenseForm token={user.jwt}/>
                }
              />
              <Route
                path="/assets"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    Assets
                  </h1>
                }
              />
              <Route
                path="/assets/:id"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    View Asset
                  </h1>
                }
              />
              <Route
                path="/assets/new"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    Create New Asset
                  </h1>
                }
              />
              <Route
                path="/assets/assign"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    Assign Assets
                  </h1>
                }
              />
              <Route
                path="/assets/return"
                element={
                  <h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">
                    Return Assets
                  </h1>
                }
              />
            </Routes>
          }
        </div>
      </div>
    </div>
  );
}
