import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { MongoDriver } from '@mikro-orm/mongodb';

export const orm = await MikroORM.init<MongoDriver>({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'dbMaterias',
    type: 'mongo',
    clientUrl: 'mongodb://localhost:27017/dbMaterias',
    highlighter: new MongoHighlighter(),
    debug: true,

})



