import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">HomePage</h1>}/>
      <Route path="/dashboard" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Dashboard</h1>}/>
      <Route path="/users" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Users</h1>}/>
      <Route path="/users/new" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Create New User</h1>}/>
      <Route path="/licenses" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Licences</h1>}/>
      <Route path="/licenses/new" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Create New Licence</h1>}/>
      <Route path="/assets" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Assets</h1>}/>
      <Route path="/assets/:id" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">View Asset</h1>}/>
      <Route path="/assets/new" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Create New Asset</h1>}/>
      <Route path="/assets/assign" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Assign Assets</h1>}/>
      <Route path="/assets/return" element={<h1 className="text-6xl text-rose-700 text-bold font-bold text-center mt-10">Return Assets</h1>}/>
    </Routes>
  );
}

export default App;
