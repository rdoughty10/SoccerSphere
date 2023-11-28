'''Contains main processing and queries from MongoDB'''
from pymongo import MongoClient
from bson.json_util import dumps

class Data:
    '''Class contains most major queries to access larger data and collections from MongoDB'''

    def __init__(self):
        self.client = MongoClient('mongodb+srv://svb24:soccersphere@soccersphere.wr8cfd3.mongodb.net/', 
                                    username='svb24',
                                    password='soccersphere')
        
        ## check if all databases exist
        dblist = self.client.list_database_names()
        if set(dblist) >= set(['matches', 'lineups', 'events', 'three-sixty']):
            print("MongoDB client connected")

        ## get the databases
        self.matches = self.client['matches']
        self.lineups = self.client['lineups']
        self.events = self.client['events']
        self.threesixty = self.client['three-sixty']

    def update_client(self):
        '''Updates the client and calls to update the databases'''
        self.client = MongoClient('mongodb+srv://svb24:soccersphere@soccersphere.wr8cfd3.mongodb.net/', 
                                    username='svb24',
                                    password='soccersphere')
        
        self.matches = self.client['matches']
        self.lineups = self.client['lineups']
        self.events = self.client['events']
        self.threesixty = self.client['three_sixty']
        
    def get_matches(self):
        '''returns all matches'''
        return self.matches['106'].find({}, {"_id": 0})

    def get_match(self, match_id):
        '''returns match document given a match id'''
        return self.matches['106'].find_one({"match_id": int(match_id)}, {"_id": 0})

    def get_lineups(self, match_id):
        '''return lineups (lineups are 2 documents per collection)'''
        return self.lineups[match_id].find({},{"_id": 0})

    def get_events(self, match_id, remove={}):
        '''return the events for a particular game (returns list of documents)'''
        return self.events[match_id].find({},{"_id": 0})
    
    def get_event_player_data(self, match_id):
        '''
            Returns event data with corresponding player location data in form
            {event_id: {event_info: {event_data}, player_locations: {1: {player_info}, 2: {player_info}}, event: ...}
        '''
        events = self.get_events(match_id, remove={})[:100]
        threesixty_data = self.get_threesixty(match_id) 
        player_event_data = {}
        for event in events:
            player_event_data[event['id']] = {}
            player_event_data[event['id']]['event_data'] = event
        for threesixty in threesixty_data:
            event_id = threesixty['event_uuid']
            try: ## try except just in case event_id not in event (issue when limiting the events to first 100)
                player_event_data[event_id]['location_data'] = threesixty['freeze_frame']
            except:
                continue
        return player_event_data

    def get_threesixty(self, match_id):
        '''return the three sixty data for a particular game'''
        return self.threesixty[match_id].find({},{"_id": 0})
    
    def get_passes(self, match_id):
        '''gets passes from a particular game'''
        return self.events[match_id].find({"pass": { '$exists': True }},{"_id": 0})
    
    def get_pass_locations(self, match_id):
        '''returns all passes and the locations along with it'''
        passes = self.get_passes(match_id)
        threesixty_data = self.get_threesixty(match_id) 
        passes_data = {}
        for pass_event in passes:
            passes_data[pass_event['id']] = {}
            passes_data[pass_event['id']]['event_data'] = pass_event
        for threesixty in threesixty_data:
            event_id = threesixty['event_uuid']
            try: ## try except just in case event_id not in event (issue when limiting the events to first 100)
                passes_data[event_id]['location_data'] = threesixty['freeze_frame']
            except:
                continue
        return passes_data
    
    
    def get_complete_passes(self, match_id):
        '''gets complete passes from a particular game'''
        return self.events[match_id].find({"pass": { '$exists': True }, "pass.outcome": {'$exists': False}}, {"_id": 0})
    
    def get_complete_pass_locations(self, match_id):
        '''Gets complete passes and returns the locations along with it'''
        complete_passes = self.get_complete_passes(match_id)
        threesixty_data = self.get_threesixty(match_id) 
        passes_data = {}
        for pass_event in complete_passes:
            passes_data[pass_event['id']] = {}
            passes_data[pass_event['id']]['event_data'] = pass_event
        for threesixty in threesixty_data:
            event_id = threesixty['event_uuid']
            try: ## try except just in case event_id not in event (issue when limiting the events to first 100)
                passes_data[event_id]['location_data'] = threesixty['freeze_frame']
            except:
                continue
        return passes_data
    
    def get_line_breaking_passes(self, match_id):
        '''(INCOMPLETE) calculates line breaking passes for a game and returns those events'''
        
        complete_passes = self.get_complete_passes(match_id)
        threesixty_data = self.get_threesixty(match_id) 
        passes_data = {}
        for pass_event in complete_passes:
            passes_data[pass_event['id']] = {}
            passes_data[pass_event['id']]['event_data'] = pass_event
        for threesixty in threesixty_data:
            event_id = threesixty['event_uuid']
            try: ## try except just in case event_id not in event (issue when limiting the events to first 100)
                passes_data[event_id]['location_data'] = threesixty['freeze_frame']
            except:
                continue
            
        
        locations = {}
        linebreaking_ids = []
        for id, event in passes_data.items():
                        
            initial_ball_location = event["event_data"]["location"]
            end_location = event["event_data"]["pass"]['end_location']
            if 'location_data' in event:
                opponent_locations = []
                for player in event["location_data"]:
                    if player["teammate"] is False:
                        initx, inity = initial_ball_location
                        finx, finy = end_location
                        playerx, playery = player["location"]
                        ylim_min, y_lim_max = min([inity, finy]) - 40, min([inity, finy]) + 40 ## range of y players that could be split by the pass of the ball (have to be within 40 yards of ball)
                        
                        ## only passes of greater than 10 yards forward
                        if initx + 10 < finx:
                            ## filter locations
                            if playerx > initx and playerx < finx and playery > ylim_min and playery < y_lim_max:
                                opponent_locations.append([playerx, playery])
                                
                if len(opponent_locations) >= 2:
                    locations[id] = {}
                    locations[id]['initial'] = initial_ball_location
                    locations[id]['end'] = end_location
                    locations[id]['opponents'] = opponent_locations
                    linebreaking_ids.append(id)
                    
        ## filter the passes by event id
        line_breaking_passes = {id: event for id, event in passes_data.items() if id in linebreaking_ids}
        
        return line_breaking_passes
        