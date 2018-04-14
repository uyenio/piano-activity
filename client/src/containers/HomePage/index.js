import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Notification from 'react-notification-system';
import Piano from '../../components/Piano';
import {
  fetchNote,
  checkAnswer,
  replaySong,
  playNextSong
} from '../../actions/note';

import './index.less';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReport: false
    };
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    this.handlePlayNextSong = this.handlePlayNextSong.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
    this.handleShowReport = this.handleShowReport.bind(this);
  }

  componentDidMount() {
    const { location, currentNote } = this.props;
    const prevLocation =
      location.length > 2 ? location[location.length - 2] : {};
    if (prevLocation.pathname === '/result' || !isEmpty(currentNote)) {
      return;
    }
    this._fetchNote();
  }

  handleReplay() {
    this._replaySong();
  }

  handlePlayNextSong() {
    this._playNextSong();
  }

  handleShowReport(e) {
    this.props.push('/result');
  }

  handleCheckAnswer(octave, keyNames) {
    if (this._isSongEnded()) {
      return;
    }
    const { checkAnswer } = this.props;
    checkAnswer(keyNames).then((data) => {
      if (data) {
        this._notification.addNotification({
          message: 'Correct',
          level: 'success',
          uid: 1
        });
        this._fetchNote();
      } else {
        this._notification.addNotification({
          message: 'Incorrect',
          level: 'error',
          uid: 2
        });
      }
    });
  }

  _isSongEnded = () => {
    const { currentNote: { note, songId } } = this.props;
    return songId !== -1 && !note;
  };

  _fetchNote = () => {
    const { fetchNote } = this.props;
    fetchNote()
      .then(({ note, songId }) => {
        if (songId !== -1 && !note) {
          this._notification.clearNotifications();
          this._notification.addNotification({
            message: 'You have completed the song. Well done!',
            level: 'success',
            uid: 3
          });
        }
      })
      .catch(error => console.log('=== fetchNote error ===: ', error));
  };

  _playNextSong = () => {
    const { playNextSong } = this.props;
    playNextSong().catch(error =>
      console.log('=== playNextSong error ===: ', error)
    );
  };

  _replaySong = () => {
    const { replaySong, currentNote: { songId } } = this.props;
    replaySong(songId).catch(error =>
      console.log('=== replaySong error ===: ', error)
    );
  };

  _formatNote(note) {
    return note.replace('#', '♯').replace('b', '♭');
  }

  _renderButtons = () => {
    const isDisabled = !this._isSongEnded();
    return (
      <div>
        <button onClick={this.handleReplay}>Replay</button>
        <button onClick={this.handlePlayNextSong}>Play Next Song</button>
        <button disabled={isDisabled} onClick={this.handleShowReport}>
          Show Report
        </button>
      </div>
    );
  };

  render() {
    const { currentNote, isFetching, error } = this.props;
    return (
      <div>
        <header className="header">
          {error ? `An error occurred: ${error}` : null}
          {isFetching && <div className="header__loading">loading...</div>}
          {!isEmpty(currentNote) && (
            <div>
              <p className="header__song-name">{currentNote.title}</p>
              <p>
                When a note appears below, play the corresponding note on the
                piano keyboard.
              </p>
              {currentNote.note && (
                <div className="header__note-name">
                  {this._formatNote(currentNote.note)}
                </div>
              )}
            </div>
          )}
        </header>
        <Piano numOctaves={3} onPress={this.handleCheckAnswer} />
        <br />
        {this._renderButtons()}
        <Notification
          ref={notification => (this._notification = notification)}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  fetchNote: PropTypes.func,
  checkAnswer: PropTypes.func,
  replaySong: PropTypes.func,
  playNextSong: PropTypes.func,
  push: PropTypes.func,
  currentNote: PropTypes.object,
  isFetching: PropTypes.bool,
  error: PropTypes.object,
  location: PropTypes.array
};

export default connect(
  ({ note: { currentNote, isFetching, error }, location }) => ({
    currentNote,
    isFetching,
    error,
    location
  }),
  { fetchNote, checkAnswer, replaySong, push, playNextSong }
)(HomePage);
