import mongoose, { Schema } from "mongoose";
const transactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    cost: { type: String },
    products: { type: [Schema.Types.ObjectId], ref: 'Product' }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;