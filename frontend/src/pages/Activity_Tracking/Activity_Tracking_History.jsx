import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Header } from "../../components/Header";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";

export const Activity_Tracking_History = () => {
  const { id } = useParams();
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDay, setEditingDay] = useState(null);
  const [editForm, setEditForm] = useState({ progress: "", note: "" });

  useEffect(() => {
    fetchActivityData();
  }, [id]);

  const fetchActivityData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/activity_tracking/suggestion/${id}`
      );

      if (response.data.success) {
        // Sort days by day number
        const sortedDays = [...response.data.data.Day].sort(
          (a, b) => a.day - b.day
        );
        setDays(sortedDays);
      } else {
        setError("Failed to fetch activity data");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error fetching activity history"
      );
      console.error("Error fetching activity data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dayId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/api/activity_tracking/day/${dayId}`
        );

        if (response.data.success) {
          await Swal.fire(
            "Deleted!",
            "Your activity has been deleted.",
            "success"
          );
          fetchActivityData(); // Refresh data
        }
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to delete activity",
        "error"
      );
      console.error("Error deleting activity:", error);
    }
  };

  const startEditing = (day) => {
    setEditingDay(day._id);
    setEditForm({
      progress: day.progress,
      note: day.note,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelEditing = () => {
    setEditingDay(null);
    setEditForm({ progress: "", note: "" });
  };

  const handleUpdate = async (dayId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/activity_tracking/day/${dayId}`,
        editForm
      );

      if (response.data.success) {
        Swal.fire("Updated!", "Your activity has been updated.", "success");
        setEditingDay(null);
        fetchActivityData(); // Refresh data
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update activity",
        "error"
      );
      console.error("Error updating activity:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading activity history...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (days.length === 0) {
    return (
      <div className="p-4">No activity history found for this suggestion.</div>
    );
  }

  return (
    <div className="p-4">
      <Header />
      
      <div className="overflow-x-auto px-20">
      <h1 className="text-2xl font-bold mb-4">Activity Tracking History</h1>

        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-gray-500">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress (minutes)
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {days.map((day) => (
              <tr key={day._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Day {day.day}
                </td>

                {editingDay === day._id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="number"
                        name="progress"
                        value={editForm.progress}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-20 mx-auto block"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="text"
                        name="note"
                        value={editForm.note}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <button
                        onClick={() => handleUpdate(day._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {day.progress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {day.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <button
                        onClick={() => startEditing(day)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(day._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
