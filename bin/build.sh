buildId=$1
serviceName=$2
hookUrl='slack-hooks-url'
slackChannel='slack-chanel-name'

msg="Codebuild running for build #$buidId for $serviceName :white_check_mark:"
json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt

msg="Preparing docker image for production. (#$buildId,$serviceName) :white_check_mark:"
json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt

docker build -f ./Dockerfile-pro --tag $(cat /tmp/build_tag.out) .
if [ $? -eq 0 ]; then
	msg="Docker image for production built successfully. (#$buildId,$serviceName) :white_check_mark:"
	json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
	aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt
	exit 0
else
	msg="Docker image for production build failed. Please check cloudwatch logs. (#$buildId,$serviceName) :x:"
	json='{"hookUrl":"'$hookUrl'","slackChannel":"'$slackChannel'","msg":"'$msg'"}'
	aws lambda invoke --function-name SendMsgToSlack --payload "$json" --invocation-type Event --region eu-west-1 /tmp/outputfile.txt
	exit 1
fi