# Cluno REST app
This REST app is implemented with NodeJS, reads data from a local DynamoDB instance, and provides information in JSON format.
The app demonstrates how use aws-sdk to perform DynamoDB queries in combination with Array.prototype.filter() to select data based on user inputs.

## Installation and Setup

### asdf

Install asdf from their [github](https://github.com/asdf-vm/asdf.git) page

### nodejs

Install nodejs for your user and update dependencies using asdf

```bash
asdf plugin-add nodejs
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
asdf install nodejs 11.8.0
asdf global nodejs 11.8.0
npm install -g npm
npm install -g yarn
```

## Project

Grab the github repo and clone it into your local project folder

```bash
git clone <git_url>.git
```

## Code Linter (TSLint)

To run code linter:
```bash
yarn run lint
```

## Setup DynamoDB locally

See AWS documentation for installation details:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html


## Start DynamoDB locally
To run DynamoDB [MacOS] (default port is 8000):
```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

## Create Items table

Run the following command to create the Items database:
```bash
yarn create_db
```

## Load Cluno data into Items table

Run the following command to create the Items database:
```bash
yarn load_data
```

## Verify database contents

Use aws-cli to verify that loading of data was successful:
```bash
aws dynamodb scan --table-name Items --endpoint-url http://localhost:8000
```


## Running the project

### Manually

```bash
$ yarn install
$ yarn run dev # Dev mode - auto-reload and compile OR
$ yarn run build && yarn run start # Production mode
```

## Using the REST app

### View list of offers

All list operations display up to 10 items per request
You can use the REST app from any standard browser or use cURL command from linux console.

To make the results more readable, it is recommended to use any browser plug-in/extension for JSON parsing.

```
curl http://localhost:3000/
```

### View list of offers from a specific portfolio

```
curl http://localhost:3000/?portfolio=1000
```

### View list of offers with price filters (parameter value must be numeric)

```
curl http://localhost:3000/?min_price=1500
curl http://localhost:3000/?max_price=3000
```

### View list of offers from a specific make or list of makes
You can specify multiple makes by using comma separators

```
curl http://localhost:3000/?make=Toyota
curl http://localhost:3000/?make=Toyota,BMW
```

### View list of offers with combined filters

```
curl http://localhost:3000/?portfolio=1000&min_price=1000&max_price=3000&make=Porsche
```

### View a specific item via ID

```
curl http://localhost:3000/179
curl http://localhost:3000/180
curl http://localhost:3000/129
```
