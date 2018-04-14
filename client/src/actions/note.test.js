import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import {
  fetchNote,
  playNextSong,
  replaySong,
  getReport,
  checkAnswer
} from './note';
import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  CHECK_ANSWER,
  CHECK_ANSWER_SUCCESS,
  REPLAY_SONG,
  REPLAY_SONG_SUCCESS,
  GET_REPORT,
  GET_REPORT_SUCCESS,
  PLAY_SONG,
  PLAY_SONG_SUCCESS
} from './keys';

const mockStore = configureMockStore([thunk]);
const URL = process.env.REACT_APP_BASE_URL;

describe('Note Actions', () => {
  let store;
  const mockResult = {
    songId: 1,
    title: 'ABC',
    note: 'B'
  };
  beforeEach(() => {
    store = mockStore({});
  });

  it('action: fetchNote success', (done) => {
    fetchMock.getOnce(`${URL}/note`, mockResult);
    const expectedActions = [
      { type: FETCH_NOTE },
      { type: FETCH_NOTE_SUCCESS, payload: { data: mockResult } }
    ];
    store.dispatch(fetchNote()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });

  it('action: playNextSong success', (done) => {
    fetchMock.getOnce(`${URL}/song`, mockResult);
    const expectedActions = [
      { type: PLAY_SONG },
      { type: PLAY_SONG_SUCCESS, payload: { data: mockResult } }
    ];
    store.dispatch(playNextSong()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });

  it('action: replaySong success', (done) => {
    fetchMock.getOnce(`${URL}/songs/1`, mockResult);
    const expectedActions = [
      { type: REPLAY_SONG },
      { type: REPLAY_SONG_SUCCESS, payload: { data: mockResult } }
    ];
    store.dispatch(replaySong(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });

  it('action: getReport success', (done) => {
    const mockResult = { reportResult: [] };
    fetchMock.getOnce(`${URL}/report`, mockResult);
    const expectedActions = [
      { type: GET_REPORT },
      { type: GET_REPORT_SUCCESS, payload: { data: mockResult } }
    ];
    store.dispatch(getReport()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });

  it('action: checkAnswer success', (done) => {
    const mockResult = 'true';
    fetchMock.postOnce(`${URL}/note`, mockResult);
    const expectedActions = [
      { type: CHECK_ANSWER },
      { type: CHECK_ANSWER_SUCCESS, payload: { data: Boolean(mockResult) } }
    ];
    store.dispatch(checkAnswer('B')).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });
});
