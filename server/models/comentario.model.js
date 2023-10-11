const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema(
    {
        contenido: {
            type:String,
            required: [true, "Contenido no puede ir vacío"]
        },
        obraId:{
            type:String,
            required: [true]
        },
        creador:{
            type: String
        }
    },{timestamps: true, versionKey:false}
)

const comentario= mongoose.model("comentarios", comentarioSchema);
module.exports = comentario;