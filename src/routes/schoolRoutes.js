var schoolController = require('../controllers/schoolController')

/**
 * Function that sets up the routes.
 * @param  {Object} server Restify's server.
 * @return {function}        Function that sets up the routes.
 */
module.exports = (server) => {

    server.get('/school/:code', schoolController.getSchool);
    server.get('/schools/:page', schoolController.getSchools);
    server.get('/schools/adm/:adm/:page', schoolController.getSchoolsByAdminDependency);
}
