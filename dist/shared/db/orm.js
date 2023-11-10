import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'dbMaterias',
    type: 'mongo',
    clientUrl: 'mongodb://localhost:27017/dbMaterias',
    highlighter: new MongoHighlighter(),
    debug: true,
});
/*export const syncSchema =async () => {
    const generator = orm.getSchemaGenerator()
    await generator.updateSchema()
}*/
//# sourceMappingURL=orm.js.map