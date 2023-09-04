const URL = process.env.DETA_SPACE_APP_HOSTNAME || 'http://localhost:3000';
import { URL } from '../../../../constants.js';

/**
 * @param {string} list
 * @param {Record<string, any>[]} items
 */
const render = (list, items) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
	<title>Hanī | HN (${list})</title>
	<link>${URL}/${list}/1</link>
	<description>Links from the orange site</description>
	<image>
		<url>${URL}/favicon.png</url>
		<title>Svelte HN (${list})</title>
		<link>${URL}/${list}/1</link>
	</image>
	${items
		.map(
			(item) => `
				<item>
					<title>${item.title}${item.domain ? ` (${item.domain})` : ''}</title>
					<link>${URL}/item/${item.id}</link>
					<description><![CDATA[${
						item.url ? `<a href="${item.url}">link</a> / ` : ''
					}<a href="${URL}/item/${item.id}">comments</a>
					]]></description>
					<pubDate>${new Date(item.time * 1000).toUTCString()}</pubDate>
				</item>
			`
		)
		.join('\n')}
</channel>
</rss>`;

export async function GET({ params }) {
	const list = params.list === 'top' ? 'news' : params.list === 'new' ? 'newest' : params.list;
	const res = await fetch(`https://api.hnpwa.com/v0/${list}/1.json`);
	const items = await res.json();
	const feed = render(list, items);

	return new Response(feed, {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
			'Content-Type': 'application/rss+xml'
		}
	});
}
