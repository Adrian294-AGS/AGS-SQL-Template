import { exec } from "child_process";
import { db } from "./database/dbConnection.js";

class AGS {
  #sqlOperation;

  constructor(aUser, aPassword, aHost, aDatabase) {
    this.#sqlOperation = db(aUser, aPassword, aHost, aDatabase);
  }

  async select(columnName, tableName) {
    const sql = `SELECT ${columnName || "*"} FROM ${tableName}`;
    try {
      const [result] = await this.#sqlOperation.query(sql);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async selectWithId(yourIdName, columnName, tableName, idValue) {
    const sql = `SELECT ${columnName || "*"} FROM ${tableName} WHERE ${
      yourIdName || "Id"
    } = ${idValue}`;
    try {
      const [result] = await this.#sqlOperation.query(sql);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async insertInto(tableName, objectValue) {
    const sql = `INSERT INTO ${tableName} SET ?`;
    try {
      const [result] = await this.#sqlOperation.query(sql, [objectValue]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(yourIdName, tableName, objectValue, idValue) {
    const sql = `UPDATE ${tableName} SET ? WHERE ${
      yourIdName || "Id"
    } = ${idValue}`;
    try {
      const [result] = await this.#sqlOperation.query(sql, [objectValue]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(tableName, yourIdName, idValue) {
    try {
      if(Array.isArray(idValue)){
        let result = {
          affectedRows: 0
        }
        for(let i in idValue){
          const sql = `DELETE FROM ${tableName} WHERE ${yourIdName || "Id"} = ${idValue[i]}`;
          await this.#sqlOperation.query(sql);
          result.affectedRows += 1;
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
    const sql = `SELECT ${
      columnName || "*"
    } FROM ${tbl_a} ${joinType} ${tbl_b} ON ${onCondition} WHERE ${yourIdName} = ?`;
    try {
      const [result] = await this.#sqlOperation.query(sql,[idValue]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async selectInnerJoin(tbl_a, tbl_b, columnName, onCondition){
    const sql = `SELECT ${columnName || "*"} FROM ${tbl_a} INNER JOIN ${tbl_b} ON ${onCondition}`;
    const [result] = await this.#sqlOperation.query(sql);
    return result;
  }
}

export const getDadJokes = async () => {
  return new Promise((resolve, reject) => {
    try {
      exec("curl https://icanhazdadjoke.com", (error, stdout, stderr) => {
        return resolve(stdout);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

export default AGS;
