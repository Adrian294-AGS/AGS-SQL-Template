const mysql = require("mysql2");

module.exports = (user, password, host, database) => {
  const dbConnection = mysql
    .createPool({
      user: user,
      password: password,
      host:  host,
      database: database
    })
    .promise();

  return dbConnection;
}