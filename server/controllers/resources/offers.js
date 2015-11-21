// Standard controller template
var Offer = require('../../models').Resources.Offer,
    HttpError = require('../../utils/errors/httpError'),
    async = require('async');

    module.exports = {
    list: function(req, res, next) {
        res.status(200).json(req.place.offers);
        return next()
    },
    load: function(req, res, next, offerId) {
        var lean = req.method === 'GET'
        Offer.getById(offerId, lean,
            function(err, resource) {
                if (err) {
                    return next(err);
                }
                if (resource) {
                    req.offerId = resource
                    return next()
                }
                err = new HttpError(404, 'A resource with this name does not exist : ' + resourceName)
                return next(err)
            })
    },
    get: function(req, res, next) {
        res.status(200).json(req.resource)
        return next()
    },
    create: function(req, res, next) {
        var offer = new Offer(req.body)
        async.waterfall([

            function(callback) {
                offer.save(callback)
            },
            function(offer, numberAffected, callback) {
                if (req.place) {
                    offer.attachToPlace(req.place.id, callback)
                } else {
                    callback(null, null, offer)
                }
            },
            function(place, offer, callback) {
                res.status(201).json(offer)
                callback(null)
            }
        ], next);

    },
    update: function(req, res, next) {
        Offer.findByIdAndUpdate(req.offerId, req.body, { new: true },
            function(err, resource) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(resource)
                return next()
            })
    },
    delete: function(req, res, next) {
        req.offerId.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
