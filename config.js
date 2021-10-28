const env = process.env;
require("dotenv").config();

const devConfig = {
  host: process.env.host || "flooddb-1.camvkj4v7my9.us-east-2.rds.amazonaws.com",
  user: process.env.user || "admin",
  password: process.env.password || "Japeys123#",
  database: process.env.database || "flooddb",
}

const proConfig = {
  connectionString: process.env.DATABASE_URL   // heroku addons
}

const config = {
  db: devConfig,
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;