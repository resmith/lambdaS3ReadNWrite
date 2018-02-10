aws lambda invoke \
--invocation-type Event \
--function-name lambdaS3ReadNWrite \
--region us-east-1 \
--payload file://testFile.json \
--profile adminuser \
outputfile.txt