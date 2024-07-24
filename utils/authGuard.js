const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  const checkLogin = (req, res, next) => {
    if (!req.session.logged_in) {
      res.status(403).json({ msg: 'you must login to perform this action' });
    } else {
      next();
    }
  };


  const withoutAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      next();
    } else {
      res.redirect('/');
    }
  };

  module.exports = { withAuth, checkLogin, withoutAuth };
  