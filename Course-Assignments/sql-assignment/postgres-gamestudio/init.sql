-- Set up the databse 
-- Create Players table
CREATE TABLE players (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    join_date DATE
);

-- Create Games table
CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100),
    genre VARCHAR(50)
);

-- Create Scores table
CREATE TABLE scores (
    id INTEGER PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    game_id INTEGER REFERENCES games(id),
    score INTEGER,
    date_played DATE
);

-- Insert sample data into players (with corrected IDs)
INSERT INTO players (id, name, join_date) VALUES
(1, 'Michiel van der Gragt', '2025-01-15'),
(2, 'Shahid Manzoor', '2025-02-20'),
(3, 'Anders Eklund', '2025-03-10'),
(4, 'Sanna Maya Blomdahl', '2025-04-05'),
(5, 'Ellenor Vestin', '2025-05-12'),
(6, 'Diliara Tazieva', '2025-04-12'),
(7, 'Lars Munck', '2024-04-12'),
(8, 'Ida Sofie Karlsson', '2024-04-12'),
(9, 'Silvia Ighere Pettersson', '2023-04-12'),
(10, 'Anton Kivi', '2023-04-12'),
(11, 'Magnus Nilsson', '2025-06-12'),
(12, 'Victor Kristiansson', CURRENT_DATE - 15), -- Joined 15 days ago
(13, 'Patience Evertsson', CURRENT_DATE - 10);   -- Joined 10 days ago

-- Insert sample data into games
INSERT INTO games (id, title, genre) VALUES
(1, 'Space Adventure', 'Action'),
(2, 'Mystery Mansion', 'Adventure'),
(3, 'Racing Extreme', 'Racing'),
(4, 'Puzzle Master', 'Puzzle'),
(5, 'Fantasy Quest', 'RPG'),
(6, 'Battle Royale', 'Action'),
(7, 'Cooking Master', 'Simulation');

-- Insert sample data into scores
INSERT INTO scores (id, player_id, game_id, score, date_played) VALUES
(1, 1, 1, 1500, '2025-03-01'),
(2, 1, 2, 800, '2025-03-02'),
(3, 2, 1, 1200, '2025-03-03'),
(4, 2, 3, 950, '2025-03-04'),
(5, 3, 2, 1100, '2025-03-05'),
(6, 3, 4, 750, '2025-03-06'),
(7, 4, 1, 1800, '2025-03-07'),
(8, 4, 3, 1300, '2025-03-08'),
(9, 5, 2, 900, '2025-03-09'),
(10, 5, 4, 600, '2025-03-10'),
(11, 6, 5, 2000, '2025-03-11'),
(12, 6, 6, 850, '2025-03-12'),
(13, 7, 1, 950, '2025-03-13'),
(14, 7, 7, 1200, '2025-03-14'),
(15, 8, 2, 1400, '2025-03-15'),
(16, 8, 5, 1100, '2025-03-16'),
(17, 9, 3, 1600, '2025-03-17'),
(18, 9, 6, 750, '2025-03-18'),
(19, 10, 4, 1900, '2025-03-19'),
(20, 10, 7, 800, '2025-03-20'),
(21, 11, 1, 1700, '2025-03-21'),
(22, 11, 3, 1250, '2025-03-22'),
(23, 12, 2, 1350, '2025-03-23'),
(24, 12, 5, 950, '2025-03-24'),
(25, 13, 6, 1850, '2025-03-25'),
(26, 13, 7, 700, '2025-03-26'),
-- Additional plays for favorite games analysis
(27, 1, 1, 1650, '2025-03-27'), -- Michiel plays Space Adventure again
(28, 2, 1, 1400, '2025-03-28'), -- Shahid plays Space Adventure again
(29, 6, 5, 2100, '2025-03-29'), -- Diliara plays Fantasy Quest again
(30, 9, 3, 1750, '2025-03-30'); -- Silvia plays Racing Extreme again


--Task 1: List All Players and Their Scores
--We use INNER JOIN to connect players with their scores and games. INNER JOIN only returns records that have matching values in both tables.
SELECT 
    p.name AS player_name,
    g.title AS game_title,
    s.score,
    s.date_played
FROM players p
INNER JOIN scores s ON p.id = s.player_id
INNER JOIN games g ON s.game_id = g.id
ORDER BY p.name, s.date_played;

--Task 2: Find High Scorers
--We GROUP BY player to aggregate total scores, then ORDER BY total_score DESC to get highest first, and LIMIT 3 for top 3.
SELECT 
    p.name AS player_name,
    SUM(s.score) AS total_score
FROM players p
INNER JOIN scores s ON p.id = s.player_id
GROUP BY p.id, p.name
ORDER BY total_score DESC
LIMIT 3;


--Task 3: Players Who Didn't Play Any Games
--LEFT JOIN returns all players, and WHERE s.id IS NULL finds players with no matching scores.
SELECT 
    p.name AS player_name,
    p.join_date
FROM players p
LEFT JOIN scores s ON p.id = s.player_id
WHERE s.id IS NULL;

--Task 4: Find Popular Game Genres
--We COUNT scores per genre to determine popularity.
SELECT 
    g.genre,
    COUNT(s.id) AS times_played
FROM games g
INNER JOIN scores s ON g.id = s.game_id
GROUP BY g.genre
ORDER BY times_played DESC;

--Task 5: Recently Joined Players
--We filter using WHERE with date comparison.
SELECT 
    name AS player_name,
    join_date
FROM players
WHERE join_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY join_date DESC;