/**
 * Created by ema on 21/11/15.
 */
var PlacesController = require('../../controllers').Resources.PlacesController,
    PlacesRouter = require('express').Router({
        mergeParams: true
    });
var OffersRouter = require('./offers');
var MenuRouter = require('./menu');

PlacesRouter.param('beaconId', PlacesController.load)

PlacesRouter.route('/')
    .post(PlacesController.create)
    .get(PlacesController.list);

PlacesRouter.route('/:beaconId')
    .get(PlacesController.get)
    .put(PlacesController.update)
    .delete(PlacesController.delete);


PlacesRouter.use('/:beaconId/offers', OffersRouter);
PlacesRouter.use('/:beaconId/menu', MenuRouter);

module.exports = PlacesRouter
