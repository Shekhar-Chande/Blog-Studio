import React from "react";
import "./Banner.css";
import bannerImage from "../../../src/assets/banner.jpg";

function Banner() {
  return (
    <>
      <div className="banner-container">
        <div className="banner">
          <div className="banner-content">
            <p>Your Guide to Modern Living</p>
            <span className="tag">Building a Brighter Future, One Post at a Time</span>
          </div>
          <div className="banner-image">
            <img src={bannerImage} alt="" />
          </div>
        </div>
      </div>

        <div className="banner-bottom">
            <p>Blogs of the week</p>    
        </div>

    </>
  );
}

export default Banner;
