import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const PostModal = () => {
  const { register } = useForm();
  const [getCategory, setCategory] = useState([]);
  const [postData, setPostData] = useState({
    pName: "",
    pPrice:"",
    category: "",
    pImage: "",
    pDescription: "",
   
    userId:localStorage.getItem("_id")
   
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPostData({ ...postData, [name]: value });
  };
  const handleImage = (e) => {
    setPostData({ ...postData, pImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("pName", postData.pName);
      formData.append("pPrice", postData.pPrice);
      formData.append("pImage", postData.pImage, postData.pImage.name);
      formData.append("pDescription", postData.pDescription);
      formData.append('category', postData.category)
      formData.append("userId", postData.userId)
      console.log("hello");

      const res = await axios.post("http://localhost:5000/products", formData);
      if (res.status === StatusCodes.CREATED) {
        // alert('post added successfully')
        toast.success("Post Added Successfully", {
          position: "top-center",
        });
        setPostData({ pName: "", pPrice: "", category: "", pImage: "", pDescription:"" });
      }

      console.log(res);
    } catch (error) {
      // alert(error.message)
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const getCategoryName = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categorys");
      console.log("res=>", res);

      // alert('post added successfully')
      setCategory(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCategoryName();
  }, []);
  return (
    <>
      <div class="modal fade" id="addPostModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">Add Post</h5>
              <button class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="title">Product Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={postData.pName}
                    name="pName"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="title">Product Price</label>
                  <input
                    type="text"
                    class="form-control"
                    value={postData.pPrice}
                    name="pPrice"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="category">Category</label>
                  <select 
                  className="form-control" 
                  onChange={handleChange} 
                  // {...register("CategoryId")}
                  name="category"
                  >
                    <option value=""> Select Category</option>
                    {getCategory.length &&
                      getCategory?.map((name) => (
                        <option key={name._id} value={name.category}>
                          {name.category}
                        </option>
                      ))}
                  </select>
                </div>
                <div class="form-group">
                  <label for="pImage">Upload Image</label>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="pImage"
                      name="pImage"
                      onChange={handleImage}
                    />
                    <label for="image" class="custom-file-label">
                      Choose File
                    </label>
                  </div>
                  <small class="form-text text-muted">Max Size 3mb</small>
                </div>
                <div class="form-group">
                  <label for="body">Description</label>
                  <textarea
                    class="form-control"
                    value={postData.pDescription}
                    name="pDescription"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostModal;
