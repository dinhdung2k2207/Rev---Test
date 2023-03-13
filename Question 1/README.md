[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

- Installation is done using the

```console
$ npm install
```

- Create new file `.env` to set up environment variables

- Run this command for run the project

```console
$ npm run server-ts
```

- Run 2 APIS to create example database

```console
 http://localhost:8000/api/initAdminAcc
```

```console
 http://localhost:8000/api/initPatients
```

- Import file Rev-Dev.postman_collection.json to **PostMan** for test API

## Features

- The patient would only provide personal credentials for the lab technican to help setup the account ✅
- The patient should be able to provide OTP via mobile, email, or other MFA devices during sign up ✅
- Administrator should be able to register new patient and add patient in a group ✅
- Administrator should be able to add an infant or child to parents record / account ✅
- Administrator should be able to search patient records ✅
- The system must prevent multiple sign in with the same login credentials ✅

## APIS

baseURL: http://localhost:8000

#### Sign Up

```http
  POST /api/signUp
```

| Parameter    | Type     | Request  | Description                               |
| :----------- | :------- | :------- | :---------------------------------------- |
| `email`      | `string` | **Body** | **Required**. Cannot duplicate            |
| `password`   | `string` | **Body** | **Required**                              |
| `type`       | `string` | **Body** | **Required**. Must be parent/infant/child |
| `frist_name` | `string` | **Body** | **Required** First name of patient        |
| `last_name`  | `string` | **Body** | **Required** Last name of patient         |
| `address`    | `string` | **Body** | **Required** Address of patient           |

##### Example

- **Input**:

```
{
    "password": "1234",
    "email": "testsignin1@gmail.com",
    "frist_name": "",
    "last_name": "",
    "address": "",
    "type": "parent"
}
```

- **Output**:

```
{
    "data": {
        "last_name": "",
        "email": "testsignin1@gmail.com",
        "address": "",
        "password": "$2a$10$p.LePOTNAgOH9eQWxZEo6upIjWssXGAgeCLamVS4pkzKlqCejDXKq",
        "is_verified": false,
        "type": "parent",
        "childrens": [],
        "role": "user",
        "_id": "640e984f4cca0bae11d4b008",
        "createdAt": "2023-03-13T03:28:15.271Z",
        "updatedAt": "2023-03-13T03:28:15.271Z",
        "__v": 0
    },
    "mail": "https://ethereal.email/message/ZArxCWtzUsNXmLvWZA6YUpY7pimPWNpKAAAAHj5IxKJTr3crRQb5SaXcyYs"
}
```

- Click on the link on **Output** to go the email to get OTP verify code and using this code to **Verify OTP API**

#### Verify OTP

```http
  POST /api/verifyOTP
```

| Parameter   | Type     | Request  | Description                                |
| :---------- | :------- | :------- | :----------------------------------------- |
| `patientId` | `string` | **Body** | **Required**. The id of patient            |
| `otp`       | `string` | **Body** | **Required**. The otp get from above email |

##### Example

- **Input**:

```
{
    "patientId": "640e984f4cca0bae11d4b008",
    "otp": "6289"
}
```

- **Output**:

```
{
    "status": "VERIFIED",
    "message": "User email verified successfully"
}
```

#### Sign In

```http
  POST /api/signIn
```

| Parameter  | Type     | Request  | Description                        |
| :--------- | :------- | :------- | :--------------------------------- |
| `email`    | `string` | **Body** | **Required**. The email of user    |
| `password` | `string` | **Body** | **Required**. The password of user |

- **Input**:

```
{
    "password": "12345678",
    "email": "admin@gmail.com"
}
```

- **Output**:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGU5NzFmMzUxOTZiOGQ2YmRkYzRmNCIsInNlc3Npb25JZCI6IjY0MGU5ZjQ2ODVmOWYwYzVlYTM3OGE3MSIsImlhdCI6MTY3ODY3OTg3OSwiZXhwIjoxNjc5MTExODc5fQ.gop8tkYd8Jzx-BeRXP6Vk3L0o_3lepfOvjIkDB5L7cA"
}
```

##### Patient Example

- **Input**:

```
{
    "password": "12345678",
    "email": "patient2@gmail.com"
}
```

- **Output**:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGU5NzIyMzUxOTZiOGQ2YmRkYzRmYSIsInNlc3Npb25JZCI6IjY0MGU5ZjZkODVmOWYwYzVlYTM3OGE3NSIsImlhdCI6MTY3ODY3OTkxNywiZXhwIjoxNjc5MTExOTE3fQ._SOgHHmQldtKIKxvd9uMfrMmPp5mj1BWmEjEbNcc_yc"
}
```

#### Create group

```http
  POST /api/createGroup
```

| Parameter     | Type     | Request    | Description                                          |
| :------------ | :------- | :--------- | :--------------------------------------------------- |
| `name`        | `string` | **Body**   | **Required**. The name of group                      |
| `patients`    | `string` | **Body**   | **Optional**. The list of patients need add to group |
| `accessToken` | `string` | **Header** | **Required**. Must be include accessToken to Header  |

- **Input**:

```
{
    "name": "group 1",
    "patients": [

    ]
}
```

- **Output**:

```
{
    "data": {
        "name": "group 1",
        "patients": [],
        "_id": "640e9ff285f9f0c5ea378a84",
        "createdAt": "2023-03-13T04:00:50.253Z",
        "updatedAt": "2023-03-13T04:00:50.253Z",
        "__v": 0
    }
}
```

#### Add patient to group

```http
  PATCH /api/addPatientToGroup
```

| Parameter     | Type     | Request    | Description                                          |
| :------------ | :------- | :--------- | :--------------------------------------------------- |
| `groupID`     | `string` | **Body**   | **Required**. The id of group need to add patient    |
| `patients`    | `string` | **Body**   | **Optional**. The list of patients need add to group |
| `accessToken` | `string` | **Header** | **Required**. Must be include accessToken to Header  |

- **Input**:

```
{
    "groupID": "640e9ff285f9f0c5ea378a84",
    "patients": [
        "640e972235196b8d6bddc4f6",
        "640e972235196b8d6bddc4f8"
    ]
}
```

- **Output**:

```
{
    "message": "Add patients to group successfully",
    "data": {
        "_id": "640e9ff285f9f0c5ea378a84",
        "name": "group 1",
        "patients": [
            "640e972235196b8d6bddc4f6",
            "640e972235196b8d6bddc4f8"
        ],
        "createdAt": "2023-03-13T04:00:50.253Z",
        "updatedAt": "2023-03-13T04:05:34.566Z",
        "__v": 1
    }
}
```

#### Add Infant Or Child To Patient Record

```http
  PATCH /api/addInfatOrChildToPatientRecord
```

| Parameter     | Type     | Request    | Description                                              |
| :------------ | :------- | :--------- | :------------------------------------------------------- |
| `patientID`   | `string` | **Body**   | **Required**. The id of patient need to add child record |
| `childID`     | `string` | **Body**   | **Required**. The id of child                            |
| `accessToken` | `string` | **Header** | **Required**. Must be include accessToken to Header      |

- **Input**:

```
{
    "patientID": "640e972235196b8d6bddc4f8",
    "childID": "640e972835196b8d6bddc51e"
}
```

- **Output**:

```
{
    "data": {
        "_id": "640e972235196b8d6bddc4f8",
        "first_name": "Patient 1",
        "last_name": "Last name 1",
        "email": "patient1@gmail.com",
        "password": "$2a$10$rHD5/pk/385yPDV9J9ROJefA3Hp5/GdZJOfsun5om2mNvuZF6zsmu",
        "is_verified": true,
        "type": "parent",
        "childrens": [
            "640e972835196b8d6bddc51e"
        ],
        "role": "user",
        "createdAt": "2023-03-13T03:23:14.574Z",
        "updatedAt": "2023-03-13T04:21:37.806Z",
        "__v": 1
    }
}
```

#### Get All Patient Records with search

```http
  GET /api/getAllPatientRecords
```

| Parameter     | Type     | Request    | Description                                         |
| :------------ | :------- | :--------- | :-------------------------------------------------- |
| `first_name`  | `string` | **Param**  | **Optional**. first name of patient                 |
| `last_name`   | `string` | **Param**  | **Optional**. last name of patient                  |
| `email`       | `string` | **Param**  | **Optional**. email of patient                      |
| `type`        | `string` | **Param**  | **Optional**. type of patient                       |
| `accessToken` | `string` | **Header** | **Required**. Must be include accessToken to Header |

- **Input**:

```

```

- **Output**:

```
{
    "data": [
        {
            "_id": "640e972235196b8d6bddc4f6",
            "first_name": "Patient 0",
            "last_name": "Last name 0",
            "email": "patient0@gmail.com",
            "password": "$2a$10$0G6Ys707RpVqCiEQKYdNV.qJugmqM9WNnqMxWIrEmkK9zdWBdtUaC",
            "is_verified": true,
            "type": "parent",
            "childrens": [
                {
                    "_id": "640e972835196b8d6bddc51e",
                    "first_name": "Child 20",
                    "last_name": "Child Last name 20",
                    "email": "Child20@gmail.com",
                    "password": "$2a$10$ol7klrxNAUrAlpNTybkZ7.GpenN1MrSUXDlCWj/gSE.D3Py6tmSoC",
                    "is_verified": true,
                    "type": "child",
                    "childrens": [],
                    "role": "user",
                    "createdAt": "2023-03-13T03:23:20.993Z",
                    "updatedAt": "2023-03-13T03:23:20.993Z",
                    "__v": 0
                }
            ],
            "role": "user",
            "createdAt": "2023-03-13T03:23:14.215Z",
            "updatedAt": "2023-03-13T04:20:31.252Z",
            "__v": 1
        },
        {
            "_id": "640e972235196b8d6bddc4f8",
            "first_name": "Patient 1",
            "last_name": "Last name 1",
            "email": "patient1@gmail.com",
            "password": "$2a$10$rHD5/pk/385yPDV9J9ROJefA3Hp5/GdZJOfsun5om2mNvuZF6zsmu",
            "is_verified": true,
            "type": "parent",
            "childrens": [
                {
                    "_id": "640e972835196b8d6bddc51e",
                    "first_name": "Child 20",
                    "last_name": "Child Last name 20",
                    "email": "Child20@gmail.com",
                    "password": "$2a$10$ol7klrxNAUrAlpNTybkZ7.GpenN1MrSUXDlCWj/gSE.D3Py6tmSoC",
                    "is_verified": true,
                    "type": "child",
                    "childrens": [],
                    "role": "user",
                    "createdAt": "2023-03-13T03:23:20.993Z",
                    "updatedAt": "2023-03-13T03:23:20.993Z",
                    "__v": 0
                }
            ],
            "role": "user",
            "createdAt": "2023-03-13T03:23:14.574Z",
            "updatedAt": "2023-03-13T04:21:37.806Z",
            "__v": 1
        },
        {
            "_id": "640e972235196b8d6bddc4fa",
            "first_name": "Patient 2",
            "last_name": "Last name 2",
            "email": "patient2@gmail.com",
            "password": "$2a$10$WI8ZWCLbbfv6iKO/qwA5oeV8c/XNn.pOSbae005kRSs3k54GQMYsi",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:14.891Z",
            "updatedAt": "2023-03-13T03:58:37.662Z",
            "__v": 0,
            "login_sessions": "640e9f6d85f9f0c5ea378a75"
        },
        {
            "_id": "640e972335196b8d6bddc4fc",
            "first_name": "Patient 3",
            "last_name": "Last name 3",
            "email": "patient3@gmail.com",
            "password": "$2a$10$wfZ7BlBdLnf5oRnj/eYu9uiwORhDP38zLS32Oe2mqLpQoj4IG8zeu",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:15.242Z",
            "updatedAt": "2023-03-13T03:23:15.242Z",
            "__v": 0
        },
        {
            "_id": "640e972335196b8d6bddc4fe",
            "first_name": "Patient 4",
            "last_name": "Last name 4",
            "email": "patient4@gmail.com",
            "password": "$2a$10$Hc0QqSB3PcesYFcLd9CKR.szog2quX10X8AazwFbzLNM79HdqWNpm",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:15.647Z",
            "updatedAt": "2023-03-13T03:23:15.647Z",
            "__v": 0
        },
        {
            "_id": "640e972435196b8d6bddc500",
            "first_name": "Patient 5",
            "last_name": "Last name 5",
            "email": "patient5@gmail.com",
            "password": "$2a$10$VN3I0pHAaKjpvxSDdipPLOIQu92zRfsXtkFoTIV.UQ4u70E7JuU9K",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:16.022Z",
            "updatedAt": "2023-03-13T03:23:16.022Z",
            "__v": 0
        },
        {
            "_id": "640e972435196b8d6bddc502",
            "first_name": "Patient 6",
            "last_name": "Last name 6",
            "email": "patient6@gmail.com",
            "password": "$2a$10$IXCCocKu1RaRwseBcWZaROJwYG4Pp8zRAcr75eW1STnXeqLOXIpoy",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:16.360Z",
            "updatedAt": "2023-03-13T03:23:16.360Z",
            "__v": 0
        },
        {
            "_id": "640e972435196b8d6bddc504",
            "first_name": "Patient 7",
            "last_name": "Last name 7",
            "email": "patient7@gmail.com",
            "password": "$2a$10$01P.2AtkeamhAaY6CdSGyuaITZby5PiJBxqWzFzGBPqSNATcVhEVa",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:16.675Z",
            "updatedAt": "2023-03-13T03:23:16.675Z",
            "__v": 0
        },
        {
            "_id": "640e972435196b8d6bddc506",
            "first_name": "Patient 8",
            "last_name": "Last name 8",
            "email": "patient8@gmail.com",
            "password": "$2a$10$8iXEXfckZFrI/NfOLZyD9uLP38liKQJkz.2/4pvl6/NZ4w.xm2.hG",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:16.991Z",
            "updatedAt": "2023-03-13T03:23:16.991Z",
            "__v": 0
        },
        {
            "_id": "640e972535196b8d6bddc508",
            "first_name": "Patient 9",
            "last_name": "Last name 9",
            "email": "patient9@gmail.com",
            "password": "$2a$10$BBC3xqPsvNy7bi6aUXdckuaffiI3/.NGo.rTWO12HJIKdskx5/zU6",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:17.325Z",
            "updatedAt": "2023-03-13T03:23:17.325Z",
            "__v": 0
        },
        {
            "_id": "640e972535196b8d6bddc50a",
            "first_name": "Infant 10",
            "last_name": "Infant Last name 10",
            "email": "Infant10@gmail.com",
            "password": "$2a$10$oz.HxA8QUDk1gyUWAsaq0uLnx4pWPgMPJ8RJ.QmMCH8geoj7iVvhu",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:17.655Z",
            "updatedAt": "2023-03-13T03:23:17.655Z",
            "__v": 0
        },
        {
            "_id": "640e972535196b8d6bddc50c",
            "first_name": "Infant 11",
            "last_name": "Infant Last name 11",
            "email": "Infant11@gmail.com",
            "password": "$2a$10$I94J4FGn/1CEb8e7BwDCouZFFyZvYgcGlACjmUwguw9ei951mNdiO",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:17.995Z",
            "updatedAt": "2023-03-13T03:23:17.995Z",
            "__v": 0
        },
        {
            "_id": "640e972635196b8d6bddc50e",
            "first_name": "Infant 12",
            "last_name": "Infant Last name 12",
            "email": "Infant12@gmail.com",
            "password": "$2a$10$ijvGWpBUBXfLwVV1c27t.eMmAtGRg2BcE7cmMg9Drwd7oupR290yi",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:18.333Z",
            "updatedAt": "2023-03-13T03:23:18.333Z",
            "__v": 0
        },
        {
            "_id": "640e972635196b8d6bddc510",
            "first_name": "Infant 13",
            "last_name": "Infant Last name 13",
            "email": "Infant13@gmail.com",
            "password": "$2a$10$hWvUhofLrun74kLa5pd9VOzJgfwrpc6XvvqKdCfZDbrGDyplrn8Ge",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:18.658Z",
            "updatedAt": "2023-03-13T03:23:18.658Z",
            "__v": 0
        },
        {
            "_id": "640e972735196b8d6bddc512",
            "first_name": "Infant 14",
            "last_name": "Infant Last name 14",
            "email": "Infant14@gmail.com",
            "password": "$2a$10$vzfO9drIBSGQkQgJDAq7p.IIKwfuxi5mkmbr5BD8cEPBYBjyGFfpS",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:19.013Z",
            "updatedAt": "2023-03-13T03:23:19.013Z",
            "__v": 0
        },
        {
            "_id": "640e972735196b8d6bddc514",
            "first_name": "Infant 15",
            "last_name": "Infant Last name 15",
            "email": "Infant15@gmail.com",
            "password": "$2a$10$8mhzXR.sasWL5NZDmJZQ3OaSxuX1rYeQCJZw.Lig8JuaUOOF7qRly",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:19.328Z",
            "updatedAt": "2023-03-13T03:23:19.328Z",
            "__v": 0
        },
        {
            "_id": "640e972735196b8d6bddc516",
            "first_name": "Infant 16",
            "last_name": "Infant Last name 16",
            "email": "Infant16@gmail.com",
            "password": "$2a$10$kiFQ/semWyvcirWmixmDX.cI0w41KZ4szECGMeR2Cf7VOVQxkhXDG",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:19.645Z",
            "updatedAt": "2023-03-13T03:23:19.645Z",
            "__v": 0
        },
        {
            "_id": "640e972735196b8d6bddc518",
            "first_name": "Infant 17",
            "last_name": "Infant Last name 17",
            "email": "Infant17@gmail.com",
            "password": "$2a$10$U6E8AVLaMj9OTDNMyEpjNeLvyWLwCGGmEIKg3NEdptOLzCdMLGOdO",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:19.993Z",
            "updatedAt": "2023-03-13T03:23:19.993Z",
            "__v": 0
        },
        {
            "_id": "640e972835196b8d6bddc51a",
            "first_name": "Infant 18",
            "last_name": "Infant Last name 18",
            "email": "Infant18@gmail.com",
            "password": "$2a$10$wORWk8UNqdbT5/tzokJ2I.oaH1xHrmhGxG4hr02BvahBayRhDXQPm",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:20.321Z",
            "updatedAt": "2023-03-13T03:23:20.321Z",
            "__v": 0
        },
        {
            "_id": "640e972835196b8d6bddc51c",
            "first_name": "Infant 19",
            "last_name": "Infant Last name 19",
            "email": "Infant19@gmail.com",
            "password": "$2a$10$MiK4Kg3DM9cqdJqamyxLhekbv1w53tr8HcUTsbuv.jkG4Q7/FBM62",
            "is_verified": true,
            "type": "infant",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:20.639Z",
            "updatedAt": "2023-03-13T03:23:20.639Z",
            "__v": 0
        },
        {
            "_id": "640e972835196b8d6bddc51e",
            "first_name": "Child 20",
            "last_name": "Child Last name 20",
            "email": "Child20@gmail.com",
            "password": "$2a$10$ol7klrxNAUrAlpNTybkZ7.GpenN1MrSUXDlCWj/gSE.D3Py6tmSoC",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:20.993Z",
            "updatedAt": "2023-03-13T03:23:20.993Z",
            "__v": 0
        },
        {
            "_id": "640e972935196b8d6bddc520",
            "first_name": "Child 21",
            "last_name": "Child Last name 21",
            "email": "Child21@gmail.com",
            "password": "$2a$10$WiLWRtoElc9pPrqww9Xh6e/Y4DLriaBZcbyU5qN8dCkwwulqfOHu2",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:21.426Z",
            "updatedAt": "2023-03-13T03:23:21.426Z",
            "__v": 0
        },
        {
            "_id": "640e972935196b8d6bddc522",
            "first_name": "Child 22",
            "last_name": "Child Last name 22",
            "email": "Child22@gmail.com",
            "password": "$2a$10$s0GUW1usAiARAjMC/NgtnedIF8I4U4EQNfQwhR6IX3oTqHWWYysUa",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:21.769Z",
            "updatedAt": "2023-03-13T03:23:21.769Z",
            "__v": 0
        },
        {
            "_id": "640e972a35196b8d6bddc524",
            "first_name": "Child 23",
            "last_name": "Child Last name 23",
            "email": "Child23@gmail.com",
            "password": "$2a$10$0TfDmsjcqk6vaZNAkAoUIe9kgKI2jw7VtMtBWRhs18jE5dwoTeE9m",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:22.109Z",
            "updatedAt": "2023-03-13T03:23:22.109Z",
            "__v": 0
        },
        {
            "_id": "640e972a35196b8d6bddc526",
            "first_name": "Child 24",
            "last_name": "Child Last name 24",
            "email": "Child24@gmail.com",
            "password": "$2a$10$tS2PWfMqqfrwH.W6mSfgveXDJEEmGobQtbwnhEh5VjWEYNrapU8ty",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:22.441Z",
            "updatedAt": "2023-03-13T03:23:22.441Z",
            "__v": 0
        },
        {
            "_id": "640e972a35196b8d6bddc528",
            "first_name": "Child 25",
            "last_name": "Child Last name 25",
            "email": "Child25@gmail.com",
            "password": "$2a$10$YKf/YhoYXzm980WoodsqfOul4ovRfXnRECtA6TrxOV/zx3qGVonuC",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:22.790Z",
            "updatedAt": "2023-03-13T03:23:22.790Z",
            "__v": 0
        },
        {
            "_id": "640e972b35196b8d6bddc52a",
            "first_name": "Child 26",
            "last_name": "Child Last name 26",
            "email": "Child26@gmail.com",
            "password": "$2a$10$x1NWLqexm03AG1BK.NtUCOo6p1dteq3eywHSbODmXFxy7utYOZw4G",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:23.211Z",
            "updatedAt": "2023-03-13T03:23:23.211Z",
            "__v": 0
        },
        {
            "_id": "640e972b35196b8d6bddc52c",
            "first_name": "Child 27",
            "last_name": "Child Last name 27",
            "email": "Child27@gmail.com",
            "password": "$2a$10$XpwmRENzwAJAKTITbV.5Ne3adysgWNEPbQyKQvIcMarzPAg51VBv.",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:23.640Z",
            "updatedAt": "2023-03-13T03:23:23.640Z",
            "__v": 0
        },
        {
            "_id": "640e972b35196b8d6bddc52e",
            "first_name": "Child 28",
            "last_name": "Child Last name 28",
            "email": "Child28@gmail.com",
            "password": "$2a$10$NHdHb6ClCLJOiePZgPGUUOFMHrL6uObtGjO02ij4MlcqqV1ZLgOz6",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:23.993Z",
            "updatedAt": "2023-03-13T03:23:23.993Z",
            "__v": 0
        },
        {
            "_id": "640e972c35196b8d6bddc530",
            "first_name": "Child 29",
            "last_name": "Child Last name 29",
            "email": "Child29@gmail.com",
            "password": "$2a$10$ehyR9dwF/h8mWEYq.MO1ceOtkWyanJq38tPk0pqvbINuMOzZ6S6XG",
            "is_verified": true,
            "type": "child",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:23:24.331Z",
            "updatedAt": "2023-03-13T03:23:24.331Z",
            "__v": 0
        },
        {
            "_id": "640e97cf35196b8d6bddc536",
            "last_name": "",
            "email": "testsignin@gmail.com",
            "address": "",
            "password": "$2a$10$e8oKNAVJ9S0o27PZJgC5QukkrYuWSDuwGIghzgBlg1BCXKln8oK.O",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:26:07.964Z",
            "updatedAt": "2023-03-13T03:26:42.414Z",
            "__v": 0
        },
        {
            "_id": "640e984f4cca0bae11d4b008",
            "last_name": "",
            "email": "testsignin1@gmail.com",
            "address": "",
            "password": "$2a$10$p.LePOTNAgOH9eQWxZEo6upIjWssXGAgeCLamVS4pkzKlqCejDXKq",
            "is_verified": true,
            "type": "parent",
            "childrens": [],
            "role": "user",
            "createdAt": "2023-03-13T03:28:15.271Z",
            "updatedAt": "2023-03-13T03:29:09.785Z",
            "__v": 0,
            "login_sessions": "640e98854cca0bae11d4b010"
        }
    ],
    "count": 32
}
```
