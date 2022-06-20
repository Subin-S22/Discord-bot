import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:4400/",
});

export default baseUrl;
