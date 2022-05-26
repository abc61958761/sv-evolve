import axios from "axios";

const appserve = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});


export default appserve;
