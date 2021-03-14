import axios from "axios";

const urlParser = async (url) => {
  return await axios
    .post("/details", { payload: url })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log("Server error:" + e);
    });
};
export default urlParser;
