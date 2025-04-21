const mysql = require("mysql2");
const dotenv = require("dotenv"); 

//db,js mein jo database use kr rhe usko require krenge, .env file require krenge usko call krenge
//then connection banayenge, aur connection se connect krenge. 
// aur module ko export krenge connection k saath model ko

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    //SECRET_KEY: process.env.SECRET_KEY,
    ssl: false
});

// Add connection error handling
connection.connect((err) => {
    if (err) {
        console.error(" Database connection error:", err);
        return;
    }
    console.log("Connected to database successfully!");
    
});

module.exports = { connection };
