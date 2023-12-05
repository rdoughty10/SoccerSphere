import React from "react";
import FilterForm from "../FilterForm";
import "./DashboardContainer.scss";
import Heatmap from "../Heatmap"
import { Cookies } from 'react-cookie';
import Joyride from "react-joyride";
import { ToastContainer, Zoom, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.cookies = new Cookies();

        this.state = {
            events: [],
            selectedEvent: [],
            filter: null, 
            match: null,
            matchData: [],
            homeTeam: null,
            awayTeam: null,
            matches: null,
            showJoyride: this.cookies.get('visitedBefore') !== true,
        };
        this.setMatch = this.setMatch.bind(this);
        this.setEvents= this.setEvents.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setMatch = async (match) => {
        console.log(match)
        console.log(this.state.filter)
        
        if (match == null) {
            this.setState({
                events: [],
                selectedEvent: [],
                filter: null, 
                matchData: [],
                homeTeam: null,
                awayTeam: null,
            })
            return;
        } else if (this.state.match != match) {
            this.setState({
                events: [],
                selectedEvent: []
            })
        }

        this.setState({
            match,
            homeTeam: match.home_team.home_team_name,
            awayTeam: match.away_team.away_team_name
        });
        if (match) {
            let res = await fetch(`/event_players/${match.match_id}`);
            if (this.state.filter == "Passes") {
                res = await fetch(`/event_players/${match.match_id}/Pass`)
            } else if (this.state.filter == "Shots") {
                res = await fetch(`/event_players/${match.match_id}/Shot`)
            } else if (this.state.filter == "Pressures") {
                res = await fetch(`/event_players/${match.match_id}/Pressure`)
            } else if (this.state.filter == "Duels") {
                res = await fetch(`/event_players/${match.match_id}/Duel`)
            } else if (this.state.filter == "Carries") {
                res = await fetch(`/event_players/${match.match_id}/Carry`)
            } else if (this.state.filter == "Ball Recoveries") {
                res = await fetch(`/event_players/${match.match_id}/Ball_Recovery`)
            } else if (this.state.filter == "Line-Breaking Passes") {
                res = await fetch(`/linebreaking/${match.match_id}`)
            } else if (this.state.filter == "Receipts in Space") {
                res = await fetch(`/ballreceipts/${match.match_id}`)
            } else if (this.state.filter == "Goals") {
                res = await fetch(`/goals/${match.match_id}`)
            }
            const events = await res.json();
            console.log(events)
            let data = [];
            for (var i in events) {
                if (events[i]['location_data'] != null) {
                    data.push(events[i])   
                }
            } 
            console.log(data);
            data.sort(function(a, b) {
                var keyA = a.event_data.timestamp;
                var keyB = b.event_data.timestamp;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });


            this.setState({
                events: data
            });
        }

    }

    setEvents = (selectedEvent) => {
        let data = [];
        for (var i in selectedEvent) {
            data.push(selectedEvent[i])
        } 
        console.log(data);
        this.setState({
            selectedEvent: data
        });
    }

    setFilter = async (selectedFilter) => {
        console.log(selectedFilter)
        
        this.setState({
            filter: selectedFilter
        });
        console.log(this.state.filter)
        this.setMatch(this.state.match)

        switch (selectedFilter){
            case "Goals":
                toast.info('The shots that resulted in goals, with teams color coded. Best to examine what types of shots were most used and most successful.');
                break;
            case "Shots":
                toast.info('All shots on goal, regardless of whether they resulted in a goal or not. Best to understand the nature of a team’s shots- where they come from, which of theirs tend to be successful, and more.');
                break;
            case "Passes":
                toast.info('All passes are accounted for, no matter the result (incomplete, intercepted, out of play). Best to examine a team’s style or where a team is vulnerable during the run of play.');
                break;
            case "Pressures":
                toast.info('Tracks every time a player applies pressure to an opposing player. Used to visualize how a team presses, in a high-press, mid-block, or low block.');
                break;
            case "Duels":
                toast.info('The moments when a player and an opposing player challenge for the ball simultaneously. Best to examine the aggressiveness of a team.');
                break;
            case "Carries":
                toast.info('Actions that are defined by dribbling the ball towards the opposition goal, also used to understand a team’s style of play or pressing tactics.');
                break;
            case "Ball Recoveries":
                toast.info('Where a player recovers a ball in a situation where neither team has possession or when the ball has been directly to him by an opponent.');
                break;
            case "Line-Breaking Passes":
                toast.info('Passes that intersect a pair of defenders in a line of the opposing team’s formation, traveling towards the goal and has a length of at least 10 yards. Best to understand where teams are successful in breaking down defensive blocks or which areas are vulnerable.');
                break;
            case "Receipts in Space":
                toast.info('Receipts in Space is a series of metrics that record the number of ball receipts with a defender within a range of 0-2, 2-5, 5-10 or 10 or more yards of the ball receiver.');
                break;
            default:
        }
    }


    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        const res = await fetch('/matches/');
        const matches = await res.json();

        let data = [];
        for (var i in matches) {
            data.push(matches[i])
        } 

        await this.setStateAsync({ matches: data });
    }

    render() {
        console.log("RENDERING WHOLE DASHBOARD");
        console.log(this.state.homeTeam)
        console.log(this.state.awayTeam)
        const matches = this.state.matches;
        if (matches == null) {
            return
        }

        const steps = [
            {
                target: "#MatchSelector",
                content: "Please Select a match",
                disableBeacon: true,
                spotlightClicks: true
            },
            {
                target: "#EventFilter",
                content: "Please Select an Event Type",
                spotlightClicks: true
            },
            {
                target: "#EventsSelector",
                content: "Please Select an Event",
                spotlightClicks: true
            }
        ];

        return (
            <>
                <ToastContainer
                position="bottom-right"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                limit={5}
                transition={Zoom}
                toastStyle={{backgroundColor: "green"}}
                />
                {this.state.showJoyride && (
                    <Joyride
                        steps = {steps}
                        continuous = {true}
                        showProgress = {true}
                        showSkipButton = {true}
                        disableOverlayClose = {true}
                        styles={{
                            options: {
                                arrowColor: '#e3ffeb',
                                backgroundColor: '#e3ffeb',
                                overlayColor: 'rgba(0, 0, 0, 0.5)',
                                primaryColor: '#000',
                                textColor: '#004a14',
                                width: undefined,
                                zIndex: 1000,
                            }
                        }}
                        callback={() => {
                            this.cookies.set('visitedBefore', true);
                        }}
                    />
                )}
                <div className="dashboardContainer">
                    <h4 className="title">{matches && matches[0] && matches[0].competition ? matches[0].competition.competition_name : ""}</h4>
                    <h6 className="subTitle">Season: {matches && matches[0] && matches[0].season ? matches[0].season.season_name : ""}</h6>
                    <FilterForm
                        matches={matches}
                        setMatch={this.setMatch}
                        events={this.state.events}
                        setEvents={this.setEvents}
                        setFilter={this.setFilter}
                    />
                    { this.state.events ?
                        <div>
                            <div className="chartGrid">
                                <div className="bx--grid">
                                    <div className="bx--row">
                                    {this.state.selectedEvent ?
                                        this.state.selectedEvent.slice(0, 1).map(events => (
                                            <div className="bx--col">
                                                <Heatmap 
                                                    data={this.state.selectedEvent}
                                                    homeTeam={this.state.homeTeam}
                                                    awayTeam={this.state.awayTeam}
                                                />
                                            </div>)) : <div /> 
                                    }
                                    </div>
                                </div>
                            </div>
                        </div> : <div/>
                    }   
                </div>
            </>    
        );
    }
}