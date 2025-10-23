import mysql from "mysql2";

export default (user, password, host, database) => {
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