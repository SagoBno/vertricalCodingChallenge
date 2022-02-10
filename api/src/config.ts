import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_DB: process.env.MONGO_DB,
    MONGO_HOST: process.env.MONGO_HOST,
    PORT: process.env.PORT,
};
