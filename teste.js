const newman = require('newman'),
      fs = require('fs');

newman.run({
    collection: require('./CWI.postman_collection.json'),
    reporters: 'cli'
}).on('beforeRequest', function (error, args) {
    if (error) {
        console.error(error);
    } else {
        fs.writeFile('request.json', args.request.body.raw, function (error) {
            if (error) { 
                console.error(error); 
            }
        });    
    }
}).on('request', function (error, args) {
    if (error) {
        console.error(error);
    }
    else {
        fs.writeFile('response.json', args.response.stream, function (error) {
            if (error) { 
                console.error(error); 
            }
        });        
    }
});