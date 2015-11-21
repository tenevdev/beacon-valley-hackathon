/**
 * Created by ema on 21/11/15.
 */
var OffersController = require('../../controllers').Resources.OffersController,
    OffersRouter = require('express').Router({
        mergeParams: true
    });

OffersRouter.route('/')
    .post(OffersController.create)
    .get(OffersController.list)
    .put(OffersController.update)
    .delete(OffersController.delete);

module.exports = OffersRouter;
