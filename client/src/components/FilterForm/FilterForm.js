import React from "react";
import { ComboBox, Dropdown } from "carbon-components-react";
import "./FilterForm.scss";

export default class FilterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: null,
            filter: null,
            events: []
        }

        this.setMatch = this.setMatch.bind(this);
    }

    setMatch = (match) => {
        this.props.setMatch(match.selectedItem)
        this.setState({
            match: match.selectedItem
        });
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
        console.log(filter.selectedItem)
        this.setState({
            filter: filter.selectedItem
        });
        console.log(this.state.filter)
        this.props.setFilter(filter.selectedItem)
        
    }

    render() {
        return (
            <div className = "filterForm">
                <ComboBox
                    id="MatchSelector"
                    title="Match:"
                    titleText="Match"
                    helperText="Select a match"
                    light 
                    items={this.props.matches}
                    itemToString={item => (item ? `${item.home_team.home_team_name} (${item.home_score}) vs ${item.away_team.away_team_name} (${item.away_score})` : "")}
                    onChange={this.setMatch}
                />

                <ComboBox
                    id="EventFilter"
                    title="Event Type:"
                    titleText="Event Type:"
                    helperText="Filter the types of events"
                    light 
                    items={["Goals", "Shots", "Passes", "Pressures", "Duels", "Carries", "Ball Recoveries", "Line-Breaking Passes", "Receipts in Space"]}
                    //itemToString={item => (item ? `${item.home_team.home_team_name} (${item.home_score}) vs ${item.away_team.away_team_name} (${item.away_score})` : "")}
                    onChange={this.setFilter}
                />

                <ComboBox
                    id="EventsSelector"
                    title="Events:"
                    titleText="Event"
                    helperText="Select an event"
                    light 
                    disabled={(!this.state.match && !this.props.events) || this.props.events.length === 0}
                    items={this.props.events}
                    itemToString={item => (item ? `(${item.event_data.timestamp}) ${item.event_data.type.name} (${item.event_data.team.name}) ` : "")}
                    onChange={this.setEvents}
                />
            </div>
        );
    }
}