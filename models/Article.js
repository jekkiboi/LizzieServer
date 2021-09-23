const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
// any time there is a new schema, mongo automatically appends an id property to that schema
// preiviously pm had schema embedded, but removed that because of id issues with each article


const ArticleSchema = new Schema({
  title: String,
//   author: String,
content: String,
  image: String

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article