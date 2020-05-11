const Auth = (req, res, next)=> {
  if(!req.session.user){
    res.redirect('/login?error=2');    
  }
  next();
}

module.exports = Auth;