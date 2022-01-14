// Write your "projects" router here!
const express = require('express')

const router = express.Router()
const Projects = require('./projects-model')
const { errorHandler, validateId, validateBody } = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateId, (req, res, next) => {
    res.json(req.project)
})

router.post('/', validateBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(proInserted => {
            res.status(201).json(proInserted)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', validateId, validateBody, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(proUpdated => {
            res.json(proUpdated)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(proDeleted => {
            res.json({message: `Project with ID: ${proDeleted} has been deleted`})
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions)
        })
        .catch(err => {
            next(err)
        })
})

router.use(errorHandler)

module.exports = router