// importar o model correspondente ao controller
const {Tag, Customer, Order} = require('../models')

const controller = {} // objeto vazio

/*
    metodos CRUD do controller
    create: Cria um novo registro
    retrieve: lista (recupera) todos os registros
    retrieveOne: Lista (recupera) um registro
    uptade: atualiza um registro
    delete: deletar um registro
*/

controller.create = async (req, res) =>{
    try{
        await Tag.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}
controller.retrieve = async (req, res)=>{
    try{
        const data = await Tag.findAll({
            include: [
                {model: Customer, as: 'customers'},
                {model: Order, as: 'orders'}
            ]
        })
        res.send(data)

    }
    catch(error){
        console.error(error)
    }
}
controller.retrieveOne = async (req, res)=>{
    try{
        const data = await Tag.findByPk(req.params.id)
        if(data) res.send(data)
        
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
    }
}
controller.update = async(req, res) =>{
    try{
        const response = await Tag.update(
            req.body,
            {where: {id: req.params.id}}
        )
        /// response retorna um vetor. O primeiro elemento
        // do vetor indica quantos registros foram afetados
        // pelo uptade
        if(response[0] > 0){
            // HTTP 204: No content
            res.status(204).end()
        }
        else{ // Não encontrou o registro para atualizar
            // HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
}
controller.delete = async (req, res) =>{
    try{
        const response = await Tag.destroy(
            {where: {id: req.params.id}}
        )
        if(response){// encontrou e excluiu
            // HTTP 204: No content
            res.status(204).end()
        }
        else{ // Não encontrou e não excluiu
            // HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error){
        console.error(error)
    }
}
module.exports = controller;