const songData = require('../songs.json');

const createTrack = (knex, song, array) => {
  const track = {
    track_name: song.track_name,
    track_id: song.track_id,
    acousticness: song.acousticness,
    danceability: song.danceability,
    duration_ms: song.duration_ms,
    energy: song.energy,
    instrumentalness: song.instrumentalness,
    key: song.key,
    liveness: song.liveness,
    loudness: song.loudness,
    mode: song.mode,
    speechiness: song.speechiness,
    tempo: song.tempo,
    time_signature: song.time_signature,
    valence: song.valence,
    popularity: song.popularity,
    artist_name: song.artist_name
  };
  return knex('artists').where('name', song.artist_name).first()
    .then( artist => {
      let newTrack = {...track};

      newTrack.artist_id = artist.id;
      return array.push(newTrack);
    });
};

exports.seed = async function(knex, Promise) {
      // Inserts seed entries
      let tracks = [];
      let chunk = 50;

      for(let i = 0; i < 6000; i ++){
        await createTrack(knex, songData[i], tracks);
      }
      
      for(let i = 0; i < 6000; i += chunk){

        return knex.batchInsert('tracks', tracks, chunk);
      }
};
