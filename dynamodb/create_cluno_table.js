const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName : "Items",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"} //Partition key
  ],
    AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Error creating table. Error details:",
      JSON.stringify(err, null, 2));
  } else {
    console.log("Table created. Table description:",
      JSON.stringify(data, null, 2));
  }
});
