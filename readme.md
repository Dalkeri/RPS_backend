This project is the backend of a Rock Paper Scissors game. You'll need the frontend for it to work correctly or you can launch it and test the routes. You'll also need a database for it to work properly (see below).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
nodemon server
```

### Create a database 
```sh
DROP TABLE IF EXISTS `players`;
CREATE TABLE IF NOT EXISTS `players` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `wins` int(11) NOT NULL,
  `rounds` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;
```

to test the routes I used the REST Client plugin in vs studio, here are some examples
```sh
POST http://localhost:3000/api/getOneRPS
Content-Type: application/json

{
    "playerChoice": "Rock",
    "tempName": "12345"
}
```

```sh
PUT http://localhost:3000/api/saveUsername
Content-Type: application/json

{
    "tempName": "12345",
    "username": "David"
}
```
```sh
GET http://localhost:3000/api/getHighscores
Content-Type: application/json
```
