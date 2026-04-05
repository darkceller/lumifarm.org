export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Pages'
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });
    
    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      return new Response("無法取得 GitHub 授權碼，請重新登入。", { status: 400 });
    }
    
    // 💡 加入了 Decap CMS 專屬的「秘密握手對話」腳本
    const script = `
    <script>
      (function() {
        // 第二步：當收到大視窗的回應時，才把真正的密碼丟過去
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            e.origin
          );
          // 密碼成功送達後，小視窗功成身退
          window.removeEventListener("message", receiveMessage);
          setTimeout(() => window.close(), 100);
        }
        
        window.addEventListener("message", receiveMessage, false);
        
        // 第一步：小視窗主動向大視窗喊話「我回來了！」
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
    `;
    
    return new Response(`<!DOCTYPE html><html><body>${script}</body></html>`, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });
  } catch (error) {
    return new Response("系統連線錯誤。", { status: 500 });
  }
}