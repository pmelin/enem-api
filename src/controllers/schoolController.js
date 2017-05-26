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
* Returns the list of schools ordered by average
*/
SchoolController.getSchools = async(req, res, next) => {
    try {
        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters.');
        }

        var paginationStart = pagination(req.params.page);

        var schools = await School.find({}, {}, {
            limit: PAGE_SIZE,
            skip: paginationStart,
            sort: {
                'average': -1
            }
        });
        res.json(schools);
    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving schools', {err: err});
    } finally {
        next();
    }
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
* Returns information about a specific school according to it's name
*/
SchoolController.getSchoolByName = async(req, res, next) => {
    try {

        var schoolName = req.params.name;
        var school = await School.findOne({name: schoolName.trim().toUpperCase()});

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
* Returns the list of schools considering the administrative dependency.
*/
SchoolController.getSchoolsByAdminDependency = async(req, res, next) => {
    try {
        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters.');
        }
        var value = adminList[req.params.adm];

        if (!value) {
            return res.send(400, "Bad Request");
        }

        var paginationStart = pagination(req.params.page);

        var schoolsPerAdminDependency = await School.find({
            adminDependency: value
        }, {}, {
            limit: PAGE_SIZE,
            skip: paginationStart,
            sort: {
                'average': -1
            }
        });
        res.json(schoolsPerAdminDependency);

    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving list of schools considering admin dependency ${req.params.adminDependency}', {err: err});
    } finally {
        next();
    }
}

/**
* Returns the list of schools considering its municipality.
*/
SchoolController.getSchoolsByMunicipality = async(req, res, next) => {
    try {
        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters');
        }
        var paginationStart = pagination(req.params.page);

        var schoolsPerMunicipality = await School.find({
            municipality: req.params.municipality
        }, {}, {
            limit: PAGE_SIZE,
            skip: paginationStart,
            sort: {
                'average': -1
            }
        });
        if (schoolsPerMunicipality.length == 0) {
            res.send(404, 'School not found for this municipality');
        } else {
            res.json(schoolsPerMunicipality);
        }

    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving list of schools considering municipality ${req.params.municipality}', {err: err});
    } finally {
        next();
    }
}

/**
* Returns the list of schools considering its federation unit.
*/
SchoolController.getSchoolsByUF = async(req, res, next) => {
    try {
        if (isNaN(req.params.page)) {
            return res.send(400, 'Invalid parameters');
        }
        var paginationStart = pagination(req.params.page);

        var schoolsPerUf = await School.find({
            uf: req.params.uf
        }, {}, {
            limit: PAGE_SIZE,
            skip: paginationStart,
            sort: {
                'average': -1
            }
        });
        if (schoolsPerUf.length == 0) {
            res.send(404, 'School not found for this municipality');
        } else {
            res.json(schoolsPerUf);
        }

    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving list of schools considering federation unit ${req.params.uf}', {err: err});
    } finally {
        next();
    }
}

module.exports = SchoolController;
