const MongoDB = require("../db");
var ObjectID = require('mongodb').ObjectID;

class OrderModel {
  collection = null;

  constructor() {
    const db = MongoDB.getDB()
      .then((db) => {
        this.collection = db.collection("orders");
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  async getAll() {
    try {
      const result = await this.collection.find({}).toArray();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getById(id){
    try{
      const _id = new ObjectID(id);
      let result = await this.collection.findOne({_id});
      return result;
    }catch(ex){
      throw(ex);
    }
  }

  async addOne(document) {
    try {
      const result = await this.collection.insertOne(document);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateById(id, nombre, correo, telefono, producto, forma_pago, estado_orden) {
    try{
      const fecha_publicacion = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const _id = new ObjectID(id);
      const updOps = {"$set":{"nombre": nombre, "correo": correo, "telefono": telefono, "producto": producto, "forma_pago": forma_pago, "estado_orden": estado_orden}};
      let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
      return updDoc;
    }catch(ex){
      throw(ex);
    }
  }

  async removeById(id) {
    try{
      const _id = new ObjectID(id);
      let rslt = await this.collection.deleteOne({_id});
      return rslt;
    }catch(ex){
      throw(ex);
    }
  }
}

module.exports = OrderModel;
