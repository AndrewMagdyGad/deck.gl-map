# Interactive Map using deck.gl

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Your machine should have

-   Node (at least 10)
-   Git
-   NPM or Yarn

## Installing

This project consists of two parts. The first one is the `server` which responsible to expose APIs to get used by the client user. The second one is the `client` which is a React app that shows our map and call the appropiate end-points

To run this project locally we need to
do three steps:

-   clone this project.
-   run the `server` part.
-   run the `client` part.

### Run Server Part

```sh
    cd server
    yarn install
    yarn start
```

after these steps the server should be up and running at `http://localhost:4000/`

### Run Client Part

```sh
    cd client
    yarn install
    yarn start
```

after these steps the client should be up and running at `http://localhost:3000/`

**Important Note**

rename the .env.example file to be .env and fill your values

```sh
    REACT_APP_MAPBOX_TOKEN=<your-token>
    REACT_APP_API_BASEURL=http://localhost:4000
```

for more information about creating an access token for mapbox, read this [docs](https://docs.mapbox.com/help/getting-started/access-tokens/)

## Built With

-   [Nest.js](https://nestjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [React.js](https://reactjs.org/)
