'use strict';

import React from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import {Tabs, Tab} from "material-ui/Tabs";
import SpreadRadialChart from "../components/SpreadRadialChart.jsx";
import {scaleTime} from "d3-scale";

//import { ChartCanvas, Chart, series, axes, helper } from "react-stockcharts";

class Charts extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            backgroundColor: this.context.muiTheme.palette.primary2Color
        };

        return (
            <Grid>
                <Row center="xs">
                    <Col xs={6}>
                        <SpreadRadialChart symbol="USDRUB"/>
                    </Col>
                    <Col xs={6}>
                        <SpreadRadialChart symbol="EURRUB"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>

                    </Col>
                </Row>
            </Grid>
        );
    }
}

Charts.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Charts;
