import 'dotenv/config';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import { route } from './routes/index.routes';
import morgan from 'morgan';

const app = express();


const PORT = process.env.PORT || 3000;

const whiteList = process.env.WHITE_LIST ? process.env.WHITE_LIST.split(',') : '';
app.use(cors({origin: whiteList}));

//Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'))

//Route
route(app);


const main = () => {
  app.listen(PORT, () => {
    console.log(colors.bgGreen.black(` ==>> Server is running on PORT: [${PORT}] `))
  })
}

main();