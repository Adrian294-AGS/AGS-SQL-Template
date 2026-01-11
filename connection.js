import connection from "./database/dbConnection.js";

export default class {
    #sqlOperation;

    constructor(user, password, host, database) {
        this.#sqlOperation = connection(user, password, host, database);
    }

    async select(columnName, tableName) {
    try {
      if(Array.isArray(tableName)){
        let result = [];
        for(let i in tableName){
          const sql = `SELECT * FROM ${tableName[i]}`;
          const [selectResult] = await this.#sqlOperation.query(sql);
          result.push(selectResult);
        }
        return result;
      }
      const sql = `SELECT ${columnName || "*"} FROM ${tableName}`;
      const [result] = await this.#sqlOperation.query(sql);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async selectWithId(yourIdName, columnName, tableName, idValue) {
    
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `SELECT ${columnName || "*"} FROM ?? WHERE ?? = ?`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tableName, yourIdName, idValue[i]]);
          result.push(selectResult[0]);
        }
        return result;
      }

      const sql = `SELECT ${columnName || "*"} FROM ?? WHERE ?? = ?`;
      const [selectResult] = await this.#sqlOperation.query(sql, [tableName, yourIdName, idValue]);
      return selectResult[0];

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async insertInto(tableName, objectValue) {
    try {
     if(Array.isArray(objectValue)){
      let result = [];
      for(let i in objectValue){
        const sql = `INSERT INTO ${tableName} SET ?`;
        const [insertResult] = await this.#sqlOperation.query(sql, [objectValue[i]]);
        result.push(insertResult);
      }
      return result;
     }
    const sql = `INSERT INTO ${tableName} SET ?`;
    const [insertResult] = await this.#sqlOperation.query(sql, [objectValue]);
    return insertResult;
    } catch (error) {
     throw new Error(error.message);
    }
  }

  async update(yourIdName, tableName, objectValue, idValue) {
   
    try {
      if(Array.isArray(objectValue) && Array.isArray(idValue)){
        let result = [];
        for(let i in objectValue){
          const sql = `UPDATE ?? SET ? WHERE ?? = ?`;
          const [updateResult] = await this.#sqlOperation.query(sql, [tableName, objectValue[i], yourIdName, idValue[i]]);
          result.push(updateResult);
        }
        return result;
      }
      const sql = `UPDATE ?? SET ? WHERE ?? = ?`;
      const [updateResult] = await this.#sqlOperation.query(sql, [tableName, objectValue, yourIdName, idValue]);
      return updateResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(tableName, yourIdName, idValue) {
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `DELETE FROM ?? WHERE ?? = ?`;
          const [deleteResult] = await this.#sqlOperation.query(sql, [tableName, yourIdName, idValue[i]]);
          result.push(deleteResult);
        }
        return result;
      }
      const sql = `DELETE FROM ?? WHERE ?? = ?`;
      const [deleteResult] = await this.#sqlOperation.query(sql, [tableName, yourIdName, idValue]);
      return deleteResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async selectLeftAndRightJoin(tbl_a, tbl_b, columnName, onCondition, yourIdName, joinType, idValue) {
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `SELECT ${columnName || "*"} FROM ?? ${joinType} ?? ON ${onCondition} WHERE ?? = ?`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tbl_a, tbl_b, yourIdName, idValue[i]]);
          result.push(selectResult[0]);
        }
        return result;
      }
      const sql = `SELECT ${columnName || "*"} FROM ?? ${joinType} ?? ON ${onCondition} WHERE ?? = ?`;
      const [selectResult] = await this.#sqlOperation.query(sql, [tbl_a, tbl_b, yourIdName, idValue]);
      return selectResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async selectInnerJoin(tbl_a, tbl_b, columnName, onCondition){
   try {
    const sql = `SELECT ${columnName || "*"} FROM ?? INNER JOIN ?? ON ${onCondition}`;
    const [result] = await this.#sqlOperation.query(sql, [tbl_a, tbl_b]);
    return result;
   } catch (error) {
    throw new Error(error.message);
   }
  }

  async sum(columnName, tableName){
    try {
      if(Array.isArray(tableName)){
        let result = [];
        for(let i in tableName){
          const sql = `SELECT SUM(${columnName}) FROM ??`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tableName[i]]);
          result.push(selectResult);
        }
        return result;
      }
      const sql = `SELECT SUM(${columnName}) FROM ??`;
      const [result] = await this.#sqlOperation.query(sql, [tableName]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async max(columnName, tableName){
    try {
      if(Array.isArray(tableName)){
        let result = [];
        for(let i in tableName){
          const sql = `SELECT MAX(${columnName}) FROM ??`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tableName[i]]);
          result.push(selectResult);
        }
        return result;
      }
      const sql = `SELECT MAX(${columnName}) FROM ??`;
      const [result] = await this.#sqlOperation.query(sql, [tableName]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async min(columnName, tableName){
    try {
      if(Array.isArray(tableName)){
        let result = [];
        for(let i in tableName){
          const sql = `SELECT MIN(${columnName}) FROM ??`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tableName[i]]);
          result.push(selectResult);
        }
        return result;
      }
      const sql = `SELECT MIN(${columnName}) FROM ??`;
      const [result] = await this.#sqlOperation.query(sql, [tableName]);
      return result;
    } catch (error) {
     throw new Error(error.message);
    }
  }

  async avg(columnName, tableName){
    try {
      if(Array.isArray(tableName)){
        let result = [];
        for(let i in tableName){
          const sql = `SELECT AVG(${columnName}) FROM ??`;
          const [selectResult] = await this.#sqlOperation.query(sql, [tableName[i]]);
          result.push(selectResult);
        }
        return result;
      }
      const sql = `SELECT AVG(${columnName}) FROM ??`;
      const [result] = await this.#sqlOperation.query(sql, [tableName]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
