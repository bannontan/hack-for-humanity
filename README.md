# hack-for-humanity

## How to run backend

Note: Remember to create .env file in /backend containing PORT and JWT_SECRET. For example:

```.env
PORT = 8080
JWT_TOKEN = ...
```

1. cd until backend dir
2. run `npm run migrate` to build user database
3. `npm run dev` to run the backend with nodemon
