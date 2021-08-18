SELECT sum(completed_at-started_at) as total_duration, cohorts.name as cohort
FROM assistance_requests
JOIN cohorts ON cohorts.id = cohorts_id
JOIN students ON students.id = students_id
GROUP BY cohorts.name
ORDER BY total_duration;