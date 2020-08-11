'use strict';
const mongoose = require('mongoose');

/**
 * BatPerformance schema
 */
const fields = {
    year: {type: String},
    player: {type: ObjectId, ref: 'Player'},
};
let BatPerformanceSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = BatPerformanceSchema;