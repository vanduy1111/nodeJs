const Biography = require('../model/biography.model')
const Users = require('../model/user.model');
class HomeController  {

    async home(req, res, next) { 
        if(!req.session.user) {
            Biography.find({})
            .then(biographys => res.render('home', { biographys }))
            .catch(next)
        } else {
            Biography.find({})
            .then(biographys => res.render('home', {user:  req.session.user, biographys: biographys}))
            .catch(next)
        }
    }

     // [GET] /logout
     logout(req, res, next){
        if(req.session.user) {
            console.log('ddawng xuat')
            req.session.destroy();
        }
        res.redirect('/');
     }
    
    // [GET] /show/login
    showlogin(req, res, next){
        console.log(req.session.user);
        if(!req.session.user) {
            console.log('asasdfd')
            res.render('login')
        } else {
            console.log('asd')
            Biography.find({})
            .then(biographys => res.render('home', {user:  req.session.user, biographys: biographys}))
            .catch(next)
        }
    }

    //[POST] /login
    async login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const biographys = await Biography.find({});
        const user = await Users.findOne({email: email, password: password});
        if(user) {
            var msg = 'login successfull'
            req.session.user = email;
            console.log(req.session.user);
            res.cookie('userID', user.id);
            res.render('home', {user:  req.session.user, biographys: biographys})
        } else {
            var msg = "login faild";
            res.render('login', {msg})
        }
        console.log(req.session.user);
        


        // Users.findOne({$and: [{email: email}, {password: password}]}, (err, user) => {
        //     if(user) {
        //         var msg = 'login successfull'
        //         req.session.user = email;
        //         console.log(req.session.user);
        //         res.cookie('userID', user.id);
        //         res.render('home', {user:  req.session.user, biographys: biographys})
        //     } else {
        //         var msg = "login faild";
        //         res.render('login', {msg})
        //     }
        //     // res.json(user)
        // })
        // res.render('login')
        // console.log(req.session.user);
    }

    //[GET] /show/register
    showregister(req, res){
        res.render('register')
    }

    //[POST] /register
    async register(req, res, next){
        const email = req.body.email;
        Users.findOne({email: email}, (err, user) => {
            if(user) {
                var msg = "email da su dung";
            } else if(req.body.password != req.body.repassword){
                var msg = "password va rpassword ko giong"
            } else {
                Users.create({email: req.body.email, password: req.body.password})
                var msg = "register thanh cong"
            }
            res.render('login', {msg})
        })
    }


}

module.exports = new HomeController;




                
             