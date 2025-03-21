const {tasks} = require('../tasks');

module.exports = async (req, res) => {

    try {
        const { id } = req.params;

        const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex === -1) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
      
        const deletedTask = tasks.splice(taskIndex, 1)[0];

        return res.status(200).json({
            status: "deleted",
            task: deletedTask
        });

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
};
