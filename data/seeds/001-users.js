
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user', password: '$2a$12$G9xLnwUIym/WUkg7ovXIT.t6A8mHbrVZmVMjjx9GC8VAlvm1SAPgi' }
      ]);
};
