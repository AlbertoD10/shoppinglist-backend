const mysql = require("mysql");
const { promisify } = require("util");

const DB_CONFIG = {
  host: "mysql",
  user: "kevin",
  password: "admin",
  database: "shoppinglist",
  connectionLimit: 100,
  port: 3306,
};

const pool = mysql.createPool(DB_CONFIG);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    throw err;
  }
  // When done with the connection, release it.
  else if (connection) {
    connection.release();
    console.log("DB CONNECTED");
  }
  return;
});

//Allow to use promises with pool.query
pool.query = promisify(pool.query);

module.exports = pool;
