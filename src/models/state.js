var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Entity that represents a state.
 * @type {Schema}
 */
var StateSchema = new Schema({
    uf: {
        type: String
    },
    municipalities: [String]
});

/**
 * Removes fields when transforming the entity to json
 */
StateSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;

    return obj
}

module.exports = mongoose.model('State', StateSchema);
