# FoolsMate

Foolsmate is a mobile chess applications created with React Native. The project was bootsraped with expo. which is an open source toolchain build around React Native to help build native IOS and Android projects using Javascript and React. (https://expo.io/)

## Server Modules Required

To run the server the following modules must be installed.

*Type
npm install
if npm has not been previously installed on the machine.

express,
nodemon (node.js),
socket.io,
ngrok.io

Type the following line into the terminal in the Backend folder that contains server.js

npm install

If using VS code, download the ngrok.io plugin (https://marketplace.visualstudio.com/items?itemName=philnash.ngrok-for-vscode)

To run ngrok on vs code press ctrl + shift + P, and in the prompt type ngrok start. Select port 3000. Ngrok will now give you a link you can copy to your clipboard. On line 9 of app.js you will need to change the value to the one your ngrok gives you. So replace copy_paste_ngrok_here with the value it gives you. (leave the quotes), const socket = io("copy_past_ngork_here");

## Client Modules Required

To run the client the following modules must be installed:

npm must be installed by typing
npm install
if not previously installed on in the Foolsmate folder.

expo,
expo-status-bar
react,
react-dom,
react-native,
react-native-web,
socket.io-client,

Type the following line into the terminal in the src folder to install these modules.

npm install

## Running the application.

To run the server and client you will need to open two terminals.

In the first terminal navigate to the folder that conbtains server.js and type nodemon start to run the server.

In the second terminal navigate to the Foolsmate folder and type npm start to begin running the client application

Boom now the server is running on localhost:3000 and the client is running on exp:://localhost:19000 Enjoy the app!