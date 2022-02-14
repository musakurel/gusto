module.exports ={
   type: "mysql",
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   synchronize: true,
   logging: false,
   entities: [
      "build/entity/**/*.js"
   ],
   migrations: [
      "build/migration/**/*.js"
   ],
   subscribers: [
      "build/subscriber/**/*.js"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
}