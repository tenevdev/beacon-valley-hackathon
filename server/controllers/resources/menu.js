// Standard controller template
var MenuSection = require('../../models').Resources.MenuSection,
    HttpError = require('../../utils/errors/httpError'),
    async = require('async');


module.exports = {
    load: function(req, res, next, menuSectionId) {
        var lean = req.method === 'GET'
        MenuSection.findById(menuSectionId,
            function(err, menuSection) {
                if (err) {
                    return next(err);
                }
                if (menuSection) {
                    req.menuSection = menuSection
                    return next()
                }
                err = new HttpError(404, 'A menu section with this name does not exist : ' + menuSectionId)
                return next(err)
            })
    },
    get: function(req, res, next) {
        res.status(200).json(req.place.menu);
        return next()
    },
    create: function(req, res, next) {
        var menuSection = new MenuSection(req.body)
        //console.log("creating menu");

        async.waterfall([

            function(callback) {
                menuSection.save(callback)
            },
            function(menuSection, numberAffected, callback) {
                if (req.place) {
                    menuSection.attachToPlace(req.place.id, callback)
                } else {
                    callback(null, null, menuSection)
                }
            },
            function(place, menuSection, callback) {
                res.status(201).json(menuSection)
                callback(null)
            }
        ], next);
    },
    update: function(req, res, next) {
        MenuSection.findByIdAndUpdate(req.menuSection.id, req.body, { new: true },
            function(err, resource) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(resource)
                return next()
            })
    },
    delete: function(req, res, next) {
        req.menuSection.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
