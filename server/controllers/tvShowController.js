const {Favorite} = require('../models')
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://api.tvmaze.com/search/shows?q=',
  timeout: 1000,
})

class tvController{
  static getMoviesData(req,res,next){
    // console.log(req.body)
    // console.log('a')
    instance.get(`${req.body}`)
      .then(result=>{
        // console.log(result.data)
        // console.log(result.data[0].show.name,"title")
        // console.log(result.data[0].show.summary,"summary")
        // console.log(result.data[0].show.premiered,"year")
        // console.log(result.data[0].show.image.original,"img")
        // console.log(result.data[0].show.genres,"genre")
        // console.log(genres,"genres")
        let data = result.data
        let movies = []
        for(let i = 0; i < data.length; i++){
          let genres = data[i].show.genres.join(', ')
          let movie = {
            title: data[i].show.name,
            summary: data[i].show.summary,
            premiered: data[i].show.premiered,
            genres: genres,
            img: data[i].show.image.original
          }
          movies.push(movie)
        }
        console.log(movies)
        if(movies.length == 0){
          // res.result(204).json({message: 'no movies found'})
        }else{
          // res.result(200).json(movies)
        }
      })
      .catch(err=>{
        console.log(err)
      })
  }
}

module.exports = tvController