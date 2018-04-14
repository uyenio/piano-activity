/* global beforeAll */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import NotificationSystem from 'react-notification-system';
import Piano from '../../components/Piano';
import { HomePage } from './index';

describe('HomePage Container', () => {
  const fakeData = {
    songId: 1,
    title: 'ABC',
    note: 'A'
  };

  const fakeFetchNote = sinon.stub().resolves(fakeData);
  const fakeCheckAnswer = sinon.stub().resolves(true);
  const fakeReplaySong = sinon.stub().resolves(fakeData);
  const fakePlayNextSong = sinon.stub().resolves(fakeData);
  const fakePush = sinon.stub().resolves(true);

  const fakeProps = {
    currentNote: fakeData,
    isFetching: false,
    error: null,
    location: [],
    fetchNote: fakeFetchNote,
    checkAnswer: fakeCheckAnswer,
    replaySong: fakeReplaySong,
    push: fakePush,
    playNextSong: fakePlayNextSong
  };

  const spyAddNotification = sinon.stub();
  const spyClearNotifications = sinon.stub();

  HomePage.prototype._notification = {
    addNotification: spyAddNotification,
    clearNotifications: spyClearNotifications
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomePage {...fakeProps} />);
  });

  it('should render successfully', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
    expect(wrapper.find(Piano)).toHaveLength(1);
    expect(wrapper.find(NotificationSystem)).toHaveLength(1);
  });
});
