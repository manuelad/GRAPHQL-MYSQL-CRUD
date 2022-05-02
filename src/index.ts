import app from "./app";
import { connectDB } from "./dataSource";
import { PORT } from './config';



connectDB();
app.listen(PORT);
console.log("listen on port:", PORT);


