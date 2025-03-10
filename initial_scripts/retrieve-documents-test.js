import { getQueryResults } from './retrieve-documents.js';

async function run() {
    try {
        const query = "2024 price";
        const documents = await getQueryResults(query);

        documents.forEach( doc => {
            console.log(doc);
        }); 
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);
