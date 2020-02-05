INSERT INTO users (name, email, password)
VALUES ('John Smith', 'jsmith@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob Jones', 'bjones@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lisa Johnson', 'ljohns@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Big House', 'description', 'https://img.icons8.com/cotton/64/000000/cottage.png', 'https://img.icons8.com/cotton/512/000000/cottage.png', 600, 5, 5, 8, 'Uruguay', '15 strange street', 'Capital', 'None', 'None'),
(2, 'Medium House', 'description', 'https://img.icons8.com/cotton/64/000000/cottage.png', 'https://img.icons8.com/cotton/512/000000/cottage.png', 250, 2, 2, 3, 'Canada', '10 suburbville drive', 'Calgary', 'Alberta', 'T2P1G1'),
(3, 'Appartment', 'description', 'https://img.icons8.com/cotton/64/000000/cottage.png', 'https://img.icons8.com/cotton/512/000000/cottage.png', 150, 0, 1, 1, 'Canada', '1211 17 avenue SW', 'Calgary', 'Alberta', 'T2N7G4');


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-02-11', '2020-02-26', 1, 2),
('2020-02-15', '2020-02-20', 2, 3),
('2020-02-18', '2020-02-25', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id,rating, message)
VALUES (1, 3, 3, 5, 'message'),
(2, 1, 1, 5, 'message'),
(3, 2, 2, 5, 'message');