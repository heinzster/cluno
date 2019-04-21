// validate query params
exports.validate = function(query) {
  if (query.id && !isNaN(query.id)) {
    return false;
  }

  if (query.min_price && isNaN(query.min_price)) {
    return false;
  }

  if (query.max_price && !isNaN(query.max_price)) {
    return false;
  }

  return true;
}

// filter query results based on query params
exports.filter = function(data, query) {
  var filtered_results = data.Items;

  if (query.make) {
    filtered_results = filtered_results.filter(item => query.make.indexOf(item.car.make) > -1);
  }

  if (query.min_price) {
    filtered_results = filtered_results.filter(item => item.pricing.price > parseFloat(query.min_price));
  }

  if (query.max_price) {
    filtered_results = filtered_results.filter(item => item.pricing.price < parseFloat(query.max_price));
  }

  return filtered_results;
}
