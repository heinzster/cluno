"use strict";
exports.__esModule = true;
function enOrDefault(location) {
    if (location.names.en) {
        return location.names.en;
    }
    return location.names[Object.keys(location.names)[0]];
}
exports.enOrDefault = enOrDefault;
//# sourceMappingURL=maxmind_util.js.map