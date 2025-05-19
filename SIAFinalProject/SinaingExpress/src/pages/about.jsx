import React, { useState } from 'react';
import Navbar from "./navbar";
import './about.css';

const About = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-flex">
          <div
            className="about-image-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/assets/clive1.webp"
              alt="About Me"
              className={`about-image ${hovered ? 'fade-out' : 'fade-in'}`}
              style={{ zIndex: hovered ? 1 : 2 }}
            />
            <img
              src="/assets/clive2.webp"
              alt="About Me Hover"
              className={`about-image ${hovered ? 'fade-in' : 'fade-out'}`}
              style={{ zIndex: hovered ? 2 : 1 }}
            />
          </div>
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              Hi! We are Team JDR, the creator of PixelPass. We are passionate about games, technology, and building seamless digital experiences. Our goal is to make game discovery and shopping fun, fast, and easy for everyone. Thanks for visiting!
            </p>
            <p>
              <b>Skills:</b> React, JavaScript, CSS, UI/UX, Game Design
            </p>
            <p>
              <b>Our Contact:</b> 
              renz09358@gmail.com
              johannsmain@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;