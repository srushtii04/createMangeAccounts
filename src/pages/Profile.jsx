import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load logged-in user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Update correct user based on old email
    const updatedUsers = users.map((u) =>
      u.email.toLowerCase() === JSON.parse(localStorage.getItem("currentUser")).email.toLowerCase()
        ? user
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          My Profile
        </h2>

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <p className="text-sm text-gray-600">First Name</p>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="font-medium text-lg">{user.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <p className="text-sm text-gray-600">Last Name</p>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="font-medium text-lg">{user.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-600">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="font-medium text-lg">{user.email}</p>
            )}
          </div>

          {/* Password field */}
          {isEditing && (
            <div>
              <p className="text-sm text-gray-600">Password</p>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="border w-full p-2 rounded focus:ring focus:ring-blue-300"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
