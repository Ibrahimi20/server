const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const  todo = new schema({
    
    Fonction : {
        type : String
    },
    nom : {
        type : String
    },
    prenom : {
        type: String
    },
    email : {
        type : String
    },
    CNI : {
        type : String
    }
});
module.exports = mongoose.model("Todo", todo);