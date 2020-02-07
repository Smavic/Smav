const {User} = require('../models')
const bcryptPass = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController{
    static register (req, res, next) {
 
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image_profile: ''
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static login (req, res, next){

        if(req.body.email === "" || req.body.password === ""){
            next ({code: 400, message:'please insert email and password'})
        } else {
            User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(result => {
                
                const user = result.dataValues
                console.log(user)
                if(result === null){
                    throw {code: 400, message:'email/password is wrong'}
                } else {
                    const compare = bcryptPass.comparePassword(req.body.password, user.password)
                    if(!compare){
                        throw {code: 400, message:'email/password is wrong'}
                    } else {
                        const jwtToken = jwt.signToken(user.id)
                        res.status(200).json({
                            token: jwtToken,
                            id: user.id, 
                            name: user.name})
                    }
                }
            })
            .catch(next)
        }
    }

    static async googleLogin (req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const user = {
                name: payload.name,
                email: payload.email,
                password: payload.sub
            }

            User.findOne({
                where: {
                    email: user.email
                }
            })
            .then(result => {
                if(!result) {
                    return User.create(user)
                } else {
                    return result
                }
            })
            .then(result => {
                    console.log("masuk sini")
                    const jwtToken = jwt.signToken(result.id)
                    console.log(jwtToken)
                    res.status(200).json({
                        token: jwtToken,
                        id: result.id, 
                        name: result.name
                    })
            })
        } catch (err) {
            next(err)
        }

    }
}

module.exports = UserController