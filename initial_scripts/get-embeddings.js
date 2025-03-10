import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for a given data source
export async function getEmbedding(data) {
    console.log('===========================iniciando embbeding===========================');
    const embedder = await pipeline(
        'feature-extraction', 
        'Xenova/nomic-embed-text-v1');
    const results = await embedder(data, { pooling: 'mean', normalize: true });
    console.log('==========================embbeding finalizado===========================');
    return Array.from(results.data);
}
