// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { User, Video } = initSchema(schema);

export { User, Video };
