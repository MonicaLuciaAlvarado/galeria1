const Comentario = require("../models/comentario.model");
const jwt = require("jsonwebtoken");
const secret_key = "Clave secreta";

module.exports.get_all = (req, res) => {
    Comentario.find()
    //1 ASC 1-10 -1 DES 10-1
    .then(comentarios => res.json(comentarios))
    .catch(err => {res.status(400).json(err)});
}

//Crear una nueva actividad
module.exports.create_comentario = (req,res) =>{
    usertoken_decoded = jwt.verify(req.cookies.usertoken, secret_key);
    let nuevoComentario = req.body;
    nuevoComentario.creador = usertoken_decoded._id;
    Comentario.create(nuevoComentario)
    .then(comentario => res.json(comentario))
    .catch(err => {
        res.status(400).json(err);
    })
}

//Actualiza una actividad
module.exports.update_comentario = (req,res) =>{
    usertoken_decoded = jwt.verify(req.cookies.usertoken, secret_key);
    Comentario.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}, {runValidators:true})
    .then(comentario => res.json(comentario))
    .catch(err => {res.status(400).json(err)});
}

//Borre actividad en base a su ID
module.exports.delete_comentario = (req, res) =>{
    usertoken_decoded = jwt.verify(req.cookies.usertoken, secret_key);
    Comentario.deleteOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => {res.status(400).json(err)});
}