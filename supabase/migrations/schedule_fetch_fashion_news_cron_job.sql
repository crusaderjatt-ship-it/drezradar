-- Schedule the 'fetch-fashion-news' Edge Function to run every 4 hours.
-- Replace 'YOUR_EDGE_FUNCTION_URL' with the actual URL of your deployed Edge Function.
SELECT cron.schedule(
    'fetch-fashion-news-hourly', -- Name of the cron job
    '0 */4 * * *',               -- Cron expression for every 4 hours (at minute 0, every 4th hour)
    $$
    SELECT net.http_post(
        'YOUR_EDGE_FUNCTION_URL', -- Replace with your actual Edge Function URL
        '{}'::jsonb,              -- Empty JSON body, as your function doesn't require input
        ARRAY[
            jsonb_build_object('Content-Type', 'application/json')
        ]
    );
    $$
);