'use strict'

const axios = require("axios")

class movieControllers {
    static getMovies (req, res, next){
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=2e4f716998cd076d37c2328d31f8928f&language=en-US&page=1')
        .then(dataMovie => {
            const movie = []
            for(let i = 0; i < 4; i++){
                const obj = {
                    picture: dataMovie.data.results[i]["poster_path"],
                    name: dataMovie.data.results[i]["original_title"],
                    release: dataMovie.data.results[i]["release_date"],
                    detail: dataMovie.data.results[i]["overview"],
                    vote: dataMovie.data.results[i]["vote_average"]
                } 
                movie.push(obj)
            }
            res.status(200).json(movie)
        })
        .catch(next)
    }

    static searchMovie (req, res, next){
        const key = req.body.search
        const word = key.split('')
  
        for(let i = 0; i < word.length; i++){
          if(word[i] === " "){
            word[i] = '%20'
          }
        }
        const keySearch = word.join('')
        console.log(keySearch)
        axios.get(` https://api.themoviedb.org/3/search/movie?api_key=2e4f716998cd076d37c2328d31f8928f&query=${keySearch}`)
        .then(({data}) => {
            const result = data.results
            // for(let i = 0; i < result.length; i++){
            //     const obj = {
            //         name: result[i]["original_title"],
            //         picture: result[i]["poster_path"],
            //         detail: result[i]["overview"]
            //     }
            //     result.push(obj)
            // }
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = movieControllers