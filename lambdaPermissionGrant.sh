aws lambda add-permission \
--function-name CreateThumbnail \
--region us-east-1 \
--statement-id 1 \
--action "lambda:InvokeFunction" \
--principal s3.amazonaws.com \
--source-arn arn:aws:s3:::rlives-test-orig \
--source-account 211790203397  \
--profile adminuser
