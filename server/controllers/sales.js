import OverallStat from "../modals/OverallStat.js";
export const getOverallStat = async (req, res) => {
    try {
        const overallStats = await OverallStat.find()
        res.status(200).json(overallStats[0])
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message })
    }
}