const express = require('express');

const { Kafka } = require('kafkajs');
const { Partitioners } = require('kafkajs')


const port = 3001;

const app = express();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
})
 
const consumer = kafka.consumer({ groupId: 'tarea'});



app.get('/blocked', async(req, res) =>{
    var users = [];
    var bloqueados = [];
    await consumer.connect();
    await consumer.subscribe({topic: 'login',fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            users.push({"user": message.value.toString(), "time":message.timestamp.toString()});
            var usuario = users[users.length - 1];
            var a = 0;
            var b = 0;
            for(let i = users.length - 1; i >= 0; i--){
                if(users[i].user == usuario.user ){
                    a++;
                    if (a == 5){
                        var tf = usuario.time - users[i].time;
                        console.log(tf);
                        if(tf < 60000){
                            bloqueados.push({"usr": usuario.user});    
                        }; 
                    };
                };
            }; 
        console.log(bloqueados);    
        },
    })
    
});


app.use(express.json());

app.listen(port, () =>{
    console.log('Server running on port', port);
});
