import React from "react";
import TeamsFilterForm from "../TeamsFilterForm";
import "./TeamsDashboardContainer.scss";
import TeamsHeatmap from "../TeamsHeatmap"

export default class TeamsDashboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            filter: null, 
            team: null,
            team_id: null,
            eventType: null,
            homeTeam: null,
            awayTeam: null,
            teams: null,
            teams_id: null
        };
        this.setEventTypes = this.setEventTypes.bind(this);
        this.setTeam = this.setTeam.bind(this);
        this.setEvents= this.setEvents.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setTeam = async (team) => {
        
        this.setState({
            team
        });
        
        let data = [];
        console.log(this.state.eventType)
        if (team && this.state.filter && this.state.eventType){
            let res;
            if (this.state.filter == "Passes"){
                res = await fetch(`/event_players_team/${team}/Pass/${this.state.eventType}`);
            } else if (this.state.filter == "Shots"){
                res = await fetch(`/event_players_team/${team}/Shot/${this.state.eventType}`);
            } else if (this.state.filter == "Goals"){
                res = await fetch(`/team_goals/${team}/${this.state.eventType}`);
            } else if (this.state.filter == "Line-Breaking Passes"){
                res = await fetch(`/linebreaking_by_team/${team}/${this.state.eventType}`)
            }

            const events = await res.json();
            for (var i in events) {
                data.push(events[i])
            }
            
        }        

        console.log(data)
        this.setState({
            events: data
        });


    }

    setEventTypes = async (selectedEventType) => {
        this.setState({ eventType: selectedEventType }, () => {
            this.setTeam(this.state.team)
        });
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
        this.setState({filter: selectedFilter}, () => { 
            console.log(this.state.filter)
            this.setTeam(this.state.team)
        });
        
    }


    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        const res = await fetch('/teams/');
        const teams = await res.json();

        let data = [];
        
        for (var i in teams) {
            data.push(parseInt(i))
        } 

        console.log(data)
        console.log(teams)

        await this.setStateAsync({ 
            teams: data,
            teams_id: teams
        });
    }

    render() {
        const teams = this.state.teams;
        if (teams == null) {
            return
        }
        return (
            <div className="dashboardContainer">
                {/* <h4 className="title">{matches && matches[0] && matches[0].competition ? matches[0].competition.competition_name : ""}</h4>
                <h6 className="subTitle">Season: {matches && matches[0] && matches[0].season ? matches[0].season.season_name : ""}</h6> */}
                <TeamsFilterForm
                    teams={teams}
                    setTeam={this.setTeam}
                    events={this.state.events}
                    setEventTypes={this.setEventTypes}
                    setEvents={this.setEvents}
                    setFilter={this.setFilter}
                    teams_id={this.state.teams_id}
                />
                { this.state.events.length > 0 ?
                    <div>
                        <div className="chartGrid">
                            <div className="bx--grid">
                                <div className="bx--row">
                                    <div className="bx--col">
                                        <TeamsHeatmap 
                                            data={this.state.events}
                                            team={this.state.team}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <div/>
                }   
            </div>
        );
    }
}