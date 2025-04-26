import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { FaEdit, FaSave } from "react-icons/fa";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import GlobalStyle from "../../assets/Prototype/GlobalStyle";
import Swal from "sweetalert2";

export const DisplayResourceAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resource_management/getResource/${id}`
        );
        setResource(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching resource:", err);
        setError("Failed to load resource. Please try again later.");
      }
    };
    fetchResource();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSave = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/resource_management/updateResource/${id}`,
      formData
    );
    setResource(formData);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Resource details updated successfully.",
      confirmButtonColor: "#005457",
    });
  } catch (err) {
    console.error("Error updating resource:", err);
    setError("Failed to update resource. Please try again.");

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#005457",
    });
  }
};


  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!resource) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Header />
      <main className="flex-grow mx-20">
        <div className={GlobalStyle.fontNunito}>
          <h1 className={`${GlobalStyle.headingLarge}`}>Resource Details</h1>
          <br />
          <div className={`${GlobalStyle.pageContainer} px-20 pt-8 mx-auto`}>
            <div className="min-h-screen py-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#005457]"
                  >
                    <MdArrowBack className="mr-2" size={20} />
                    Back to Resources
                  </button>
                  {isEditing ? (
                    <button
                    className={`${GlobalStyle.buttonPrimary} px-2 py-1 text-sm ml-auto`}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  ) : (
                    <button
                      className="rounded-full text-[#007579] hover:text-[#005457] hover:bg-[#AEDBD8] text-2xl p-3"
                      onClick={handleEdit}
                    >
                      <FaEdit title="Edit" />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {[
                    "title",
                    "description",
                    "content",
                    "auther_name",
                    "auther_designation",
                    "reference",
                  ].map((field) => (
                    <div key={field}>
                      <label className={GlobalStyle.headingSmall}>
                        {field.replace("_", " ").toUpperCase()}
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={field}
                          value={formData[field] || ""}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                          {resource[field] || "Not specified"}
                        </div>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className={GlobalStyle.headingSmall}>Images</label>
                    {resource.image && resource.image.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <img
                          src={`http://localhost:5000/uploads/${resource.image}`}
                          alt="Resource"
                          className="max-h-full max-w-full rounded object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        No images
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
