const RecordatorioModel = require('../models/recordatorioModel.js');

class RecordatorioController {

    getRecordatorios(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                // Obtener todos los recordatorios con los datos del usuario relacionado
                const recordatorios = await RecordatorioModel.find()
                    .populate('idUser')
                    .sort({ fecha: 1 }); // Ordenar por fecha ascendente
                
                resolve(recordatorios);
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener los recordatorios' });
            }
        });
    }

    postRecordatorio(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newRecordatorio = body;

                // Guardar el nuevo recordatorio
                const recordatorio = new RecordatorioModel(newRecordatorio);
                const recordatorioCreado = await recordatorio.save();
                
                resolve({ 
                    status: 201, 
                    message: 'Recordatorio creado correctamente', 
                    recordatorio: recordatorioCreado 
                });
            } catch (error) {
                console.log("error", error);
                reject({ status: 500, error: 'Error al crear el recordatorio' });
            }
        });
    }

    deleteRecordatorio(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedRecordatorio = await RecordatorioModel.findByIdAndDelete(id);
                if (!deletedRecordatorio) {
                    resolve({ status: 404, message: 'Recordatorio no encontrado' });
                } else {
                    resolve({ 
                        status: 200, 
                        message: 'Recordatorio eliminado correctamente', 
                        recordatorio: deletedRecordatorio 
                    });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al eliminar el recordatorio' });
            }
        });
    }   

    getRecordatorioById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const recordatorio = await RecordatorioModel.findById(id)
                    .populate('idUser');
                
                if (!recordatorio) {
                    resolve({ status: 404, message: 'Recordatorio no encontrado' });
                } else {
                    resolve({ 
                        status: 200, 
                        message: 'Recordatorio encontrado', 
                        recordatorio: recordatorio 
                    });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener el recordatorio' });
            }
        });
    }

    getRecordatoriosProximos() {
        return new Promise(async (resolve, reject) => {
            try {
                const ahora = new Date();
                const sieteDiasDespues = new Date();
                sieteDiasDespues.setDate(ahora.getDate() + 7);

                // Obtener recordatorios en los próximos 7 días
                const recordatorios = await RecordatorioModel.find({
                    fecha: {
                        $gte: ahora,
                        $lte: sieteDiasDespues
                    }
                })
                .populate('idUser')
                .sort({ fecha: 1 }); // Ordenar por fecha ascendente
                
                resolve(recordatorios);
            } catch (error) {
                console.log("error desde el controller", error);
                reject({ 
                    status: 500, 
                    error: 'Error al obtener los recordatorios próximos' 
                });
            }
        });
    }

    putRecordatorio(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedRecordatorio = await RecordatorioModel.findByIdAndUpdate(
                    id, 
                    body, 
                    { new: true }
                ).populate('idUser');
                
                if (!updatedRecordatorio) {
                    resolve({ status: 404, message: 'Recordatorio no encontrado' });
                } else {
                    resolve({ 
                        status: 200, 
                        message: 'Recordatorio actualizado correctamente', 
                        recordatorio: updatedRecordatorio 
                    });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al actualizar el recordatorio' });
            }
        });
    }   
}

module.exports = RecordatorioController;