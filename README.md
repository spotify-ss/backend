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
{
    userID,
    username,
    jsonWebToken // use this for the Authorization header
}
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
    userID,
    username,
    jsonWebToken
}
```

### /api/users/positive_tracks

- **GET**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```
returns an array of the positive songs for the user: 
```javascript
[
    {
        "acousticness": 0.953,
        "danceability": 0.73,
        "duration_ms": 50449,
        "energy": 0.33399999999999996,
        "instrumentalness": 0.912,
        "key": 8,
        "liveness": 0.0849,
        "loudness": -10.447000000000001,
        "mode": 0,
        "speechiness": 0.36200000000000004,
        "tempo": 81.137,
        "time_signature": 4,
        "valence": 0.8290000000000001,
        "popularity": 24,
        "track_name": "Fill Collins",
        "track_id": "4Lmr8FBZaUWHfuBqZI0aJ5",
        "id": 500
    },
    ...
]
```
### /api/users/delete/positive_track

- **DELETE**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

expects body : 
```javascript
{
    "track_id": number (this number is found on the Track object it self under id)
}
```

returns :
```javascript 
{
    "message": "Positive Track deleted!"
}
```

### /api/users/add/positive_track

- **POST**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

expects body: 
```javascript 
{
    "user_id": number,
    "track_id": number
}
```

returns : the index of the postive track in the database 

### /api/users/negative_tracks

- **GET**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

returns an array of the negative songs for the user: 
```javascript
[
    {
        "acousticness": 0.953,
        "danceability": 0.73,
        "duration_ms": 50449,
        "energy": 0.33399999999999996,
        "instrumentalness": 0.912,
        "key": 8,
        "liveness": 0.0849,
        "loudness": -10.447000000000001,
        "mode": 0,
        "speechiness": 0.36200000000000004,
        "tempo": 81.137,
        "time_signature": 4,
        "valence": 0.8290000000000001,
        "popularity": 24,
        "track_name": "Fill Collins",
        "track_id": "4Lmr8FBZaUWHfuBqZI0aJ5",
        "id": 500
    },
    ...
]
```

### /api/users/add/negative_track

- **POST**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

expects body: 
```javascript 
{
    "user_id": number,
    "track_id": number
}
```

returns : the index of the negative track in the database 

### /api/users/delete/negative_track

- **DELETE**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

expects body : 
```javascript
{
    "track_id": number (this number is found on the Track object it self under id)
}
```

returns : 
```javascript
{
    "message": "Negative Track deleted!"
}
```

### /api/users/user_predicted_tracks

- **GET**

expects header :
```javascript
{
    Authorization: jsonWebToken
}
```

can use a query string for page number

example: /api/users/user_predicted_tracks?page_number=5

returns : Tracks based on the users liked/disliked track data
```javascript
"tracks": [
        {
            "id": 4,
            "track_name": "Lactose",
            "track_id": "3J2Jpw61sO7l6Hc7qdYV91",
            "acousticness": 0.0294,
            "danceability": 0.8,
            "duration_ms": 125381,
            "energy": 0.579,
            "instrumentalness": 0.912,
            "key": 5,
            "liveness": 0.0994,
            "loudness": -12.118,
            "mode": 0,
            "speechiness": 0.0701,
            "tempo": 123.00299999999999,
            "time_signature": 4,
            "valence": 0.6409999999999999,
            "popularity": 9,
            "artist_name": "Chris Cooq",
            "artist_id": 3
        },
        {
            "id": 19,
            "track_name": "Prop - Original mix",
            "track_id": "5RCPsfzmEpTXMCTNk7wEfQ",
            "acousticness": 0.000256,
            "danceability": 0.813,
            "duration_ms": 134769,
            "energy": 0.598,
            "instrumentalness": 0.8909999999999999,
            "key": 8,
            "liveness": 0.0892,
            "loudness": -11.058,
            "mode": 1,
            "speechiness": 0.0874,
            "tempo": 122.01,
            "time_signature": 4,
            "valence": 0.623,
            "popularity": 7,
            "artist_name": "Bingo Play",
            "artist_id": 5
        },
        ...
```
100 tracks per page

## Artists End-points

### /api/artists

- **GET**
can use a query string, if none default is page 1 with 100 artists per page : /api/arists?page=number&limit=number (limit is number of artists per page)

example 1: /api/artists
returns: a list of first 100 artists in the database

example 2: /api/artists?page=5
returns: a list of 100 aritsts on the 5th page

### /api/artists/artist

- **GET**

expects params : /api/artists/artist/name

example: /api/artists/artist/yg

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

### /api/track/ 

- **GET** 

can use a query to change the page of the listed tracks

example: /api/track?page=5

returns a list of all the tracks in the Database: 
```javascript
[
    {
        "id": 1,
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
        "artist_id": 1
    },
    ...
]
```

### /api/track/:track_name

- **GET**

expects params: track_name

example: /api/track/fallin

returns tracks with the characters searched in it's name: 
```javascript
{
    "tracks":
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

exmaple : /api/track/get_closest_tracks/lactose 

can access next page of tracks with query string

example : /api/track/get_closest_tracks/lactose/?page_number=5

returns a list of the closest tracks: 
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

### /api/track/change_feature_values

- **POST**

can access next page of tracks with query string

example : /api/track/change_feature_values?page_number=5

expects body: 
```javascript
    {
        "acousticness": 0.0294,
        "danceability": 0.8,
        "duration_ms": 125381,
        "energy": 0.579,
        "instrumentalness": 0.912,
        "key": 5,
        "liveness": 0.0994,
        "loudness": -12.118,
        "mode": 0,
        "speechiness": 0.0701,
        "tempo": 123.00299999999999,
        "time_signature": 4,
        "valence": 0.6409999999999999,
        "popularity": 9
    }
```

returns a list of tracks based off the target values:

```javascript
{
    "tracks": [
        {
            "id": 4,
            "track_name": "Lactose",
            "track_id": "3J2Jpw61sO7l6Hc7qdYV91",
            "acousticness": 0.0294,
            "danceability": 0.8,
            "duration_ms": 125381,
            "energy": 0.579,
            "instrumentalness": 0.912,
            "key": 5,
            "liveness": 0.0994,
            "loudness": -12.118,
            "mode": 0,
            "speechiness": 0.0701,
            "tempo": 123.00299999999999,
            "time_signature": 4,
            "valence": 0.6409999999999999,
            "popularity": 9,
            "artist_name": "Chris Cooq",
            "artist_id": 3
        },
        ...
    ]
}
```
100 tracks per page