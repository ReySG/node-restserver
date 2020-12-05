
//================
//Puerto
//================

process.env.PORT = process.env.PORT || 3000;


//================
//Vencimiento del token
//================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//================
//Seed/Semilla de autenticacion
//================

process.env.SEED = process.env.SEED || 'seed-desarrollo';



//================
//Entorno
//================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
//base de datos
//================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/nodeJs'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;