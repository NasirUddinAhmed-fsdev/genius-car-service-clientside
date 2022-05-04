import React from "react";
import error from "../../../Images/404-error.jpg";

const NotFound = () => {
  return (
    <div>
      <h2 className="text-primary text-center">Content Not Found</h2>
      <img className="w-100 mx-auto" src={error} alt="" />
    </div>
  );
};

export default NotFound;
