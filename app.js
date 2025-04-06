const express = require('express');
const mongoose = require('mongoose');
const app = express();
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());


const { mongoURI } = require('./config/config.js');
// Conectar a MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware para servir archivos estáticos
const { verifyToken } = require('./middlewares/auth.js'); 

// Importar las rutas
const routesUsers = require('./routes/users.js');
const routesCategories = require('./routes/categories.js');
const routesactividad = require('./routes/actividad.js');
const habito = require('./routes/habito.js');
const proyecto = require('./routes/proyecto.js');
const actividadRealizada = require('./routes/actividadRealizada.js');
const authRoutes = require('./routes/auth.js');
const recordatoriosRoutes = require('./routes/recordatorios.js');
const comentariosRoutes = require('./routes/comentario.js');


app.use('/users', verifyToken, routesUsers);
app.use('/categories', verifyToken, routesCategories);
app.use('/actividad', verifyToken, routesactividad);
app.use('/habito', verifyToken, habito);
app.use('/proyecto', verifyToken, proyecto);
app.use('/actividadRealizada', verifyToken, actividadRealizada);
app.use('/recordatorios', verifyToken, recordatoriosRoutes);
app.use('/comentario', verifyToken, comentariosRoutes);
app.use('/auth', authRoutes);

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    console.log("Entra en index")
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/home', (req, res) => {
    console.log("Entra en home")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/usersVista', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});
app.get('/categorias', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'categorias.html'));
});
app.get('/actividades', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'actividades.html'));
})
app.get('/habitos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'habitos.html'));
})
app.get('/recordatoriosview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recordatorio.html'));
})

const userModel = require('./models/userModel.js');
const categoriesModel = require('./models/categoriesModel.js');
//vista para usuarios
app.get('/usersView', (req, res) => {
    const usuarios = userModel.getUsers();
    res.render('usersView', {
        usuarios: usuarios
    });
});
//actividades-categoria-usuario
app.get('/actividadesview', (req, res) => {
    const actividades = userModel.getActividadesCategoriaUsuario(1, 'categoria1');
    res.render('actividadesview', {
        actividades: actividades
    });
});
//actividades realizadas
app.get('/actividadesRealizadas', (req, res) => {
    const actividadesRealizadas = userModel.getLastActividadesRealizadas(1);
    res.render('actividadesr', {
        actividadesRealizadas: actividadesRealizadas
    });
});
//categorias
app.get('/categorias', (req, res) => {
    const categorias = categoriesModel.getCategorias();
    res.render('categorias', {
        categorias: categorias
    });
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Inicio',
        message: '¡Bienvenido a la página de inicio!'
    });
});

app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});