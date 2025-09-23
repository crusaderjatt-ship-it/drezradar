-- 1. Enable Row Level Security (RLS) for the 'news_articles' table if it's not already enabled.
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows all users (including the anon role used by Edge Functions)
--    to insert and update rows in the 'news_articles' table.
--    This is suitable for public data that your Edge Function is populating.
CREATE POLICY "Allow public insert and update for news_articles"
ON news_articles FOR ALL
TO public
USING (true) WITH CHECK (true);