/**
 * RedirectController
 *
 * @description :: Server-side logic for managing redirects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  redirect: function (req, res, next) {
    var linkId = req.params.linkId;

    Links.findOne({
      id: linkId
    }).exec(function (err, finn){
      if (err) {
        return res.negotiate(err);
      } else if (!finn) {
        next();
      } else {
        res.redirect(finn.url);
      }
    });
  }
};

