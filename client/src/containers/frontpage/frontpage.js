import React, { Component, Fragment } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Blackscreen from "../../components/blackscreen/blackscreen";
import Card from "../../components/card/card";
import Loadedcard from "../../components/card/loadedcard";
import Feed from "../../components/feed/feed";
import classes from "./frontpage.module.css";

class Frontpage extends Component {
  state = {
    fetchedData: [],
    fullArticle: {},
    loading: false,
    modalLoading: false,
    showBlackscreen: false,
    showModal: false,
  };

  componentDidMount() {
    // this.getSession().then((res) => {
    //   if (res) {
    //     this.setState({ fetchedData: res });
    //   } else {
    //     this.loadData();
    //   }
    // });
    this.loadData();
  }
  // SET and GET sessions

  // setSession = (data) => {
  //   sessionStorage.setItem("mySession", JSON.stringify(data));
  // };

  // getSession = async () => {
  //   let data = sessionStorage.getItem("mySession");
  //   return await JSON.parse(data);
  // };
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
          contentEditing: false,
          contentLoading: false,
          details: [],
        });
      }
      this.setState({ fetchedData: newData, loading: false });
    });
  };

  // UTILS

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

  // Initiating feed card editing

  contentEditing = (id, value) => {
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.contentEditing = value;
    this.setState({ fetchedData: copiedState });
  };

  // Initiating feed card loading

  contentLoading = (id, value) => {
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.contentLoading = value;
    this.setState({ fetchedData: copiedState });
  };

  // Load

  loadDetails = (id) => {
    this.contentLoading(id, true);
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.loaded = true;

    if (selectedItem.categories) {
      Promise.all(
        selectedItem.categories.map((item) => {
          return this.linkHandler(item.$.domain).then((res) => {
            return {
              tag: item._ ? item._ : "Trends",
              body: res,
            };
          });
        })
      )
        .then((results) => {
          const output = this.linkHandler(selectedItem.link);
          return output.then((res) => {
            results.push({ tag: "Trends", body: res });
            return results;
          });
        })
        .then((results) => {
          selectedItem.details = results;
          this.setState({ fetchedData: copiedState });
          this.contentLoading(id, false);
        });
    } else {
      const output = this.linkHandler(selectedItem.link);
      output.then((res) => {
        selectedItem.details.push({ tag: "Trends", body: res });
        this.setState({ fetchedData: copiedState });
        this.contentLoading(id, false);
      });
    }
  };

  // Edit feed

  editFeed = (e, id) => {
    console.log(e.target.value);
    console.log(e.target.name);
    this.contentEditing(id, true);
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.detailedData.data[e.target.name] = e.target.value;
    this.setState({ fetchedData: copiedState });
  };

  saveEdit = (id) => {
    console.log("save");
    this.contentEditing(id, false);
  };

  // Remove Feed

  removeFeed = (id) => {
    const newList = this.state.fetchedData.filter((item) => item.guid !== id);
    this.setState({ fetchedData: newList });
    // this.setSession(newList);
  };

  // Handle full Article

  loadFullArticle = (title, id) => {
    this.setState({
      modalLoading: true,
      showModal: true,
      showBlackscreen: true,
    });
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    const load = async () => {
      for (let item in selectedItem.details) {
        if ((await selectedItem.details[item].body.title) === title) {
          return selectedItem.details[item];
        }
      }
    };
    load().then((res) => {
      console.log(res);
      this.setState({
        fullArticle: res,
        modalLoading: false,
      });
    });
  };

  closeFullArticle = () => {
    this.setState({
      showModal: false,
      showBlackscreen: false,
      fullArticle: {},
    });
  };

  render() {
    const modal = (
      <Fragment>
        <Modal
          loading={this.state.modalLoading}
          image={this.state.fullArticle.b}
          show={this.state.showModal}
          title={this.state.fullArticle.title}
          body={this.state.fullArticle.content}
          date={this.state.fullArticle.date_published}
          clicked={() => this.closeFullArticle()}
        />
        <Blackscreen
          show={this.state.showBlackscreen}
          clicked={() => this.closeFullArticle()}
        />
      </Fragment>
    );
    return (
      <div className={classes.container}>
        {modal}
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <h1>News Feed</h1>
            <button>sort</button>
          </div>
          <div
            className={
              this.state.loading ? classes.loadingScreen : classes.feed
            }
          >
            {this.state.loading ? (
              <Loader />
            ) : (
              <Feed
                fetchedData={this.state.fetchedData}
                saveEdit={this.saveEdit}
                editFeed={this.editFeed}
                loadFull={this.loadFullArticle}
                removeFeed={this.removeFeed}
                loadDetails={this.loadDetails}
              />
            )}
          </div>
          <div className={classes.footer}>
            <h1>2021</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Frontpage;
