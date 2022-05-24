const express = require('express');

const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')


const port = 3000;
const app = express();


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
})

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });  

app.post('/login', async(req, res) =>{
    var term = { user: req.query.usr , password: req.query.pw };
    console.log(term.user);
    await producer.connect();
    await producer.send({
        topic: 'login',
        messages: [
            { value: term.user },
        ],
    });
    await producer.disconnect();
    res.sendStatus(200);
});

app.use(express.json());

app.listen(port, () =>{
    console.log('Server running on port', port);
});

