'use strict';

import React from 'react';
import MDSpinner from 'react-md-spinner';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <a href="https://www.statuscake.com" title="Website Uptime Monitoring"><img src="https://app.statuscake.com/button/index.php?Track=nvvDPPo9lQ&Days=1000&Design=2" /></a>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
              <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="mashintsev"><a class="LI-simple-link" href='https://ru.linkedin.com/in/mashintsev?trk=profile-badge'>Ivan Mashintsev</a></div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Index;
