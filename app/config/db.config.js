
// Read database configuration from environment variables.
// Common env names: DB_HOST, DB_USER, DB_PW (or DB_PASS), DB_NAME, DB_PORT
const db_host =  'localhost';
const db_pw ='Foxprime7970*';
const db_user =  'root';
const db_name = 'Exercise_Tracker';

// If credentials are missing, throw a clear error early so it's obvious to the developer.
if (!db_user || !db_pw) {
    const hint = `Please set DB_USER and DB_PW (or DB_PASS) environment variables. Example: DB_USER=root DB_PW=secret`;
    // Log detailed info for local debugging then throw to fail fast.
    console.error('Database credentials are not set:', { DB_HOST: db_host, DB_USER: db_user ? '***' : '', DB_PW: db_pw ? '***' : '' });
    throw new Error(`Missing database credentials. ${hint}`);
}

const exports = {
  HOST: db_host,
  USER: db_user,
  PASSWORD: db_pw,
  DB: db_name,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000,
  },
};


export default exports
