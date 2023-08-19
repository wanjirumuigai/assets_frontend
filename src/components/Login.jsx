import { useState } from "react";

export default function LoginPage({ handleLogin }) {
  const [errors, setErrors] = useState();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setLoginForm({
            email: "",
            password: "",
          });

          // store the token in a session cookie
          sessionStorage.setItem("user", JSON.stringify(user));
          // store the user in state
          handleLogin(user);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <div
      className="border border-2 p-5 rounded mx-auto my-20"
      style={{ width: "400px" }}
    >
      {errors ? (
        <p style={{ textAlign: "center", margin: "10px auto", color: "red" }}>
          {errors}
        </p>
      ) : null}
      <h1 className="text-2xl mb-4 font-bold">LOGIN</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="name@company.com"
            onChange={handleChange}
            value={loginForm.email}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5"
            required={true}
            onChange={handleChange}
            value={loginForm.password}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-5 py-2.5 text-center"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
