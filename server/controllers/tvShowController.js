const {Favorite} = require('../models')
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://api.tvmaze.com/search/shows?q=',
  timeout: 1000,
})

class tvController{
  static getMoviesData(req, res, next){
    // console.log(req.query)
    // console.log('b')
    instance.get(`${req.query.searchKey}`)
      .then(results=>{
        let data = results.data
        let movies = []
        for(let i = 0; i < data.length; i++){
          if(data[i].show.image && data[i].show.premiered && data[i].show.summary){
            // console.log('woi')
            console.log(data[i].show)
            // console.log(data[i].show.links.self)
            let genres = data[i].show.genres.join(', ')
            let movie = {
              title: data[i].show.name,
              summary: data[i].show.summary,
              premiered: data[i].show.premiered,
              genres: genres,
              img: data[i].show.image
            }
            movies.push(movie)
          }
        }
        // console.log(movies)
        if(movies.length == 0){
          res.status(204).json({message: 'no movies found'})
        }else{
          res.status(200).json(movies)
        }
      })
      .catch(err=>{
        res.status(400).json({error: 'cant get data'})
        // console.log(err)
      })
  }

  static homePage(req, res, next){
    console.log('yey')
    let random = String.fromCharCode(Math.floor(Math.random()*26) + 71)
    instance.get(random)
      .then(results=>{
        let data = results.data
        let movies = []
        for(let i = 0; i < data.length; i++){
          if(data[i].show.image && data[i].show.premiered && data[i].show.summary){
            let genres = data[i].show.genres.join(', ')
            let movie = {
              title: data[i].show.name,
              summary: data[i].show.summary,
              premiered: data[i].show.premiered,
              genres: genres,
              img: data[i].show.image
            }
            movies.push(movie)
          }
          if(movies.length == 5){
            res.status(200).json(movies)
          }
        }
        // console.log(movies)
      })
      .catch(err=>{
        res.status(400).json({error: 'cant get data'})
        // console.log(err)
      })
  }
}

module.exports = tvController