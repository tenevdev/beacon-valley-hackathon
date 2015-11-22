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
        Offer.findById(offerId,
            function(err, offer) {
                if (err) {
                    return next(err);
                }
                if (offer) {
                    req.offer = offer
                    return next()
                }
                err = new HttpError(404, 'A offer with this name does not exist : ' + offerName)
                return next(err)
            })
    },
    get: function(req, res, next) {
        res.status(200).json(req.offer)
        return next()
    },
    create: function(req, res, next) {
        var offer = new Offer(req.body)
        console.log(req.place)

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
        Offer.findByIdAndUpdate(req.offer.id, req.body, { new: true },
            function(err, offer) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(offer)
                return next()
            })
    },
    delete: function(req, res, next) {
        req.offer.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
