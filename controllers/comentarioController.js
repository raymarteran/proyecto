const ComentarioModel = require('../models/comentarioModel.js');
const ActividadModel = require('../models/actividadModel.js');
const UserModel = require('../models/userModel.js');

class ComentarioController {

    getComentariosByActividad(idActividad) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividad = await ActividadModel.findById(idActividad);
                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad no encontrada' });
                    return;
                }

                const comentarios = await ComentarioModel.find({ idActividad })
                    .populate('idUser')
                    .sort({ fecha: -1 }); // Ordenar los ente
                
                resolve(comentarios);
            } catch (error) {
                reject({ 
                    status: 500, 
                    error: 'Error al obtener los comentarios de la actividad' 
                });
            }
        });
    }

    postComentario(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const { texto, idActividad, idUser } = body;

                if (!texto || !idActividad || !idUser) {
                    resolve({ status: 400, message: 'Faltan campos requeridos' });
                    return;
                }
                const [actividad, user] = await Promise.all([
                    ActividadModel.findById(idActividad),
                    UserModel.findById(idUser)
                ]);

                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad  no encontrados' });
                    return;
                }
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                    return;
                }

                const nuevoComentario = new ComentarioModel({
                    texto,
                    idActividad,
                    idUser,
                    fecha: new Date()
                });

                const comentarioCreado = await nuevoComentario.save();
                
                resolve({ 
                    status: 201, 
                    message: 'Comentario creado correctamente', 
                    comentario: comentarioCreado 
                });
            } catch (error) {
                console.error("Error al crear comentario:", error);
                reject({ 
                    status: 500, 
                    error: 'Error al crear el comentario' 
                });
            }
        });
    }

    deleteComentario(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedComentario = await ComentarioModel.findByIdAndDelete(id);
                
                if (!deletedComentario) {
                    resolve({ status: 404, message: 'Comentario no encontrado' });
                } else {
                    resolve({ 
                        status: 200, 
                        message: 'Comentario eliminado correctamente', 
                        comentario: deletedComentario 
                    });
                }
            } catch (error) {
                reject({ 
                    status: 500, 
                    error: 'Error al eliminar el comentario' 
                });
            }
        });
    }

    putComentario(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const { texto } = body;

                if (!texto) {
                    resolve({ status: 400, message: 'El texto del comentario es requerido' });
                    return;
                }

                const updatedComentario = await ComentarioModel.findByIdAndUpdate(
                    id,
                    { texto },
                    { new: true }
                ).populate('idUser');

                if (!updatedComentario) {
                    resolve({ status: 404, message: 'Comentario no encontrado' });
                } else {
                    resolve({ 
                        status: 200, 
                        message: 'Comentario actualizado correctamente', 
                        comentario: updatedComentario 
                    });
                }
            } catch (error) {
                reject({ 
                    status: 500, 
                    error: 'Error al actualizar el comentario' 
                });
            }
        });
    }
}

module.exports = ComentarioController;