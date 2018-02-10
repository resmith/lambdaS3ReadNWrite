aws lambda invoke \
--invocation-type RequestResponse \
--function-name lambdaS3ReadNWrite \
--region us-east-1 \
--payload file://testFile.json \
--profile adminuser \
outputfile.txt