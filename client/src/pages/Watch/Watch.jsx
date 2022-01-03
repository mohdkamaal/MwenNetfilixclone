import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Watch.scss";
function Watch() {
  const location = useLocation();
  const movie = location.movie;
  console.log(location);
  return (
    <div className="watch">
      <Link to="/" className="links">
        {" "}
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay={true}
        Progress
        controls
        src={movie?.video}
      />
    </div>
  );
}

export default Watch;
