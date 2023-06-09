import React from 'react'
import { NavLink } from 'react-router-dom'

const Settings = () => {
  return (
    <>
    {/* HEADER */}
    <header id="main-header" className="py-2 bg-primary text-white">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h1>
          <i className="fas fa-cog" /> Settings
        </h1>
      </div>
    </div>
  </div>
</header>


  {/* ACTIONS */}
  <section id="actions" className="py-4 mb-4 bg-light">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <NavLink to="/" className="btn btn-light btn-block">
            <i className="fas fa-arrow-left" /> Back To Dashboard
          </NavLink>
        </div>
        <div className="col-md-3">
          <NavLink to="/" className="btn btn-success btn-block">
            <i className="fas fa-check" /> Save Changes
          </NavLink>
        </div>
      </div>
    </div>
  </section>


  
  {/* SETTINGS */}
  <section id="settings">
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h4>Edit Settings</h4>
            </div>
            <div className="card-body">
              <form>
                <fieldset className="form-group">
                  <legend>Allow User Registration</legend>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        defaultValue="Yes"
                        defaultChecked=""
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        defaultValue="No"
                      />{" "}
                      No
                    </label>
                  </div>
                </fieldset>
                <fieldset className="form-group">
                  <legend>Homepage Format</legend>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        defaultValue="posts"
                        defaultChecked=""
                      />{" "}
                      Blog Page
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        defaultValue="page"
                      />{" "}
                      Homepage
                    </label>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>




    </>
  )
}

export default Settings