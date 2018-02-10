// dependencies
var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs'); 
var util = require('util');

// constants
var MAX_WIDTH  = 100;
var MAX_HEIGHT = 100;

// get reference to S3 client 
var s3 = new AWS.S3();
 
exports.handler = function(event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));  

    var dstBucket = srcBucket.replace("-orig", "") + "-tn";
    // var dstBucket = srcBucket + "-tn";
    var dstKey    = "tn-" + srcKey;
    console.log("srcBucket:", srcBucket);
    console.log("srcKey:", srcKey);
    console.log("dstBucket:", dstBucket);
    console.log("dstKey:", dstKey);    

    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        callback("Source and destination buckets are the same.");
        return;
    }
    // Download the image from S3, transform, and upload to a different S3 bucket.
    async.waterfall([
        function read(next) {
            // Download the image from S3 into a buffer.
            var params = {
                    Bucket: srcBucket,
                    Key: srcKey
                };

            console.log("s3.getObject params:", params);
            s3.getObject(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
            });
        },
        ], function (err) {
            if (err) {
                console.error(
                    'Unable to read ' + srcBucket + '/' + srcKey +
                    ' due to an error: ' + err
                );
            } else {
                console.log(
                    'Successfully read ' + srcBucket + '/' + srcKey
                );
            }

            callback(null, "message");
        }
    );
};