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
    YAxis
} from "recharts";
import "./Heatmap.scss";

const CustomTooltip = ({ name }) => {
    return (
    <div className="custom-tooltip">
        <p className="name">{`${name}`}</p>
    </div>
    );

    return null;
};

export default class Heatmap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            vertical: window.innerWidth <= 500,
            scale: window.innerWidth <= 500 ? 4.5 : 5
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
            return [locations, locations1];
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
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Heatmap" data={data[0]} fill="#FF0000"/>
                <Scatter name="Heatmap" data={data[1]} fill="#0000FF"/>
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