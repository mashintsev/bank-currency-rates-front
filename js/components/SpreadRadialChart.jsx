'use strict';


import axios from 'axios';
import React from 'react';
import {RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts';
import MDSpinner from 'react-md-spinner';
import Time from 'react-time'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const colors = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658'
]

class SpreadRadialChart extends React.Component {

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
    axios.get('api/rates/charts/' + symbol + '/spread').then(function (response) {
      var data = response.data.map(function(d, index) {
        d.fill = colors[index];
        return d;
      });
      that.setState({
        data: data
      });
    })
    .catch(error => console.log(error));
  }

  render() {

    const style = {
    	top: 0,
    	left: 350,
    	lineHeight: '24px'
    };

    const containerStyle = {
      height: 300,
      padding: 5
    };

    var content;
    if ( !this.state.data ) {
       // Note that you can return false it you want nothing to be put in the dom
       // This is also your chance to render a spinner or something...
       content =  (
         <MDSpinner size={100} />
       )
    } else {
      content = (
        <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={this.state.data}>
          <RadialBar minAngle={15} label background clockWise={true} dataKey='value'/>
          <Tooltip/>
          <Legend iconSize={10} width={200} height={140} scaleToFit={true} layout='vertical' verticalAlign='middle' align='left' wrapperStyle={style}/>
        </RadialBarChart>
      )
    }

    return (
      <Paper zDepth={1} rounded={false} style={containerStyle}>
        <h3>Величина спреда {this.props.symbol}</h3>
        {content}
    </Paper>
    );
  }
}

export default SpreadRadialChart;
