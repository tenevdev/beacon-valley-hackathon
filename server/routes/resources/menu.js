/**
 * Created by ema on 21/11/15.
 */
var MenuController = require('../../controllers').Resources.MenuController,
    MenuRouter = require('express').Router({
        mergeParams: true
    });

MenuRouter.route('/menu')
    .post(MenuController.create)
    .get(MenuController.get)
    .put(MenuController.update)
    .delete(MenuController.delete);

module.exports = MenuRouter;
