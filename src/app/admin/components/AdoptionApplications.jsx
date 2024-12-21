// src/app/admin/components/AdoptionApplications.jsx
import React, { useEffect, useState } from 'react';

const AdoptionApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(null); // Track loading state for each application

  useEffect(() => {
    // Fetch adoption applications
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/adoption-form');
        const data = await response.json();
        setApplications(data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleDecision = async (id, status) => {
    setLoading(id); // Set loading state for the current application
  
    try {
      // Update application status
      const response = await fetch('/api/adoption-form', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Update the application state with the new status
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === id ? { ...app, status } : app
          )
        );
  
        // Notify the user of success
        alert(`Application ${status === 'approved' ? 'approved' : 'disapproved'} successfully!`);
      } else {
        throw new Error(data.message || 'Failed to update application status.');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert(`Failed to update application status: ${error.message}`);
    } finally {
      setLoading(null); // Clear loading state
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/adoption-form', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setApplications((prevApplications) =>
          prevApplications.filter((app) => app._id !== id)
        );
        alert('Application deleted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete application: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Adoption Applications</h1>

      {applications.length > 0 ? (
        <table className="table-auto w-full bg-white shadow-md rounded border">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-3">Pet Name</th>
              <th className="px-4 py-3">Species</th>
              <th className="px-4 py-3">Breed</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id} className="border-t text-center">
                <td className="px-4 py-2 text-gray-700">{application.petName}</td>
                <td className="px-4 py-2 text-gray-700">{application.petSpecies}</td>
                <td className="px-4 py-2 text-gray-700">{application.petBreed}</td>
                <td className="px-4 py-2 text-gray-700">{application.name}</td>
                <td className="px-4 py-2 text-gray-700">{application.message}</td>
                <td className="px-4 py-2">
                  {application.status === 'approved' ? (
                    <span className="bg-green-500 text-white px-4 py-2 rounded">Approved</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDecision(application._id, 'approved')}
                        className={`${
                          loading === application._id
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white px-4 py-2 rounded mr-2`}
                        disabled={loading === application._id}
                      >
                        {loading === application._id ? 'Loading...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDecision(application._id, 'disapproved')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                      >
                        Disapprove
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(application._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No applications found.</p>
      )}
    </div>
  );
};

export default AdoptionApplications;
