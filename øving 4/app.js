const mysql = require('mysql');
let sokefelt = document.getElementById('sokefelt');
let button = document.getElementById('knapp');
let databaselisten = document.getElementById('databaselisten');
let sokelisten = document.getElementById('sokelisten');
// Setup MySQL-server connection
const connection = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : 'phillia',  // Replace [username] with your username
  password : 'CBCXMbGn',     // Replace [password] with your password
  database : 'phillia'   // Replace [username] with your username
});

// Connect to MySQL-server
connection.connect(function(error) {
  if(error) throw error; // If error, show error in console and return from this function
});

  // Perform select-query that fetches all the Persons table rows from the database
  connection.query('select * from Persons order by FirstName', function(error, results, fields) {
    if(error) throw error; // If error, show error in console and return from this function

    for(let person of results) {
      let li = document.createElement('li');
      li.textContent = person.FirstName + ', ' + person.City;
      databaselisten.appendChild(li);
    }
  });

  button.onclick = function () {
  connection.query('select * from Persons where FirstName like ? order by FirstName', ['%' + sokefelt.value + '%'], function(error, results, fields) {
    if(error) throw error;

while(sokelisten.firstChild) {
  sokelisten.removeChild(sokelisten.firstChild);
}
    for(let person of results) {
      let lo = document.createElement('li');
      lo.textContent = person.FirstName + ', ' + person.City;
      sokelisten.appendChild(lo);
    }
  });
  }

  function oppdater() {
    connection.query('select * from Persons', function(error, results, fields) {
      if(error) throw error;

      while(databaselisten.firstChild) {
        databaselisten.removeChild(databaselisten.firstChild);
      }

      for(let person of results) {
        let oppdatere = document.createElement('span');
        oppdatere.textContent = person.FirstName + ', ' + person.City;

        let knapp = document.createElement('button');
        knapp.textContent = 'slett';
        knapp.onlick = function() {
          connection.query('delete from Persons where ID = ?', [person.ID], function(error,results,fields) {
            if(error) throw error;

            oppdater();
          });
        };
        let tihi = document.createElement('li');
        tihi.appendChild(oppdatere);
        tihi.appendChild(knapp);
        databaselisten.appendChild(tihi);
      }
    });
  }
oppdater();
