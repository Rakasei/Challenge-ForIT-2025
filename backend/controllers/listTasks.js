const tasks = require('../tasks')

module.exports = async (req, res) => {

    try {
        return res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}