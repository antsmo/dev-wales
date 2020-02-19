exports.createCache = function() {
  return {
    data: [],
    lastUpdated: null
  };
};

exports.isCacheValid = function(cache) {
  if (!cache.lastUpdated) {
    return false;
  }
  const currentTimestamp = Date.now();
  const cacheDuration = 1000 * 60 * 30; // 30 minutes
  return cache.lastUpdated + cacheDuration > currentTimestamp;
};
