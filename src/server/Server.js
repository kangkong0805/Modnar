const express = require('express');
const app = express();
const api = require('./index');
const cors = require('cors');

app.use(cors());
app.use('/api', api);

const port = 3001;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})