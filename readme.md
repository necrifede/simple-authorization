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
- [x] The application will preserve in a json file the number of time `/message` is called along with the last message.
- [x] create /login end point
- [x] create /logout end point for 2 hard-coded users:
- [x] create two hardcoded users admin/secret and user/secret
- [x] Any users can invoke the `POST /message` but only `admin` can invoke `GET /stats`
- [x] Note in code comments any changes required to make this production ready

# How to use

## To setup on production

On production this app should contain next environment variables

```
SECRET_TOKEN=YOUR-SECRET
```

- `SECRET_TOKEN` is used to generate tokens, this value should only be in the server. never passed to clients.

## To login

To login send a `GET` request to `/login` endpoint with `authorization` header, the value should contain the `Basic` word at the beginning and then an encoded string on base64. The encoded part contains user and password information separated by a '`:`' colon

Header example

```
authorization: Basic dXNlcjE6cHdkMQ=
```

In the example `dXNlcjE6cHdkMQ=` is an encoded value for `user:secret` and `YWRtaW46c2VjcmV0=` for `admin:secret`

if the user is valid the response is a new token together a `200` status.

## To request

Add an `authorization` header on every request containing your token generated on `/login`. The word `Bearer` should be included at the beginning of the value

Header Example
```
authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjgwMzQ1NzY0LCJleHAiOjE2ODA5NTA1NjR9.a8wLByEUCYqjhzE43Kyt9l5AYGiykDeSTFgBWohceGk
```
