const express = require('express');
const {
    verificaToken
} = require('../middlewares/auth');
let app = express();
let Producto = require('../models/producto');

//Obtener productos
app.get('/producto', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({
            disponible: true
        })
        .skip(desde)
        .limit(10)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        })

});

//Obtener producto por id
app.get('/producto/:id', (req, res) => {

    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        })

});

//Crear un producto
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            categoria: productoDB
        })
    })


});

app.get('/producto/buscar/:termino', verificaToken,( req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');
    Producto.find({nombre: regex })
            .populate('categoria', 'descripcion')
            .exec((err, productos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                
                res.json({
                    ok: true,
                    productos
                })
            })
})

//editar producto
app.put('/producto/:id', (req, res) => {

});

app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    // let disponible = productoDB.disponible;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB || productoDB.disponible == false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'producto no existe'
                }
            });
        }
       
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            })

        })

    })
});


module.exports = app;