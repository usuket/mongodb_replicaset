const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const moment = require("moment");

// Replica set
// mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
const _url = "mongodb://localhost:30001,localhost:30002,localhost:30003/?replicaSet=rs0"
// connect to single node
// const _url = "mongodb://localhost:30001/replica_test";

/**
 * Return random string
 * @param {} length 
 */
function randomString(length) {
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "";
    for (var i = 0; i < length; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }
}

// db.createCollection('zlib', {storageEngine: {wiredTiger: {configString: 'block_compressor=zlib'}}})

MongoClient.connect(_url, { useNewUrlParser: true },async (err, client) => {
    if(err){
        console.error("Connection",err);
        process.exit(-1);
    }
    
    try {
        const db = await client.db('replica_test');
        const collection = await db.collection('misc');
    
        const docs = [{1:1,2:2}]
    
        const inserted = await collection.insertMany(docs, { w: 'majority', j: true, wtimeout: 2000 });
        console.info("inserted",inserted)
        const count = await collection.countDocuments();
        console.info("count",count);           
        client.close();
    } catch (error) {
        console.error("Transaction",error);
        process.exit(-1);
    }

    // db.collection('zlib', async (err, collection) => {
    //     console.error(err);
    //     for (let i = 0; i < 1000; i++) {
    //         const docs = []
    //         for (let index = 0; index < 10000; index++) {
    //             docs.push({ "a": "a",
    //              "msg": randomString(600) ,
    //              "time": moment().toDate()  
    //             })
    //         }
    //         await collection.insertMany(docs,{w: 'majority', j: true, wtimeout: 2000}).then(ret => {
    //             console.log(i)
    //         }).catch(err=>{
    //             if(err){
    //                 console.error(err);
    //                 client.close()
    //                 process.exit(0)
    //             }
    //         });
    //     }

    // collection.find().toArray((err, docs) => {

    // });
});