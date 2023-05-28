const Login = require('../models/LoginModel');

exports.registerIndex = (req, res) => {
  // if (req.session.user) return res.render('home');
  return res.render('register');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/register');
      });
      return;
    }

    req.flash('success', 'Your account was created with sucess.');
    req.session.save(() => {
      return res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.loginIndex = (req, res) => {
  return res.render('login');
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'You are logged in!');
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect('/gym');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};
