export async function load({ params, fetch }) {
	const list = params.list === 'top' ? 'news' : params.list === 'new' ? 'newest' : params.list;

	const response = await fetch(`https://api.hnpwa.com/v0/${list}/${params.page}.json`);
	const data = await response.json();

	// Set cache headers
	const headers = {
			'Cache-Control': `public, max-age=100, s-maxage=300, stale-while-revalidate=45`
	};

	return {
			list: params.list,
			page: +params.page,
			items: data,
			headers: headers
	};
}
