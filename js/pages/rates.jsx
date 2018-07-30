'use strict';

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RateTable from '../components/RateTable.jsx';

class Rates extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundColor: this.context.muiTheme.palette.primary2Color
    };

    return (
      <div>
        <Tabs tabItemContainerStyle={style}>
          <Tab label="USD" >
            <RateTable symbol="USDRUB" />
          </Tab>
          <Tab label="EUR" >
            <RateTable symbol="EURRUB" />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Rates.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Rates;
