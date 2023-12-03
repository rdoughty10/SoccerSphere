import React from "react";
import FilterForm from "../FilterForm";
import "./DashboardContainer.scss";
import Heatmap from "../Heatmap"

export default class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            selectedEvent: [],
            filter: null, 
            match: null,
            matchData: [],
            homeTeam: null,
            awayTeam: null,
            matches: null
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
        const matches = this.state.matches;
        if (matches == null) {
            return
        }
        return (
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
        );
    }
}