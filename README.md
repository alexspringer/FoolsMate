# FoolsMate

Foolsmate is a mobile chess application built by Alex Springer and Steven Lee. The project was created with React Native and bootsraped with expo, which is an open source toolchain build around React Native to help build native IOS and Android projects using Javascript and React. (https://expo.io/) (https://reactnative.dev/).

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/hjm6A34AZE0/0.jpg)](https://www.youtube.com/watch?v=hjm6A34AZE0)

In Foolsmate, you begin the app on the matchmaking screen where you can either create a new game or join in existing game.

Doing either will bring you to the gamescreen, where you will be presented with a standard chessboard, where all pieces move as you would expect in your typical chess game.

Foolsmate uses an MIT licence. More info can be found in LICENSE.txt

All images for chess pieces in Foolsmate are from (https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent)

## Server Modules Required

To run the server the following modules must be installed.

*Type
npm install
if npm has not been previously installed on the machine.

express,
socket.io,
ngrok.io
nodemon (node.js),

Type the following line into the terminal in the Backend folder that contains server.js

npm install express socket.io 

node.js can be downloaded here (https://nodejs.org/en/download/)

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

npm install expo expo-status-bar react react-dom react-native react-native-web socket.io-client

## Aditional requirements.

To run the app on your own device, you will need to download the expo client app from the iOS appstore or the Android Google play store.

## Running the application.

To run the server and client you will need to open two terminals and download the expo client app from either the iOS App store or the Android Google Play store.

In the first terminal navigate to the folder that contains server.js and type nodemon start to run the server.

In the second terminal navigate to the Foolsmate folder and type npm start to begin running the client application.

Now the server is running on localhost:3000 and the client is running on exp:://localhost:19000 Enjoy the app!

Now a QR code should appear in the new browser tab opened by the previous step. On iOS, simply open your camera app and scan the QR code. Press the pop up and the JavaScript bundle will be downloaded and executed on your device! For Android, navigate to the expo client app. Under the projects tab, press Scan QR code, and repeat the steps done on iOS.

## Project structure

For anyone wishing to build off the current build of Foolsmate, the current structure of the project is as follows:

Foolsmate/Backend - This is where the foolsmate server lives. Client applications will communicate with the server to send information to other clients. For example, the server handles telling clients about active games, and informs clients of moves that their opponent makes during a game.

Foolsmate/Screens - If you are looking to add new screens to the app, they should go here.

Foolsmate/Components - If you are looking to add a new component that will be used repeatedly throughout the app, it should go here.

Foolsmate/assets - Any external images, sounds, or other assets that the project needs should go here.
