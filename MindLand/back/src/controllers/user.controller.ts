import * as express from 'express';
import User from '../models/user';
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import multer from 'multer'
import ResetToken from '../models/reset_token'


export class UserController{
   
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type
        User.findOne({'username': username, 'password': password, 'type': type}, (err, user) =>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let email = req.body.email;
        User.findOne({$or: [{ 'username': username }, {'email': email },]}, (err, user) =>{
            if(err) console.log(err);
            else if(user != null){
                if(user.email == email) res.json({"message": -1})
                else if(user.username == username) res.json({"message": -2})
            }
            else{
                let user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: username,
                    email: email,
                    password: req.body.password,
                    type: 'player',
                    tokens: 50,
                    rating: 0
                })
                user.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": -2})
                    }
                    else res.json({"message": 0})
                })
            }
        })
    }

    getBestUsers = async (req: express.Request, res: express.Response)=>{
        let count = req.body.count;
        let myUsername = req.body.username;
        User.find({}, (err, users) =>{
            if(err) console.log(err);
            let topUsers = [];
            for(let u of users) topUsers.push(u);
            topUsers.sort((a, b)=>{
                return b.rating - a.rating;
            })
            let myRang = -1;
            for(let i = 0;i < topUsers.length; i++){
                if(topUsers[i].username == myUsername){
                    myRang = i + 1;
                    break;
                }
            }
            res.json({'best': topUsers.slice(0, count), 'user-rang': myRang});
        })
    }

    resetPassword = (req: express.Request, res: express.Response)=>{
        let expire_time = new Date();
        expire_time.setMinutes(expire_time.getMinutes() + 30);

        let reset_token = new ResetToken({token: crypto.randomBytes(16).toString('hex'),
                        email: req.body.email, expire_time: expire_time});

        reset_token.save().then(user=>{
                console.log("Token saved in database");
            }).catch(err=>{
                res.status(400).json({'message': 'error'});
            })

        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'email here',
                pass: 'password here'
            }
        });
        var mailOptions = {
            from: 'email here',
            to: req.body.email,
            subject: 'Promena lozinke',
            text: `http://localhost:4200/promena_zaboravljene_lozinke/${reset_token.token}`
        };
        console.log(req.body.email);
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {console.log(error); res.send(error)}
            else  res.status(200).json({'message': 'poruka poslata'});
        })
    }

    tokenValidation = (req: express.Request, res: express.Response)=>{
        let token = req.body.token;
        console.log(token);
        ResetToken.findOne({'token': token}, (err, mytoken)=>{
            if(err) console.log(err);
            else {
                console.log("Token pronadjen.")
                if(new Date() > mytoken.expire_time) res.status(200).json({'poruka': 'Vreme isteklo'});
                else { console.log('Token dobar'); res.status(200).json({'poruka': 'Ok', 'email':mytoken.email});}
            };
        })
    }

    changeForgotPassword = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        let password = req.body.password;

        User.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            else if(user == null) res.status(200).json({'poruka': 'Korisnik ne postoji'});
            else {
                console.log(`${user.username} password changed`);
                user.password = password;
                user.save().then(us=>{
                    res.status(200).json({'poruka': 'Lozinka promenjena'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'Greska pri promeni lozinke'});
                })
            }
        })
    }

}