// Create web server with express
// npm install express
// npm install body-parser
// npm install ejs
// npm install mongoose
// npm install method-override

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

const Comment = mongoose.model('Comment', commentSchema);

app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {comments: comments});
        }
    });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/:id/edit', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {comment: comment});
        }
    });
});

app.put('/:id/edit', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {name: req.body.name, comment: req.body.comment}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Views