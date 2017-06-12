var bunyan = require('bunyan');
var State = require('../models/state');
var log = bunyan.createLogger({name: 'state-controller', stream: process.stdout});
// Max items per page

class StateController {}

/**
* Returns a state.
*/
StateController.getState = async(req, res, next) => {
    try {
        var stateView = {};
        var stateUf = req.params.uf;
        var state = await State.findOne({uf: stateUf.trim().toUpperCase()});

        if (state) {
            stateView = state.municipalities;
            res.json(stateView);
        } else {
            res.send(404, 'State not found');
        }
    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving state by name ${req.params.uf}', {err: err});
    } finally {
        next();
    }
}

/**
* Returns the list of states.
*/
StateController.getStates = async(req, res, next) => {
    try {
        var stateList = new Set();
        var states = await State.find({});
        for (var state of states) {
            stateList.add(state.uf);
        }
        res.json(Array.from(stateList));

    } catch (err) {
        res.send(500, 'Internal error');
        log.error('Error retrieving states', {err: err});
    } finally {
        next();
    }
}

module.exports = StateController;
