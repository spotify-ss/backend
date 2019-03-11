
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user', password: '$2a$12$G9xLnwUIym/WUkg7ovXIT.t6A8mHbrVZmVMjjx9GC8VAlvm1SAPgi' }
      ]);
    });
};
