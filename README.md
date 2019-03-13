# Instructions
test user login : 
```javascript
{
    "username": "user",
    "password": "password"
}
```

## End Points

## User End Points

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

## Artists End-points

### /api/artists

- **GET**
expects query string, if none default is page 1 with 100 artists per page : /api/arists?page=number&limit=number (limit is number of artists per page)

example 1: /api/artists
returns: a list of first 100 artists in the database

example 2: /api/artists?page=5
returns: a list of 100 aritsts on the 5th page

### /api/artists/artist

- **GET**

expects params : /api/artists/artist/name

example: /api/artists/artist/YG (is case senstive... for now)

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
```
## Track End-points

### /api/track

- **GET**

expects query string

example: /api/track?track_name=Attac (is case senstive... for now)

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

exmaple : /api/track/artist/1000

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

### /api/track/get_closest_tracks/:track_name

- **GET**

expects params: track_name

exmaple : /api/track/get_closest_tracks/Lactose (case senstive for now)

returns a list of the closest : 
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
        ...
    ]
}
```