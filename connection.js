function connect(callback){

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb+srv://admin:admin@cluster0-6zv9r.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(url, {useNewUrlParser: true });
  
    client.connect(errClient=>{
      if(errClient!==null) 
        console.log("Error while connecting to mongodb: ", errClient);  
      
      const db = client.db("db");
  
      const collection = db.collection("users");
  
      callback(client, collection);
  
    });
  }

  function getUsers(callback, name){
    connect( (client, collection) =>{
      collection.find({username:name}).toArray(function(errDatabase, docs){
        if(errDatabase!==null)
        console.log(docs);
          console.log("Error while getting the collection", errDatabase);
        callback(docs);
        client.close();
      });
    });
  }

  module.exports = getUsers;