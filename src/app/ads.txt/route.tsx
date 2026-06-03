export async function GET(request: Request) {
  
    const value = process.env.ADSENSE_ADSTXT;
 
    if (!value) {
        return new Response(null, {
            status: 404,
        });
    }

    return new Response(value, {
        status: 200,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}