const { User, Movie } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')

class TransactionsController {

  static getAll(req, res) {
    User.findAll({
      where: {
        role_id: 2
      },
      include: {
        model: Movie
      }
    })
      .then(transactions => res.render('transactions', { transactions, session: req.session, formatRupiah }))
      .catch(err => res.send(err))

  }

  static postAdd(req, res) {
    const { userId, movieId } = req.params

    Transaction.create({ customer_id: userId, movie_id: movieId })
      .then(() => res.redirect('/transactions'))
      .catch(err => res.send(err))
  }

}

module.exports = TransactionsController
