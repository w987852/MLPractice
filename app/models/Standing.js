'use strict';
const mongoose = require('mongoose');

/**
 * Standing schema
 */
const fields = {
    year: {type: String},
    player: {type: ObjectId, ref: 'Player'},
};
let StandingSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = StandingSchema;