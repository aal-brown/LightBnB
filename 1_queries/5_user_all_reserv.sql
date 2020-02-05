/*
Show all reservations for a user.

join reservations to properties, where user id is given
Show average rating for the property
order by start date
*/


select properties.*, reservations.*, avg(property_reviews.rating) as average_rating
from reservations
join properties on reservations.property_id = properties.id
join property_reviews on properties.id = property_reviews.property_id
where reservations.guest_id = 1
group by properties.id,  reservations.id
having reservations.end_date < now()::date
order by reservations.start_date
limit 10;