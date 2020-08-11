'use strict';
const mongoose = require('mongoose');

/**
 * DefendPerformance schema
 */
const fields = {
    year: {type: String},
    player: {type: ObjectId, ref: 'Player'},
};
let DefendPerformanceSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = DefendPerformanceSchema;