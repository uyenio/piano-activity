from copy import deepcopy

class Song:
    def __init__(self, songs=[]):
        self.songs = songs
        self.report_result = [
            {
                'note': 'C',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'C#',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'Db',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'D',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'D#',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'Eb',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'E',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'F',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'F#',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'Gb',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'G',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'G#',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'Ab',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'A',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'A#',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'Bb',
                'correct': 0,
                'incorrect': 0
            },
            {
                'note': 'B',
                'correct': 0,
                'incorrect': 0
            }
        ]
        self.current_playing_note = ''
        self.current_playing_song = {'songId': -1, 'title': '', 'notes': []}

    def song_setup(self):
        if self.current_playing_note == '' and not self.current_playing_song['notes']:
            self.clear_report()
            self.play_new_song()

    def check_note(self, notes):
        return self.current_playing_note in notes

    def update_report(self, result):
        self.current_report_note = None
        for report_note in self.report_result:
            if report_note['note'] == self.current_playing_note:
                self.current_report_note = report_note
        if self.current_report_note and result == True:
            self.current_report_note['correct'] += 1
        elif self.current_report_note and result == False:
            self.current_report_note['incorrect'] += 1

    def clear_report(self):
        for report_note in self.report_result:
            report_note['correct'] = 0
            report_note['incorrect'] = 0

    def replay_song(self, song_id):
        song_index = -1
        for index, song in enumerate(self.songs):
            if song['songId'] == song_id:
                song_index = index
                break
        self.current_playing_song = self.songs.pop(song_index)
        if self.current_playing_song:
            self.songs.insert(0, deepcopy(self.current_playing_song))
            self.current_playing_note = self.current_playing_song['notes'].pop(0)
        return self.get_payload()

    def play_new_song(self):
        self.current_playing_song = self.songs.pop()
        self.songs.insert(0, deepcopy(self.current_playing_song))

    def fetch_note(self):
        if self.current_playing_song['notes']:  # play current note
            self.current_playing_note = self.current_playing_song['notes'].pop(0)
        else:  # end of song
            self.current_playing_note = ''
        return self.get_payload()

    def get_payload(self):
        return {'songId': self.current_playing_song['songId'], 'title': self.current_playing_song['title'], 'note': self.current_playing_note}
