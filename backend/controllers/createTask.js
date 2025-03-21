const {tasks} = require('../tasks');

module.exports = async (req, res) => {

    try {

        const { title, description, group } = req.body;

        if (!title || !description === undefined ) {
            return res.status(400).json({ error: 'El título y la descripción son requeridos' });
        }

        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            group : group || null,
            createdAt : new Date().toISOString(),
            updatedAt : null
        }

        tasks.push(newTask)

        return res.status(201).json({
            status: 'created',
            task: newTask
        })

    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
};
