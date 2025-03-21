const {tasks} = require('../tasks');

module.exports = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, group, updatedAt } = req.body;

        if (!title || !description === undefined ) {
            return res.status(400).json({ error: 'El título y la descripción son requeridos' });
        }

        const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex === -1){
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
      
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: title || tasks[taskIndex].title,
            description: description || tasks[taskIndex].description,
            group: group || tasks[taskIndex].group,
            updatedAt: new Date().toISOString() 
        };

        return res.status(200).json({
            status: 'updated', task: tasks[taskIndex] 
        })

    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor'
        })
    }
};
