/* 
Get a list of the most visited cities.

So basically we will want to see the cities with the most reservations
*/

select properties.city, count(reservations.id) as total_reservations
from reservations
join properties on property_id = properties.id
group by properties.city
order by total_reservations desc;
