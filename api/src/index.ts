import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './database/connection';
import config from '../src/config';

import productRoutes from '../src/routes/product';

const app = express();

db.connect();

app.set('port', config.PORT);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRoutes);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
