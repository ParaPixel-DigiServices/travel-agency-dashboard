import { Account, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpointUrl:
    import.meta.env.VITE_APPWRITE_API_ENDPOINT ||
    "https://cloud.appwrite.io/v1",
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "mock_project_id",
  apiKey: import.meta.env.VITE_APPWRITE_API_KEY || "mock_api_key",
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "mock_database_id",
  userCollectionId:
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID ||
    "mock_user_collection_id",
  tripCollectionId:
    import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID ||
    "mock_trip_collection_id",
};

const isMock = appwriteConfig.projectId === "mock_project_id";

let client: Client;
let account: Account;
let database: Databases;
let storage: Storage;

if (isMock) {
  console.log("Using Mock Appwrite Client");
  client = {
    setEndpoint: () => client,
    setProject: () => client,
  } as unknown as Client;

  account = {
    get: async () => null,
    getSession: async () => null,
    createOAuth2Session: async () => {},
    deleteSession: async () => {},
  } as unknown as Account;

  database = {
    listDocuments: async () => ({ documents: [], total: 0 }),
    createDocument: async () => ({
      $id: "mock_doc_id",
      $createdAt: new Date().toISOString(),
    }),
    getDocument: async () => null,
  } as unknown as Databases;

  storage = {} as unknown as Storage;
} else {
  client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  account = new Account(client);
  database = new Databases(client);
  storage = new Storage(client);
}

export { client, account, database, storage };
