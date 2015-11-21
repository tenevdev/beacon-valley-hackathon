// Standard controller template
var Model = require('../../models').Resources.Model,
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        Model.find({}, function(err, resources) {
            if (err) {
                return next(err)
            }
            res.status(200).json(resources)
            return next()
        })
    },
    load: function(req, res, next, resourceName) {
        var lean = req.method === 'GET'
        Model.getByName(resourceName, lean,
            function(err, resource) {
                if (err) {
                    return next(err);
                }
                if (resource) {
                    req.resource = resource
                    return next()
                }
                err = new HttpError(404, 'A resource with this name does not exist : ' + resourceName)
                return next(err)
            })
    },
    single: function(req, res, next) {
        res.status(200).json(req.resource)
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
                console.log(req.resource);
                console.log('---------------------');
                console.log(resource);
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
