import React, { useState, useEffect } from 'react';

import './about.css';


function About() {


	return (
	<div className="AboutPage">
		<div className="AboutImage">
			{/* <img src="/Images/image11.png" alt="Background Image 11" />*/}
		</div>
		<div className="AboutText">
			<header className ="About-header">
			About
			</header>
			<p className="developed">Developed By Matt V., Sahil B., Jami B., Chase H., Ryan D</p>
			<main>
			<div className="AboutContainer">
				<div className="BackgroundDiv">      
					<h4 className = "AboutH4">Background</h4>
						<p>
							Sports Analytics is a rapidly growing field, and is projected to continue growing in value in the next decade. Data analysis is increasingly applicable across all levels of sports- in international tournaments, major leagues, down to minor leagues and college athletics. It is also applicable for every participant: on teams, players, scouts, coaches, and managers all benefit from data that is both comprehensive and easily understandable. There is also benefit to companies in the broader sports world; sports commentators and sports betting companies both increasingly rely on analytics, for example. Fans also stand to benefit from getting a comprehensive view of players and teams. 
						</p>
				</div>	
				<div className="ValueDiv">	
					<h4 className= "AboutH4">Project Value</h4>
						<p>
							With an increasing need for good data, modern data collection methods are finally catching up to the level necessary for high-level analytics. What started as manual tracking has turned into granular location data available for every player on the field at sub-second intervals. This kind of data is still relatively hard to access, both because few teams have fully adopted it and because most of the data is not publicly available. Event location data is a good middle ground that is easier to find in free databases, but can still provide a good perspective on the momentum of a game. 
						</p>
				</div>
			</div>
			<div className="ImageContainer">	
				<div className="SampleImage">
					{/* <img src="/Images/image12.png" alt="Background Image 12" />*/}
				</div>
			</div>
			<div className="MoreInfo">
				<div className="Technology">
					<h4 className = "AboutH4">Back-End</h4>
						<p>The technology that was used for the back-end was MongoDB and python</p>
				</div>
				<div className="Database">
					<h4 className = "AboutH4">Front-End</h4>
						<p>The frontend used react js to display different webpages and data</p>
				</div>
				<div className="Sources">
					<h4 className = "AboutH4">Sources</h4>
						<p>The website collected data from statsbomb</p>
				</div>
			</div>
			</main>
		</div>

	  </div>
	  );

}

export default About;