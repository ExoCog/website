const SPOTS_TOTAL  = 15;
const FORMSPREE_ID = 'maqvwdln';

export async function onRequestGet({ env }) {
  try {
    const res = await fetch(
      `https://formspree.io/api/0/forms/${FORMSPREE_ID}/submissions?per_page=50`,
      { headers: { Authorization: `Bearer ${env.FORMSPREE_API_KEY}` } }
    );
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
    const { submissions = [] } = await res.json();
    const taken     = submissions.length;
    const remaining = Math.max(0, SPOTS_TOTAL - taken);
    return Response.json(
      { remaining, taken, total: SPOTS_TOTAL },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    // Fallback — client will show hardcoded seed value
    return Response.json(
      { remaining: null, error: true },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
