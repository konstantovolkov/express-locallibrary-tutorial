var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  }
);


// Виртуальное свойство для полного имени автора
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name;
  });

// Виртуальное свойство - URL автора
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

AuthorSchema
  .virtual('lifespan')
  .get(function () {
    return (this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : 'unknown') + ' — ' +
      (this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : 'now');
  })

//Export model
module.exports = mongoose.model('Author', AuthorSchema);