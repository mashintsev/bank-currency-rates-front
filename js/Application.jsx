'use strict';

import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from './themes/theme.js';

import {Grid, Row, Col} from 'react-flexbox-grid';
import myFlexStyle from './styles/myFlexStyle.scss';
import GoogleAd from 'react-google-ad'

import Header from './components/Header.jsx';
import MyDrawer from './components/MyDrawer.jsx';
import Footer from './components/Footer.jsx';


class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    VK.Widgets.Comments("vk_comments", {limit: 10, attach: "*"});
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(myTheme)};
  }


  _handleDrawerEvent(open) {
    this.setState({ open });
  }


  _handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }


  _handleClose() {
    this.setState({
      open: false
    })
  }

  render() {
    const { route } = this.props;
    const title = route.title || "Title"

    return (
      <div>
        <Header title={title} handleToggle={this._handleToggle.bind(this)}/>
        <Grid>
          <Row>
            <Col xs={12} >
              <GoogleAd client="ca-pub-3439940992967321" slot="2888869887" format="auto"  />
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              { this.props.children }
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              <div id="vk_comments"></div>
            </Col>
          </Row>
        </Grid>
        <MyDrawer
          handleClose={this._handleClose.bind(this)}
          handleToggle={this._handleToggle.bind(this)}
          handleDrawerEvent={this._handleDrawerEvent.bind(this)}
          open={this.state.open}
        />
        <Footer hidden={true} />
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Application;
