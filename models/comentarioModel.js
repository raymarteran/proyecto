const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ComentarioSchema = new Schema({
    texto: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 500
    },
    idActividad: { 
        type: ObjectId, 
        ref: 'Actividad', 
        required: true 
    },
    idUser: { 
        type: ObjectId, 
        ref: 'User', 
        required: true 
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);