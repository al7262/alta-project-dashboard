import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const Button = props => {
  return (
    <React.Fragment>
      <Link className="btn btn-tambah" to={props.direction}>
        {props.buttoncontent}
      </Link>{" "}
    </React.Fragment>
  );
};
export default Button;
