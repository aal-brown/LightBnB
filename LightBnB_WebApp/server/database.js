
const pool = require('./index.js');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
/* 
select users.name
from users
where users.email = $1

  */
const getUserWithEmail = function(email) {
  return pool.query(`
    select *
    from users
    where email = $1`,[email])
    .then((res) => res.rows[0]);
};
  
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    select *
    from users
    where id = $1`,[id])
    .then((res) => res.rows[0]);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name,user.email,user.password];
  console.log(values);
  return pool.query(`
  insert into users (name, email, password)
  values ($1, $2, $3)
  returning *;
  `,values)
    .then((res) => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  select properties.*, reservations.*, avg(property_reviews.rating) as average_rating
  from reservations
  join properties on reservations.property_id = properties.id
  join property_reviews on properties.id = property_reviews.property_id
  where reservations.guest_id = $1
  group by properties.id,  reservations.id
  having reservations.end_date < now()::date
  order by reservations.start_date
  limit $2;
  `, [guest_id, limit])
    .then((res) => {
      return res.rows;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  limit = 10;
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews on properties.id = property_reviews.property_id
  `;
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `where city like $${queryParams.length}
    `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `where owner_id = $${queryParams.length}
    `;
  }

  if (options.minimum_price_per_night &&  options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += `and `;
    } else {
      queryString += `where `;
    }
    queryParams.push(Number(options.minimum_price_per_night));
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `cost_per_night between $${queryParams.length - 1} and $${queryParams.length}
    `;

  } else if (options.minimum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += `and `;
    } else {
      queryString += `where `;
    }
    queryParams.push(Number(options.minimum_price_per_night));
    queryString += `cost_per_night >= $${queryParams.length}
    `;

  } else if (options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += `and `;
    } else {
      queryString += `where `;
    }
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `cost_per_night <= $${queryParams.length}
    `;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryString += `having `;
    queryParams.push(Number(options.minimum_rating));
    queryString += `avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    });
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [];
  for (let i = 0; i < Object.keys(property).length; i++) {
    values.push(Object.values(property)[i]);
  }
  values[5] *= 100;
  return pool.query(`
  insert into properties (
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
    )
  values ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11, $12, $13, $14)
  returning *;
  `,values)
    .then((res) => res.rows[0]);
};
exports.addProperty = addProperty;


// queries



exports.getAllProperties = getAllProperties;

