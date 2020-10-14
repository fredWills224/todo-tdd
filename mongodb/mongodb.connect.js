const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect(
            'mongodb+srv://<dbuser>:<password>@todo-tdd.9gqkd.mongodb.net/<dbTitle>?retryWrites=true&w=majority',
            { useUnifiedTopology: true },
            { useNewUrlParser: true }
        );
    } catch(err) {
        console.error(err);
        console.error('Error connecting to mongodb');
    }
    
}

module.exports = { connect };