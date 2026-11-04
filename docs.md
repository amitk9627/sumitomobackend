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