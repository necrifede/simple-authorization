This is a simple authentication and authorization application.
basic endpoints are published.

# Tasks

- [x] Create a new REST API application using Koa (https://github.com/koajs/koa) and modern Javascript (ES6) with 2 end points.
  - [x] POST /message
  ```json
  {
  "from": "string",
  "to": "string",
  "message": "string"
  }
  ```
  - [x] GET /stats
  ```json
  {
  "numberOfCalls": "Number",
  "lastMessage": "Object"
  }
  ```
- [ ] The application will preserve in a json file the number of time `/message` is called along with the last message.
- [ ] create /login end point
- [ ] create /logout end point for 2 hard-coded users:
- [ ] create two hardcoded users admin/secret and user/secret
- [ ] Any users can invoke the `POST /message` but only `admin` can invoke `GET /stats`
- [ ] Note in code comments any changes required to make this production ready
