import {
  FETCH_NOTE,
  FETCH_NOTE_FAIL,
  FETCH_NOTE_SUCCESS,
  CHECK_ANSWER,
  CHECK_ANSWER_SUCCESS,
  CHECK_ANSWER_FAIL,
  REPLAY_SONG,
  REPLAY_SONG_FAIL,
  REPLAY_SONG_SUCCESS,
  GET_REPORT,
  GET_REPORT_FAIL,
  GET_REPORT_SUCCESS,
  PLAY_SONG,
  PLAY_SONG_FAIL,
  PLAY_SONG_SUCCESS
} from './keys';

const URL = process.env.REACT_APP_BASE_URL;

export function fetchNote() {
  return (dispatch) => {
    dispatch({ type: FETCH_NOTE });
    return fetch(`${URL}/note`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: FETCH_NOTE_SUCCESS, payload: { data } });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({ type: FETCH_NOTE_FAIL, payload: { error } });
        return Promise.reject(error);
      });
  };
}

export function playNextSong() {
  return (dispatch) => {
    dispatch({ type: PLAY_SONG });
    return fetch(`${URL}/song`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: PLAY_SONG_SUCCESS, payload: { data } });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({ type: PLAY_SONG_FAIL, payload: { error } });
        return Promise.reject(error);
      });
  };
}

export function replaySong(songId) {
  return (dispatch) => {
    dispatch({ type: REPLAY_SONG });
    return fetch(`${URL}/songs/${songId}`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: REPLAY_SONG_SUCCESS, payload: { data } });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({ type: REPLAY_SONG_FAIL, payload: { error } });
        return Promise.reject(error);
      });
  };
}

export function checkAnswer(answer) {
  return (dispatch) => {
    dispatch({ type: CHECK_ANSWER });
    return fetch(`${URL}/note`, {
      body: JSON.stringify(answer),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: CHECK_ANSWER_SUCCESS, payload: { data } });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({ type: CHECK_ANSWER_FAIL, payload: { error } });
        return Promise.reject(error);
      });
  };
}

export function getReport() {
  return (dispatch) => {
    dispatch({ type: GET_REPORT });
    return fetch(`${URL}/report`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: GET_REPORT_SUCCESS, payload: { data } });
        return Promise.resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_REPORT_FAIL, payload: { error } });
        return Promise.reject(error);
      });
  };
}
