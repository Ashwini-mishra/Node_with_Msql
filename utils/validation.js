const Joi = require("joi");

module.exports = {
    login: () =>{
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    },

    register: () => {
        return Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
            name: Joi.string().required(),
        })
    },

    post : () =>{
        return Joi.object({
            post: Joi.string().required(),
            discription: Joi.string().required(),
        })
    },

    comments: ()=>{
        return Joi.object({
            comments: Joi.string().required(),
        })
    }
}
