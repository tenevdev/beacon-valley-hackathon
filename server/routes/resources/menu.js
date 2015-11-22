/**
 * Created by ema on 21/11/15.
 */
var MenuController = require('../../controllers').Resources.MenuController,
    MenuRouter = require('express').Router({
        mergeParams: true
    });

MenuRouter.param('menuSectionId', MenuController.load);

MenuRouter.route('/')
    .post(MenuController.create)
    .get(MenuController.get)

MenuRouter.route('/:menuSectionId')
    .put(MenuController.update)
    .delete(MenuController.delete);

module.exports = MenuRouter;
