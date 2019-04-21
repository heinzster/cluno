"use strict";
exports.__esModule = true;
var express = require("express");
var index_router_1 = require("./index_router");
var app = express();
app.use('/', index_router_1["default"]);
exports["default"] = app;
//# sourceMappingURL=app.js.map