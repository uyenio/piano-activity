import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goBack } from 'react-router-redux';
import Report from '../../components/Report';
import { getReport } from '../../actions/note';

import './index.less';

class ResultPage extends Component {
  componentWillMount() {
    this.props.getReport();
  }

  render() {
    const { reportResult } = this.props;
    return (
      <div>
        <div className="result__title">Performance Report</div>
        <Report reportResult={reportResult} showReport />
        <button onClick={() => this.props.goBack()}>Go Back</button>
      </div>
    );
  }
}

ResultPage.propTypes = {
  getReport: PropTypes.func,
  goBack: PropTypes.func,
  reportResult: PropTypes.array
};

export default connect(
  ({ note: { reportResult } }) => ({
    reportResult
  }),
  { getReport, goBack }
)(ResultPage);
