import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';
import * as fs from 'fs';

async function run() {
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        // Save online PDF as a file
        const rawData = await fetch("https://investors.mongodb.com/node/12236/pdf");
        const pdfBuffer = await rawData.arrayBuffer();
        const pdfData = Buffer.from(pdfBuffer);
        fs.writeFileSync("investor-report.pdf", pdfData);

        const loader = new PDFLoader(`investor-report.pdf`);
        const data = await loader.load();

        // Chunk the text from the PDF
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 20,
        });
        const docs = await textSplitter.splitDocuments(data);
        console.log(`Successfully chunked the PDF into ${docs.length} documents.`);

        // Connect to your Atlas cluster
        await client.connect();
        const db = client.db("rag_db");
        const collection = db.collection("test");

        console.log("Generating embeddings and inserting documents...");
        const chunkDocs = Math.round(docs.length/10);
        console.log(chunkDocs)
        const insertDocuments = [];
        let newDocs = [];
        for (let i = 0; i< 10; i++){
            newDocs = docs.slice(i*chunkDocs, (i+1)*chunkDocs);
            await Promise.all(newDocs.map(async doc => {
                console.log(`Processing document ${doc.pageContent}`);
                // Generate embeddings using the function that you defined
                const embedding = await getEmbedding(doc.pageContent);
                
                // Add the document with the embedding to array of documents for bulk insert
                insertDocuments.push({
                    document: doc,
                    embedding: embedding
                });
                console.log('documento inserido')
            }))
        }

        // Continue processing documents if an error occurs during an operation
        const options = { ordered: false };

        // Insert documents with embeddings into Atlas
        const result = await collection.insertMany(insertDocuments, options);  
        console.log("Count of documents inserted: " + result.insertedCount); 

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
