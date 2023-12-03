import React from "react";
import "./about2.css";

const About = () => {
  return (
    <div className="about-container">
        <div className="about-segment">
            <div className="left-content">
            <h2>The Motivation</h2>
            <p>
                Explain the motivation of the project.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...

            </p>
            </div>
        </div>
      <div className="about-segment">
        <div className="left-content">
          <h2>The Data</h2>
          <p>
            Explain where the data is from and what it is.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </p>
        </div>
        <div className="statsBomb-image">
          {/* <img src="path/to/statsbomb-logo.png" alt="StatsBomb Logo" /> */}
        </div>
      </div>

      <div className="about-segment">
        <div className="dataArch-image">
          {/* <img src="path/to/statsbomb-logo.png" alt="Data Architecture" /> */}
        </div>
        <div className="right-content">
          <h2>The Architecture</h2>
          <p>
            Explain the data architecture of the project.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </p>
        </div>
      </div>

      <div className="about-segment">
        <div className="left-content">
          <h2>The Features</h2>
          <p>
            Explain what features are incorporated.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </p>
        </div>
        <div className="right-content">
          <img src="path/to/statsbomb-logo.png" alt="Probably no image" />
        </div>
      </div>

      <div className="about-segment">
        <div className="left-content">
          <h2>The Contributors</h2>
          <p>
            Explain us. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </p>
        </div>
        <div className="logo-image">
          {/* <img src="path/to/statsbomb-logo.png" alt="StatsBomb Logo" /> */}
        </div>
      </div>

      {/* Repeat the above structure for other segments */}
      
    </div>
  );
};

export default About;
