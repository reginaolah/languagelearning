# Language learning platform ( Italki clone ) [![Build Status](https://travis-ci.org/barnabaskocsis/Language-learning-platform.svg?branch=main)](https://travis-ci.org/barnabaskocsis/Language-learning-platform) 
Beadandó feladat a 2020/2021/1 félévben meghirdetett Full stack webprogramozás tárgyhoz. A beadandó feladat keretei között egy nyelvi tanulást elősegítő applikáció kerül elkészítésre, ahol tanulók tudnak órákat venni különböző nyelveken tanároktól. Az feladat az [italki](https://www.italki.com/) nevezetű webes applikáció egy lightweight változatát készül megvalósítani.

### A new wiki page is avaiable for the application,check it out here: [Wiki](https://github.com/barnabaskocsis/Language-learning-platform/wiki)

### Heroku has been set up, you can reach it from here: http://italkiclone.herokuapp.com/

## Feladat funkcionális követelményei:

  - Alkalmazás:
    - Lehet regisztrálni az alkalmazásba
    - Ki/be lehet jelentkezni
    - A regisztrált felhasználók rendelkeznek egy profillal

  - Tanuló:
    - Van lehetősége nyelvet választani
    - Tanulóként lehet szűrni a tanárok között különböző szempontok alapján
    - Tud órákat foglalni
    - Van egy felület kommunikálni a tanárral
    - Beadhat megoldásokat házikra

  - Tanár:
    - A tanárok naptárjaikban jelezhetik mikor érnek rá órát tartani
    - A tanárok feltölthetnek fájlokat 
    - A tanárok kiírhatnak házikat és javíthatják őket

## Feladat nem funkcionális követelményei:

  - Megbízhatóság érdekében a REST végpontok tesztelésre kerülnek
  - Autentikáció és autorizáció a hitelesítés és biztonság érdekében
  - Az alkalmazás kinézete igényes és több böngészőt is támogat
  - Technológiai megszorítások:
      * Az adatbázis: **SQLite**
      * A szerveroldali **REST API typescript** nyelven íródik, **Node.js** alatt és **Express** keretrendszerben
      * A kliensoldal **Angular** keretrendszerben készül

## Szakterületi fogalomjegyzék:

  - **SQLite**: A SQLite egy önálló, kisméretű, ACID-kompatibilis relációs adatbázis-kezelő rendszer és adatbázismotor.
  - **REST(Representational State Transfer)**: Egy szoftverarchitektúra típus, erőforrások elérésének módja HTTP protokoll szemantikájára építve.
  - **API(Application Programming Interface)**: Egy rendszer azon szolgáltatásainak és használatának dokumentációja, amelyet mások felhasználhatnak.
  - **Angular**: Typescript alapú nyílt-forráskódú keretrendszer webes applikációk készítéséhez MVC architektúrában.
  - **MVC(Model-View-Controller)**: Architektúrális minta, amely jól elhatárolja a modell, nézet és vezerlő komponenseket.

## Szerepkörök

  - Vendég: Azonosítatlan felhasználó korlátozott jogokkal, csak a publikus oldalat éri.
  - Bejelentkezett felhasználó:
    * **Tanuló**: profillal rendelkezik és hozzáfér az oldal tanulóknak szánt funkcióihoz
    * **Tanárok**: profillal rendelkezik és hozzáfér az oldal tanároknak szánt funkcióihoz
    * **Admin**: törölhet regisztrált felhasználókat
    
# Fejlesztők:

  - Oláh Regina Ildikó Y3WIW6
  - Kocsis Barnabás Péter HM02MI
