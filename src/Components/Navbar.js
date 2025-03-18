import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        
        <nav className="navbar navbar-expand-lg bg-dark">
          
          <div className="container-fluid">
            <Link className="navbar-brand" style={{color: 'white'}} to="/#">&#x1D510; Media Mingle</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" style={{color: 'white'}}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                <a className="nav-link" style={{color: 'white'}} aria-current="page" href="/">&#128246;Home</a>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/business">&#127861;Business</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/entertainment">&#128247;Entertainment</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/general">&#127757;General</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/health">&#127808;Health</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/science">&#128029;Science</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/sports">&#9917;Sports</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" style={{color: 'white'}} to="/technology">&#127909;Technology</Link>
                </li>

              </ul>

            </div>
          </div>
        </nav>
      </div>
    )
  }
}