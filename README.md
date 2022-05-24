# Tarea 2 Sistemas Distribuidos 
Integrantes:
- Joaquín Lagos
- Lucas Muñoz

# Instrucciones de uso.
- Descargar repositorio
- Levantar el container de docker con el comando >docker compose -f "docker-compose.yaml" up -d --build
- Para intentar loggear entrar a la url localhost:3000/login?usr={}&pw={} donde {} son los valores de usuario y contraseña.
- Para ver los usuarios bloqueados entrar en la url localhost:3001/blocked

# Preguntas

1.- ¿Por qué Kafka funciona bien en este escenario?

R1: Por que Kafka permite la comunicación de los 2 servicios(login y bloqueo) a traves de sus tópicos.

2.- Basado en las tecnologías que usted tiene a su disposición (Kafka, backend) ¿Qué haría usted para manejar
una gran cantidad de usuarios al mismo tiempo?

# Supuestos
- Al no haber una base de datos de los usuarios con sus contraseñas, se asume que todo intento de login, sin importar la contraseña que se utilice, es un intento fallido.
