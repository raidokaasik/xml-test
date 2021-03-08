import axios from "axios";

const contentLoader = (link, id) => {
  const linkHandler = async (link) => {
    return await axios
      .post("/details", { payload: link })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log("Server error:" + e);
      });
  };

  const contentLoading = (id, value) => {
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

  const loadDetails = (id) => {
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
    });
  };
  loadDetails(id);
};

export default contentLoader;
