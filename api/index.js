require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const AuthMiddleware = require('./middlewares/authMiddleware')

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    app.use(cors());
    next();
});

app.get('/', AuthMiddleware, (req, res) => {
    res.send("ok - auth");
})
routes(app);

app.listen(port, ()=> console.log(`Servidor rodando na porta ${port}`))

module.exports = app;
