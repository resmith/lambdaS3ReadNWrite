aws lambda invoke \
--invocation-type Event \
--function-name CreateThumbnail \
--region us-east-1 \
--payload file://testFile.json \
--profile adminuser \
outputfile.txt