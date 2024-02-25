import { pool } from '../db/db.js';
export const renderIndex = async (req, res) => {
    try {
        // Realizamos la consulta para obtener los datos de emprendimientos
        const emprendimientosResults = await pool.query('SELECT * FROM emprendimientos');
        // Realizamos la consulta para obtener los datos de imagenes
        const imagenesResults = await pool.query('SELECT * FROM images');
        // Pasar solo el primer elemento de los resultados, que contiene los datos de la consulta
        const emprendimientos = emprendimientosResults[0];
        const imagenes = imagenesResults[0];
        res.render('index', { emprendimientos, imagenes });
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).send('Error al obtener datos de la base de datos');
    }
}


export const renderForm = (req, res) => {
    res.render('formulary');
}
export const processForm = async (req, res) => {
    try {
        //! Destructuramos el objeto req.body
        const { nombre, contacto, creador, tipo } = req.body;
        const [result] = await pool.query('INSERT INTO emprendimientos (nombre, creador, contacto, tipo) VALUES (?, ?, ?, ?)', [nombre, creador, contacto, tipo]);
        console.log({ result });
        console.log(`Nombre: ${nombre}, Contacto: ${contacto}, Creador: ${creador}, Tipo: ${tipo}`);
        res.redirect('/');
    } catch (error) {
       console.error('Error al procesar los datos del formulario' + error);
    }
}
export const renderFormUpload = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID de los parámetros de la URL
        // Realizamos la consulta para obtener los datos
        const results = await pool.query('SELECT * FROM emprendimientos');
        // Pasar solo el primer elemento de results, que contiene los datos de la consulta
        const datos = results[0];
        res.render('upload', { id, datos }); // Pasar el ID a la vista
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).send('Error al obtener datos de la base de datos');
    }
}
export const chargeImage = async (req, res) => {
    try {
        const filename = "http://localhost:4000/uploads/" + req.file.filename;
        const id_emprendimiento = req.params.id;
        // Insertar la información en la tabla images
        await pool.query('INSERT INTO images (ruta_imagen, id_emprendimiento) VALUES (?, ?)', [filename, id_emprendimiento]);
        console.log('Imagen insertada correctamente en la base de datos');
        res.redirect('/');
    } catch (error) {
        console.error('Error al insertar la imagen en la base de datos:', error);
        res.status(500).send('Error al insertar la imagen en la base de datos');
    }
};
