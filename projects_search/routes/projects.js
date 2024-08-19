var data = require('../data-store');
var projects = data.getProjects();
var router = require('express').Router();

router.get('/',(req, res, next) => {
    if(projects.length === 0){
        res.status(200).send([]);
    }
    else {
        const sorted_projects =  projects.sort((a,b) => a.id - b.id);
        res.status(200).send(sorted_projects);
    }
})


router.get('/active', (req, res, next) => {
    const active_projects = projects.filter(obj =>
        obj.isActive === true
    );
    if(active_projects.length === 0){
        res.status(200).send([]);
    }
    else {
        const sorted_projects =  active_projects.sort((a,b) => a.id - b.id);
        res.status(200).send(sorted_projects);
    }
})

router.get('/:id', (req, res, next) => {
    const project = projects.filter(obj =>
        obj.id == parseInt(req.params.id));

    if(project.length === 0){
        res.status(404).json(`{"message" : "No Project Found"}`);
    }

    else {
        res.status(200).send(project);
    }
})

module.exports = router;
