'''Contains main processing and queries from MongoDB'''
from pymongo import MongoClient

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

    def get_match(self, match_id):
        '''returns match document given a match id'''
        return self.matches['106'].find({"match_id": match_id})[0]

    def get_lineups(self, match_id):
        '''return lineups (lineups are 2 documents per collection)'''
        return self.lineups[match_id]

    def get_events(self, match_id):
        '''return the events for a particular game (returns list of documents)'''
        return self.events[match_id]

    def get_threesixty(self, match_id):
        '''return the three sixty data for a particular game'''
        return self.threesixty[match_id]
    