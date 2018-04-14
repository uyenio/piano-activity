import {
  FETCH_NOTE,
  FETCH_NOTE_FAIL,
  FETCH_NOTE_SUCCESS,
  REPLAY_SONG,
  REPLAY_SONG_FAIL,
  REPLAY_SONG_SUCCESS,
  GET_REPORT_SUCCESS,
  PLAY_SONG,
  PLAY_SONG_FAIL,
  PLAY_SONG_SUCCESS
} from '../actions/keys';

export const INITIAL_STATE = {
  isFetching: false,
  error: null,
  currentNote: {},
  reportResult: []
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload = {} } = action;
  const { data, error } = payload;
  switch (type) {
    case FETCH_NOTE:
    case REPLAY_SONG:
    case PLAY_SONG:
      return { ...state, isFetching: true, error: null };
    case FETCH_NOTE_SUCCESS:
    case REPLAY_SONG_SUCCESS:
    case PLAY_SONG_SUCCESS:
      return { ...state, isFetching: false, currentNote: data };
    case FETCH_NOTE_FAIL:
    case REPLAY_SONG_FAIL:
    case PLAY_SONG_FAIL:
      return { ...state, isFetching: false, error };
    case GET_REPORT_SUCCESS:
      return { ...state, reportResult: data.reportResult };
    default:
      return state;
  }
}
