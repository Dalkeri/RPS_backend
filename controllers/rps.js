const mysql = require('mysql2/promise')

require('dotenv').config();


exports.getOneRPS = async (req, res, next) => {
    const db = await mysql.createConnection({  
        host: process.env.DATABASE_HOST,  
        user: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    let tempName =  req.body.tempName;
    const [rows] = await db.execute(`select * from players where username = "${tempName}"`);
    let tempPlayerDatas = rows[0];

    let RPS = ["rock", "paper", "scissors"];
    let random  = Math.floor(Math.random() * 3);
    let computerChoice = RPS[random];
    
    let playerChoice = req.body.playerChoice;
    
    let winner;
    if (computerChoice == playerChoice){ 
            winner = "tie";
    } else if (computerChoice == "rock"){ 
            if(playerChoice == "paper"){
                winner = "player";
            }
            else {
                winner = "computer";
            }
    } else if (computerChoice == "paper"){
            if(playerChoice == "scissors"){
                winner = "player";
            }
            else {
                winner = "computer";
            }
    } else if (computerChoice == "scissors"){
            if(playerChoice == "rock"){
                winner = "player";
            }
            else {
                winner = "computer";
            }
    }
        
    //we have no data for this player, we add it to the db
    if(!tempPlayerDatas){
        db.query(`INSERT INTO players (username, wins, rounds) VALUES ("${tempName}", ${winner=="player"?1:0}, 1) `)
        .then(response => {
            console.log("player added");
        })
        .catch(err =>{
            console.log(err);
        });
    } else if(tempPlayerDatas.rounds < 10) { // we already have datas, we update it
        db.query(`UPDATE players SET wins = wins + ${winner=="player"?1:0}, rounds = rounds +1 WHERE username = "${tempName}" `)
        .then(response => {
            console.log("player updated");
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        });
    } else {
        return res.status(500).json({message:"There has been an error." });
    }

    
    return res.status(200).json({"computerChoice": computerChoice, "winner": winner, "totalWins": tempPlayerDatas ? tempPlayerDatas.wins : 0 + (winner=="player"?1:0) });
    
};

//once the player has finished his 10 rounds, he can save his name
exports.saveUsername = async (req, res, next) => {
    const db = await mysql.createConnection({  
        host: process.env.DATABASE_HOST,  
        user: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    let tempName =  req.body.tempName;
    const [rows] = await db.execute(`select * from players where username = "${tempName}"`);
    let tempPlayerDatas = rows[0];

    if(tempPlayerDatas && tempPlayerDatas.rounds == 10){
        db.query(`UPDATE players SET username = "${req.body.username}" WHERE username = "${tempName}" `)
        .then(response => {
            console.log("player changed username");
            return res.status(200).json({message: "score saved"});
        })
        .catch(err =>{
            console.log(err);
        });
    } else if(!tempPlayerDatas){
        return res.status(500).json({message:"Oops. It seems there was a problem with the server." });

    }
};

exports.getHighscores = async (req, res, next) => {
    const db = await mysql.createConnection({  
        host: process.env.DATABASE_HOST,  
        user: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    let tempName =  req.body.tempName;
    //only get the 10 highest scores (we get a winrate in %)
    const [rows] = await db.execute(`select username,cast(wins/rounds*100 AS SIGNED INTEGER) as winrate from players WHERE rounds = 10 ORDER BY winrate DESC LIMIT 10`);
    let leaderBoard = rows;
    return res.status(200).json({"leaderboard": leaderBoard });

};
