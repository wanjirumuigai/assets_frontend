import { useState } from "react";
import LoginPage from "./Login";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      {user ? (
        <NavBar user={user} handleLogout={handleLogout} />
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
