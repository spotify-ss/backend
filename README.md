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
### /api/users/add/postive_track

- **POST**

expects body: 
```javascript 
{
    "user_id": number,
    "track_id": number
}
```

returns : the index of the postive track in the database 

### /api/users/add/negative_track

- **POST**

expects body: 
```javascript 
{
    "user_id": number,
    "track_id": number
}
```

returns : the index of the negative track in the database 

### /api/users/user_predicted_tracks

- **GET**

expects a query string

example: /api/users/user_predicted_tracks?user_id=1&page_number=5

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

can access next page of tracks with query string

example : /api/track/get_closest_tracks?page_number=5

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