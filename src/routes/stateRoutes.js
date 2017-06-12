var stateController = require('../controllers/stateController')

/**
 * Function that sets up the routes.
 * @param  {Object} server Restify's server.
 * @return {function}        Function that sets up the routes.
 */
module.exports = (server) => {

    server.get('/state/:uf', stateController.getState);
    server.get('/states', stateController.getStates);

}
