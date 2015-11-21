var ResourceRouter = require('express').Router({
        mergeParams: true
    })

ResourceRouter.use('/resources', require('./route'))

module.exports = ResourceRouter
