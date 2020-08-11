'use strict';
const mongoose = require('mongoose');

/**
 * Payment schema
 */
const fields = {
    name: {type: String, require: true},
    team: {type: String, require: true}, 
    playerIdOnCPBL: {type: String, require: true},
    no: {type: String},
    position: {type: String},
    birthday: {type: String},
    height: {type: Number},
    weight: {type: Number},
    bat: {
        type: String,
        enum: [
            'left',
            'right',
            'both'
        ]
    },
    pitch:{
        type: String,
        enum: [
            'left',
            'right',
            'both'
        ]
    }
};
let PlayerSchema = new mongoose.Schema(fields)

/**
 * Expose
 */
module.exports = PlayerSchema;