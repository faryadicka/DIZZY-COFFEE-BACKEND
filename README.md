<H1 align="center">BACK END</H1>

<div align="center">
  <img src="others/assets/img/logo.png">
  <h1>DIZZY COFFEE SHOP</h1>

<br/>

## 🧰 BUILT WITH 🧰

<br/>

[![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-purple)](https://www.npmjs.com/package/bcrypt) [![cloudinary](https://img.shields.io/badge/cloudinary-1.30.0-purple)](https://www.npmjs.com/package/cloudinary) [![cors](https://img.shields.io/badge/cors-2.8.5-purple)](https://www.npmjs.com/package/cors) [![dotenv](https://img.shields.io/badge/dotenv-16.0.0-purple)](https://www.npmjs.com/package/dotenv) [![express](https://img.shields.io/badge/express-4.17.3-purple)](https://www.npmjs.com/package/express) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-purple)](https://www.npmjs.com/package/jsonwebtoken) [![multer](https://img.shields.io/badge/multer-1.4.4-purple)](https://www.npmjs.com/package/multer) [![pg](https://img.shields.io/badge/pg-8.7.3-purple)](https://www.npmjs.com/package/pg) [![pg](https://img.shields.io/badge/pg-8.7.3-purple)](https://www.npmjs.com/package/pg)

<br/>

</div>

## 🖊️ Description

Dizzy coffee shop website is a service for order food and beverages. Customer can simply register, login, see products, order, see order history, edit their profile, etc.

## 📌 How To Install?

- Clone This Repo

```
$ git clone https://github.com/faryadicka/dizzy-coffeeshop-be
```

- Go To Folder Repo

```
$ cd dizzy-coffeeshop-be
```

- Install Module

```
$ npm install
```

- Set up .env

| KEYWORD          | VALUE                       |
| ---------------- | --------------------------- |
| CLOUD_API_KEY    | "YOUR API KEY"              |
| CLOUD_API_SECRET | "YOUR API SECRET"           |
| CLOUD_NAME       | "YOUR CLOUD NAME"           |
| DATABASE_URL     | "YOUR DATABASE URL"         |
| MORGAN_PACKAGE   | "production" |
| SECRET_KEY       | "YOUR SECRET KEY"           |

## 🐎 Run The Project

```
$ npm run startDev
```

<br/>

## 🚋 Route

| Endpoint               |         Method         | Info         | Remark                        |
| ---------------------- | :--------------------: | :----------- | :---------------------------- |
| /api/auth              |         `POST`         | Auth         | Signup, login, Verify         |
| /api/users/:id         |     `GET` `PATCH`      | Profile      | Access profile page by UserID |
| /api/transactions      |      `POST` `GET`      | Transactions | History of Orders             |
| /api/transactions/:id  | `PATCH` `DELETE` `GET` | Transactions | History of Orders             |
| /api/products          |      `GET` `POST`      | Products     | Products manage               |
| /api/products/:id      | `GET` `PATCH` `DELETE` | Producs      | Products manage               |
| /api/products/favorite |         `GET`          | Producs      | Products favorite             |
| /api/promos            |      `GET` `POST`      | Promos       | Promos manage                 |
| /api/promos/:id        | `GET` `PATCH` `DELETE` | Promos       | Promos manage                 |

## 🧻Documentation Postman

Click here [POSTMAN](https://documenter.getpostman.com/view/18740291/UzBnrSrc)

<br/>

## Related Project

[DIZZY COFFEESHOP FE](https://github.com/faryadicka/DIZZY-COFFEESHOP-FE)
