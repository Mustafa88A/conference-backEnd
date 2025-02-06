const dotevn = require("dotenv");
dotevn.config();

const DataBases = require("./DataBases");
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const port = 7800;
const app = express();
const userRouter = require("./routes/user.routes");
const userAdmin = require("./routes/admin.routes");
const research = require("./routes/research.routes");
const category = require("./routes/category.routes");
const participant = require("./routes/participant.routes");
DataBases();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use("/research", research);
app.use("/user", userRouter);
app.use("/admin", userAdmin);
app.use("/home", category);
app.use("/par", participant);
app.listen(port, () => {
  console.log(`hello in server port 7800`);
});
