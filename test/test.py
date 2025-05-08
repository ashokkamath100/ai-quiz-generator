import asyncio
import asyncpg

async def test_cockroachdb_connection(connection_string):
    try:
        # Establish the connection
        connection = await asyncpg.connect(connection_string)

        # Execute a simple query to check the connection
        version = await connection.fetchval("SELECT version();")
        print("Connected to CockroachDB!")
        print("Database version:", version)

        # Create the "characters" table if it doesn't exist
        create_table_query = """
        CREATE TABLE IF NOT EXISTS characters (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            level INTEGER NOT NULL
        );
        """
        await connection.execute(create_table_query)
        print("Successfully ensured 'characters' table exists.")

        # Optionally, query to confirm the table exists
        table_check = await connection.fetch("""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_name = 'characters';
        """)
        if table_check:
            print("The 'characters' table is ready to use!")
        else:
            print("Failed to verify the 'characters' table.")

        # Close the connection
        await connection.close()
    except Exception as e:
        print("Failed to connect to CockroachDB or create the table.")
        print("Error:", str(e))

if __name__ == "__main__":
    # Replace this with your actual connection string
    connection_string = "postgresql://ashok:_tozG95onZSS8o0GwAzMEw@space-quail-6298.j77.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

    asyncio.run(test_cockroachdb_connection(connection_string))
