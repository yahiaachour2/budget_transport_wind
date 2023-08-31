const express = require("express")
const app=express()
const db=require('./models')
const userRoutes=require("./routers/user-routes")
const productRoutes=require("./routers/product-routes")
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});
app.use('/',userRoutes)
app.use('/',productRoutes)



db.sequelize.sync({force:false}).then(()=>{
    app.listen(3000,()=> console.log("server listening in Port 3000"))
})