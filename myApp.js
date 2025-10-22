const express = require("express");
const app = express();
const helmet = require("helmet");

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
// ------------------------------------------------------------------------------
//Comienzo de los desafíos de seguridad freecodecamp
app.use(helmet.hidePoweredBy()); //1. Desafío: Deshabilitar la cabecera X-Powered-By
app.use(helmet.frameguard({ action: "deny" })); //2. Desafío: Deshabilitar la cabecera X-Frame-Options
app.use(helmet.xssFilter()); //3. Desafío: Deshabilitar la cabecera X-XSS-Protection
app.use(helmet.noSniff()); //4. Desafío: Deshabilitar la cabecera X-Content-Type-Options
// ------------------------------------------------------------------------------

app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
