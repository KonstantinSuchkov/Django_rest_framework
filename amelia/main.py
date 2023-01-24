import requests

response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':
                                                                            'superuser', 'password': '123'})
print(response.status_code)
print(response.json())

# 200
# {'token': 'b8efa8490f38a31ae0477760c2cdfed6cf4da12a'}
#
# Process finished with exit code 0
