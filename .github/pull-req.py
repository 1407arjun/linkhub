import os, sys, requests

token = os.environ['TOKEN']
branch = str(sys.argv[1])

header = {'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json'}
url = "https://api.github.com/repos/linkhub-org/linkhub-deployment/pulls"
data = {'title': branch.capitalize() + " Deployment", 'head': branch, 'base': 'main'}

response = requests.post(url, headers=header, data=data)
