// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')
function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({message: err.message})
}

function validateId(req, res, next) {
    Actions.get(req.params.id)
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
    const { project_id, notes, description,} = req.body
    if(!notes || !description || !project_id) {
        const err = {status: 400, message: 'missing required info'}
        next(err)
    }
    else {
        next()
    }
}

function validateProjectId(req, res, next) {
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





module.exports = {
    errorHandler,
    validateId,
    validateBody,
    validateProjectId
}