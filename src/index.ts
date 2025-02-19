import express from "express";
import { AppDataSource } from "./config/data-source";
import "dotenv";
import { signupRouter } from "./routes/signupRouter";
import { loginRouter } from "./routes/loginRouter";

const app = express();

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter)

app.get("/", (req, res) => {
  res.send("Hello, TypeORM with Express!");
  //send front end
});

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error: any) => console.log(error));
