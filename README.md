[![Build Status](https://app.travis-ci.com/97morningstar/cosc-4353-project.svg?branch=master)](https://app.travis-ci.com/97morningstar/cosc-4353-project)

# NextFlood :earth_americas::cyclone: 
### COSC-4353-Project 
### Minimum Viable Product

## Team Members

1. Alex Hernandez
2. Nicholas Brown
3. Elisa Martinez

## Website Link

Not available yet

## Database file (mySQL)

Database is in the Database-Schema folder, but also it is hosted using Microservices: AWS: Amazon RDS for SQL Server

## Login Information

#### User

email: 123martinezfuenteselisa@gmail.com

password: 123456

##### Note
All authentication and authorization handled by microservice provided by Google: Firebase Authentication, and Firbase Firestore Database

## How to install
Look at INSTALL.md for instructions as to how to install the software

### All of our queries and code are in the following files :hammer:
/routes

### Branching :octocat:

> We create branches so we can work at the same time and then we merge those branches with the main one

1. `git branch {your-branch-name}`
2. `git checkout {your-branch-name}`
3. `git push --set-upstream origin {your-branch-name}`

### To push your work to the shared repo run in the root folder. 

> Never push if you haven't pull the latest code and solve the merging conflicts locally if any

1. `git add -A`
2. `git commit -m "Your message, what you did in the code"`
3. `git push`

### To pull from master

> Always pull before starting to work for the day, or first verify that you have the latest code
> Make sure to know your remote origin

1. `git pull origin heroku-deploy` This is not setup yet

### How to open a pull request

> Pull requests or PRs are basically how you merge your changes with the master code. They will be revised by a member of the group and that member will post comments on your code and ask you to fix those.

1. Once you push your code you will see a green message saying if you want to create a pull request. Always do a pull request to master branch as it is the main branch. Do not delete your own branch as you will continue to use it, or you can also deleted and create a new one each time you add a new feature
2. You can also click on Pull Request and open one there.

### Tech Stack

nodejs :sparkle:

expressjs :steam_locomotive:

react :electron:

mysql :key:

heroku :rocket: [Not yet]

### To test your queries

To test the queries:

1. Install Postman
2. Create a Collection (once)
3. Click the 3 dots and create a new request by clicking "Add Request"
4. Select the correct method (get, put, post, delete)
5. Run the server in the command prompt
6. Copy the localhost address and go to the link on the request (example: http://localhost:4000/api/view_all_markers)

### Summary

Flooding in the Houston area has become a part of our lives. Not only do we get hit every year with intense rain events that cause floods along rivers, creeks, roads, and bayous, but also hurricane season brings strong winds and dangerous rain conditions that cause destruction to our communities. Our world is every day more connected and our brave people from Houston are moved to help in every way they can to avoid these dangers. One simple way the public can help is through our web application NextFlood. The more our community uses it the more accurate it will be, increasing the resilience of our city. This product will strengthen security for families by maintaining them informed and safe during these rainfall events.
