-- Create sample quiz data
INSERT INTO quizzes (id, title, description, created_at, updated_at) VALUES 
('quiz-1', 'What''s Your Personality Type?', 'Discover your unique personality traits with this fun quiz!', NOW(), NOW());

-- Create personality results
INSERT INTO results (id, title, description, quiz_id) VALUES 
('result-1', 'The Adventurer', 'You love exploring new places and trying new experiences. You''re spontaneous and always ready for the next adventure!', 'quiz-1'),
('result-2', 'The Thinker', 'You enjoy deep conversations and analyzing complex problems. You''re thoughtful and prefer quality over quantity in relationships.', 'quiz-1'),
('result-3', 'The Social Butterfly', 'You thrive in social situations and love meeting new people. You''re energetic and bring positivity wherever you go!', 'quiz-1');

-- Create questions
INSERT INTO questions (id, text, "order", quiz_id) VALUES 
('q1', 'How do you prefer to spend your weekend?', 0, 'quiz-1'),
('q2', 'What''s your ideal vacation?', 1, 'quiz-1'),
('q3', 'How do you handle stress?', 2, 'quiz-1');

-- Create answers for question 1
INSERT INTO answers (id, text, "order", question_id, result_id) VALUES 
('q1a1', 'Hiking or exploring outdoors', 0, 'q1', 'result-1'),
('q1a2', 'Reading a good book', 1, 'q1', 'result-2'),
('q1a3', 'Hanging out with friends', 2, 'q1', 'result-3');

-- Create answers for question 2
INSERT INTO answers (id, text, "order", question_id, result_id) VALUES 
('q2a1', 'Backpacking through Europe', 0, 'q2', 'result-1'),
('q2a2', 'A quiet cabin in the mountains', 1, 'q2', 'result-2'),
('q2a3', 'A beach resort with lots of activities', 2, 'q2', 'result-3');

-- Create answers for question 3
INSERT INTO answers (id, text, "order", question_id, result_id) VALUES 
('q3a1', 'Go for a run or do physical activity', 0, 'q3', 'result-1'),
('q3a2', 'Take time alone to think and reflect', 1, 'q3', 'result-2'),
('q3a3', 'Talk it out with friends or family', 2, 'q3', 'result-3');
