import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { loginRouter } from "./routes/loginRouter";
import { signupRouter } from "./routes/signupRouter";
import { expenseRouter } from "./routes/expenseRouter";
import cors  from "cors";
import express from "express";

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/expense", expenseRouter);
//create a route handler for posting expenses.

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
