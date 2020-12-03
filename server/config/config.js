
//================
//Puerto
//================

process.env.PORT = process.env.PORT || 3000;


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
    urlDB = 'mongodb+srv://Reigner:oU5ZL90cc9OMo8hA@cluster0.luuh0.mongodb.net/cafe'
}

process.env.URLDB = urlDB;