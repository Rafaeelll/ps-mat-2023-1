// Carrega as variaveis de ambiente do arquivo
//.env para aplicação
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
 // conecta ao BD

 const db = require('./models')

 try {
    db.sequelize.authenticate()
console.log('SEQUELIZE: connection has been established sucessfully.')

 }
 catch(error){
    console.log('* SEQUELIZE: unable to connect to the database: ', error)
    process.exit(1)
 }
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
