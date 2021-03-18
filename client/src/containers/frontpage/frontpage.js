import React, { Component, Fragment } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Blackscreen from "../../components/blackscreen/blackscreen";
import Card from "../../components/card/card";
import Loadedcard from "../../components/card/loadedcard";
import Footprint from "../../components/footprint/footprint";
import contentLoading from "../../utils/contentLoading";
import urlParser from "../../utils/urlParser";
import MyFeedHeader from "../../components/headers/myfeedHeader/myFeedHeader";
import NewsHeader from "../../components/headers/newsHeader/newsHeader";
import classes from "./frontpage.module.css";

class Frontpage extends Component {
  state = {
    fetchedData: [],
    staticMyFeed: [],
    myFeed: [],
    pushingInProgress: false,
    fullArticle: {},
    loading: false,
    modalLoading: false,
    showBlackscreen: false,
    showModal: false,
    sortLatest: false,
    newsMenu: false,
  };

  componentDidMount() {
    this.getSession().then((res) => {
      if (res) {
        this.setState({ myFeed: res });
      }
    });
    this.loadData();
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
    promise
      .then((data) => {
        const newData = [];
        for (let item in data.data) {
          newData.push({
            ...data.data[item],
            contentLoading: false,
          });
        }
        this.setState({ fetchedData: newData, loading: false });
      })
      .catch((error) => console.log(error));
  };

  // UTILS

  // Initiating feed card editing

  contentEditing = (id, value) => {
    const copiedState = [...this.state.myFeed];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.id === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.contentEditing = value;
    this.setState({ myFeed: copiedState, staticMyFeed: copiedState });
    this.setSession(copiedState);
  };

  // Parse data and re-configure it

  loadDetails = (id) => {
    this.setState({
      fetchedData: contentLoading(id, true, this.state.fetchedData),
      pushingInProgress: true,
    });
    const copiedState = [...this.state.fetchedData];
    let myFeedCopy = [...this.state.myFeed];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.guid === id)[0]
    );
    let error = null;
    const selectedItem = copiedState[index];
    urlParser(selectedItem.link).then((res) => {
      if (!res.error)
        myFeedCopy.push({
          tag: "Trends",
          body: res,
          id: id,
          isModal: false,
          contentEditing: false,
          author: selectedItem.author,
          date: selectedItem.pubDate,
        });
      else {
        error = res.error;
      }
      this.setState({
        fetchedData: contentLoading(id, false, this.state.fetchedData, error),
        myFeed: myFeedCopy,
        staticMyFeed: myFeedCopy,
        pushingInProgress: false,
      });
      this.setSession(myFeedCopy);
    });
  };

  // load Subdetails

  loadSubDetails = (item, id, date) => {
    this.setState({
      fetchedData: contentLoading(id, true, this.state.fetchedData),
      pushingInProgress: true,
    });
    const copiedState = [...this.state.myFeed];
    urlParser(item.$.domain).then((res) => {
      if (!res.error)
        copiedState.push({
          tag: item._,
          body: res,
          isModal: false,
          contentEditing: false,
          id: id + Math.floor(Math.random() * 100),
          date: date,
        });
      this.setState({
        fetchedData: contentLoading(id, false, this.state.fetchedData),
        myFeed: copiedState,
        staticMyFeed: copiedState,
        pushingInProgress: false,
      });
      this.setSession(copiedState);
    });
  };

  // Edit feed

  editFeed = (e, id) => {
    this.contentEditing(id, true);
    const copiedState = [...this.state.myFeed];
    const index = copiedState.indexOf(
      copiedState.filter((item) => item.id === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.body[e.target.name] = e.target.value;
    this.setState({ myFeed: copiedState, staticMyFeed: copiedState });
    this.setSession(copiedState);
  };

  // Remove Feed

  removeFeed = (id) => {
    const copiedInitialState = [...this.state.fetchedData];
    const copiedState = this.state.myFeed.filter((item) => item.id !== id);

    this.setState({
      myFeed: copiedState,
      staticMyFeed: copiedState,
      fetchedData: copiedInitialState,
    });
    this.setSession(copiedState);
    // this.setSession(newList);
  };

  // Handle full Article

  loadFullArticle = (id) => {
    this.setState({
      modalLoading: true,
    });
    const copiedState = [...this.state.myFeed];
    Promise.all(copiedState.filter((item) => item.id === id))
      .then((res) => {
        this.setState({
          fullArticle: {
            author: res[0].author ? res[0].author : res[0].body.author,
            title: res[0].body.title,
            id: res[0].id,
            tag: res[0].tag,
            content: res[0].body.content,
            date: res[0].date,
            image: res[0].body.lead_image_url,
            url: res[0].body.url,
            excerpt: res[0].body.excerpt,
          },
        });
      })
      .then(() => {
        this.setState({
          modalLoading: false,
          showModal: true,
          showBlackscreen: true,
        });
      });
  };

  // Close full article

  closeFullArticle = () => {
    this.setState({
      fullArticle: {},
      showModal: false,
      showBlackscreen: false,
    });
  };

  // Sort my feed

  sortMyFeed = (e) => {
    const copiedState = [...this.state.myFeed];
    !this.state.sortLatest
      ? copiedState.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      : copiedState.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    this.setState((prev) => ({
      sortLatest: !prev.sortLatest,
      myFeed: copiedState,
    }));
  };

  // search

  onSearchHandler = (e) => {
    const copiedState = [...this.state.staticMyFeed];
    let filteredFeeds = copiedState.filter((item) =>
      item.tag.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ myFeed: filteredFeeds });
  };

  // Mobile news menu button

  mobileMenu = () => {
    this.setState((prev) => ({
      newsMenu: !prev.newsMenu,
    }));
  };

  render() {
    const initialData = this.state.fetchedData.map((item, index) => (
      <Card
        key={index}
        title={item.title}
        author={item.author ? item.author : item.creator ? item.creator : null}
        date={item.pubDate}
        loaded={item.loaded}
        contentLoading={item.contentLoading}
        loadDetails={() => this.loadDetails(item.guid, null)}
        pushingInProgress={this.state.pushingInProgress}
        categories={item.categories ? item.categories : null}
        subMenuRender={this.loadSubDetails}
        id={item.guid}
      />
    ));
    const myFeed = this.state.myFeed.map((item, index) => (
      <Loadedcard
        key={index}
        tag={item.tag}
        submit={() => this.contentEditing(item.id, false)}
        editing={item.contentEditing}
        edit={(e) => this.editFeed(e, item.id)}
        image={item.body.lead_image_url}
        title={item.body.title}
        author={
          item.body.author ? item.body.author : item.author ? item.author : null
        }
        description={item.body.excerpt ? item.body.excerpt : ""}
        loadFull={() => this.loadFullArticle(item.id)}
        remove={() => this.removeFeed(item.id, item.body.title)}
        date={
          item.date
            ? item.date
            : item.body.date_published
            ? item.body.date_published
            : null
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
          date={full.date}
          author={full.author}
          excerpt={full.excerpt}
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
        <Blackscreen
          show={this.state.newsMenu}
          clicked={() => this.mobileMenu()}
        />
        <div
          className={
            this.state.newsMenu
              ? classes.newsFeedWrapperMobile
              : classes.newsFeedWrapper
          }
        >
          <NewsHeader
            closeButton={() => this.mobileMenu()}
            showButton={this.state.newsMenu}
          />
          <div
            className={
              this.state.loading ? classes.newsFeedLoading : classes.newsFeed
            }
          >
            {this.state.loading ? <Loader /> : initialData.sort()}
          </div>
        </div>

        <div className={classes.feedWrapper}>
          <MyFeedHeader
            menuOnClick={() => this.mobileMenu()}
            changed={(e) => this.onSearchHandler(e)}
            sorter={() => this.sortMyFeed()}
            sortLatest={this.state.sortLatest}
          />
          <div className={classes.feed}>
            {myFeed}
            <Footprint />
          </div>
        </div>
      </div>
    );
  }
}

export default Frontpage;
