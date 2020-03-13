import axios from "axios";

export default axios.create({
  baseURL: "https://codeforces.com/api/contest.list",
  mode: 'no-cors',
  responseType: "json",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});