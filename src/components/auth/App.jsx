import { useEffect, useState } from "react";
import LoginPage from "../auth/Login";
import NavBar from "../navigation/NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

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
