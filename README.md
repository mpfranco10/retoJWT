# RetoJWT
Después de hacer npm install, se debe hacer lo siguiente:

Primero se debe cargar la colección de usuarios:
mongoimport --db retoJWT --collection users --file .\usuarios.json --jsonArray

Las contraseñas se guardaron con su hashMD5. 
Se hace post /login con username y password que estén en la colección para poder obtener un token.

Hay 3 roles: invitado, usuario y admin. 

Los 3 pueden acceder a GET/users para obtener los nombres de usuarios existentes.

Tanto usuario como admin pueden crear usuarios POST/newuser, poniendo toda la información del usuario, por ejemplo:

{   "username":"us66",
    "password":"6e6fdf956d04289354dcf1619e28fe77",
    "name":"Usuario 66",
    "rol":"invitado"  
  }
  
Solo el usuario con rol admin puede eliminar usuarios, en la ruta POST/delete, especificando en el body el username que desea eliminar
