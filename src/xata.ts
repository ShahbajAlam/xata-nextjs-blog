// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
    BaseClientOptions,
    SchemaInference,
    XataRecord,
} from "@xata.io/client";

const tables = [
    {
        name: "bookmark",
        checkConstraints: {
            bookmark_xata_id_length_xata_id: {
                name: "bookmark_xata_id_length_xata_id",
                columns: ["xata_id"],
                definition: "CHECK ((length(xata_id) < 256))",
            },
        },
        foreignKeys: {},
        primaryKey: [],
        uniqueConstraints: {
            _pgroll_new_bookmark_xata_id_key: {
                name: "_pgroll_new_bookmark_xata_id_key",
                columns: ["xata_id"],
            },
        },
        columns: [
            {
                name: "author_id",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "post_id",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "xata_createdat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_id",
                type: "text",
                notNull: true,
                unique: true,
                defaultValue: "('rec_'::text || (xata_private.xid())::text)",
                comment: "",
            },
            {
                name: "xata_updatedat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_version",
                type: "int",
                notNull: true,
                unique: false,
                defaultValue: "0",
                comment: "",
            },
        ],
    },
    {
        name: "comments",
        checkConstraints: {
            comments_xata_id_length_xata_id: {
                name: "comments_xata_id_length_xata_id",
                columns: ["xata_id"],
                definition: "CHECK ((length(xata_id) < 256))",
            },
        },
        foreignKeys: {},
        primaryKey: [],
        uniqueConstraints: {
            _pgroll_new_comments_xata_id_key: {
                name: "_pgroll_new_comments_xata_id_key",
                columns: ["xata_id"],
            },
        },
        columns: [
            {
                name: "author_id",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "author_name",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "comment",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "post_id",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "xata_createdat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_id",
                type: "text",
                notNull: true,
                unique: true,
                defaultValue: "('rec_'::text || (xata_private.xid())::text)",
                comment: "",
            },
            {
                name: "xata_updatedat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_version",
                type: "int",
                notNull: true,
                unique: false,
                defaultValue: "0",
                comment: "",
            },
        ],
    },
    {
        name: "posts",
        checkConstraints: {
            posts_xata_id_length_xata_id: {
                name: "posts_xata_id_length_xata_id",
                columns: ["xata_id"],
                definition: "CHECK ((length(xata_id) < 256))",
            },
        },
        foreignKeys: {},
        primaryKey: [],
        uniqueConstraints: {
            _pgroll_new_posts_xata_id_key: {
                name: "_pgroll_new_posts_xata_id_key",
                columns: ["xata_id"],
            },
        },
        columns: [
            {
                name: "author_id",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "author_name",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "content",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "image",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "slug",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "title",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "xata_createdat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_id",
                type: "text",
                notNull: true,
                unique: true,
                defaultValue: "('rec_'::text || (xata_private.xid())::text)",
                comment: "",
            },
            {
                name: "xata_updatedat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_version",
                type: "int",
                notNull: true,
                unique: false,
                defaultValue: "0",
                comment: "",
            },
        ],
    },
    {
        name: "users",
        checkConstraints: {
            users_xata_id_length_xata_id: {
                name: "users_xata_id_length_xata_id",
                columns: ["xata_id"],
                definition: "CHECK ((length(xata_id) < 256))",
            },
        },
        foreignKeys: {},
        primaryKey: [],
        uniqueConstraints: {
            _pgroll_new_users_xata_id_key: {
                name: "_pgroll_new_users_xata_id_key",
                columns: ["xata_id"],
            },
            users__pgroll_new_email_key: {
                name: "users__pgroll_new_email_key",
                columns: ["email"],
            },
        },
        columns: [
            {
                name: "email",
                type: "text",
                notNull: true,
                unique: true,
                defaultValue: null,
                comment: "",
            },
            {
                name: "name",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "password",
                type: "text",
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: "",
            },
            {
                name: "xata_createdat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_id",
                type: "text",
                notNull: true,
                unique: true,
                defaultValue: "('rec_'::text || (xata_private.xid())::text)",
                comment: "",
            },
            {
                name: "xata_updatedat",
                type: "datetime",
                notNull: true,
                unique: false,
                defaultValue: "now()",
                comment: "",
            },
            {
                name: "xata_version",
                type: "int",
                notNull: true,
                unique: false,
                defaultValue: "0",
                comment: "",
            },
        ],
    },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Bookmark = InferredTypes["bookmark"];
export type BookmarkRecord = Bookmark & XataRecord;

export type Comments = InferredTypes["comments"];
export type CommentsRecord = Comments & XataRecord;

export type Posts = InferredTypes["posts"];
export type PostsRecord = Posts & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
    bookmark: BookmarkRecord;
    comments: CommentsRecord;
    posts: PostsRecord;
    users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
    databaseURL:
        "https://Shahbaj-Alam-s-workspace-83s6oa.eu-central-1.xata.sh/db/blog",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
    constructor(options?: BaseClientOptions) {
        super(
            {
                ...defaultOptions,
                ...options,
                apiKey: process.env.XATA_API_KEY,
                branch: "main",
            },
            tables
        );
    }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
    if (instance) return instance;

    instance = new XataClient();
    return instance;
};
