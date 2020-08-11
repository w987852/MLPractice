'use strict';

const MODELS_PATH = [
    'Player',
    'Team',
    'Standing',
    'BatPerformance',
    'PitchPerformance',
    'DefendPerformance',
];

const _db = { _internal: {} };
_.forEach(MODELS_PATH, modelPath => {
  let modelName = _.last(_.split(modelPath, '/'));
  _db._internal[modelName] = require(`app/models/${modelPath}`);
});

module.exports = _db;
