import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/header.css";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from "../images/logo-light.svg";
import iconProfile from "../images/icon-profile.png";

const Header = props => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-blue justify-content-end">
        <Link className="navbar-brand d-lg-flex d-none" to="/">
          <img src={logo} alt="application-logo" style={{ height: "50px" }} />
          <span>EasyKachin'</span>
        </Link>
        <span id="header-location" className="d-lg-none d-block">
          {props.pageLocation}
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={props.handleTogglerNavbar}
        >
          <i
            className="material-icons"
            style={{ fontSize: "32px" }}
            id="navbarToggler"
          >
            menu
          </i>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 text-right pr-4">
            <li
              className={
                "nav-item " +
                (props.pageLocation === "Dashboard" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li
              className={
                "nav-item " + (props.pageLocation === "Laporan" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/">
                Laporan
              </Link>
            </li>
            <li
              className={
                "nav-item " + (props.pageLocation === "Produk" ? "active" : "")
              }
            >
              <Link
                className="nav-link"
                to="/product"
                onClick={props.handleBack}
              >
                Produk
              </Link>
            </li>
            <li
              className={
                "nav-item " +
                (props.pageLocation === "Inventaris" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/inventory">
                Inventaris
              </Link>
            </li>
            <li
              className={
                "nav-item " + (props.pageLocation === "Outlet" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/outlet">
                Outlet
              </Link>
            </li>
            <li
              className={
                "nav-item " +
                (props.pageLocation === "Pelanggan" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/customer">
                Pelanggan
              </Link>
            </li>
            <li
              className={
                "nav-item " +
                (props.pageLocation === "Karyawan" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/employee">
                Karyawan
              </Link>
            </li>
            <li
              className={
                "nav-item " + (props.pageLocation === "Promo" ? "active" : "")
              }
            >
              <Link className="nav-link" to="/">
                Promo
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav ml-lg-5">
            <li className="nav-item row">
              <h5 className="col-6">Hi, User</h5>
              <Link className="nav-link icon-profile col-6" to="/">
                <img src={iconProfile} alt="logo-profile" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default connect("", actions)(withRouter(Header));
