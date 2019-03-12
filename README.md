# Instructions
test user login : 
```javascript
{
    "username": "user",
    "password": "password"
}
```

## End Points

### /api/users/register

- **POST** 

Expects body:
```javascript
{
    "username": string,
    "password": string
}
```
username must be unique

password must be at least 8 characters long

Returns:
```javascript
username,
jsonWebToken // use this for the Authorization header
```

### /api/users/login

- **POST**

Expects body:
```javascript
{
    "username": string,
    "password": string,
}
```

Returns:
```javascript
{
    jsonWebToken
}
```
### /api/artists

- **GET**

returns: a list of all the artists (2975 pagging to be added soon)

### /api/artists/artist

- **GET**

expects body: 
```javascript
{
    "name": string
}
```

returns: 
```javascript
{
    "artist":{
        "id": int,
        "name": string
    },
    "tracks":[
        {
            "id":int,
            "track_name": "Big Bank feat. 2 Chainz, Big Sean, Nicki Minaj",
            "track_id": "2RM4jf1Xa9zPgMGRDiht8O",
            "acousticness": 0.0058200000000000005,
            "danceability": 0.743,
            "duration_ms": 238373,
            "energy": 0.33899999999999997,
            "instrumentalness": 0,
            "key": 1,
            "liveness": 0.0812,
            "loudness": -7.678,
            "mode": 1,
            "speechiness": 0.409,
            "tempo": 203.92700000000002,
            "time_signature": 4,
            "valence": 0.11800000000000001,
            "popularity": 44,
            "artist_name": "YG",
            "artist_id": int
        },
    ]
}

### /api/track

- **GET**

expects body: 
```javascript
{
    "track_name": string
}
```

returns: 
```javascript
{
    "track":
        {
            "id":int,
            "track_name": "Big Bank feat. 2 Chainz, Big Sean, Nicki Minaj",
            "track_id": "2RM4jf1Xa9zPgMGRDiht8O",
            "acousticness": 0.0058200000000000005,
            "danceability": 0.743,
            "duration_ms": 238373,
            "energy": 0.33899999999999997,
            "instrumentalness": 0,
            "key": 1,
            "liveness": 0.0812,
            "loudness": -7.678,
            "mode": 1,
            "speechiness": 0.409,
            "tempo": 203.92700000000002,
            "time_signature": 4,
            "valence": 0.11800000000000001,
            "popularity": 44,
            "artist_name": "YG",
            "artist_id": int
        },
}
```

### /api/track/artist/:id

- **GET**

expects params: artist_id

returns: 
```javascript
{
    "tracks":[
        {
            "id":int,
            "track_name": "Big Bank feat. 2 Chainz, Big Sean, Nicki Minaj",
            "track_id": "2RM4jf1Xa9zPgMGRDiht8O",
            "acousticness": 0.0058200000000000005,
            "danceability": 0.743,
            "duration_ms": 238373,
            "energy": 0.33899999999999997,
            "instrumentalness": 0,
            "key": 1,
            "liveness": 0.0812,
            "loudness": -7.678,
            "mode": 1,
            "speechiness": 0.409,
            "tempo": 203.92700000000002,
            "time_signature": 4,
            "valence": 0.11800000000000001,
            "popularity": 44,
            "artist_name": "YG",
            "artist_id": int
        },
    ]
}
```
