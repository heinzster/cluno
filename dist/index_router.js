"use strict";
exports.__esModule = true;
var express_1 = require("express");
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-1',
    endpoint: 'http://localhost:8000'
});
var router = express_1.Router();
var dataTools = require('./data_tools');
var docClient = new AWS.DynamoDB.DocumentClient();
var TABLE = 'Items';
var LIST_LIMIT = 10;
router.get('/:id', function (req, res) {
    var dbParams = {
        TableName: TABLE,
        Key: {
            id: req.params.id
        },
        FilterExpression: 'visible = :visible',
        ExpressionAttributeValues: {
            ':visible': true
        }
    };
    docClient.get(dbParams, function (err, data) {
        if (err) {
            console.error('Unable to read table. Error JSON:', JSON.stringify(err, null, 2));
        }
        else {
            if (!Object.keys(data).length) {
                res.json('Not found');
            }
            else {
                if (data.Item.visible === true) {
                    delete data.Item.teaser;
                    delete data.Item.detailUrl;
                    res.json(data.Item);
                }
                else {
                    res.json('Not found');
                }
            }
        }
    });
});
router.get('/', function (req, res) {
    var filterExpression = 'visible = :visible';
    var expressionAttributeValues = {
        ':visible': true,
        ':portfolio': null
    };
    if (req.query.portfolio) {
        filterExpression += ' AND portfolio = :portfolio';
        expressionAttributeValues[':portfolio'] = req.query.portfolio;
    }
    else {
        filterExpression += ' AND portfolio <> :portfolio';
    }
    var dbParams = {
        TableName: TABLE,
        ProjectionExpression: 'id, teaser, detailUrl, labels, pricing.price, car.make',
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues
    };
    docClient.scan(dbParams, function (err, data) {
        if (err) {
            console.error('Unable to table. Error JSON:', JSON.stringify(err, null, 2));
        }
        else {
            if (!Object.keys(data).length) {
                res.json('Not found');
            }
            else {
                var results = dataTools.filter(data, req.query).slice(0, LIST_LIMIT);
                results.forEach(function (item) {
                    delete item.car;
                });
                res.json(results);
            }
        }
    });
});
exports["default"] = router;
//# sourceMappingURL=index_router.js.map