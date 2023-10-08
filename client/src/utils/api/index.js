import axios from "axios";

export const formRequestOptionsBody = (data) => ({
  mode: "no-cors",
  url: "http://localhost:3000/api",
  method: "POST",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  data,
});

export const makeRequest = async (options) => await axios.request(options);


