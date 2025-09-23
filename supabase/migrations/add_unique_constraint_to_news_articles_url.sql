-- Add a unique constraint to the 'url' column if it doesn't already exist.
-- This ensures that the 'upsert' operation in the Edge Function can correctly identify conflicts.
ALTER TABLE news_articles
ADD CONSTRAINT unique_news_article_url UNIQUE (url);