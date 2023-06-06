import Joi from 'joi'

const OrderStatus = Joi.object({
    
    sequence: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({'*': 'A taxa de operação deve ser informada (entre 0 a 100).'}),
    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*': 'A descrição é obrigatória (entre 2 e 30 caracteres).'}),

})
.options({allowUnknown: true})
export default OrderStatus