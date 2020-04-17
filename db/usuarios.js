const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'retoJWT';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) { //Esto para hacer GET
    const collection = db.collection('users');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const findNames = function (db, callback) { //Esto para hacer GET
    const collection = db.collection('users');
    collection.find({}).project({ _id : 1, name : 1 }).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const findDocumentsById = function (db, callback, id) { //Esto para hacer GET individual
    const collection = db.collection('users');
    collection.find({"username": id }).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const insertDocuments = (db, callback, location) => {
    const collection = db.collection('users');
    collection.insertMany([location], function (err, result) {
        console.log("Inserting document!")
        callback(result);
    });
}

const updateDocument = function(db, callback, id, location) {
    // Get the documents collection
    const collection = db.collection('users');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ id : id }
      , { $set: location }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated the document");
      callback(result.result);
    });  
}

const removeDocument = function(db, callback, id) {
    // Get the documents collection
    const collection = db.collection('users');
    // Delete document where a is 3
    collection.deleteOne({ "username" : id}, function(err, result) {
      console.log("Removed the document");
      callback(result.result);
    });    
  }

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.findNames = findNames;
exports.insertDocuments = insertDocuments;
exports.findDocumentsById = findDocumentsById;
exports.updateDocument = updateDocument;
exports.removeDocument = removeDocument;