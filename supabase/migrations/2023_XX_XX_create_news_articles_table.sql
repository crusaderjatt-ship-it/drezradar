CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT UNIQUE NOT NULL,
  image_url TEXT,
  source_name TEXT,
  published_at TIMESTAMPTZ,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create an index on the URL for faster lookups and uniqueness checks
CREATE UNIQUE INDEX IF NOT EXISTS idx_news_articles_url ON news_articles (url);

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles (category);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row update
CREATE OR REPLACE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON news_articles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();