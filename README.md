# Restaurant-List
The restaurant search project is made with Express.js, Node.js and MySQL.
# Features
1. Listing restaurant information from MySQL database. 
2. Search restaurants by name or category.
3. Switch to the Editor view to :
	- Add a new restaurant to the list

	- Modify or delete the existing restaurant
    
4. Understand more about the restaurant by simply clicking the chosen one (rating, location, contact number or description)
# Environment Setup (Prerequisite)
1. Node.js v18
2. MySQL server v8
# Installing 
1. Open the terminal and change the current working directory to the location you want to the cloned directory
```
git clone https://github.com/870712pokohu/Restaurant-List.git
```
2. Restore the dependencies
```
npm install
```
3. Launch MySQL Server
4. Create database schema
```
npm run migration
```
5. Apply Seed Data to MySQL Database
```
npm run seed
```
6. Activate server, execute app.js
```
npm run dev
```
7. Open the browser and enter [http://localhost:3000](http://localhost:3000) to launch the website
# ScreenShot
![image](https://github.com/870712pokohu/Restaurant-List/assets/46664953/90d82ca3-d125-4e01-83a6-f977ceffdb7d)
![image](https://github.com/870712pokohu/Restaurant-List/assets/46664953/e8d3369c-0150-4b6a-8eab-c39b7c1d39d5)
![image](https://github.com/870712pokohu/Restaurant-List/assets/46664953/9e850f6c-2f3e-46c0-a970-2542fc469786)
