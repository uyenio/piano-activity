import { expect } from 'chai';
import * as actions from '../actions/keys';
import reducer, { INITIAL_STATE } from './note';

describe('note reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  it('should return isFetching with true', () => {
    expect(
      reducer(undefined, {
        type: actions.FETCH_NOTE
      })
    ).to.have.property('isFetching', true);
  });

  it('should return currentNote with data', () => {
    expect(
      reducer(undefined, {
        type: actions.FETCH_NOTE_SUCCESS,
        payload: {
          data: 'test'
        }
      })
    ).to.have.property('currentNote', 'test');
  });

  it('should return reportResult with data', () => {
    expect(
      reducer(undefined, {
        type: actions.GET_REPORT_SUCCESS,
        payload: {
          data: {
            reportResult: 'test'
          }
        }
      })
    ).to.have.property('reportResult', 'test');
  });
});
