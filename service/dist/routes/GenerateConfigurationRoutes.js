"use strict";
var express = require("express");
var util_1 = require("../utils/util");
var router = express.Router();
router.post('/', function (request, response) {
    if (util_1["default"].isNullOrUndefined(request.body.manifest) && util_1["default"].isNullOrUndefined(request.body.configurations)) {
        return response.status(404).send({ error: "Manifest or Configuration needed" });
    }
    ;
    try {
    }
    catch (e) {
    }
});
module.exports = router;
//# sourceMappingURL=GenerateConfigurationRoutes.js.map