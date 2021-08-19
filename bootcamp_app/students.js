const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
//   console.log(res.rows);
// })
// .catch(err => console.error('query error', err.stack));

const args = process.argv.slice(2, 4);
const cohortMonth = args[0];
const numOfResults = args[1];
const values = [`${cohortMonth}%`, numOfResults];
const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort  
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query( queryString, values).then((res) => {
    res.rows.forEach(user => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
    });
  }).catch((err) => console.error("query error", err.stack));
