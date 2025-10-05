import { rejects } from "assert";
import { exec } from "child_process";
import { resolve } from "path";
import { text } from "stream/consumers";

class AGS {
  #table;
  constructor(aTable) {
    this.#table = aTable;
  }

  select(columnName) {
    const sql = `SELECT ${columnName || "*"} FROM ${this.#table}`;
    return sql;
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

  update(yourIdName, tableName) {
    const sql = `UPDATE ${tableName || this.#table} SET ? WHERE ${
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

  async getJokes() {
    try {
      exec("curl https://icanhazdadjoke.com", (error, stdout, stderr) => {
        console.log(stdout);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const testingLang = async () => {
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
