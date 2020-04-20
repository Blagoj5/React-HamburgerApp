import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-e16b2.firebaseio.com/",
});

export default instance;
