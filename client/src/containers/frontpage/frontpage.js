import React, { Component } from "react";
import {} from "react-router-dom";
import axios from "axios";
import classes from "./frontpage.module.css";

class Frontpage extends Component {
  state = {
    fetchedData: [],
    loading: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });

    axios({
      url: "/feed",
      method: "GET",
    })
      .then((data) => {
        this.setState({ fetchedData: data.data, loading: false });
        console.log(this.state.fetchedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const loading = <p>Loading...</p>;
    const feed = this.state.fetchedData.map((item, index) => {
      return (
        <div className={classes.feedCard} key={item.guid}>
          <p>{item.title}</p>
          <p>{item.link}</p>
          <p>{item.content}</p>
        </div>
      );
    });

    return (
      <div>
        <p>Feed:</p>
        {this.state.loading ? loading : feed}
      </div>
    );
  }
}

export default Frontpage;
