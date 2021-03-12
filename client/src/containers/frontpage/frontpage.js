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
    myFeed: [],
    pushingInProgress: false,
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
    this.setState({ pushingInProgress: true });
    const copiedState = [...this.state.fetchedData];
    let myFeedCopy = [...this.state.myFeed];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.loaded = true;
    if (selectedItem.categories) {
      Promise.all(
        selectedItem.categories.map(async (item) => {
          return this.linkHandler(item.$.domain).then((res) => {
            myFeedCopy = [
              ...myFeedCopy,
              {
                tag: item._ ? item._ : "Trends",
                body: res,
                id: id + Math.floor(Math.random() * 100),
                isModal: false,
              },
            ];
          });
        })
      )
        .then(async () => {
          const output = this.linkHandler(selectedItem.link);
          return output.then((res) => {
            myFeedCopy = [
              ...myFeedCopy,
              {
                tag: "Trends",
                body: res,
                id: id + Math.floor(Math.random() * 100),
                isModal: false,
              },
            ];
          });
        })
        .then(() => {
          this.setState({ myFeed: myFeedCopy, pushingInProgress: false });
          this.contentLoading(id, false);
        });
    } else {
      const output = this.linkHandler(selectedItem.link);
      output.then((res) => {
        myFeedCopy.push({ tag: "Trends", body: res, id: id, isModal: false });
        this.setState({ myFeed: myFeedCopy, pushingInProgress: false });
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

  loadFullArticle = (id) => {
    console.log("load full article");
    this.setState({
      modalLoading: true,
    });
    const copiedState = [...this.state.myFeed];
    Promise.all(copiedState.filter((item) => item.id === id))
      .then((res) => {
        this.setState({
          fullArticle: {
            author: res[0].body.author,
            title: res[0].body.title,
            id: res[0].id,
            tag: res[0].tag,
            content: res[0].body.content,
            date: res[0].body.date_published
              ? res[0].body.date_published
              : res[0].body.date,
            image: res[0].body.lead_image_url,
            url: res[0].body.url,
            exceprt: res[0].body.exceprt,
          },
        });
      })
      .then(() => {
        console.log(this.state.fullArticle);
        console.log("finished");
        this.setState({
          modalLoading: false,
          showModal: true,
          showBlackscreen: true,
        });
      });
  };

  closeFullArticle = () => {
    this.setState({
      fullArticle: {},
      showModal: false,
      showBlackscreen: false,
    });
  };

  render() {
    const initialData = this.state.fetchedData.map((item, index) => {
      return (
        <div
          className={item.loaded ? classes.dataDisabled : classes.data}
          key={index}
        >
          {this.state.pushingInProgress ? null : (
            <div className={classes.deleteEditOverlay}>
              <button
                onClick={() => this.loadDetails(item.guid)}
                disabled={item.loaded}
              >
                Add
              </button>
            </div>
          )}

          {item.contentLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <p>{item.title}</p>
              <p>
                {item.author
                  ? item.author
                  : item.creator
                  ? item.creator
                  : "Anonymous"}
              </p>
              <p>{item.pubDate}</p>
            </Fragment>
          )}
        </div>
      );
    });
    const myFeed = this.state.myFeed.map((item, index) => (
      <Loadedcard
        key={index}
        tag={item.tag}
        // submit={() => saveEdit(item.guid)}
        // editing={item.contentEditing}
        // edit={(e) => editFeed(e, item.guid)}
        image={item.body.lead_image_url}
        title={item.body.title}
        author={item.body.author ? item.body.author : "Anonymous"}
        loadFull={() => this.loadFullArticle(item.id)}
        // remove={() => removeFeed(item.guid)}
        date={
          item.body.date_published ? item.body.date_published : "date unknown"
        }
      />
    ));

    // MODAL
    const full = this.state.fullArticle;
    const modal = (
      <Fragment>
        <Modal
          tag={full.tag}
          image={full.image}
          loading={this.state.modalLoading}
          show={this.state.showModal}
          title={full.title}
          body={full.exceprt}
          date={full.date}
          author={full.author}
          content={full.content}
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
        {this.state.showModal && !this.state.modalLoading ? modal : null}
        <div className={classes.initialFeedWrapper}>
          <div className={classes.header}>
            <h1>News Feed</h1>
            <button>sort</button>
          </div>
          <div className={classes.initialFeed}>
            {this.state.loading ? <Loader /> : initialData.sort()}
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <h1>My Feed</h1>
            <button>sort</button>
          </div>
          <div className={classes.feed}>{myFeed}</div>
          <div className={classes.footer}>
            <h1>2021</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Frontpage;
