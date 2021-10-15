import os, sys, requests

token = os.environ['TOKEN']

header = {'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json'}
url = "https://api.github.com/repos/linkhub-org/linkhub-deployment/pulls"
data = {'title': 'Push code to production', 'head': 'dev', 'base': 'main'}

response = requests.post(url, headers=header, json=data)
