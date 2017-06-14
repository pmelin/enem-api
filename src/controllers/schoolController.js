var bunyan = require('bunyan');
var School = require('../models/school');
var log = bunyan.createLogger({name: 'school-controller', stream: process.stdout});
// Max items per page
const PAGE_SIZE = 10;

class SchoolController {}

function pagination(page) {
    return (page - 1) * PAGE_SIZE
}

/**
* Returns information about a specific school according to it's code
*/
SchoolController.getSchoolByCode = async(req, res, next) => {
    try {
        if (isNaN(req.params.code)) {
            return res.send(400, 'Invalid parameters');
        }
        var school = await School.findOne({code: req.params.code});

        if (school) {
            res.json(school);
        } else {
            res.send(404, 'School not found');
        }
    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving school by code ${req.params.code}', {err: err});
    } finally {
        next();
    }
}

/**
* Returns the list of schools considering multiple optional filters.
*/
SchoolController.getSchoolsByFilters = async(req, res, next) => {
    try {

        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters');
        }

        var query = {}
        var adm;

        if (req.params.adm) {
            if (req.params.adm == 'PUB') {
                adm = {
                    $ne: 'Privada'
                }
            } else if (req.params.adm == 'PRI') {
                adm = 'Privada'
            } else {
                return res.send(400, 'Invalid adminDependency');
            }

            query['adminDependency'] = adm;
        }

        if (req.params.uf) {
            query['uf'] = req.params.uf;

            if (req.params.municipality) {
                query['municipality'] = req.params.municipality;
            }
        }

        if (!req.params.uf && req.params.municipality) {
            return res.send(400, 'Missing uf parameter');
        }

        if (req.params.name) {
            query['name'] = {
                $regex: req.params.name.trim().toUpperCase()
            };
        }

        var paginationStart = pagination(req.params.page);

        var schools = await School.find(query, {}, {
            limit: PAGE_SIZE,
            skip: paginationStart,
            sort: {
                'average': -1
            }
        });
        res.json(schools);

    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving list of schools considering multiple filters', {err: err});
    } finally {
        next();
    }
}
module.exports = SchoolController;
