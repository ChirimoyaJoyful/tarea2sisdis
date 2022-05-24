# Tarea 2 Sistemas Distribuidos 
Integrantes:
- Joaquín Lagos
- Lucas Muñoz

# Instrucciones de uso.
- Descargar repositorio
- Desde la consola en el directorio raíz, levantar el container de docker con el comando ```>docker compose -f "docker-compose.yaml" up -d --build```
- Para intentar loggear, entrar a la url ```localhost:3000/login?usr={}&pw={}``` donde ```{}``` son los valores de usuario y contraseña.
- Para obtener los usuarios que fueron bloqueados entrar en la url ```localhost:3001/blocked```
- También se puede utilizar [Postman](https://www.postman.com) para los dos pasos anteriores.

# Preguntas

1. ¿Por qué Kafka funciona bien en este escenario?

R1: Porque Kafka permite la comunicación de los 2 servicios(login y bloqueo) a traves de sus tópicos, de tal manera que se puede enviar información de un servicio al otro.

2. Basado en las tecnologías que usted tiene a su disposición (Kafka, backend) ¿Qué haría usted para manejar
una gran cantidad de usuarios al mismo tiempo?

R2: Aplicaríamos una gran cantidad de brokers en distintos contenedores, de esta manera se puede escalar horizontalmente y se puede manejar a una mayor cantidad de usuarios simultaneos, los cuales estrían gestionados por Zookeeper, principalmente balanceando la carga a cada una de las instancias. 

# Supuestos
- Al no haber una base de datos de los usuarios con sus contraseñas, se asume que todo intento de login, sin importar la contraseña que se utilice, es un intento fallido.

# Información extra
- La información de los usuarion bloqueados se entrega a traves del console.log() debido a problemas en el código.
