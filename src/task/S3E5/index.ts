import axios, { AxiosError, AxiosResponse } from "axios";
import neo4j, {Neo4jError, Path} from "neo4j-driver";
import { Driver } from "neo4j-driver/types/driver.js";
import { Poligon } from "../../service/poligon.js";
import { Config } from "../../service/config.js";
import { Database } from "../../service/model.js";

const database = Config.get('centrala') + "/apidb";

interface User {
    id: string;
    username: string;
    access_level: string;
    is_active: string;
    lastlog: string;
}

const users: User[] = await axios.post(database, new Database('SELECT * FROM users'))
    .then(({ data: { reply } }: AxiosResponse) => {
        return reply as User[];
    })
    .catch((error: AxiosError) => {
        console.error('Error:', error.message);
        return [];
    })

interface Connection {
    user1_id: string;
    user2_id: string;
}

const connections: Connection[] = await axios.post(database, new Database('SELECT * FROM connections'))
    .then(({ data: { reply} }: AxiosResponse) => {
        return reply as Connection[];
    })
    .catch((error: AxiosError) => {
        console.error('Error:', error.message);
        return [];
    })

const URI = 'neo4j+s://00d21039.databases.neo4j.io';
const USER = 'neo4j';
const PASSWORD = Config.get('neo4j_password');

try {
    const driver: Driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD));

    for (const user of users) {
        console.log(user);

        await driver.executeQuery(
            `
                CREATE (p:User {name: $username, id: $id})
            `,
            user,
            { database: 'neo4j' }
        )
    }

    for (const connection of connections) {
        console.log(connection);

        await driver.executeQuery(
            `
                    MATCH (user1:User {id: $user1_id})
                    MATCH (user2:User {id: $user2_id})
                    CREATE (user1)-[:KNOWS]->(user2)
                `,
            connection,
            { database: 'neo4j' }
        )
    }

    let { records } = await driver.executeQuery(
        `
            MATCH (start:User {name: "Rafał"}), (end:User {name: "Barbara"}),
                p = shortestPath((start)-[:KNOWS*..10]-(end))
            RETURN p
        `,
        { database: 'neo4j' }
    )

    const result: Path = records[0].get('p');
    const names: string[] = result.segments.flatMap((segment: any) => [
        segment.end.properties.name
    ]);
    names.unshift(result.start.properties.name);

    (new Poligon()).sendReport('connections', names.join(', '));

    driver.close();
} catch (error: unknown) {
    if (error instanceof Neo4jError) {
        console.log(error.message);
    } else {
        console.log(error);
    }
}

