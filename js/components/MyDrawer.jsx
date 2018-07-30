'use strict';

import React from 'react';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';

const SelectableList = makeSelectable(List);

class MyDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }


  _handleClose(showMessage) {
    if (showMessage) {
      this._handleSnackbarTouchTap();
    }
    this.props.handleClose();
  }

  render() {

    const drawerNavStyle = {
      backgroundColor: this.context.muiTheme.palette.primary1Color
    }

    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.open}
          onRequestChange={(open) => this.props.handleDrawerEvent(open)}
        >
          <Toolbar style={drawerNavStyle}>
            <ToolbarTitle style={{color: this.context.muiTheme.palette.alternateTextColor}} text="" />
          </Toolbar>
            <SelectableList>
              <Link to="/" onClick={this._handleClose.bind(this, false)}
                style={{ textDecoration: "none" }}
                key="link-index"
                activeClassName="active"
              >
                <ListItem
                    primaryText="Главная"
                    initiallyOpen={true}
                    key="item/"
                  />
              </Link>
              <Link to="/ratesTable" onClick={this._handleClose.bind(this, false)}
                style={{ textDecoration: "none" }}
                key="link-rates-table"
                activeClassName="active"
              >
                <ListItem
                    primaryText="Таблица курсов"
                    initiallyOpen={true}
                    key="item/ratesTable"
                  />
              </Link>
              <Link to="/charts" onClick={this._handleClose.bind(this, false)}
                style={{ textDecoration: "none" }}
                key="link-charts"
                activeClassName="active"
              >
                <ListItem
                    primaryText="Графики"
                    initiallyOpen={true}
                    key="item/charts"
                  />
              </Link>
            </SelectableList>
        </Drawer>
      </div>
    );
  }
}

MyDrawer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default MyDrawer;
