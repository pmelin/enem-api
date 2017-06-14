var schoolController = require('../controllers/schoolController')

/**
 * Function that sets up the routes.
 * @param  {Object} server Restify's server.
 * @return {function}        Function that sets up the routes.
 */
module.exports = (server) => {

    server.get('/school/code/:code', schoolController.getSchoolByCode);
    server.get('/schools/:page', schoolController.getSchoolsByFilters);

}
