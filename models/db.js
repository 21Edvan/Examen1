const MongoClient = require("mongodb").MongoClient;
let db = null;

module.exports = class MongoDModel {
  static async getDB() {
    if (!db) {
      try {
        let conn = await MongoClient.connect("mongodb://127.0.0.1:27017", {});
        db = conn.db("Bramadero_DB");
        return db;
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else {
      return db;
    }
  }
};
