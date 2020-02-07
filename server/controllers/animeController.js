const axios = require('axios');
const baseUrl = "https://api.jikan.moe/v3";

class animeController {
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
}

module.exports = animeController;
