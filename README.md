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
git clone git@github.com:heinzster/cluno.git
```

## Code Linter (TSLint)

To run code linter:
```bash
yarn run lint
```

## Setup DynamoDB locally

See AWS documentation for DynamoDB installation details:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html


## Start DynamoDB locally
To run DynamoDB [MacOS] (default port is 8000):
```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

## Create Items table

Run the following command to create the Items table:
```bash
yarn create_db
```

## Load Cluno data into Items table

Original data file can be found here:
https://assets.cluno.com/offer/dynamodb.export.json

Run the following command to load sample Cluno data into Items table:
```bash
yarn load_data
```

## Verify database contents

See AWS documentation for aws-cli installation details:
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

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

All list operations display up to 10 items per request and are sorted by price.
You can use the REST app from any standard browser or use cURL command from linux console.

To make the results more readable, it is recommended to use a browser plug-in/extension for JSON parsing.

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

## Helpful references

https://medium.com/quick-code/node-js-restful-api-with-dynamodb-local-7e342a934a24
https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
