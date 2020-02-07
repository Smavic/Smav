const axios = require('axios');
const baseUrl = "https://api.jikan.moe/v3";

class animeController {
  // for homepage
  static homepage(req, res, next) {
    axios({
      url: `${baseUrl}/top/anime/1/upcoming`,
      mehthod: "get",
    })
      .then(({ data }) => {
        res.status(200);
        res.json(data.top);
      })
      .catch((err) => {
        next(err);
      });
  }
  // for search
  static search(req, res, next) {
    const { query } = req;
    const newQuery = []
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        newQuery.push(`${key}=${value}`);
      }
    }
    console.log(`${baseUrl}/search/anime?${newQuery.join("&")}`);
    axios({
      url: `${baseUrl}/search/anime?${newQuery.join("&")}`,
      mehthod: "get",
    })
      .then(({ data }) => {
        const { results } = data;
        const newResults = results.filter(item => item.rated !== "Rx");
        res.status(200);
        res.json(newResults);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = animeController;
