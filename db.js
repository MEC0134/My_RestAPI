const mongoose  = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/wikiDB'); 


const articleSchema = new mongoose.Schema({
    title: String, 
    content: String
}); 



const Article = mongoose.model('Article', articleSchema);




module.exports = {
    Article: Article
}