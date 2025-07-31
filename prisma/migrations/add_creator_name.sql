-- Add creatorName column to quizzes table
ALTER TABLE "quizzes" ADD COLUMN "creatorName" TEXT NOT NULL DEFAULT 'Anonymous';

-- Update existing quizzes to have a default creator name
UPDATE "quizzes" SET "creatorName" = 'Anonymous' WHERE "creatorName" IS NULL; 