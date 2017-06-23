buildId=$1
serviceName=$2
hookUrl='https://hooks.slack.com/services/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'
slackChannel='shreedaaws'

msg="Preparing to push docker image to ECR (#$buildId,$serviceName) :white_check_mark:"
json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt

docker push $(cat /tmp/build_tag.out)
if [ $? -eq 0 ]; then
	msg="Docker image pushed to ECR successfully (#$buildId,$serviceName) :white_check_mark:"
	json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
	aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt
	exit 0
else
	msg="Failed to push docker image to ECR. Please check cloudwatch logs. (#$buildId,$serviceName) :x:"
	json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
	aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt
	exit 1
fi