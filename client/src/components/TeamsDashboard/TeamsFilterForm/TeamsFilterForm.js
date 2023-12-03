import React from "react";
import { ComboBox, Dropdown } from "carbon-components-react";
import "./TeamsFilterForm.scss";

export default class TeamsFilterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: null,
            filter: null,
            eventType: null,
            events: []
        }

        this.setTeam = this.setTeam.bind(this);
        this.setEventTypes = this.setEventTypes.bind(this);
        this.setEvents = this.setEvents.bind(this);
    }

    setTeam = (team) => {
        console.log(team)
        this.props.setTeam(team.selectedItem)
        this.setState({
            team: team.selectedItem
        });
    }

    setEventTypes = (eventType) => {
        this.setState({
            eventType: eventType.selectedItem
        });
        console.log(this.state.eventType)
        this.props.setEventTypes(eventType.selectedItem)
    }

    setEvents = (events) => {
        this.props.setEvents(null)
        this.props.setEvents(events.selectedItem)
        console.log(events.selectedItem)
        this.setState({
            events: events.selectedItem
        });
        console.log(this.props.events)
    }

    setFilter = (filter) => {
        this.setState({
            filter: filter.selectedItem
        });
        this.props.setFilter(filter.selectedItem)
        
    }

    render() {
        return (
            <div className = "filterForm">
                <ComboBox
                    id="TeamSelector"
                    title="Team:"
                    titleText="Team"
                    helperText="Select a team"
                    light 
                    items={this.props.teams}
                    itemToString={item => (item ? this.props.teams_id[item] : "")}
                    onChange={this.setTeam}
                />

                <ComboBox
                    id="ForAgainst"
                    title="Against"
                    titleText="For or Against:"
                    helperText="Filter the types of events"
                    light 
                    items={["For", "Against"]}
                    onChange={this.setEventTypes}
                />

                <ComboBox
                    id="EventFilter"
                    title="Event Type:"
                    titleText="Event Type:"
                    helperText="Filter the types of events"
                    light 
                    items={["Goals", "Shots", "Passes", "Line-Breaking Passes", "Receipts in Space"]}
                    onChange={this.setFilter}
                />
            </div>
        );
    }
}