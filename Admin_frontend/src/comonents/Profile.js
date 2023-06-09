import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [adminData,setAdminData] =useState([])

  const fetchAdmin = async() =>{
    try {
      const resp = await axios.get(`http://localhost:5000/admins`)
      // console.log(resp)
      setAdminData(resp.data[0])
    } catch (error) {
      console.log("error in fetching admin", error)
    }
  }
  useEffect(()=>{
    fetchAdmin()
  },[])

  return (
    <>
      {/* HEADER */}

      <header id="main-header" class="py-2 bg-primary text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>
                <i class="fas fa-user"></i> Edit Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* ACTIONS */}
  <section id="actions" class="py-4 mb-4 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <a href="index.html" class="btn btn-light btn-block">
            <i class="fas fa-arrow-left"></i> Back To Dashboard
          </a>
        </div>
        <div class="col-md-3">
          <a href="#" class="btn btn-success btn-block">
            <i class="fas fa-lock"></i> Change Password
          </a>
        </div>
        <div class="col-md-3">
          <a href="#" class="btn btn-danger btn-block">
            <i class="fas fa-trash"></i> Delete Account
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* PROFILE */}
  <section id="profile">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div class="card">
            <div class="card-header">
              <h4>Edit Profile</h4>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" value={adminData.name}/>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" value={adminData.email}/>
                </div>
                <div class="form-group">
                  <label for="bio">Bio</label>
                  <textarea class="form-control" name="editor1" value={adminData.bio}></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <h3>Your Avatar</h3>
          <img src="Images/avatar.png" alt="" class="d-block img-fluid mb-3"/>
          <button class="btn btn-primary btn-block">Edit Image</button>
          <button class="btn btn-danger btn-block">Delete Image</button>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default Profile;
