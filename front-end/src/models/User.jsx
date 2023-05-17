import Joi from 'joi'

const User = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({'*': 'O nome é obrigatório (entre 2 e 100 caracteres).'}),
    email: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({'*': 'O email é obrigatório (entre 2 e 100 caracteres).'}),
    phone: Joi.string()
        .min(14)
        .max(20)
        .required()
        .messages({'*': 'O telefone é obrigatório (entre 14 e 20 caracteres).'}),
    password: Joi.string()
        .min(6)
        .max(200)
        .required()
        .messages({'*': 'A senha é obrigatório (entre 6 e 200 caracteres).'})
})
export default User