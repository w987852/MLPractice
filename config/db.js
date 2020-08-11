


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let mongo = {};
mongo.init = function() {
  let url = 'mongodb://s390840:S390840@ds161471.mlab.com:61471/mlpractice'
  mongoose.connect(url, {useNewUrlParser: true});
  let db = mongoose.connection;

  db.once('open', function() {
    console.log('DB is connected!!!')
    const models = require('app/models');
    db._models = models;
    mongo.db = db;
    bindModels();
    console.log('already bind model')
    //console.log(db)
    //bindModels(db)
    // we're connected!
  });
  /*
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) {
      mongo.DB = '';
    } else {
      mongo.DB = db.db('mlpractice');
      console.log('mongodb connect!!!')
    }
    db.on('close', function() {
      mongo.DB = '';
    });
    db.on('reconnect', function() {
      mongo.DB = db.db('mlpractice');
    });
  })
  */
}
                      
mongo.getDB = function() {
    if (mongo.db) {
      return mongo.db._models;
    } else {
      console.log('can not connect to db')
    }
}


/**
 *  將 schema 註冊進 connection, 後續可以使用 require('app/models').User 的樣子去操作 collection
 */
function bindModels () {
  console.log('Bind connection models ...');
  // models._internal 是一個已完整設定好(有schema, methods, statics, virtuals, ...) 但還沒有註冊進 mongoose 的 model schema 物件
  _.each(mongo.db._models._internal, (schema, modelName) => {
    console.log(`Registering model ${modelName}`);
    mongo.db._models[modelName] = mongo.db.model(modelName, schema, modelName);
  });
  return this;
}
module.exports = mongo;
