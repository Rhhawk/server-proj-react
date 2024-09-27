import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/pedidos', async (req, res)=>{
    const myRequests = await prisma.request.findMany()

    res.status(200).json(myRequests)
})

app.post('/pedidos', async (req, res) =>{
 
    const myRequest = await prisma.request.create({
    data:{
        request: req.body.pedido,
        client: req.body.cliente
    }
 })
   
    res.status(201).json(myRequest)
})

app.put('/pedidos/:id', async (req, res) =>{
    
    req.params.id
    const myRequest = await prisma.request.update({
    where: {
        id: req.params.id
        
    },
    data:{
        request: req.body.pedido,
        client: req.body.cliente
    }
 })
   
    res.status(201).json(myRequest)
})

app.delete('/pedidos/:id', async (req, res) =>{
    
    await prisma.request.delete({
    where: {
        id: req.params.id
    },
    
 })
   
    res.status(201).json({ message: 'usuario deletado'})
})

/*app.post('/pedidos', async (req, res) => {
    console.log('Corpo da requisição:', req.body)
    try {
        const myRequest = await prisma.request.create({
            data: {
                request: req.body.pedido,
                client: req.body.cliente
            }
        });
        res.status(201).json({ message: "Pedido criado com sucesso", myRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar pedido", error: error.message });
    }
});*/



app.listen(3001)