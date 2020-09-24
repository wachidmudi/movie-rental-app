const fs = require('fs').promises
const path = require('path')
const { Movie, MovieGenre, Genre } = require('../models')

class MovieController {

  static getAll(req, res) {
    Movie.findAll({
      include: {
        model: Genre,
        attributes: ['name']
      }
    })
    .then(movies => res.render('movies', { movies }))
    .catch(err => res.send(err))
  }

  static getAdd(req, res) {
    Genre.findAll()
      .then(genres => res.render('movies/add', { genres }))
      .catch(er => res.send(err))
  }

  static postAdd(req, res) {
    const { title, description, released_year, genre_ids, price } = req.body
    const { cover, screenshots } = req.files
    console.log('req.body', req.body)
    console.log('req.files', req.files)

    const reqCover = cover[0]
    const coverExt = path.extname(reqCover.originalname)

    const coverImage = fs.rename(reqCover.path, reqCover.path + coverExt)
      .then(() => Movie.create({ title, description, cover: reqCover.path + coverExt, released_year, price }))
      .then(movie => {
        const genreIds = JSON.parse(genre_ids).map(genre_id => MovieGenre.create({ movie_id: movie.id, genre_id }))
        return Promise.all(genreIds)
      })


    const screenshotImages = screenshots.map(file => {
      const ext = path.extname(file.originalname)
      return fs.rename(file.path, file.path + ext)
    })

    Promise.all([coverImage, ...screenshotImages])
      .then(() => res.redirect('/movies'))
      .catch(err => res.send(err))
  }

}

module.exports = MovieController
