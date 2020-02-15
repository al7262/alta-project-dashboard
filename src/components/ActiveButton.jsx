import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";
import "../styles/button.css";

const ActiveButton = props => {
  return (
    <React.Fragment>
      {props.ismodal === "ya" ? (
        <Link
          className="btn btn-active"
          data-toggle="modal"
          data-target={props.modal}
        >
          {props.buttoncontent}
        </Link>
      ) : (
        <Link className={`btn btn-active btn-block`} to={props.direction}>
          {props.buttoncontent}
        </Link>
      )}
    </React.Fragment>
  );
};
export default ActiveButton;