const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://final:finalfinalfinal@cluster0.flrto.mongodb.net/final?retryWrites=true&w=majority');
        console.log('connect succesfully');
    } catch (error) {
        console.log('connect failed');
    }
};

module.exports = { connect };
