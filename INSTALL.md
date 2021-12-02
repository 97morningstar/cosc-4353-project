## Login Information

#### User

email: 123martinezfuenteselisa@gmail.com

password: 123456

##### Note
All authentication and authorization handled by microservice provided by Google: Firebase Authentication, and Firbase Firestore Database

### Instructions (How to install) :receipt:
> You need to have installed: npm, git, nodejs

Links:

[To install npm and nodejs](https://nodejs.org/en/)
[To install git](https://git-scm.com/downloads)

1. Create a folder in your computer

#### If working with the remote repository:

Type in the command line:

`git init` [inside that folder to initialize a git repository]

`gh repo clone 97morningstar/cosc-4353-project` [To copy the remote repository into your own computer]

`cd cosc-4353-project`

`cd client`

`npm install` [inside /client to install client dependencies]

`cd ..`

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`


#### If working with the local repository:

Type in the command line:

Go to the folder you just created and copy the contents of the zip file there

`git init` [inside that folder to initialize a git repository]

`cd client`

`npm install` [inside /client to install client dependencies]

`cd ..`

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`

> Remember to add the remote repository to your local git repo

### To run the project in the root folder run :runner:
`nodemon`

### Possible Problems :massage_man:
1. react-scripts is missing or not installed when running the project with nodemon

#### Solution :pill:

1. Run the following in the ./client:

`cd client`

`rm-rf node_modules`

`rm -rf package-lock.json`

`npm install react-scripts`

`npm install`

`cd ..`

`nodemon `

2. Running scripts is disabled on this system

#### Solution :pill:

Run Powershell as Admin, and then:

`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

Please refer to the information provided here: [solution](https://stackoverflow.com/questions/63423584/how-to-fix-error-nodemon-ps1-cannot-be-loaded-because-running-scripts-is-disabl)
