const songData = require('../songs.json');

const createArtist = (song) => ({
  name: song.artist_name
});

const filter = array => {
  let last = {};
  let res = [];
  let len = array.length;
  let j = 0;

  for (let i = 0; i < len; i++) {
    let item = array[i];
    if (last[item.name] !== 1) {
      last[item.name] = 1;
      res[j++] = item;
    }
  }
  return res;
}

exports.seed = function(knex, Promise) {
      // Inserts seed entries
      let artists = [];

      for(let i = 0; i < 8000; i++){
          artists.push(createArtist(songData[i]));
      }

      let filtered = filter(artists);
      
      let chunk = 500;
      
      for(let i = 0; i < 8000; i += chunk){
        // let tempArray = filtered.slice(i, i+chunk);

        return knex.batchInsert('artists', filtered, chunk);
      }

      
};


