import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: String,
    stock: { type: Number, required: true },
    imageURL: [{ type: String }],
    ratings: [
        {
            rating: Number,
            user: { type: Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    discountPercent: Number
}, { timestamps: true })


const Product = mongoose.model('Product', productSchema);
export default Product;