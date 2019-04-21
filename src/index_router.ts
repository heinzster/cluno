import { Router } from 'express';

const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'http://localhost:8000',
});

const router = Router();
const dataTools = require('./data_tools');
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE = 'Items';
const LIST_LIMIT = 10;

router.get('/:id', (req, res) => {
  const dbParams = {
    TableName: TABLE,
    Key: {
      id: req.params.id,
    },
    FilterExpression: 'visible = :visible',
    ExpressionAttributeValues: {
      ':visible': true,
    },
  };

  docClient.get(dbParams, function (err: any, data: any) {
    if (err) {
      console.error('Unable to read table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      if (!Object.keys(data).length) {
        res.json('Not found');
      } else {
        if (data.Item.visible === true) {
          delete data.Item.teaser;
          delete data.Item.detailUrl;
          res.json(data.Item);
        } else {
          res.json('Not found');
        }
      }
    }
  });
});

router.get('/', (req, res) => {
  let filterExpression = 'visible = :visible';

  type ExpressionAttributeValues = {
    ':visible': Boolean;
    ':portfolio': any;
  };

  const expressionAttributeValues: ExpressionAttributeValues = {
    ':visible': true,
    ':portfolio': null,
  };

  if (req.query.portfolio) {
    filterExpression += ' AND portfolio = :portfolio';
    expressionAttributeValues[':portfolio'] = req.query.portfolio;
  } else {
    filterExpression += ' AND portfolio <> :portfolio';
  }

  const dbParams = {
    TableName: TABLE,
    ProjectionExpression: 'id, teaser, detailUrl, labels, pricing.price, car.make',
    FilterExpression: filterExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  docClient.scan(dbParams, function (err: any, data: any) {
    if (err) {
      console.error('Unable to table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      if (!Object.keys(data).length) {
        res.json('Not found');
      } else {
        const results = dataTools.filter(data, req.query).slice(0, LIST_LIMIT);
        results.forEach(function (item: any) {
          delete item.car;
        });

        res.json(results);
      }
    }
  });
});

export default router;
