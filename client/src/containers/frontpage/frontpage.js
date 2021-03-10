import React, {Component, Fragment} from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Blackscreen from "../../components/blackscreen/blackscreen";
import Card from "../../components/card/card";
import Loadedcard from "../../components/card/loadedcard";
import classes from "./frontpage.module.css";

class Frontpage extends Component {
  state = {
    fetchedData: [],
    fullArticle: {},
    loading: false,
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
    this.setState({loading: true});
    const promise = new Promise((resolve, reject) => {
      axios({
        url: "/feed",
        method: "GET",
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log(error);
        });
    });
    promise.then(data => {
      const newData = [];
      const categories = [];
      for (let item in data.data) {
        // if (data.data[item].categories) {
        //   for (let link in data.data[item].categories) {
        //     categories.push({
        //       title: data.data[item].categories[link].$.domain,
        //       tag: data.data[item].categories[link]._,
        //     });
        //   }
        //   console.log(categories);
        // }
        newData.push({
          ...data.data[item],
          loaded: false,
          error: false,
          contentEditing: false,
          contentLoading: false,
          detailedData: {},
        });
      }
      this.setState({fetchedData: newData, loading: false});
    });
  };

  // UTILS

  linkHandler = async link => {
    return await axios
      .post("/details", {payload: link})
      .then(response => {
        return response.data;
      })
      .catch(e => {
        console.log("Server error:" + e);
      });
  };

  // Initiating feed card editing

  contentEditing = (id, value) => {
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter(item => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.contentEditing = value;
    this.setState({fetchedData: copiedState});
  };

  // Initiating feed card loading

  contentLoading = (id, value) => {
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter(item => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.contentLoading = value;
    this.setState({fetchedData: copiedState});
  };

  // Load

  loadDetails = id => {
    this.contentLoading(id, true);
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter(item => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.loaded = true;
    const output = this.linkHandler(selectedItem.link);
    output.then(res => {
      console.log(res);
      if (res.error) {
        selectedItem.error = true;
      } else {
        selectedItem.detailedData = {
          data: res,
        };
        this.setState({fetchedData: copiedState});
        this.contentLoading(id, false);
      }
    });
  };

  // Edit feed

  editFeed = (e, id) => {
    console.log(e.target.value);
    console.log(e.target.name);
    this.contentEditing(id, true);
    const copiedState = [...this.state.fetchedData];
    const index = copiedState.indexOf(
      copiedState.filter(item => item.guid === id)[0]
    );
    const selectedItem = copiedState[index];
    selectedItem.detailedData.data[e.target.name] = e.target.value;
    this.setState({fetchedData: copiedState});
  };

  saveEdit = id => {
    console.log("save");
    this.contentEditing(id, false);
  };

  // Remove Feed

  removeFeed = id => {
    const newList = this.state.fetchedData.filter(item => item.guid !== id);
    this.setState({fetchedData: newList});
    // this.setSession(newList);
  };

  // Handle full Article

  loadFullArticle = id => {
    const copiedState = [...this.state.fetchedData];
    const load = async () => {
      for (let item of copiedState) {
        if ((await item.guid) === id) {
          return item;
        }
      }
    };
    load().then(res => {
      console.log(res.detailedData.data);
      this.setState({
        fullArticle: res.detailedData.data,
        showModal: true,
        showBlackscreen: true,
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
    const feed = this.state.fetchedData.map((item, index) => {
      const details = item.detailedData.data;
      return (
        <Fragment key={index}>
          {!item.loaded ? (
            <div className={classes.cardWrapper}>
              <Card
                editing={item.contentEditing}
                edit={() => this.editFeed(item.guid)}
                title={item.title}
                content={item.content}
                close={() => this.removeFeed(item.guid)}
                add={() => this.loadDetails(item.guid)}
              />
            </div>
          ) : item.loaded ? (
            <div className={classes.cardWrapper}>
              {item.contentLoading ? (
                <Loader />
              ) : (
                <Loadedcard
                  error={item.error}
                  submit={() => this.saveEdit(item.guid)}
                  editing={item.contentEditing}
                  edit={e => this.editFeed(e, item.guid)}
                  image={details.lead_image_url}
                  title={details.title}
                  author={details.author}
                  loadFull={() => this.loadFullArticle(item.guid)}
                  remove={() => this.removeFeed(item.guid)}
                />
              )}
            </div>
          ) : null}
        </Fragment>
      );
    });
    const modal = (
      <Fragment>
        <Modal
          image={this.state.fullArticle.lead_image_url}
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
            {this.state.loading ? <Loader /> : feed}
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
