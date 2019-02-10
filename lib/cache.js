exports.createCache = function() {
  return {
    data: [],
    lastUpdated: null
  };
};

exports.isCacheValid = function(cache) {
  const currentTimestamp = Date.now();
  const cacheDuration = 1000 * 60 * 30; // 30 minutes
  return cache.lastUpdated + cacheDuration > currentTimestamp;
};
