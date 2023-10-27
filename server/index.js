import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* DATA import */
import User from "./modals/User.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";
import Product from "./modals/Product.js";
import ProductStat from "./modals/ProductStat.js";
import Transaction from "./modals/Transaction.js";
import OverallStat from "./modals/OverallStat.js";
import AffiliateStat from "./modals/AffiliateStat.js";


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


/* ROUTES */

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected')
    app.listen(PORT, () => console.log(`server is listening on PORT: ${PORT}`))
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // OverallStat.insertMany(dataOverallStat)
    // ProductStat.insertMany(dataProductStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
    // Transaction.insertMany(dataTransaction)
}).catch(err => console.error(`${err} \n\nDB did not connected\n`));
