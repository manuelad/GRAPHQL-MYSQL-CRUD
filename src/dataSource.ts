import { User } from './Entities/User';
import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config';


console.log(DB_HOST);
const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  port: Number(DB_PORT),
  entities: [User],
  ssl: false,
});

export function connectDB() {
  AppDataSource.initialize()
    .then(() => { console.log('connect to db'); })
    .catch((error) => console.log(error));
}

export default AppDataSource;
