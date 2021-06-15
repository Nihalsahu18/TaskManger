const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://127.0.0.1:27017/taskmanger`, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log(`database is connected to taskmanger`))
    .catch((error) => console.log(error));

module.exports = mongoose;