// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class Database {
  connection: any;
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async doQuery(queryToDo) {
    const pro = new Promise((resolve, reject) => {
      const query = queryToDo;
      this.connection.query(query, function (err, result) {
        if (err) throw err; // GESTION D'ERREURS
        resolve(result);
      });
    });
    return pro.then((val) => {
      return val;
    });
  }
  async doQueryParams(queryToDo, array) {
    const pro = new Promise((resolve, reject) => {
      const query = queryToDo;
      this.connection.query(query, array, function (err, result) {
        if (err) throw err; // GESTION D'ERREURS
        resolve(result);
      });
    });
    return pro.then((val) => {
      return val;
    });
  }
}
