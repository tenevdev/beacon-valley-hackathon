/**
 * Created by ema on 21/11/15.
 */
var PlacesController = require('../../controllers').Resources.PlacesController,
    PlacesRouter = require('express').Router({
        mergeParams: true
    });

var OffersRouter = require('./offers');
var MenuRouter = require('./menu');

// Place id is in fact a beacon id
// The place will be loaded
PlacesRouter.param('placeId', PlacesController.load)

PlacesRouter.route('/')
    .post(PlacesController.create)
    .get(PlacesController.list);

PlacesRouter.route('/:placeId')
    .get(PlacesController.get)
    .put(PlacesController.update)
    .delete(PlacesController.delete);


PlacesRouter.use('/:placeId/offers', OffersRouter);
PlacesRouter.use('/:placeId/menu', MenuRouter);

module.exports = PlacesRouter
