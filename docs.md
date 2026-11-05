### 1 
To secure api endpoint be can use 
- Basic auth
- CORS policy
- JWT token 
- Rate Limiting - if user try to hit url multiple time
--------------------------------------------------------------------

LIST API ------------------------
curl --location 'http://localhost:5000/api/employees?search=Rahul&isActive=true&page=1&limit=5'


CREATE --------------------------
curl --location 'http://localhost:5000/api/employees' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Rahul Kumar",
    "contact": "9876543210",
    "address": "Delhi, India",
    "isActive": true
}'


backend url - https://sumitomobackend.onrender.com
