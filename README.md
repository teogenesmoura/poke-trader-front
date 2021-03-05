# PokeTrader front

[![codecov](https://codecov.io/gh/teogenesmoura/poke-trader-front/branch/master/graph/badge.svg?token=5IA3FKBE66)](https://codecov.io/gh/teogenesmoura/poke-trader-front)
[![Actions Status](https://github.com/teogenesmoura/poke-trader-front/workflows/Deployment/badge.svg)](https://github.com/teogenesmoura/poke-trader-front/actions)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

<center><img src="https://raw.githubusercontent.com/teogenesmoura/poke-trader-front/master/src/assets/logo.svg"></center>

## About the project

<center><img src="https://media.giphy.com/media/TT10M7AZ9kDbiNxZEZ/giphy.gif"></center>

PokeTrader is the [BxBlue](http://bxblue.com.br) challenge for software developer roles. It is a platform which allows users to simulate pokemon trading. It allows users to select a set of up to 6 pokemons and compare them against another set to see if trading them is beneficial. The following features were implemented:

 - Users are able to retrieve pokemons from the PokeAPI and see their image and experience levels before adding them to one of the two lists

 - Users are able to create two lists of pokemons and compare one against the other for fairness. The criteria used was that if the total experience points of one group represent +- 15% of the other the exchange is considered fair.

 - Users are able to save a simulation and its result to a history they can later access

- Users are able to create an account, login and logout through JWT tokens, allowing for a decoupled architecture of the backend and front end of the application

## Live demo
A live demo of this project can be found [here](http://poketraderfront.herokuapp.com/)

## Pre-requisites

In order to run the project locally the following software packages are necessary:
* [NPM](https://www.npmjs.com/) version 6.14.8 or higher
* [React](https://reactjs.org/) version 17.0.1

## How to run the project

1. Clone this repo
```bash
git clone https://github.com/teogenesmoura/poketraderfront/
```
2. Enter the project's root directory
```bash
cd poketraderfront
```

3. Install dependencies
```bash
npm install
```

4. You'll need to create two enviroment variables: REACT_APP_APPLICATION_SERVER_URL and REACT_APP_CREATURE_TYPE. The first one is the link to the(backend of the application)[https://github.com/teogenesmoura/poke-trader-back] and the latter the type of creature you're dealing with. In this case we're modeling pokemon trades, so I have it set to "pokemon". Go to the /src directory of the project and execute this command

```bash
touch .env
```

Inside your .env document, create the following line:

```
REACT_APP_APPLICATION_SERVER_URL={Your key}
REACT_APP_CREATURE_TYPE={Your creature type}
```
(Remember to insert it without the curly braces)

5. Lastly, run

```bash
npm start
```

## How to run tests

- run the following to run the tests
```bash
npm test
```

- run the following to generate code coverage documentation:

```bash
npm run test -- --coverage --watchAll=false
```

## How to build the project
1. Inside the /src directory, run

```bash
npm run-script build
```

## How to modify the CI workflow
1. This project automatically generates a build every time a PR is accepted to the master branch. In order to do so, it relies on a Github actions workflow, which can be found inside the ```.github/workflows``` folder. If you're going to modify it, take care to set up the appropriate secrets in your repo's enviroment, otherwise the project will not work. If you're deploying it to a PaaS such as Heroku or Netlytics, remember to add the enviroment variables to their configurations. 
