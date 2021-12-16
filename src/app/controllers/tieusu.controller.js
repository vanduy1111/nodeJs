const Biography = require('../model/biography.model')
class tieusuController  {

    tieusu(req, res, next){
        if(!req.session.user){
            Biography.find({})
            .then(biographys => res.render('tieusu', { biographys }))
            .catch(next)
        } else {
            Biography.find({})
            .then(biographys => res.render('tieusu', {user:  req.session.user, biographys: biographys}))
            .catch(next)
        }
        
    }

    show(req, res, next){
        if(!req.session.user){
            Biography.find({})
            .then(biographys => res.render('tieusu', { biographys }))
            .catch(next)
        } else {
            Biography.findOne({ slug: req.params.slug })
            .then(biography => {
                res.render('chitiet', {user:  req.session.user, biography: biography})
            })
            .catch(next)
        }
        
    }

    search(req, res, next){
        if(!req.session.user) {
            Biography.find({})
            .then(biographys => res.render('tieusu', { biographys }))
            .catch(next)
        } else {
            Biography.find({ 
                name: {$regex: '.*' + req.body.name + '.*', $options: 'i'}
            })
            .then(biographys => {
                res.render('tieusu', {user:  req.session.user, biographys: biographys})
            })
            .catch(next)
        }
        
    }

}

module.exports = new tieusuController;




                
             