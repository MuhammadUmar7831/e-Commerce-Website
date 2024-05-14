const Sql = require('mysql2');

function connectToDatabase() {
  // create a new Sql connection
  const connection = Sql.createConnection({
    // host: 'Sql-e3a7385-mu8494759-744f.a.aivencloud.com',
    host: 'DESKTOP-OJOIMTP',
    port: 27674,
    user: 'DESKTOP-OJOIMTP\mu849',
    // password: 'AVNS_0txvLOBA7WGArsaXV7U',
    database: 'defaultdb'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to Sql database:', error);
    } else {
      console.log('Connected to Sql database!');
    }
  });

  return connection;
}
const connection = connectToDatabase();
module.exports = connection;