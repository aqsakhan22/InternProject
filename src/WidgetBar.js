import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
export default function WidgetBar(props) {
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "125", // Height of the chart
    dataFormat: "json", // Data type

    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]", //Set the chart caption

        xAxisName: "Country", //Set the x-axis name

        numberSuffix: "K",
        theme: "fusion", //Set the theme for your chart
        bgColor: "#2a2a2a"
      },
      // Chart Data - from step 2
      data: props.data
    }
  };
  return (
    <div>
      <div className="widgetWrap">
        <div className="widgetTitle">{props.title}</div>
        <div className="widgetValue">
          <ReactFC {...chartConfigs} />
        </div>
      </div>
    </div>
  );
}
