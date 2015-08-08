var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    db.Page.findAll().then(function (pagesList) {
        res.render('index', {
            title: 'MakApp',
            pages: pagesList
        });
    });
});


router.post('/page/create', function (req, res) {
    console.log(req);
    db.Page.create({
        pageName: req.body.pageName, //req.params('pageName'),
        pageOrder: req.body.pageOrder // req.params('pageOrder')
    }).then(function (record) {
        console.log(record);
        res.status(200).json({
            Id: record.id,
            name: record.pageName,
            order: record.pageName
        });

    });
});

router.post('/question/create', function (req, res) {
    console.log(req);
    db.Question.create({
        PageId: req.body.pageId,
        questionText: req.body.questionText, //req.params('pageName'),
        questionType: req.body.questionType // req.params('pageOrder')
    }).then(function (record) {
        console.log(record);
        db.Question.findAll({
            where: {
                'PageId': req.body.pageId
            }
        }).then(function (questions) {
            res.status(200).json(questions);
        });
        //        res.status(200).json({
        //            Id: record.id,
        //            name: record.questionText,
        //            order: record.questionType
        //        });

    });
});

router.get('/questions/get', function (req, res) {
    console.log(req.query.pageId);
    db.Question.findAll({
        where: {
            'PageId': req.query.pageId
        }
    }).then(function (questions) {
        res.status(200).json(questions);
    });
});