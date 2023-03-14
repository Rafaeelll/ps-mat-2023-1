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
module.exports = app;

const orderTag = require('./routes/order_tags')
app.use('/order_tags', orderTag)
module.exports = app;

const orderRelStatus = require('./routes/order_rel_statuses')
app.use('/order_rel_statuses', orderRelStatus)
module.exports = app;

const customers = require('./routes/customers')
app.use('/customers', customers)
module.exports = app;

const customerTags = require('./routes/customer_tags')
app.use('/customer_tags', customerTags)
module.exports = app;

const cities = require('./routes/cities')
app.use('/cities', cities)
module.exports = app;

const tags = require('./routes/tags')
app.use('/tags', tags)
module.exports = app;

const orderStatus = require('./routes/order_statuses')
app.use('/order_status', orderStatus)
module.exports = app;

const orders = require('./routes/orders')
app.use('/orders', orders)
module.exports = app;
