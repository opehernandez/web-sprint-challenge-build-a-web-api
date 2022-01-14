// add middlewares here related to projects
const Projects = require('./projects-model')

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({message: err.message})
}

function validateId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if(!project) {
                const err = {status: 404, message: 'project not found'}
                next(err)
            }
            else {
                req.project = project
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function validateBody(req, res, next) {
    const { name, description,} = req.body
    if(!name || !description) {
        const err = {status: 400, message: 'missing required info'}
        next(err)
    }
    else {
        next()
    }
}





module.exports = {
    errorHandler,
    validateId,
    validateBody
}