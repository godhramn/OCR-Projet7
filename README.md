OpenClassRooms -- Développeur Web -- Projet 7
<br/>
Création d'un réseau social d'entreprise Groupomania
<br/>
<br/>
[1] : Cloner ce Repo
<br/>
<br/>
[2] : Dans "groupmania-app/client", lancer : "npm install"
<br/>
== Créer dans ce dossier un fichier .env dans lequel noter: 
<br/>
=====> authToken="RANDOM_TOKEN_SECRET"
<br/>
et
<br/>
=====> SECRET_KEY="votre_code_de_connection_au_cluster_mongoDB"
<br/>
<br/>
[3] : Dans "groupomania-app/server, lancer : "npm install"
<br/>
==== Créer dans ce dossier un fichier .env dans lequel noter: 
<br/>
=====> REACT_APP_API_URL=http://localhost:4000/
<br/>
<br/>
[4] : Toujours dans "groupomania-app/server", lancer : "npm start"
<br/>
 (=> Concurrently démarrera les côtés server [port:4000]et client [port:3000] en simultané)
<br/>
<br/>
 Stack :
 <br/>
 - Backend : NodeJS (avec Express)
 <br/>
 - Frontend : React, Material-UI
 <br/>
 - BDD : MongoDB