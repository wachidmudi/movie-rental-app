class HomeController {

  static home(req, res) {
    res.render('home', { session: req.session })
  }

}

module.exports = HomeController
