 
const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
    	"crypto": false, 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": false,
      "url": require.resolve("url"),
      'zlib': false,
      "path": require.resolve("path-browserify"),
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser.js', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; 
  }