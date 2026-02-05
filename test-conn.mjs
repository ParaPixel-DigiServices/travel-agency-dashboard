import { Client, Account } from "appwrite";

const projectId = "6984d2a10025f29c63c6";
const endpoint = "https://cloud.appwrite.io/v1";

console.log(`Testing Appwrite Connection...`);
console.log(`Endpoint: ${endpoint}`);
console.log(`Project ID: ${projectId}`);

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

const account = new Account(client);

// Try to get session or something harmless.
// Since we are server-side/script, we don't have a session.
// But we can check if the project is reachable by creating an anonymous session (if enabled) or just checking connectivity.
// Actually, let's just create a dummy "createSession" call which will fail with 401 (Unauthorized) if project exists,
// or 404/AppwriteException if project is invalid.

async function test() {
    try {
        // Just triggering a request. createAnonymousSession is a good test.
        // It might be disabled, but the error should be "Anonymous sessions disabled", not "Project not found".
        await account.createAnonymousSession();
        console.log("Success: Connected and created anonymous session!");
    } catch (error) {
        console.log("\n--- ERROR DETAILS ---");
        console.log("Error Message:", error.message);
        console.log("Error Code:", error.code);
        console.log("Error Type:", error.type);
        console.log("---------------------\n");

        if (error.message.includes("not accessible in this region")) {
            console.log("DIAGNOSIS: The Project ID exists, but it's restricted to a specific region.");
            console.log("ACTION: Please check your Appwrite Console Project Settings > Custom Domains/Settings to see the endpoint.");
        } else if (error.code === 404) {
            console.log("DIAGNOSIS: Project not found.");
        }
    }
}

test();
