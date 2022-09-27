OpenClassRooms -- Développeur Web -- Projet 7
<br/>
Création d'un réseau social d'entreprise Groupomania
<br/>
<br/>
[1] : Cloner ce Repo
<br/>
<br/>
[2] : Dans "/client", lancer : "npm install"
<br/>
<br/>
==== Créer dans ce dossier un fichier .env dans lequel noter: 
<br/>
=====> REACT_APP_API_URL=http://localhost:4000/
<br/>
<br/>
[3] : Dans "/server, lancer : "npm install"
<br/>
<br/>
== Créer dans ce dossier un fichier .env dans lequel noter: 
<br/>
=====> authToken="RANDOM_TOKEN_SECRET"
<br/>
et
<br/>
=====> SECRET_KEY="code_de_connection_au_cluster_mongoDB" (OCR: voir fichier TXT bdd_092022)
<br/>
<br/>
[4] : Toujours dans "/server", lancer : "npm start"
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
<br/>
<br/>
Création du compte administrateur :
<br/>
Modification manuelle du statut de l'utilisateur 
<br/>
dans la collection users la base de donnée : "isAdmin":"true"