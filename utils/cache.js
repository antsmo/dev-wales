exports.createCache = function() {
  return {
    data: [],
    lastUpdated: null
  };
};

exports.isCacheValid = function(cache) {
  const currentTimestamp = Date.now();
  const cacheDuration = 1000 * 60; // 1 minute
  return cache.lastUpdated + cacheDuration > currentTimestamp;
};
