//ARQUIVO RESPONSÁVEL APENAS POR RODAR O SERVIDOR

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes/index")
app.use("/routes", routes)


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
