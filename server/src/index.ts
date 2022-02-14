require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { requireAuth, checkUser } from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import actorRoutes from "./routes/actorRoutes";
import commentRoutes from "./routes/commentRoutes"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cookieSession from "cookie-session"
import passport from "passport"
const bodyParser = require("body-parser");

createConnection()
  .then(async (connection) => {
    const app = express();
    
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );
  
    //app.use(express.static("public"));
    app.use(bodyParser.json({ limit: "10mb" }) as any);
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(
      cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(movieRoutes);
    app.use(actorRoutes);
    app.use(commentRoutes);
    app.use(cookieParser());
    app.use(checkUser);
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });







    //app.use("/auth", socialAuth);
    app.get("*", checkUser);
    app.get("/", (req, res) => {
      res.status(200).json({ message: "Yeni önyüz bağlandı" });
    });
    app.get(
      "/dashboard",
      requireAuth,
      async (req: express.Request, res: express.Response) => {
        try {
          const user = await User.find({});
          res.redirect(process.env.FE_HOST);
        } catch (error) {
          console.log(error);
        }
      }
    );
    // Server port
    
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port `);
    });
  })
  .catch((error) => console.log(error));
