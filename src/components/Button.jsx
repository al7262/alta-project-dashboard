import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const Button = props => {
  return (
    <React.Fragment>
      {props.ismodal === "ya" ? (
        <Link
          className="btn btn-tambah"
          data-toggle="modal"
          data-target={props.modal}
        >
          {props.buttoncontent}
        </Link>
      ) : (
        <Link className={`btn btn-tambah btn-block`} to={props.direction}>
          {props.buttoncontent}
        </Link>
      )}
    </React.Fragment>
  );
};
export default Button;
