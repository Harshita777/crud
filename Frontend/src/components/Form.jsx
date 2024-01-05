import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: ""
    });
    const [formDataList, setFormDataList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const backendURL = "http://localhost:3005/users";
            await axios.post(backendURL, formData);

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                mobile: ""
            });

            fetchData();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3005/get/users");
            setFormDataList(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3005/users/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleEdit = (data) => {
        setFormData(data);
    };

    return (
        <div >
<>
    <div className="px-4">
        <h2 className="text-2xl font-bold mt-8 mb-4">Registered Data</h2>
       
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md table-auto mx-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((data) => (
                        <tr key={data._id} className="hover:bg-gray-100 transition">
                            <td className="py-2 px-4 border-b ">{data.firstName}</td>
                            <td className="py-2 px-4 border-b  ">{data.lastName}</td>
                            <td className="py-2 px-4 border-b ">{data.email}</td>
                            <td className="py-2 px-4 border-b ">{data.mobile}</td>
                            <td className="py-2 px-4 border-b ">
                                <button onClick={() => handleDelete(data._id)} className="text-red-500">
                                    Delete
                                </button>
                                <button onClick={() => handleEdit(data)} className="ml-2 text-blue-500">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    </div>
</>
<br />
            <br />
            <br />
            <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                        First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
                        Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;