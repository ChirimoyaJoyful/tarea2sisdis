const express = require('express');

const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')



// CONSUMIDOR
// var consumer = new kafka.Consumer(client, [{topic: 'login'}]);

// consumer.on('message', function (message) {
//     console.log(message);

// });

//PRODUCTOR





const port = 3000;

const app = express();
const app2 = express();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
})

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });  
const consumer = kafka.consumer({ groupId: 'tarea'});
consumer.connect();
consumer.subscribe({topic: 'login',fromBegining: true});

app.post('/login', async(req, res) =>{
    var term = { user: req.query.usr , password: req.query.pw };
    var date = Date.now();
    console.log(term.user);
    await producer.connect();
    await producer.send({
        topic: 'login',
        messages: [
            { value: term.user },
        ],
    });
    await producer.disconnect();
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            }) 
            var diff = message.timestamp.toString() - date;
            console.log(diff);
        },
    })
});

app.get('/', async(req, res) => {
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    await producer.connect();
    await producer.send({
        topic: 'login',
        messages: [
            { value: 'holi' },
        ],
    });
})
app2.get('/blocked', async(req, res) =>{
    await consumer.connect();
    await consumer.subscribe({topic: 'login',fromBegining: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            }) 
        },
    })
});


app.use(express.json());

app.listen(port, () =>{
    console.log('Server running on port', port);
});

app2.listen(3001, () =>{
    console.log('Server running on port', 3001);
});

