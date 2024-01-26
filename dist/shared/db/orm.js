import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import * as dotenv from 'dotenv';
dotenv.config();
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DB_NAME,
    type: 'mongo',
    clientUrl: process.env.CONNECTION_DB,
    highlighter: new MongoHighlighter(),
    debug: true,
});
export const checkConnection = async () => {
    try {
        await orm.isConnected();
        console.log('Connected to MongoDB successfully.');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
//# sourceMappingURL=orm.js.map