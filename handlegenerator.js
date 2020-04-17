let jwt = require('jsonwebtoken');
let config = require('./config');
const Mongolib = require("./db/usuarios");
const md5 = require("blueimp-md5");

// Clase encargada de la creación del token
class HandlerGenerator {

    login(req, res) {


        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username1 = req.body.username;
        let password = req.body.password;

        let hashp = md5(password);

        Mongolib.getDatabase(db => {
            Mongolib.findDocumentsById(db, docs => {
                // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
                let mockedUsername = docs[0].username;
                let mockedPassword = docs[0].password;

                // Si se especifico un usuario y contraseña, proceda con la validación
                // de lo contrario, un mensaje de error es retornado
                if (username1 && password) {

                    // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
                    // de lo contrario, un mensaje de error es retornado
                    if (username1 === mockedUsername && hashp === mockedPassword) {

                        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                        let token = jwt.sign({ username: username1 },
                            config.secret, { expiresIn: '24h' });

                        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                            
                        });

                    } else {

                        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                        res.send(403).json({
                            success: false,
                            message: 'Incorrect username or password'
                        });

                    }

                } else {

                    // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
                    res.send(400).json({
                        success: false,
                        message: 'Authentication failed! Please check the request'
                    });

                }
            }, username1)
        })
    }

    index(req, res) {
        // Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: "Loggeado exitosamente"
        });
    }
    
    prueba(req, res) {
        // Permite insertar un usuario
        let user = req.body;

        Mongolib.getDatabase(db => {
            Mongolib.insertDocuments(db, result => {
                res.json({
                    success: true,
                    message: result
                });
            }, user)
        })
    }

    delete(req, res) {
        // Permite borrar un usuario por el username dado
        let user = req.body.username;

        Mongolib.getDatabase(db => {
            Mongolib.removeDocument(db, result => {
                res.json({
                    success: true,
                    message: result
                });
            }, user)
        })
    }

    listUsers(req, res) {
        // Lista los nombres de los usuarios, no importa el rol en este caso
        Mongolib.getDatabase(db => {
            Mongolib.findNames(db, docs => {
                res.json({
                    success: true,
                    message: docs
                });
            })
        })

    }
}

module.exports = HandlerGenerator;