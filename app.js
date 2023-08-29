const express = require('express')
const app = express()
require("dotenv").config();
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`app listen in port ${process.env.PORT}`);
});