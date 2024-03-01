# Usage


1. Rename the `.envexampl`e to `.env` and add your `MONGO_URI`

2. Install dependencies

```sh
# Backend deps
npm install
```

```sh
# Frontend deps
cd frontend
npm install
```


3. Run Server

```sh
npm run server
```

## Tips

1. Write the code to configure the database
2. Write the code for models
3. Write the code for controllers
4. Write the code for the routers
5. Test each end point before proceeding any further
6. Write the code related to the frontend

> The file tree structure for the starter code:

```sh
- backend/
  - config/
    - db.js
  - controllers/
    - goalController.js
    - userController.js
  - middleware/
    - authMiddleware.js
    - errorMiddleware.js
  - models/
    - goalModel.js
    - userModel.js
  - routes/
    - goalRoutes.js
    - userRoutes.js
  - server.js
- frontend/
- package.json
- .env
- .gitignore
```

> The file tree structure for the frontend code:

```bash
src
|-- components
|   |-- GoalForm.js
|   |-- GoalDetails.js
|   |-- Navbar.js
|-- Hooks
|   |-- ???
|-- pages
|   |-- Home.js
|   |-- Login.js
|   |-- Signup.js
|-- App.js
|-- index.js
|-- index.css
|-- setupProxy.js
```
