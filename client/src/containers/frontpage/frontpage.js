import React, { Component } from "react";
import {} from "react-router-dom";
import axios from "axios";

class Frontpage extends Component {
  state = {
    fetchedData: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    axios({
      url: "/feed",
      method: "GET",
    })
      .then((data) => {
        this.setState({ fetchedData: data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <p>Feed:</p>
      </div>
    );
  }
}

export default Frontpage;
