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

// chama a verificação de autenticação para qualquer rota
const auth = require('./lib/auth')
app.use(auth)

/*********************ROTAS *****************************/
const users = require('./routes/users')
app.use('/users', users)

const channels = require('./routes/channels')
app.use('/channels', channels)

const paymentMethods = require('./routes/payment_methods')
app.use('/payment_methods', paymentMethods)

const carriers = require('./routes/carriers')
app.use('/carriers', carriers)


const shipmentPriority = require('./routes/shipment_priorities')
app.use('/shipment_priorities', shipmentPriority)

const orderTag = require('./routes/order_tags')
app.use('/order_tags', orderTag)

const orderRelStatus = require('./routes/order_rel_statuses')
app.use('/order_rel_statuses', orderRelStatus)

const customers = require('./routes/customers')
app.use('/customers', customers)

const customerTags = require('./routes/customer_tags')
app.use('/customer_tags', customerTags)

const cities = require('./routes/cities')
app.use('/cities', cities)

const tags = require('./routes/tags')
app.use('/tags', tags)

const orderStatus = require('./routes/order_statuses')
app.use('/order_status', orderStatus)

const orders = require('./routes/orders')
app.use('/orders', orders)
module.exports = app;
