var Beacon = require('../../models').Resources.Beacon,
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        Beacon.find({}, function(err, beacons) {
            if (err) {
                return next(err)
            }
            res.status(200).json(beacons)
            return next()
        })
    },
    load: function(req, res, next, id) {
        var lean = req.method === 'GET'
        Beacon.getById(id, lean,
            function(err, beacon) {
                if (err) {
                    return next(err);
                }
                if (beacon) {
                    req.beacon = beacon
                    return next()
                }
                err = new HttpError(404, 'A beacon with this name does not exist : ' + beaconName)
                return next(err)
            })
    },
    get: function(req, res, next) {
        res.status(200).json(req.beacon)
        return next()
    },
    create: function(req, res, next) {
        var beacon = new Beacon(req.body)

        beacon.save(function(err, beacon) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(beacon)
            return next()
        })
    },
    update: function(req, res, next) {
        Beacon.findByIdAndUpdate(req.beacon.id, req.body, { new: true },
            function(err, beacon) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(beacon)
                return next()
            })
    },
    delete: function(req, res, next) {
        req.beacon.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
