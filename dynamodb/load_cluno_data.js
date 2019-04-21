const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const items = JSON.parse(fs.readFileSync('dynamodb/offer/dynamodb.export.json', 'utf8'));

console.log("Importing Items into DynamoDB. Please wait.");

items["Items"].forEach(function(item) {
  var data = {}

  Object.keys(item).forEach(function(field) {
    data[field] = AWS.DynamoDB.Converter.output(item[field])
  });

  var params = {
    TableName: "Items",
    Item: data
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add Item", item.id, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", item.id);
    }
  });

});
