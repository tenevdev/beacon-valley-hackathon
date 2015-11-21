var BeaconController = require('../../controllers').Resources.BeaconController,
    BeaconRouter = require('express').Router({
        mergeParams: true
    });

BeaconRouter.param('beaconId', BeaconController.load);

BeaconRouter.route('/')
    .get(BeaconController.list)
    .post(BeaconController.create);

BeaconRouter.route('/:beaconId')
    .get(BeaconController.get)
    .put(BeaconController.update)
    .delete(BeaconController.delete);


module.exports = BeaconRouter
