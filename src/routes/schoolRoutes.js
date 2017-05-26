var schoolController = require('../controllers/schoolController')

/**
 * Function that sets up the routes.
 * @param  {Object} server Restify's server.
 * @return {function}        Function that sets up the routes.
 */
module.exports = (server) => {

    server.get('/school/code/:code', schoolController.getSchoolByCode);
    server.get('/school/name/:name', schoolController.getSchoolByName);
    server.get('/schools/:page', schoolController.getSchools);
    server.get('/schools/adm/:adm/:page', schoolController.getSchoolsByAdminDependency);
    server.get('/schools/municipality/:municipality/:page', schoolController.getSchoolsByMunicipality);
    server.get('/schools/uf/:uf/:page', schoolController.getSchoolsByUF);

}
