export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });
    
    const data = await response.json();
    const token = data.access_token;
    
    return new Response(
      `<!DOCTYPE html><html><body><script>
        const message = "authorization:github:success:{" + JSON.stringify({token: "${token}", provider: "github"}) + "}";
        window.opener.postMessage(message, "*");
        window.close();
      </script></body></html>`,
      { headers: { "content-type": "text/html;charset=UTF-8" } }
    );
  } catch (error) {
    return new Response("登入失敗，請聯絡管理員。", { status: 500 });
  }
}