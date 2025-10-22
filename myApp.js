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
app.use(helmet.ieNoOpen()); //5. Desafío: Deshabilitar la cabecera X-Download-Options
app.use(helmet.hsts({ maxAge: 7776000 })); //6. Desafío: Deshabilitar la cabecera Strict-Transport-Security
app.use(helmet.dnsPrefetchControl()); //7. Desafío: Deshabilitar la cabecera X-DNS-Prefetch-Control
app.use(helmet.noCache()); //8. Desafío: Deshabilitar la cabecera Cache-Control
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  }),
); //9. Desafío: Deshabilitar la cabecera Content-Security-Policy
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
