import mongoose from 'mongoose';
import config from '../config'

async function connect() {
    try {
        await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DB}`);
        console.log('DB connection stablished');
    } catch (error) {
        console.log(error);
    }
}

export default { connect };
