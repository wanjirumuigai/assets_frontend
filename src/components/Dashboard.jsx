import DataCard from "./DataCard";
import { FaBarcode, FaUserPlus, FaComputer, FaUsers } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { GiAutoRepair } from "react-icons/gi";
import { TbLicense, TbLicenseOff } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

export default function DashBoard({ token }) {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  if (!dashboard) {
    return <Loader size={48} color="red" className="mx-auto" />;
  }

  return (
    <>
      <h1 className="main-heading text-4xl font-bold">Dashboard</h1>
      <div className="cards-container mt-5 flex flex-wrap justify-between">
        {/* Top row */}
        <DataCard
          title={"Active Assets"}
          number={dashboard.active_assets}
          icon={FaBarcode}
          cardColor="bg-rose-600"
          link={"/assets"}
        />
        <DataCard
          title={"Allocated Assets"}
          number={dashboard.allocated_assets}
          icon={FaUserPlus}
          cardColor={"bg-lime-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Users"}
          number={dashboard.users}
          icon={FaUsers}
          cardColor={"bg-amber-600"}
          link={"/users"}
        />
        <DataCard
          title={"Asset Categories"}
          number={dashboard.asset_categories}
          icon={FaComputer}
          cardColor={"bg-sky-600"}
          link={"/assets"}
        />
        {/* Bottom Row */}
        <DataCard
          title={"Assets Under Repair"}
          number={dashboard.under_repair}
          icon={GiAutoRepair}
          cardColor={"bg-green-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Disposed Assets"}
          number={dashboard.disposed_assets}
          icon={ImBin}
          cardColor={"bg-orange-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Licenses"}
          number={dashboard.licenses}
          icon={TbLicense}
          cardColor={"bg-purple-600"}
          link={"/licenses"}
        />
        <DataCard
          title={"Expired Licenses"}
          number={dashboard.expired_licenses}
          icon={TbLicenseOff}
          cardColor={"bg-red-600"}
          link={"/licenses"}
        />
      </div>
    </>
  );
}
