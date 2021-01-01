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
    const languages = await req.languageRepository!.findAll({});
    res.send(languages);
  })

  // endpoint to register language
  .post("/add", async (req, res) => {
    const { language_code, language } = req.body;
    let newLanguage = await req.languageRepository!.findOne({ $or: [{ language_code }, { language }] });

    // check if language exists
    if (newLanguage) {
      return res.sendStatus(409);
    }

    const lang = new Language();

    wrap(lang).assign({ ...req.body }, { em: req.orm.em });

    await req.languageRepository!.persistAndFlush(lang);

    res.send(lang);

    return res.sendStatus(200);
  });
