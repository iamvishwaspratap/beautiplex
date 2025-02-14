import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="mt-5">
          <ul>
            <li className="py-2 hover:bg-blue-700 px-3 rounded cursor-pointer">Dashboard</li>
            <li className="py-2 hover:bg-blue-700 px-3 rounded cursor-pointer">Users</li>
            <li className="py-2 hover:bg-blue-700 px-3 rounded cursor-pointer">Shops</li>
            <li className="py-2 hover:bg-blue-700 px-3 rounded cursor-pointer">Bookings</li>
            <li className="py-2 hover:bg-blue-700 px-3 rounded cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md rounded">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">150</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Total Shops</h3>
            <p className="text-2xl font-bold">30</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-2xl font-bold">500</p>
          </div>
        </section>

        {/* Users Table */}
        <section className="mt-6 bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-3">Users List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">John Doe</td>
                <td className="border p-2">john@example.com</td>
                <td className="border p-2">Customer</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
