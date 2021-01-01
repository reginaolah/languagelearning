import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Language } from "../entities/language";

export const languageRouter = Router();

languageRouter
  .use((req, res, next) => {
    req.languageRepository = req.orm.em.getRepository(Language);
    next();
  })


  .get("", async (req, res) => {
    const languages = await req.languageRepository!.findAll({
      
    });
    res.send(languages);
  })