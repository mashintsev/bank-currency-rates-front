'use strict';


import axios from 'axios';
import React from 'react';
import MDSpinner from 'react-md-spinner';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Time from 'react-time'

class RateTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadRates(this.props.symbol);
  }

  loadRates(symbol) {
    // Make a request for vehicle data
    this.setState({rates: undefined});
    let that = this;
    axios.get('api/rates/' + symbol)
    .then(function (response) {
      that.setState({
        rates: response.data
      });
    })
    .catch(error => console.log(error));
  }

  render() {
    const columnStyle = {
      overflow: 'visible'
    };

    if ( !this.state.rates ) {
       // Note that you can return false it you want nothing to be put in the dom
       // This is also your chance to render a spinner or something...
       return (
         <Grid>
           <Row middle="xs" center="xs">
             <Col xs={12}>
               <MDSpinner size={100} />
             </Col>
           </Row>
         </Grid>
       )
    }

    const rows = this.state.rates.map((rate, i) => {
      return (
        <TableRow key={rate.bank} selectable={false}>
          <TableRowColumn>{rate.bank}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{rate.bid}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{rate.offer}</TableRowColumn>
          <TableRowColumn style={columnStyle}>{(rate.offer - rate.bid).toFixed(2)}</TableRowColumn>
          <TableRowColumn style={columnStyle}><Time value={rate.updatedAt} format="HH:mm:ss" /></TableRowColumn>
        </TableRow>
      )
    });

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn>Банк</TableHeaderColumn>
            <TableHeaderColumn>Покупка</TableHeaderColumn>
            <TableHeaderColumn>Продажа</TableHeaderColumn>
            <TableHeaderColumn>Спред</TableHeaderColumn>
            <TableHeaderColumn>Дата обновления</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { rows }
        </TableBody>
      </Table>
    );
  }
}

export default RateTable;
