import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div id="navbar">
      <div className="row">
        <div className="right-block col-sm-3">
          <h2>{props.user}</h2>
        </div>
        <div className="col-sm-6"></div>
        <div className="col-sm-3">
          <ul className="nav-list">
            <div className="nav-item">
              <li><Link to="/">
                <img src="https://s3.amazonaws.com/cloudhost-static/cloud-logo-white.svg"
                  height="30px" width="30px"
                />
              </Link></li>
            </div>
            <div className="nav-item">
              <li><Link to={`/edit/${props.user}/new`}>
                <img src="https://s3.amazonaws.com/cloudhost-static/contract.svg"
                  height="30px" width="30px"
                />
              </Link></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar