import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';

class Report extends Component {
  static propTypes = {
    reportResult: PropTypes.array.isRequired,
    showReport: PropTypes.bool.isRequired
  };
  render() {
    const { reportResult, showReport } = this.props;
    const isShown = {
      display: showReport ? 'block' : 'none'
    };
    return (
      <div style={isShown}>
        <ReactTable
          data={reportResult}
          columns={[
            {
              Header: 'Note',
              accessor: 'note'
            },
            {
              Header: 'Correct',
              accessor: 'correct'
            },
            {
              Header: 'Incorrect',
              accessor: 'incorrect'
            }
          ]}
          defaultPageSize={17}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Report;
