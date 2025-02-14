export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    // Simulate a delay to show "thinking" state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Response(JSON.stringify({
      choices: [{
        message: {
          content: "Chat bot coming soon! This is a mock response for development purposes."
        }
      }]
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
} 