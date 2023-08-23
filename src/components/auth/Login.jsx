import { useState } from "react";
import { Link } from "react-router-dom";

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

          // store the token in Link session cookie
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
    <div className="login-page">
      <div className="bg-gray-900 w-screen h-1/5 py-6 ">
        <h1 className="text-white text-center font-bold text-xl sm:text-4xl">
          KISE Asset Management Platform
        </h1>
      </div>
      {/* Form */}
      <div className="form-container mt-[120px]">
        <div
          className="form border border-2 p-5 rounded mx-auto"
          style={{ width: "400px" }}
        >
          {errors ? (
            <p
              style={{ textAlign: "center", margin: "10px auto", color: "red" }}
            >
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
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 w-screen py-3 px-6 fixed inset-x-0 bottom-0">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center gap-[55px]">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <Link
              to="https://www.kise.ac.ke"
              className="hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              KISE™© {`${new Date().getFullYear()} `}
            </Link>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6">
                Contact
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contribute
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
