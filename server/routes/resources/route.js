var Controller = require('../../controllers').Resources.Controller,
    Router = require('express').Router({
        mergeParams: true
    })

Router.param('name', Controller.load)

Router.route('/')
    .get(Controller.list)
    .post(Controller.create)

Router.route('/:name')
    .get(Controller.single)
    .put(Controller.update)
    .delete(Controller.delete)

module.exports = Router
