/**
 * Created by ema on 21/11/15.
 */
// Standard controller template
var Place = require('../../models').Resources.Place,
    Beacon = require('../../models').Resources.Beacon,
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        Place.find({}, function(err, resources) {
            if (err) {
                return next(err)
            }
            res.status(200).json(resources);
            return next()
        })
    },
    create: function(req, res, next) {
        var newPlace = new Place(req.body)

        newPlace.save(function(err, newPlace) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(newPlace)
            return next()
        })
    },
    load: function(req, res, next, beaconId) {
        var lean = req.method === 'GET'
        console.log('loading')
        Beacon.getPlace(beaconId,
            function(err, place) {
        console.log('loaded')

                if (err) {
                    return next(err);
                }
                if (place) {
                    req.place = place
                    return next()
                }
                err = new HttpError(404, 'A resource with this id does not exist : ' + beaconId)
                return next(err)
            })
    },
    get: function(req, res, next) {
        res.status(200).json(req.place)
        return next()
    },
    update: function(req, res, next) {
        Place.findByIdAndUpdate(req.resource.id, req.body, { new: true },
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
