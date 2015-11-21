var ResourceRouter = require('express').Router({
        mergeParams: true
    })

ResourceRouter.use('/resources', require('./route'))
ResourceRouter.use('/places', require('./places'))
ResourceRouter.use('/beacons', require('./beacon'))


module.exports = ResourceRouter
