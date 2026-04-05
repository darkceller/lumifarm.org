export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Pages-CMS' // 增加這行讓 GitHub 更開心
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });
    
    const data = await response.json();
    
    // 如果 GitHub 回傳錯誤（例如剛才的授權碼過期了），我們印出錯誤原因
    if (data.error) {
      return new Response(`GitHub 認證錯誤: ${data.error_description}`, { status: 400 });
    }
    
    const token = data.access_token;
    
    // 💡 修正了這裡！移除了多餘的括號，確保回傳乾淨的 JSON
    return new Response(
      `<!DOCTYPE html><html><body><script>
        const message = 'authorization:github:success:' + JSON.stringify({token: "${token}", provider: "github"});
        window.opener.postMessage(message, "*");
        window.close();
      </script></body></html>`,
      { headers: { "content-type": "text/html;charset=UTF-8" } }
    );
  } catch (error) {
    return new Response("系統發生錯誤，無法與 GitHub 連線。", { status: 500 });
  }
}