const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oauthBoilerplate'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', () => {
    console.log(`⛓️ MongoDB connected @ ${db.host}:${db.port}`)
})
db.on('error', err => {
    console.error("Could not connect to Mongo DB!",err)
})
module.exports = {
  Article: require ('./Article'),
  User: require('./User')
};
