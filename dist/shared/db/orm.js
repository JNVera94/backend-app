import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import * as dotenv from 'dotenv';
dotenv.config();
let cli;
if (process.env.NODE_ENV === 'production') {
    cli = process.env.CONNECTION_DB;
}
else if (process.env.NODE_ENV === 'test') {
    cli = process.env.TEST_CONNECTION_DB;
}
else if (process.env.NODE_ENV === 'development') {
    cli = process.env.DEV_CONNECTION_DB;
}
else {
    throw new Error('Invalid NODE_ENV value');
}
const isDevelopment = process.env.NODE_ENV === 'test';
export const orm = await MikroORM.init({
    entities: isDevelopment ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],
    dbName: process.env.DB_NAME,
    type: 'mongo',
    clientUrl: cli,
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