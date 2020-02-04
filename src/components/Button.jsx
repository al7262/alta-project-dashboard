import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const Button = props => {
  return (
    <React.Fragment>
      <div className="col-12 text-right pt-4 pr-0">
        <Link className="btn btn-tambah" to={props.direction}>
          {props.buttoncontent}
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Button;
