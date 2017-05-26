var bunyan = require('bunyan');
var School = require('../models/school');
var log = bunyan.createLogger({name: 'school-controller', stream: process.stdout});
// Max items per page
const PAGE_SIZE = 10;

class SchoolController {}

var adminList = {
    "EST": "Estadual",
    "MUN": "Municipal",
    "FED": "Federal",
    "PRI": "Privada"
};

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
* Returns the list of schools containing a specific name
*/
SchoolController.getSchoolsByName = async(req, res, next) => {
    try {

        var schoolName = req.params.name;
        var school = await School.find({name: {$regex : schoolName.trim().toUpperCase()}});

        if (school) {
            res.json(school);
        } else {
            res.send(404, 'School not found');
        }
    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving school by name ${req.params.name}', {err: err});
    } finally {
        next();
    }
}

/**
* Returns the list of schools considering multiple filters.
*/
SchoolController.getSchoolsByFilters = async(req, res, next) => {
    try {
        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters');
        }

        var query = {}

        if (req.params.adm) {
            var adm = adminList[req.params.adm];

            if (!adm) {
                return res.send(400, 'Invalid administrative dependency');
            }

            query['adminDependency'] = adm;
        }

        if (req.params.uf) {
            query['uf'] = req.params.uf;

            if (req.params.municipality) {
                query['municipality'] = req.params.municipality;
            }
        }

        if (!req.params.uf && req.params.municipality ) {
            return res.send(400, 'Missing uf parameter');
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
