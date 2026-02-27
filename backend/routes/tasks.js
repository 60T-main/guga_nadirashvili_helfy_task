import express from 'express'

import data from "#data"


const router = express.Router();

const requiredFields = ["title", "description", "completed", "priority"]

// Funtion that builts Maps for better lookups
const buildTaskMap = () => {
    const taskMap = new Map();
    for (const task of data) {
        taskMap.set(Number(task.id), task);
    }
    return taskMap;
};
// Funtion that builts Maps WITH indexes for better deletes
const buildTaskIndexMap = () => {
  const indexMap = new Map();
  for (let i = 0; i < data.length; i++) {
    indexMap.set(Number(data[i].id), i);
  }
  return indexMap;
};

router.route('/')
    .get((req, res) =>
    {
        // GET list logic
        res.send(data);

        // GET list logic END
    })
    .post((req, res, next) =>
    {
        // POST logic
        const title = req.body.title
        const description = req.body.description
        const completed = req.body.completed 
        const priority = req.body.priority

        // Simple validation for required values.
        if (typeof title !== 'string' || !title.trim()) {
            const error = new Error('Data incomplete, missing title');
            error.status = 400;
            return next(error);
        }

        if (typeof description !== 'string' || !description.trim()) {
            const error = new Error('Data incomplete, missing description');
            error.status = 400;
            return next(error);
        }

        if (typeof completed !== 'boolean') {
            const error = new Error('Data incomplete, missing completed');
            error.status = 400;
            return next(error);
        }

        if (!['low', 'medium', 'high'].includes(priority)) {
            const error = new Error('Data incomplete, missing priority');
            error.status = 400;
            return next(error);
        }

        let element;

        try {
            element = {
                "id": Math.floor(100000000 + Math.random() * 900000000),
                'title': title,
                'description': description,
                'completed': completed,
                "createdAt": new Date(),
                'priority': priority,
            }

            data.push(element)

        } catch (error) {
            return next(error);
        }

        res.status(201).json({ success: true, data: element });

        // POST logic END

    });

router.route('/:id')
    .get((req, res, next) =>
    {
        // GET detail logic
        const id = req.params.id;

        if (!id){
            const error = new Error(`Data incomplete, missing id`);
            error.status = 400; return next(error);
        }

        let element;

        try {
            const taskMap = buildTaskMap();
            element = taskMap.get(Number(id));

            if (!element) {
                const error = new Error(`Entry not found`);
                error.status = 404
                throw error
            }

        } catch (error) {
            return next(error)
        }

        res.status(200).json({ success: true, data: element });
        
        // GET detail logic END
    })
    .put((req, res, next) =>
    {
        // PUT detail logic
        const id = req.params.id;


        if (!id){
            const error = new Error(`Data incomplete, missing id`);
            error.status = 400;
            return next(error);
        }

        let element; 
        
        try {
            const taskMap = buildTaskMap();
            element = taskMap.get(Number(id));

            if (!element) {
                throw new Error('Entry not found', { status: 404 });
            }

            for (const [key, value] of Object.entries(req.body)) {
                if (!requiredFields.includes(key)) {
                const error = new Error(`Entry not '${key}'allowed`);
                error.status = 400
                throw error
                }
                if (value !== undefined) {
                    element[key] = value;
                }
            }
        

        } catch (error) {
            return next(error)
        }

        res.status(200).json({ success: true, data: element });

        // PUT detail logic END

    })
    .delete((req, res, next) =>
    {
        // DELETE detail logic

        const id = req.params.id;


        if (!id){
            const error = new Error(`Data incomplete, missing id`);
            error.status = 400;
            return next(error);
        }

        let deletedElement; 

        try {
            const taskMap = buildTaskIndexMap();
            const elementIndex = taskMap.get(Number(id));

            if (elementIndex === undefined) {
                throw new Error('Entry not found', { status: 404 });
            }

            deletedElement = data.splice(elementIndex, 1)[0];

        } catch (error) {
            return next(error)
        }

        res.status(200).json({ success: true, data: deletedElement });


        // DELETE detail logic END
        
    });

router.route('/:id/toggle')
    .patch((req, res, next) => {
        // PATCH detail logic
        const id = req.params.id;

        if (!id) {
            const error = new Error(`Data incomplete, missing id`);
            error.status = 400;
            return next(error);
        }

        let element;
        
        try {
            const taskMap = buildTaskMap();
            element = taskMap.get(Number(id));

            if (!element) {
                const error = new Error('Entry not found')
                error.status = 404
                throw error
            };
            

            element.completed = !element.completed

        } catch (error) {
            return next(error)
        }

        res.status(200).json({ success: true, data: element });

        // PATCH detail logic END
    })

export default router;

