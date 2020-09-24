const fs = require('fs').promises
const path = require('path')
const { Movie, MovieGenre, Genre, Screenshot } = require('../models')

class MovieController {

  static getAll(req, res) {
    const { session }  = req

    Movie.findAll({
      include: {
        model: Genre,
        attributes: ['name']
      }
    })
    .then(movies => res.render('movies', { movies, session }))
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

    const reqCover = cover[0]
    const coverExt = path.extname(reqCover.originalname)

    const coverImage = fs.rename(reqCover.path, reqCover.path + coverExt)
      .then(() => Movie.create({ title, description, cover: reqCover.path + coverExt, released_year, price }))
      .then(movie => {
        const genreIds = JSON.parse(genre_ids).map(genre_id => MovieGenre.create({ movie_id: movie.id, genre_id }))

        const screenshotImages = screenshots.map(file => {
          const ext = path.extname(file.originalname)
          return fs.rename(file.path, file.path + ext)
            .then(() => Screenshot.create({ movie_id: movie.id, name: file.path + ext }))
        })

        return Promise.all([...genreIds, ...screenshotImages])
      })


    Promise.all([coverImage])
      .then(() => res.redirect('/movies'))
      .catch(err => res.send(err))
  }

  static getEdit(req, res) {
    const { id } = req.params

    let genres
    Genre.findAll()
      .then(data => {
        genres = data

        return Movie.findByPk(id, {
          include: [Genre, Screenshot]
        })
      })
      // .then(movie => res.send({ movie }))
      .then(movie => res.render('movies/edit', { movie, genres }))
      .catch(err => res.send(err))
  }

  static postEdit(req, res) {
    const { id } = req.params
    const { title, description, released_year, genre_ids, price, cover_hidden, screenshot_hidden } = req.body
    const { cover, screenshots } = req.files

    if (cover_hidden && screenshot_hidden) {
      Movie.update({ title, description, released_year, price }, {
        where: { id }
      })
      .then(() => MovieGenres.destroy({
        where: {
          movie_id: id
        }
      }))
      .then(() => {
        const genreIds = JSON.parse(genre_ids).map(genre_id => MovieGenre.create({ movie_id: id, genre_id }))
        return Promise.all(genreIds)
      })
      .catch(err => res.send(err))
    } else {
      // Genre not handled yet
      // findByPk Movie
      // include Screenshot
      // unlink 'cover' & 'screenshots'
      // then run code below

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

  static getDelete(req, res) {
    const { id } = req.params

    // Delete data in db and unlink image file
    let movie
    Movie.findByPk(id, {
      include: {
        model: Screenshot
      }
    })
    .then(data => {
      movie = data
      return Movie.destroy({
        where: { id }
      })
    })
    .then(() => {
      const cover = fs.unlink(movie.cover)
      const screenshots = movie.Screenshots.map(item => fs.unlink(item.name))

      return Promise.all([cover, ...screenshots])
    })
    .then(() => res.redirect('/movies'))
    .catch(err => res.end(err))
  }

}

module.exports = MovieController
