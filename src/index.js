const app = require("./app");
const port = process.env.PORT || 3000; //Para indicar al server en que puerto ejecutarse
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

app.listen(port, () => {
  console.log("----- SERVER ON -----");
  console.log(`DOCKER: http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
  console.log(`LOCALHOST: http://${IP_SERVER}:5000/api/${API_VERSION}/`);
});
