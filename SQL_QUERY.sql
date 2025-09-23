SELECT
  title,
  description,
  url,
  image_url,
  source_name,
  published_at,
  category
FROM
  news_articles
WHERE
  category = 'Gen Z Trending'
ORDER BY
  published_at DESC
LIMIT 12;