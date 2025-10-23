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
      console.log(error);
    }
  }

  async selectWithId(yourIdName, columnName, tableName, idValue) {
    
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `SELECT ${columnName || "*"} FROM ${tableName} WHERE ${
      yourIdName || "Id"
    } = ${idValue[i]}`;
          const [selectResult] = await this.#sqlOperation.query(sql)
          result.push(selectResult[0]);
        }
        return result;
      }

      const sql = `SELECT ${columnName || "*"} FROM ${tableName} WHERE ${
      yourIdName || "Id"
    } = ${idValue}`;
      const [selectResult] = await this.#sqlOperation.query(sql)
      return selectResult[0];

    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  async update(yourIdName, tableName, objectValue, idValue) {
   
    try {
      if(Array.isArray(objectValue) && Array.isArray(idValue)){
        let result = [];
        for(let i in objectValue){
          const sql = `UPDATE ${tableName} SET ? WHERE ${yourIdName} = ${idValue[i]}`;
          const [updateResult] = await this.#sqlOperation.query(sql, [objectValue[i]]);
          result.push(updateResult);
        }
        return result;
      }
      const sql = `UPDATE ${tableName} SET ? WHERE ${yourIdName} = ${idValue}`;
      const [updateResult] = await this.#sqlOperation.query(sql, [objectValue]);
      return updateResult;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(tableName, yourIdName, idValue) {
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `DELETE FROM ${tableName} WHERE ${yourIdName || "Id"} = ${idValue[i]}`;
          const [deleteResult] = await this.#sqlOperation.query(sql);
          result.push(deleteResult);
        }
        return result;
      }
      const sql = `DELETE FROM ${tableName} WHERE ${yourIdName || "Id"} = ${idValue}`;
      const [deleteResult] = await this.#sqlOperation.query(sql);
      return deleteResult;
    } catch (error) {
      console.log(error);
    }
  }

  async selectLeftAndRightJoin(tbl_a, tbl_b, columnName, onCondition, yourIdName, joinType, idValue) {
    try {
      if(Array.isArray(idValue)){
        let result = [];
        for(let i in idValue){
          const sql = `SELECT ${columnName || "*"} FROM ${tbl_a} ${joinType} ${tbl_b} ON ${onCondition} WHERE ${yourIdName} = ${idValue[i]}`;
          const [selectResult] = await this.#sqlOperation.query(sql);
          result.push(selectResult[0]);
        }
        return result;
      }
      const sql = `SELECT ${columnName || "*"} FROM ${tbl_a} ${joinType} ${tbl_b} ON ${onCondition} WHERE ${yourIdName} = ${idValue}`;
      const [selectResult] = await this.#sqlOperation.query(sql);
      return selectResult;
    } catch (error) {
      console.log(error);
    }
  }

  async selectInnerJoin(tbl_a, tbl_b, columnName, onCondition){
   try {
    const sql = `SELECT ${columnName || "*"} FROM ${tbl_a} INNER JOIN ${tbl_b} ON ${onCondition}`;
    const [result] = await this.#sqlOperation.query(sql);
    return result;
   } catch (error) {
    console.log(error);
   }
  }
  async sum(columnName, tableName){
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
      const sql = `SELECT SUM(${columnName || "*"}) FROM ${tableName}`;
      const [result] = await this.#sqlOperation.query(sql);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
