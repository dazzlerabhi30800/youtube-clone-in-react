import axios from "axios";

const options = {
  params: {
    hl: "en",
    gl: "US",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

const baseUrl = "https://youtube138.p.rapidapi.com";

export const FetchResults = async (url) => {
  const response = await axios.get(`${baseUrl}/${url}`, options);
  return response;
};

export function formatViews(views) {
  if (views >= 1000 && views < 1000000) {
    return Math.ceil(views / 1000) + "K";
  }
  if (views >= 1000000 && views < 1000000000) {
    return Math.ceil(views / 10000000) + "M";
  }
  if (views >= 1000000000) {
    return Math.ceil(views / 1000000000) + "B";
  }
}
