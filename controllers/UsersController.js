const { User, Role } = require('../models')
const { compare } = require("../helpers/bcrypt")

class UsersController {

  static getLogin(req, res) {
    res.render('users/login', { session: req.session })
  }

  static postLogin(req, res) {
    const { email, password } = req.body

    User.findOne({
      where: { email },
      include: {
        model: Role
      }
    })
    .then(user => {
      // console.log('user', user);
      if (user) {
        if (compare(password, user.password)) {
          req.session.isLogin = true
          req.session.user = user
          res.redirect('/movies')
        } else {
          req.session.isLogin = false;
          req.session.errors = `Password untuk email tersebut tidak sesuai`
          res.redirect('/users/login')
        }
      } else {
        req.session.isLogin = false
        req.session.errors = 'Email tidak ditemukan'
        res.redirect('/users/login')
      }
    })
    .catch(err => {
      res.send(err)
      // req.session.errors = err.messages
      // res.redirect('/users/login')
    })
  }

  static getRegister(req, res) {
    res.render('users/register', { session: req.session })
  }

  static postRegister(req, res) {
    const { first_name, last_name, email, password } = req.body

    Role.findAll()
      .then(roles => {
        const role_id = roles.find(i => i.name === 'customer').id
        return User.create({ first_name, last_name, email, password, role_id })
      })
      .then(() => res.render('users/register-success', { session: req.session }))
      .catch(err => {
        if (!err.errors) {
          return res.send(err)
        }

        const errors = err.errors.map(error => error.message)
        res.send(errors)
      })
  }

  static getLogout(req, res) {
    delete req.session.isLogin
    delete req.session.user
    res.redirect('/users/login')
  }

}

module.exports = UsersController
