import React from 'react';
import "./landing2.css";

const Home = () => {
    return (
        <div className="landing2">
            <div className="background-images">
                {/* <img src="/Images/image1.jpg" alt="Background Image 1" />
                <img src="/Images/image2.jpg" alt="Background Image 2" />
                <img src="/Images/image3.jpg" alt="Background Image 3" />
                <img src="/Images/image8.jpg" alt="Background Image 4" />
                <img src="/Images/image9.jpg" alt="Background Image 5" /> */}
            </div>
            <div className="center-text">
                <div className="content-box">
                    <h1 className="landingTitle">SoccerSphere</h1>
                    <p className="slogan">Changing the Game with Winning Ways</p>
                </div>
            </div>
            <div className="scroll-box">
                <div className="our-project">
                    <h2>Our Project</h2>
                    <p>Here is a brief paragraph about our project...</p>
                </div>
                <div className="logo-box">
                    {/* <img src='Images/logo.jpg' className="logo" /> */}
                </div>
            </div>
        </div>
    );
};

export default Home;