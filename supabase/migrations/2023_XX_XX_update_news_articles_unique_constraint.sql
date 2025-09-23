-- Remove the old unique constraint on 'url' using the exact name from the error message
ALTER TABLE news_articles DROP CONSTRAINT IF EXISTS unique_news_article_url;

-- Add a new composite unique constraint on 'url' and 'category'
-- This allows the same URL to exist multiple times if the category is different.
ALTER TABLE news_articles ADD CONSTRAINT unique_url_category UNIQUE (url, category);