-- Consolidated migration to fix duplicate articles issue
-- This removes all conflicting constraints and creates a single, clear unique constraint

-- Drop all conflicting constraints
ALTER TABLE news_articles DROP CONSTRAINT IF EXISTS unique_news_article_url;
ALTER TABLE news_articles DROP CONSTRAINT IF EXISTS unique_url_category;
DROP INDEX IF EXISTS idx_news_articles_url;

-- Add single unique constraint on URL only
-- This prevents the same article URL from being inserted multiple times
ALTER TABLE news_articles
ADD CONSTRAINT unique_news_article_url UNIQUE (url);

-- Create index for faster lookups
CREATE UNIQUE INDEX idx_news_articles_url ON news_articles (url);

-- Keep category index for filtering
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles (category);

-- Add created/updated at triggers if they don't exist
CREATE OR REPLACE FUNCTION update_news_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_news_articles_updated_at ON news_articles;
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON news_articles
FOR EACH ROW
EXECUTE FUNCTION update_news_articles_updated_at();
