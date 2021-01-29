let bcrypt = require("bcrypt")
const fs = require("fs");
module.exports = {
    formLogin: (req, res) => {
        console.log(req.body)
        let mensaje = false
        res.render("login", { mensaje })
    },
    login: (req, res) => {
        let { email, password } = req.body
        let archivoUsuarios = fs.readFileSync("./public/data/usuarios.json", "utf-8")
        let usuarios = JSON.parse(archivoUsuarios)
        let usuario = usuarios.find(usuario => {
            return usuario.email === email
        })
        if (req.body == undefined || password == "" || email == "") {
            res.render("login", { mensaje: "Por favor, ingrese los datos requeridos" })
        } else {
            if (usuario == undefined) {
                res.render("login", { mensaje: "El usuario no se encuentra registrado" })
            } else if (bcrypt.compareSync(password, usuario.password)) {
                res.render("profile", { usuario })
            } else {
                res.render("login", { mensaje: "Contraseña incorrecta" })
            }
        }


    },
    formRegister: (req, res) => {
        let asterisco = false
        let mensaje = false
        res.render("register", { asterisco, mensaje })
    },
    register: (req, res, next) => {
        let { name, email, password } = req.body
        let archivoUsuarios = fs.readFileSync("./public/data/usuarios.json", "utf-8")
        let usuarios = JSON.parse(archivoUsuarios)
        let img
        if (req.files[0] == undefined) {
            img = "perfil.jpg"
        } else {
            img = req.files[0].filename
        }
        let existe = usuarios.find(usuario => {
            return usuario.email === email
        })
        if (req.body == undefined || name == "" || email == "" || password == "") {
            res.render("register", { mensaje: "Por favor, complete todos los campos", asterisco: "*" })
        } else {
            if (existe === undefined) {
                let usuario = {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    img
                }

                usuarios.push(usuario)
                fs.writeFileSync("./public/data/usuarios.json", (JSON.stringify(usuarios)))
                res.redirect("/user/login")

            }else {
                res.render("register", { mensaje: `El correo electrónico ya se encuentra registrado, si es tu cuenta, <a href="/user/login">inicia sesión.</a>`, asterisco: false })
            }
        }
    }
}