import mongoose, { Schema } from "mongoose";
const affiliateStatSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    affiliateSales: {
        type: [Schema.Types.ObjectId],
        ref: "Transaction"
    },
    
})

const AffiliateStat = mongoose.model('AffiliateStat', affiliateStatSchema);

export default AffiliateStat;