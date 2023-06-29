const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Article } = require('./db.js');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


//....................... Requests Targeting All Article .......................// 

app.route('/articles')
    .get((req, res) => {
        Article.find({})
            .then((foundArticle) => {
                res.send(foundArticle);
            })
            .catch((err) => {
                res.send(err);
            })
    })
    .post((req, res) => {
        const artTitle = req.body.title;
        const artContent = req.body.content;

        const newArticle = new Article({
            title: artTitle,
            content: artContent
        })

        // newArticle.save()
    })
    .delete((req, res) => {

        Article.deleteMany({})
            .then((items, err) => {
                if (items) {
                    re.send(items + "deleted!");
                }
                else {
                    res.send(err);
                }
            });
    });

//....................... Requests Targeting Single Article .......................// 

app.route('/articles/:articleTitle')
    .get((req, res) => {

        const dataName = req.params.articleTitle;

        Article.findOne({ title: dataName.trim() })
            .then((foundArticle) => {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send('Opps..No Articles Found!');
                }
            })
    })
    .put((req, res) => {

        Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true }
        )
            .then(console.log('Update Successfull'));
    })
    .patch((req, res) => {


        Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { $set: req.body },
        )
            .then(updatedArticle => {
                if (updatedArticle) {
                    res.send(updatedArticle);
                }
            })
            .catch(err => {
                res.send(err);
            })
    })
    .delete((req, res) => {

        Article.deleteOne({ name: req.body.articleTitle })
            .then((deletedItem, err) => {
                if (deletedItem) {
                    res.send(deletedItem + 'Deleted');
                } else {
                    res.send(err);
                }
            })
    })
















app.listen(3000, () => {
    console.log('Server Running');
});

