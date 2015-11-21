// Standard controller template
var Model = require('../../models').Resources.Model,
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    get: function(req, res, next) {
        res.status(200).json(req.place.menu);
        return next()
    },
    create: function(req, res, next) {
        var resource = new Model(req.body)

        resource.save(function(err, resource) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(resource)
            return next()
        })
    },
    update: function(req, res, next) {
        Model.findByIdAndUpdate(req.resource.id, req.body, { new: true },
            function(err, resource) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(resource)
                return next()
            })
    },
    delete: function(req, res, next) {
        req.resource.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
