import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    avata: "",  // Link ảnh danh mục
  });
  const [image, setImage] = useState(null); // Dùng để lưu trữ ảnh tải lên
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = "https://localhost:7033/api/Category";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(apiUrl)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Cập nhật ảnh tải lên
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra nếu có ảnh tải lên, thực hiện upload ảnh trước khi tạo danh mục
    let avataUrl = form.avata;
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const res = await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        avataUrl = res.data.imageUrl; // Lấy URL ảnh sau khi upload
      } catch (err) {
        console.error("Upload ảnh thất bại:", err);
        return;  // Dừng nếu upload ảnh thất bại
      }
    }

    const categoryData = { ...form, avata: avataUrl };

    if (isEditing) {
      // Sửa danh mục
      axios.put(`${apiUrl}/${form.id}`, categoryData)
        .then(() => {
          fetchCategories(); // Cập nhật lại danh sách danh mục
          alert("Danh mục đã được cập nhật thành công!");
          resetForm();
        })
        .catch(err => {
          console.error(err);
          alert("Cập nhật danh mục thất bại!");
        });
    } else {
      // Tạo mới danh mục
      axios.post(apiUrl, categoryData)
        .then(() => {
          fetchCategories(); // Cập nhật lại danh sách danh mục
          alert("Danh mục đã được tạo mới thành công!");
          resetForm();
        })
        .catch(err => {
          console.error(err);
          alert("Tạo danh mục thất bại!");
        });
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      avata: "",
    });
    setImage(null); // Reset ảnh đã chọn
    setIsEditing(false);
  };

  const handleEdit = (category) => {
    setForm(category);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      axios.delete(`${apiUrl}/${id}`)
        .then(() => fetchCategories())
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
        <div className='basis-1/2'>
          <h1 className='text-3xl uppercase text-green-800'>QUẢN LÝ DANH MỤC</h1>
        </div>
        <div className='basis-1/2 text-right'>
          <Link to="/admin/category/create" className="text-sm ml-2">Tạo mới</Link>
          <Link to="/admin/category/trash" className="text-sm ml-2">Trash</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-100 p-6 rounded-lg">
        <div>
          <label className="block mb-1 font-medium">Tên danh mục</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên danh mục"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Link ảnh (Avatar)</label>
          <input
            type="text"
            name="avata"
            value={form.avata}
            onChange={handleChange}
            placeholder="Link ảnh danh mục"
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block mb-1 font-medium">Hoặc tải ảnh lên</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
          >
            {isEditing ? "Cập nhật" : "Tạo mới"}
          </button>
          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-3 border rounded-lg">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="border px-4 py-2 w-9">#</th>
              <th className="border px-4 py-2 w-28">Hình ảnh</th>
              <th className="border px-4 py-2 w-40">Tên danh mục</th>
              <th className="border px-4 py-2 w-56">Chức năng</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories && categories.length > 0 && categories.map((category, index) => {
              return (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2 text-center">{category.id}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center">
                      <img
                        src={`https://localhost:7033/Images/${category.avata}`} 
                        alt={category.name}
                        className="w-full h-full object-contain transition-transform duration-300 transform hover:scale-110"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      <FaTrashAlt className="text-sm" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500">Chưa có danh mục nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
