# News-Snacks

## [Description](#table-of-content)
It's a CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts.

## Table of content
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)

## [Installation](#table-of-content)
Before using NEWSSNACKS, you must install following packages

* Handlebars.js
* MySql2
* Sequelize
* Dotenv
* bcrypt
* express-session
* Connect Session Store using Sequelize

```bash
npm i dotenv
npm i sequelize
npm i bcrypt
npm i express-handlebars
npm i mysql2
npm i express-session
npm i connect-session-sequelize
```

Also, you must create a .env file to enter your SQL root password.
```bash
// make sure that you create a file outside of the folders 
// Call this inside your terminal
touch .env 

// you are copying this 3 lines below and paste it inside .env file and modify the DB_PASSWORD
DB_NAME='snackblog_db'
DB_USER='root'
DB_PASSWORD='INSERT_PASSWORD_HERE'
```

It is deployed in Heroku. Click the link is below.
## [Usage](#table-of-content)
To use the website, you must log in


## [Credits](#table-of-content)
Without these references, this application would not function.
Bootcamp course materials
* 14-MVC/17-Ins_Session-Storage 

Collected Data for [contentPostData.json](./models/Contentpost.js)
* Stories about Zuckerberg making his employee change his avatar and Dyson Zone are from [12 dumbest tech moments of 2022](https://www.fastcompany.com/90822935/12-dumbest-tech-moments-of-2022)
* [ChatGPT and the future of AI at work](https://www.dialpad.com/blog/chatgpt-ai-at-work/)

Packages
* [Handlebars.js](https://www.npmjs.com/package/express-handlebars)
* [MySql2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [express-session](https://www.npmjs.com/package/express-session)
* [Connect Session Store using Sequelize](https://www.npmjs.com/package/connect-session-sequelize)


[Back to the title](#news-snacks)