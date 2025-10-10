import { exec } from "child_process";
import { db } from "./database/dbConnection.js";
class AGS {
  #table;
  #user;
  #password;
  #host;
  #database;
  #sqlOperation;

  constructor(aUser, aPassword, aHost, aDatabase) {
    this.#user = aUser;
    this.#password = aPassword;
    this.#host = aHost;
    this.#database = aDatabase;

    this.#sqlOperation = db(this.#user, this.#password, this.#host, this.#database);

  }

  async select(columnName, tableName) {
    const sql = `SELECT ${columnName || "*"} FROM ${tableName}`;
    const [result] = await this.#sqlOperation.query(sql);
    return result;
  }

  selectWithId(yourIdName, columnName) {
    const sql = `SELECT ${columnName || "*"} FROM ${this.#table} WHERE ${
      yourIdName || "Id"
    } = ?`;
    return sql;
  }

  insertInto(tableName) {
    const sql = `INSERT INTO ${tableName || this.#table} SET ?`;
    return sql;
  }

  update(yourIdName, tableName, columnAndValue) {
    const sql = `UPDATE ${tableName || this.#table} SET ${columnAndValue} WHERE ${
      yourIdName || "Id"
    } = ?`;
    return sql;
  }

  delete(tableName, yourIdName) {
    const sql = `DELETE FROM ${tableName || this.#table} WHERE ${
      yourIdName || "Id"
    } = ?`;
    return sql;
  }

  selectJoin(tbl_a, tbl_b, columnName, onCondition, yourIdName, joinType) {
    const sql = `SELECT ${
      columnName || "*"
    } FROM ${tbl_a} ${joinType} ${tbl_b} ON ${onCondition} WHERE ${yourIdName} = ?`;
    return sql;
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
  })
};

export default AGS;
