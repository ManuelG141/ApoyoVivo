import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB
})

export const sendQuery = async (query: string, values: any[]): Promise<any> => {
  const client = await pool.connect() // Connect to DB
  const result = await client.query(query, values)
  client.release()

  return result.rows // Return the result of the query
}

async function createTable (): Promise<void> {
  const client = await pool.connect()
  await client.query(`
    CREATE TABLE IF NOT EXISTS "users" (
        id UUID DEFAULT gen_random_uuid (),
        name VARCHAR(20),
        streak INT DEFAULT 1,
        role VARCHAR(10) DEFAULT 'user',
        username VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        hashed_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
  `)
  client.release()
}

createTable().then( // Create the table if it doesn't exist
  () => {
    console.log('Table "users" is ready.')
  }
).catch(
  (error: Error) => {
    console.error('Error creating table:', error)
  }
)
