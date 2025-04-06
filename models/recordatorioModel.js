const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const RecordatorioSchema = new Schema({
  titulo: { 
    type: String, 
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [100, 'El título no puede exceder los 100 caracteres']
  },
  descripcion: { 
    type: String, 
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
  },
  fecha: { 
    type: Date, 
    required: [true, 'La fecha es obligatoria'],
  },
  prioridad: { 
    type: String, 
    required: [true, 'La prioridad es obligatoria'],
    enum: {
      values: ['URGENTE', 'IMPORTANTE', 'NORMAL'],
      message: 'Prioridad no válida. Use: URGENTE, IMPORTANTE o NORMAL'
    },
    default: 'NORMAL'
  },
  idUser: { 
    type: ObjectId, 
    ref: 'User', 
    required: [true, 'El usuario es obligatorio'] 
  },
  completado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Índice para búsquedas frecuentes
RecordatorioSchema.index({ fecha: 1, prioridad: -1 }); // Ordenar por fecha ascendente y prioridad descendente

module.exports = mongoose.model('Recordatorio', RecordatorioSchema);