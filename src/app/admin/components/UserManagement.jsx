"use client";

import { useState, useEffect } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user updates
  const handleEdit = async (id, updates) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updates }),
      });
      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? { ...user, ...updates } : user))
        );
        setEditingUser(null);
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle toggling admin status
  const handleToggleAdmin = async (id, currentAdminStatus) => {
    try {
      const response = await fetch("/api/users/toggle-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isAdmin: !currentAdminStatus }),
      });
      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? { ...user, publicMetadata: { ...user.publicMetadata, role: currentAdminStatus ? "user" : "admin" } }
              : user
          )
        );
      } else {
        alert("Failed to update admin status");
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="table-auto w-full shadow-md bg-white rounded border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Photo</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Admin</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t text-center">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">
                  <img src={user.imageUrl} alt="User" className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.emailAddresses[0]?.emailAddress}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleToggleAdmin(user.id, user.publicMetadata?.role === "admin")}
                    className={`px-2 py-1 rounded ${
                      user.publicMetadata?.role === "admin" ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {user.publicMetadata?.role === "admin" ? "Admin" : "User"}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Editing Modal */}
      {editingUser && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-2">
              <label>ID:</label>
              <input
                type="text"
                value={editingUser.id}
                disabled
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label>First Name:</label>
              <input
                type="text"
                value={editingUser.firstName}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Last Name:</label>
              <input
                type="text"
                value={editingUser.lastName}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Username:</label>
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Image URL:</label>
              <input
                type="text"
                value={editingUser.imageUrl}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
                className="border px-2 py-1 w-full"
              />
            </div>
            <button
              onClick={() =>
                handleEdit(editingUser.id, {
                  firstName: editingUser.firstName,
                  lastName: editingUser.lastName,
                  username: editingUser.username,
                  imageUrl: editingUser.imageUrl,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

