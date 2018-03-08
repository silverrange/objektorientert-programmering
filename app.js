const mysql = require('mysql');

// Setup MySQL-server connection
const connection = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : '[phillia]',  // Replace [username] with your username
  password : '[CBCXMbGn]',     // Replace [password] with your password
  database : '[phillia]'   // Replace [username] with your username
});

// Connect to MySQL-server
connection.connect(function(error) {
  if(error) throw error; // If error, show error in console and return from this function
});

// Perform select-query that fetches all the Persons table rows from the database
connection.query('select * from Persons', function(error, results, fields) {
  if(error) throw error; // If error, show error in console and return from this function

  for(let person of results) {
    console.log(person.FirstName + ', ' + person.City);
  }
});
