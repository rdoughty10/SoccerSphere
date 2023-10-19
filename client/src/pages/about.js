import React, { useState, useEffect } from 'react';

import './about.css';

function TextLoader({ fileName }) {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(fileName)
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.error('Error:', error));
  }, [fileName]);

  return (
      <p>{text}</p>
  );
}


function About() {

  return (
	<div className="App">
	<header class ="About-header">
	  About SoccerSphere
	</header>
	<p className="developed">Developed By Matt V., Sahil B., Jami B., Chase H., Ryan D</p>
	<main>      
	  <h4>Why SoccerSphere?</h4>
	  <TextLoader fileName = "method.txt"/>
	  <h4>Project Value</h4>
	  <TextLoader fileName = "value.txt"/>
	  <h4>Related Work</h4>
	  <TextLoader fileName = "related.txt"/>

	</main>
   
  </div>
  );
}

export default About;