aws lambda create-function \
--region us-east-1 \
--function-name lambdaS3ReadNWrite \
--zip-file fileb://lambdaS3ReadNWrite.zip \
--role arn:aws:iam::211790203397:role/lambda-s3-execution-role \
--handler lambdaS3ReadNWrite.handler \
--runtime nodejs6.10 \
--profile adminuser \
--timeout 10 \
--memory-size 1024
