const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/oauthBoilerplate'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log(`⛓️ MongoDB connected @ ${db.host}:${db.port}`)
})
db.on('error', err => {
    console.error(err)
})
module.exports = {
  Article: require ('./Article'),
  User: require('./User')
};
