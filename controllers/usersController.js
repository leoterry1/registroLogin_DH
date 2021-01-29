let bcrypt = require("bcrypt")
const fs = require("fs");
module.exports = {
    formLogin: (req,res)=>{
        console.log(req.body)
        let mensaje = false
        res.render("login", {mensaje})
    },
    login: (req,res)=>{
        let {email, password} = req.body
        let archivoUsuarios = fs.readFileSync("./public/data/usuarios.json", "utf-8")
        let usuarios = JSON.parse(archivoUsuarios)
        let usuario = usuarios.find(usuario =>{
            return usuario.email === email
        })
        if(usuario == undefined){
            res.render("login", {mensaje: "El usuario no se encuentra registrado"})
        } else if (bcrypt.compareSync(usuario.password, password)){
            res.render("profile", {usuario})
        } else {
            res.render("login", {mensaje:"Contraseña incorrecta"})
        }

    },
    formRegister: (req,res)=>{
        let error = false
        res.render("register",{error})
    },
    register: (req,res, next)=>{
        let {name , email , password} = req.body
        let archivoUsuarios = fs.readFileSync("./public/data/usuarios.json", "utf-8")
        let usuarios = JSON.parse(archivoUsuarios)
        let existe = usuarios.find(usuario =>{
            return usuario.email === email
        })
            if(existe === undefined){
                console.log(existe)
                let usuario = {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    img : req.files[0].filename
                }
                
                usuarios.push(usuario)
                fs.writeFileSync("./public/data/usuarios.json",(JSON.stringify(usuarios)))
                res.redirect("/user/login")
                
            }else{
                error = true
                res.render("register", {error})
            }
            
            
        

    }
}