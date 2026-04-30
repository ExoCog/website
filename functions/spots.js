const SPOTS_TOTAL = 15;
const SPOTS_KEY   = 'spots_taken';

export async function onRequestGet({ env }) {
  const taken = parseInt(await env.BETA_COUNTER.get(SPOTS_KEY) ?? '0');
  return Response.json(
    { remaining: Math.max(0, SPOTS_TOTAL - taken), taken, total: SPOTS_TOTAL },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function onRequestPost({ env }) {
  const taken = parseInt(await env.BETA_COUNTER.get(SPOTS_KEY) ?? '0');
  const next  = Math.min(SPOTS_TOTAL, taken + 1);
  await env.BETA_COUNTER.put(SPOTS_KEY, String(next));
  return Response.json(
    { remaining: Math.max(0, SPOTS_TOTAL - next), taken: next, total: SPOTS_TOTAL },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
