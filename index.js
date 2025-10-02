import { exec } from "child_process";

class AGS {
  #table;
  constructor(aTable) {
    this.#table = aTable;
  }

  select(columnName) {
    const sql = `SELECT ${columnName || "*"} FROM ${this.#table}`;
    return sql;
  };

  selectWithId(yourIdName, columnName) {
    const sql = `SELECT ${columnName || "*"} FROM ${this.#table} WHERE ${yourIdName || "Id"} = ?`;
    return sql;
  };

  insertInto(tableName){
    const sql = `INSERT INTO ${tableName || this.#table} SET ?`;
    return sql;
  };

  update(yourIdName, tableName){
    const sql = `UPDATE ${tableName || this.#table} SET ? WHERE ${yourIdName || "Id"} = ?`;
    return sql;
  }

  delete(tableName, yourIdName){
    const sql = `DELETE FROM ${tableName || this.#table} WHERE ${yourIdName || "Id"} = ?`;
    return sql;
  }

  getJokes() {
    try {
      exec("curl https://icanhazdadjoke.com", (error, stdout, stderr) => {
        console.log(stdout);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AGS;
