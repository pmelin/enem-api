var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Entity that represents a school.
 * @type {Schema}
 */
var SchoolSchema = new Schema({
    code: {
        type: Number
    },
    name: {
        type: String
    },
    uf: {
        type: String
    },
    municipality: {
        type: String
    },
    adminDependency: {
        type: String
    },
    participationRate: {
        type: Number
    },
    permanenceRate: {
        type: String
    },
    teacherTraining: {
        type: Number
    },
    approvalRate: {
        type: Number
    },
    disapprovalRate: {
        type: Number
    },
    abandonmentRate: {
        type: Number
    },
    average: {
        type: Number
    }
});

/**
 * Removes fields when transforming the entity to json
 */
SchoolSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;

    return obj
}

module.exports = mongoose.model('School', SchoolSchema);
