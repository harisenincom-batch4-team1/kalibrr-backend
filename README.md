## ERD

![erd](./public/erd.webp)

## SPEC API

| Name | Routes | HTTP | Description | Middleware Auth |
|------|--------|------|-------------|-----------------|
| Auth - User | 
|      | `/api/v1/auth/user/register` | POST | User register | No |
|      | `/api/v1/auth/user/login` | POST | User login | No |

<br />

## User Regiseter
`POST` - `http://[host]:[port]/api/v1/auth/user/register` 
<br />

Request body
<br />
``` json
{
    "name": "Budi Setiawan",
    "email": "budi@mail.com",
    "password": "123456"
}
```

Response body
<br />
``` json
{
    "status": 201,
    "message": "Register Berhasil",
    "error": null,
    "datas": null
}
```

<br />

## User Login
`POST` - `http://[host]:[port]/api/v1/auth/user/login` 
<br />

Request body
<br />
``` json
{
    "email": "budi@mail.com",
    "password": "123456"
}
```

Response body
<br />
``` json
{
    "status": 200,
    "message": "Login berhasil",
    "error": null,
    "datas": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InZpY2t5IiwiZW1haWwiOiJ2aWNreUBtYWlsLmNvbSIsImlhdCI6MTY3NTA5NTQ2NywiZXhwIjoxNjc1MTgxODY3fQ.JjWeRDxc7TQWZiDPT7rmu83A2i71T6lqCRUlrnG40X8"
}
```
