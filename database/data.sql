-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "products" (
  "name", "price", "description", "minPlayers", "maxPlayers", "imageUrl", "thumbUrl", "primaryPublisher", "primaryDesigner")
  VALUES ('Catan', 47.99, 'The women and men of your expedition build the first two settlements. Fortunately, the land is rich in natural resources. You build roads and new settlements that eventually become cities. Will you succeed in gaining supremacy on Catan? Barter trade dominates the scene. Some resources you have in abundance, other resources are scarce. Ore for wool, brick for lumber - you trade according to what is needed for your current building projects. Proceed strategically! If you found your settlements in the right places and skillfully trade your resources, then the odds will be in your favor. But your opponents are smart too.To begin the game, we build the game board using hexagonal terrain tiles. Catan is born - a beautiful island with mountains, pastures, hills, fields, and forests, surrounded by the sea.Each of us places two small houses on spaces where three terrain hexes meet. They are our starting settlements. And so it begins. I roll two dice. An “11”! Each terrain hex is marked with a die roll number. Each player who owns a settlement adjacent to a terrain hex marked with the number rolled receives a resource produced by this hex. Hills produce brick, forests produce lumber, mountains produce ore, fields produce grain, and pastures produce wool. We use these resources to expand across Catan: we build roads and new settlements, or we upgrade our existing settlements to cities. For example, a road costs 1 brick and 1 lumber. If we do not have the necessary resources, we can acquire them by trading with our opponents. Each settlement is worth 1 victory point and each city is worth 2 victory points. If you expand cleverly, you may be the first player to reach 10 victory points and thus win the game!', 3, 4, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg', 'Catan Studio', 'Klaus Teuber'),
  ('Monopoly Deal Card Game', 7.99, 'Get a handy way to play the classic property-trading game! Be the first collect 3 full property sets of different colors, and you''ll win the Monopoly Deal Card Game. You''ll pick up cards when it''s your turn and play Action cards to charge players rent, steal their cards or demand money for your birthday. Build up property sets, gather piles of money and keep wheeling and dealing until you''re the Monopoly Deal winner!', 2, 5, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559255820851-51PyKtxYE9L.jpg', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559255820851-51PyKtxYE9L.jpg', 'Parker Brothers', 'Katharine Chapman'),
  ('Bananagrams', 12.99, 'Addictively simple, and simply addictive, BANANAGRAMS is the fast and frantic word game enjoyed by millions! Players and their opponents aim to use all of their letters to build a word grid in a race to the finish. The first player to use all of their tiles is crowned ''Top Banana''! BANANAGRAMS requires no pencil, paper, or board, and comes in a small portable banana-shaped pouch that''s perfect for ages 7 and up —at home or on the go.', 1, 8, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257788549-4190ktYkAjL.jpg', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257788549-4190ktYkAjL.jpg', 'Bananagrams, Inc.', 'Rena Nathanson'),
  ('Scrabble', 19.92, 'The classic word-on-word showdown. Use your letters to score points and challenge your family and friends. A double or triple letter or word space will let you earn big points. It''s your word against theirs!', 2, 4, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1599599554926', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1599599554926', 'Hasbro', 'Alfred Mosher Butts'),
  ('Unstable Unicorns', 14.49, 'A strategic card game that will destroy your friendships...but in a good way. One of Kickstarter''s Top 50 Most Backed Projects of all time! Build a Unicorn Army. Betray your friends. Unicorns are your friends now.', 2, 8, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1541531739549', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1541531739549', 'Breaking Games', 'Ramy Badie'),
  ('Codenames', 12.81, 'The two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES. The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. Codenames: win or lose, it''s fun to figure out the clues.', 2, 8, 'https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1679240870315-codenames_masked.png', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1679240870315-codenames_masked.png', 'Czech Games Edition', 'Vlaada Chvátil');


INSERT INTO "featuredProducts" ("productId")
  VALUES (1),
         (2),
         (3),
         (4),
         (5);
