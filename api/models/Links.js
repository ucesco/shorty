/**
 * Links.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var randomstring = require("randomstring");

function addId (values, cb) {
  var id = randomstring.generate(7);

    Links.findOne({
      id: id
    }).exec(function (err, finn){
      if (err) {
        return res.negotiate(err);
      } else if (!finn) {
        values.id = id;
        cb();
      } else {
        addId(values, cb)
      }
    });
}

module.exports = {

  attributes: {
    id: {
      type: 'string',
      unique: true,
      required: true
    },

    url: {
      type: 'url',
      required: true
    }
  },

  // Lifecycle Callbacks
  beforeCreate: function (values, cb) {
    addId(values, cb);
  }
};

