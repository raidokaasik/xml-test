import React, { Component } from "react";
import {} from "react-router-dom";
import axios from "axios";
import classes from "./frontpage.module.css";

class Frontpage extends Component {
  state = {
    fetchedData: [],
    loading: false,
    contentLoading: false,
    detailedData: [],
  };

  componentDidMount() {
    this.getSession().then((res) => {
      if (res) {
        this.setState({ fetchedData: res });
      } else {
        this.loadData();
      }
    });
  }
  // SET and GET sessions

  setSession = (data) => {
    sessionStorage.setItem("mySession", JSON.stringify(data));
  };

  getSession = async () => {
    let data = sessionStorage.getItem("mySession");
    return await JSON.parse(data);
  };
  // Fetch initial data from Back-end API

  loadData = () => {
    this.setState({ loading: true });
    const promise = new Promise((resolve, reject) => {
      axios({
        url: "/feed",
        method: "GET",
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    promise.then((data) => {
      const newData = [];
      for (let item in data.data) {
        newData.push({
          ...data.data[item],
          loaded: false,
          contentLoading: false,
          detailedData: {},
        });
      }
      this.setState({ fetchedData: newData, loading: false });
    });
  };

  linkHandler = async (link) => {
    return await axios
      .post("/details", { payload: link })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log("Server error:" + e);
      });
  };

  contentLoading = (id, value) => {
    const copiedState = [...this.state.fetchedData];
    for (let item in copiedState) {
      if (copiedState[item].guid === id) {
        copiedState[item].contentLoading = value;
        console.log("Content is Loading: " + value);
      }
    }
    this.setState({ fetchedData: copiedState });
  };

  // Load

  loadDetails = (id) => {
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    this.contentLoading(id, true);
    const selectedItem = copiedState[index];
    selectedItem.loaded = true;
    const output = this.linkHandler(selectedItem.link);
    output.then((res) => {
      selectedItem.detailedData = {
        data: res,
      };
      this.setState({ fetchedData: copiedState });
      this.contentLoading(id, false);
      this.setSession(copiedState);
    });

    // this.contentLoading(id, true);
    // for (let item in copiedState) {
    //   if (copiedState[item].guid === id) {
    //     copiedState[item].loaded = true;
    //     let details = this.linkHandler(copiedState[item].link);
    //     details.then((res) => {
    //       copiedState[item].detailedData = {
    //         data: res,
    //       };
    //       this.contentLoading(id, false);
    //       this.setState({ fetchedData: copiedState });
    //       console.log(copiedState);
    //     });
    //   }
    // }
  };

  render() {
    const loading = <p>Loading...</p>;
    const feed = this.state.fetchedData.map((item, index) => {
      const details = item.detailedData.data;
      return !item.loaded ? (
        <div className={classes.card} key={index}>
          <button onClick={() => this.loadDetails(item.guid)}>Load</button>
          <p>{item.title}</p>
          <div className={classes.contentContainer}>BOX</div>
          <p>{item.content}</p>
        </div>
      ) : item.loaded ? (
        <div className={classes.card} key={index}>
          {item.contentLoading ? (
            loading
          ) : (
            <div>
              <img
                className={classes.image}
                src={details.lead_image_url}
                alt="feed_image"
              />
              <p>{details.title}</p>
              <p>{details.author}</p>
            </div>
          )}
        </div>
      ) : null;
    });

    return (
      <div className={classes.container}>
        <p>Feed:</p>
        <div className={classes.feed}>
          {this.state.loading ? loading : feed}
        </div>
      </div>
    );
  }
}

export default Frontpage;
