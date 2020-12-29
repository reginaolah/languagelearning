import express from "express";
import { mikroorm } from "./entities";
import ormConfig from "./mikro-orm.config";
import { routes } from "./controllers";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { passport } from "./security/passport";

export const app = express();

app.use(bodyParser.json());

//auth
app.use(cookieParser());
app.use(passport.initialize());

//database
app.use(mikroorm(ormConfig));

//endpoints
app.use(routes);
