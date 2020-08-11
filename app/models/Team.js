'use strict';
const mongoose = require('mongoose');

/**
 * Team schema
 */
const fields = {
    name: {type: String, require: true, unique: true},
    teamIdOnCPBL: {type: String, require: true},
    standings: [{
        type: ObjectId,
        ref: 'Standing'
    }],
    batPerformances: [{
        type: ObjectId,
        ref: 'BatPerformance'
    }],
    pitchPerformances: [{
        type: ObjectId,
        ref: 'PitchPerformance'
    }],
    defendPerformances: [{
        type: ObjectId,
        ref: 'DefendPerformance'
    }]

};
let TeamSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = TeamSchema;