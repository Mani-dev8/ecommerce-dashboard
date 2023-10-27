import Product from "../modals/Product.js"
import User from "../modals/User.js"
import ProductStat from "../modals/ProductStat.js"
import Transaction from "../modals/Transaction.js"
import getCountryIso3 from "country-iso-2-to-3";
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const productStats = await Promise.all(products.map(async (product) => {
            const stat = await ProductStat.find({
                productId: product._id
            })
            return {
                ...product._doc,
                stat,
            }
        }))
        res.status(200).json(productStats)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password")
        res.status(200).json(customers)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const conditions = {
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { "user.name": { $regex: new RegExp(search, "i") } },
            ],
        };

        const transactions = await Transaction.aggregate([

            {
                $lookup: {
                    from: 'users',
                    localField: "userId",
                    foreignField: '_id',
                    as: 'user'
                },

            },
            {
                $match: conditions,
            },
            {
                $project: {
                    _id: 1,
                    cost: 1,
                    products: 1,
                    user: {
                        $arrayElemAt: ["$user.name", 0],
                    },
                    createdAt: 1
                },
            },
            {
                $sort: sortFormatted
            },
            {
                $skip: page * pageSize
            },
            {
                $limit: parseFloat(pageSize),
            },

        ])

        const total = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $match: conditions
            },
            {
                $count: 'count'
            }
        ]);
        const totalResult = total.length > 0 ? total[0].count : 0
        res.status(200).json({
            transactions,
            totalResult,
        });
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message });
    }
};

export const getGeography = async (req, res) => {
    try {
        const users = await User.find()
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country)
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0
            }
            acc[countryISO3]++;
            return acc;
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => ({ id: country, value: count }))
      
        res.status(200).json(formattedLocations)
    } catch (error) {
        console.error(error)
        res.status(404).json({ message: error.message })
    }
}