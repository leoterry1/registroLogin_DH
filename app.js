const express = require("express");
const app = express();
const usersRouter = require("./routes/users")


app.use("/user", usersRouter)

app.set('view engine','ejs'); 
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.listen(3030, ()=> console.log("El servidor está corriendo en el puerto 3030"))