
const express = require('express');
const http = require('http')
const app = express();
const servr = http.createServer(app)
const mod = require('./middlewares/index')
const raun = require('./routes/index')
app.use(express.json());


raun(app)

const PORT = 3000;
servr.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
