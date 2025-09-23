-- Remove the old unique constraint on 'url' if it exists
-- This assumes your previous migration named it 'unique_url'. Adjust if necessary.
ALTER TABLE news_articles DROP CONSTRAINT IF EXISTS unique_url;

-- Add a new composite unique constraint on 'url' and 'category'
-- This allows the same URL to exist multiple times if the category is different.
ALTER TABLE news_articles ADD CONSTRAINT unique_url_category UNIQUE (url, category);