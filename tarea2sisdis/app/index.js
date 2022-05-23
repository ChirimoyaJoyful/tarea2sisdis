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



const users = [];
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


});




app2.get('/blocked', async(req, res) =>{
    await consumer.connect();
    await consumer.subscribe({topic: 'login',fromBegining: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            users_blocked.push({"user": message.value.toString(), "time":message.timestamp.toString()});
            /*console.log({
                value: message.value.toString(),
                timestamp: message.timestamp.toString(),
            });*/
            console.log(users_blocked);
        },
    })
    for(let i = users_blocked.length - 1; i > 0; i--){
        if(users_blocked[i].user ){

        };
    };
    res.send(JSON.stringify(users_blocked));
});


app.use(express.json());

app.listen(port, () =>{
    console.log('Server running on port', port);
});

app2.listen(3001, () =>{
    console.log('Server running on port', 3001);
});

