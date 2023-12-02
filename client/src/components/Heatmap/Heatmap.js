import React from "react";
import {
    ReferenceDot,
    ReferenceLine,
    ReferenceArea, 
    ScatterChart, 
    Scatter, 
    CartesianGrid, 
    Tooltip, 
    XAxis, 
    YAxis,
    Legend
} from "recharts";
import "./Heatmap.scss";

const RenderNoShape = (props)=>{ 
    return null; 
   }

export default class Heatmap extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)

        this.state = {
            locations: [],
            vertical: window.innerWidth <= 500,
            scale: window.innerWidth <= 500 ? 4.5 : 5,
            homeTeam: props.homeTeam,
            awayTeam: props.awayTeam,
        };

        this.renderScatterChart = this.renderScatterChart.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        const locations = this.getPositionalData(this.props.data);
        this.setState({
            locations,
        });
    }

    resize() {
        this.setState({
            vertical: window.innerWidth <= 500,
            scale: window.innerWidth <= 500 ? 4.5 : 5
        });
    }

    getPositionalData = (data) => {
        
        if (data.length > 1) {
            let playerLocations = data[1];
            let event_info = data[0];
            console.log(event_info)

            
            console.log(playerLocations);
            const locations = playerLocations.filter(evt => {
                return evt.teammate;
            }).map(evt => {
                return {
                    x: evt.location[0],
                    y: evt.location[1]
                }
            });
            const locations1 = playerLocations.filter(evt => {
                return !evt.teammate;
            }).map(evt => {
                return {
                    x: evt.location[0],
                    y: evt.location[1]
                }
            });
            console.log(locations)
            console.log(locations1)

            console.log(event_info.team.name)
            console.log(this.state.homeTeam)
            let info;
            if (event_info.team.name === this.state.homeTeam){
                info = [[this.state.homeTeam, locations], [this.state.awayTeam, locations1]];
            }else {
                for (let i = 0; i < locations.length; i++) {
                    locations[i]['x'] = 120 - locations[i]['x'];
                    locations[i]['y'] = 80 - locations[i]['y'];
                }
                for (let i = 0; i < locations1.length; i++) {
                    locations1[i]['x'] = 120 - locations1[i]['x'];
                    locations1[i]['y'] = 80 - locations1[i]['y'];
                }
                console.log('Change Directions')
                console.log(locations[0]['x'])
                
                info = [[this.state.homeTeam, locations1], [this.state.awayTeam, locations]];;
            }
            if (event_info.type.name == "Pass" ) {
                const start = {
                    x: event_info.location[0],
                    y: event_info.location[1]
                }
                const finish = {
                    x: event_info.pass.end_location[0],
                    y: event_info.pass.end_location[1]
                }
                if (event_info.team.name === this.state.awayTeam){
                    start['x'] = 120 - start['x']
                    start['y'] = 80 - start['y']
                    finish['x'] = 120 - finish['x']
                    finish['y'] = 80 - finish['y']
                }
                info.push([start, finish])

            } else if (event_info.type.name == "Shot") {
                const start = {
                    x: event_info.location[0],
                    y: event_info.location[1]
                }
                const finish = {
                    x: event_info.shot.end_location[0],
                    y: event_info.shot.end_location[1]
                }
                if (event_info.team.name === this.state.awayTeam){
                    start['x'] = 120 - start['x']
                    start['y'] = 80 - start['y']
                    finish['x'] = 120 - finish['x']
                    finish['y'] = 80 - finish['y']
                }
                info.push([start, finish])
            }
            return info
        }
        return data;
    }

    renderScatterChart = (data, scale) => (
        <div className="pitch">
            <ScatterChart
                width={120*scale}
                height={80*scale}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                {/* 
                    The following Reference components are used to draw the football pitch
                */}
                <ReferenceDot x={12} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Left Penalty Arc */}
                <ReferenceDot x={60} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Center Circle */}
                <ReferenceDot x={108} y={40} r={10*scale} stroke="black" fillOpacity={0}/> {/* Right Penalty Arc */}
                <ReferenceArea x1={0} x2={18} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Left Penalty Area */}
                <ReferenceArea x1={102} x2={120} y1={18} y2={80-18} fill="white" fillOpacity={1} stroke="black" /> {/* Right Penalty Area */}
                <ReferenceArea x1={0} x2={6} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Left 6-yard Box */}
                <ReferenceArea x1={114} x2={120} y1={30} y2={80-30} fill="white" fillOpacity={1} stroke="black" /> {/* Right 6-yard box */}
                <ReferenceDot x={60} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Centre Spot */}
                <ReferenceDot x={12} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Left Penalty Spot */}
                <ReferenceDot x={108} y={40} r={0.5*scale} fill="black" stroke="black"/> {/* Right Penalty Spot */}
                {
                    /* 
                        Map the various heat sectors as ReferenceAreas onto the pitch,
                        using `sector.count` to determine opacity
                    */
                }
                <CartesianGrid />
                <ReferenceLine x={60} stroke="black"/> {/* Center Half */}
                <ReferenceArea x1={0} x2={0.1} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Left Goal line */}
                <ReferenceArea x1={119.9} x2={120} y1={36} y2={80-36} fill="black" fillOpacity={1} stroke="black"/> {/* Right Goal line */}
                <ReferenceArea x1={0} x2={120} y1={0} y2={80} fillOpacity={0} stroke="black" /> {/* Pitch Outline */}
                <XAxis type="number" dataKey="x" hide domain={[0,120]}/>
                <YAxis type="number" dataKey="y" hide domain={[0,80]}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                <Legend />
                {data.length > 2 ? <ReferenceLine stroke="black" segment={data[2]}/> : <></>}
                <Scatter name={data[0][0]} data={data[0][1]} fill="#FF0000"/>
                <Scatter name={data[1][0]} data={data[1][1]} fill="#0000FF"/>
                
            </ScatterChart>
        </div>
    );

    render() {
        const { locations, scale } = this.state;
        console.log("rerendered");
        console.log(this.props.data)
        return (
            <div className="heatmap">
                { this.renderScatterChart(this.getPositionalData(this.props.data), scale) }
            </div>
        );
    }

}