exports.gym = (req, res) => {
  return res.render('gym');
};

exports.gymHypertrophy = (req, res) => {
  return res.render('hypertrophy');
};
exports.gymLoseWeight = (req, res) => {
  return res.render('loseweight');
};
exports.gymDefine = (req, res) => {
  return res.render('define');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};



