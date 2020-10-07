import React, { Component } from "react";
import "./dashboard.css";
import { Col, Row, Container } from "react-bootstrap";
import WidgetText from "./WidgetText";

import WidgetBar from "./WidgetBar";
import WidgetDoughnut from "./WidgetDoughnut";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSourceViews: null,
      directSourceViews: null,
      referralSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sourceArr: [],
      userArr: []
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let organicSourceViews = 0;
    let directSourceViews = 0;
    let referralSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let selectedValue = null;
    let sourceArr = [];
    let userArr = [];

    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSourceViews = arr[i].organic_source;
        directSourceViews = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referrel Source",
            value: arr[i].referral_source
          }
        );
        userArr.push(
          {
            label: "User",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
      }
    }
    selectedValue = arg;

    this.setState(
      {
        organicSourceViews: organicSourceViews,
        directSourceViews: directSourceViews,
        referralSource: referralSource,
        pageViews: pageViews,
        users: users,
        newUsers: newUsers,
        sourceArr: sourceArr,
        userArr: userArr
      },
      () => {
        console.log(this.state.organicSourceViews);
      }
    );
  };
  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () => {
      console.log(this.state.users);
    });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        console.log(rows);

        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }
  render() {
    // const chartData = [
    //     {
    //       label: "Venezuela",
    //       value: "290"
    //     },
    //     {
    //       label: "Saudi",
    //       value: "260"
    //     },

    //     {
    //       label: "Iran",
    //       value: "140"
    //     },
    //     {
    //       label: "Russia",
    //       value: "115"
    //     },
    //     {
    //       label: "UAE",
    //       value: "100"
    //     },

    //   ];
    //   const options = [
    //     'search'
    //   ];
    //   const defaultOption = options[0];

    return (
      <div>
        {/* <WidgetText title={'Title'} value={120} desc={'some data0'} />
              <WidgetText title={'Title1'} value={121} desc={'some data1'} />
              <WidgetText title={'Title2'} value={122} desc={'some data2'} />
             
              <WidgetBar title={'widget Title'} data={chartData} />
              <WidgetDoughnut title={'widget Title'} data={chartData} /> */}
        <Container className="TopHeader" fluid>
          <Row>
            <Col>Dashboard</Col>
            <Col className="dropdown">
              {" "}
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container className="MainDashboard" fluid>
          <Row>
            <Col>
              {" "}
              <WidgetText
                title={"Organic Source"}
                value={this.state.organicSourceViews}
              />
            </Col>
            <Col>
              {" "}
              <WidgetText
                title={"directSourceViews"}
                value={this.state.directSourceViews}
              />
            </Col>
            <Col>
              {" "}
              <WidgetText
                title={"referralSource"}
                value={this.state.referralSource}
              />
            </Col>
            <Col>
              {" "}
              <WidgetText title={"pageViews"} value={this.state.pageViews} />
            </Col>
            <Col>
              {" "}
              <WidgetText title={"users"} value={this.state.users} />
            </Col>
            <Col>
              {" "}
              <WidgetText title={"newUsers"} value={this.state.newUsers} />
            </Col>
            <Col>
              {" "}
              <WidgetBar title={"Comparision"} data={this.state.sourceArr} />
            </Col>
          </Row>
        </Container>
        <Container className="MainDashboard" fluid>
          <Row>
            <Col>
              {" "}
              <WidgetDoughnut title={"Users"} data={this.state.userArr} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
