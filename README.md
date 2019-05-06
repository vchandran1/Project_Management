# Project_Manager
Needed Tools & Softwares:

Node : ^10.13.0
Angular: @angular/cli (7.0.0)
Mongoldb: ^3.5.2

Step 1: Run Mongodb sever by following below steps.

1. Create directories folder “data/db” in C directory.
2. Go  to Mongodb installed folder and open a terminal tab in the folder. Run below command in that folder.

	“./mongod.exe" --dbpath="c:\data\db”
3. Open another terminal/command prompt and run below command

	./mongo.exe

Step 2 : Run Node server

1. Install node v10.13.0 in your system, to check your installed node version, type below command in terminal.

	node -v

2. Go to project folder and open a new terminal and install node_modules.

	npm install

3. To run node server use below command 

	node server.js

Step 3: run Angular Server to open the angular page.

1.  Open project folder in terminal and type below command to run angular server
	
	ng serve -o —proxy-config proxy.json
