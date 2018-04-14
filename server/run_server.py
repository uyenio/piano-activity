import os
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json
from song import Song

APP_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_FOLDER = os.path.join(APP_DIR, '../client/build/static')
TEMPLATE_FOLDER = os.path.join(APP_DIR, '../client/build/')

app = Flask(__name__, static_folder=STATIC_FOLDER,
            template_folder=TEMPLATE_FOLDER)
CORS(app)
songs = json.load(open('songs.json'))
song_obj = Song(songs)


@app.route('/')
def serve_app():
    return render_template('index.html')


@app.route('/note', methods=['GET', 'POST'])
def note():
    result = None
    if request.method == 'POST':
        notes = request.get_json()
        result = song_obj.check_note(notes)
        song_obj.update_report(result)
    else:
        song_obj.song_setup()
        result = song_obj.fetch_note()
    return jsonify(result)


@app.route('/songs/<int:song_id>', methods=['GET'])
def replay(song_id):
    song_obj.clear_report()
    result = song_obj.replay_song(song_id)
    return jsonify(result)


@app.route('/song', methods=['GET'])
def play_next_song():
    song_obj.clear_report()
    song_obj.play_new_song()
    return jsonify(song_obj.fetch_note())


@app.route('/report', methods=['GET'])
def report():
    return jsonify({'reportResult': song_obj.report_result})


if __name__ == "__main__":
    app.debug = True
    app.run(threaded=True)
