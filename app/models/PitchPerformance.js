'use strict';
const mongoose = require('mongoose');

/**
 * PitchPerformance schema
 */
const fields = {
    year: {type: String},
    player: {type: ObjectId, ref: 'Player'},
};
let PitchPerformanceSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = PitchPerformanceSchema;