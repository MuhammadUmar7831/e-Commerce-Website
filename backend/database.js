const mysql = require('mysql2');

function connectToDatabase() {
  // create a new MySQL connection
  const connection = mysql.createConnection({
    host: 'mysql-e3a7385-mu8494759-744f.a.aivencloud.com',
    port: 27674,
    user: 'avnadmin',
    password: 'AVNS_0txvLOBA7WGArsaXV7U',
    database: 'defaultdb'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  return connection;
}
const connection = connectToDatabase();
module.exports = connection;