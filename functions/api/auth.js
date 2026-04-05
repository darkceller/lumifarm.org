export async function onRequest(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const url = new URL(context.request.url);
  const redirect_uri = new URL('/api/callback', url.origin).href;
  return Response.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${redirect_uri}`);
}