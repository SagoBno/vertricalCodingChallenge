import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: {
        unique: true,
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    shortDescription: {
        type: String,
        trim: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model('Product', productSchema);