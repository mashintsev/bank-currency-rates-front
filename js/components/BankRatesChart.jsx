'use strict';


import axios from 'axios';
import MDSpinner from 'react-md-spinner';
import Paper from 'material-ui/Paper';
import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, helper } from "react-stockcharts";

var { BarSeries, LineSeries, AreaSeries, ScatterSeries, CircleMarker, SquareMarker, TriangleMarker } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;

var { OHLCTooltip } = tooltip;
var { XAxis, YAxis } = axes;
var { fitWidth } = helper;

const colors = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658'
]

class BankRatesChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadRates(this.props.symbol);
  }

  loadRates(symbol) {
    this.setState({rates: undefined});
    let that = this;
    axios.get('api/rates/charts/' + symbol + '/ratesHistory')
    .then(function (response) {
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
          <ChartCanvas ratio={1} height={400}
  					margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
  					type="hybrid"
  					pointsPerPxThreshold={1}
  					seriesName="Rates"
  					data={this.state.data}
  					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}>

          <Label x={(width - margin.left - margin.right) / 2} y={30}
					       fontSize="30" text="История {this.props.symbol}" />
  				<Chart id={1}>
  					<XAxis axisAt="bottom" orient="bottom"/>
  					<YAxis
  						axisAt="right"
  						orient="right"
  						// tickInterval={5}
  						// tickValues={[40, 60]}
  						ticks={5}
  					/>
  					<MouseCoordinateX
  						at="bottom"
  						orient="bottom"
  						displayFormat={timeFormat("%Y-%m-%d")} />
  					<MouseCoordinateY
  						at="right"
  						orient="right"
  						displayFormat={format(".2f")} />

  					<LineSeries
  						yAccessor={d => d.AAPLClose}
  						stroke="#ff7f0e"
  						strokeDasharray="Dot" />
  					<ScatterSeries
  						yAccessor={d => d.AAPLClose}
  						marker={SquareMarker}
  						markerProps={{ width: 6, stroke: "#ff7f0e", fill: "#ff7f0e" }} />
  					<LineSeries
  						yAccessor={d => d.GEClose}
  						stroke="#2ca02c" />
  					<ScatterSeries
  						yAccessor={d => d.GEClose}
  						marker={TriangleMarker}
  						markerProps={{ width: 8, stroke: "#2ca02c", fill: "#2ca02c" }} />
  					<LineSeries
  						yAccessor={d => d.close}
  						strokeDasharray="LongDash" />
  					<ScatterSeries
  						yAccessor={d => d.close}
  						marker={CircleMarker}
  						markerProps={{ r: 3 }} />
  					<OHLCTooltip forChart={1} origin={[-40, 0]}/>
  				</Chart>

  				<CrossHairCursor />
  			</ChartCanvas>
      )
    }

    return (
      <Paper zDepth={1} rounded={false} style={containerStyle}>
        {content}
      </Paper>
    );
  }
}

BankRatesChart = fitWidth(BankRatesChart);
export default BankRatesChart;
