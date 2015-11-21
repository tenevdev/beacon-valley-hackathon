/**
 * Created by ema on 21/11/15.
 */
var PlacesController = require('../../controllers').Resources.PlacesController,
    PlacesRouter = require('express').Router({
        mergeParams: true
    });
var OffersRouter = require('./offers');
var MenuRouter = require('./menu');

PlacesRouter.route('/')
    .post(PlacesController.create)
    .get(PlacesController.list);

PlacesRouter.route('/:placeID')
    .get(PlacesController.get)
    .put(PlacesController.update)
    .delete(PlacesController.delete);


PlacesRouter.route('/:placeID/offers',OffersRouter);
PlacesRouter.route('/:placeID/menu',MenuRouter);

