const songData = require('../songs.json');

const createTrack = (knex, song) => {
  return knex('artists').where('name', song.artist_name).first()
    .then( artist => {
      return knex('tracks').insert({
        track_name: song.track_name,
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
        artist_id: artist.id
      });
    });
};

exports.seed = function(knex, Promise) {
      // Inserts seed entries
      let trackPromises = [];

      songData.forEach(song => {
        trackPromises.push(createTrack(knex, song))
      });
      return Promise.all(trackPromises);
};
