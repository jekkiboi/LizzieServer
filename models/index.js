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
////////////////OLD SERVER///////////////////
// const mongoose = require('mongoose');
// const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/articleslib';
// const configOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// mongoose.connect(connectionString, configOptions)
//   .then(() => console.log('MongoDB successfully connected...'))
//   .catch((err) => console.log(`MongoDB connection error: ${err}`));

//   // added the Article property with the .Article because we are no longer using an embedded schema
// module.exports = {
//   Article: require ('./Article'),
//   User: require('./User')
// };