export const fetcher = async (...args: any[]) => {
	const res = await fetch(...args as [RequestInfo, RequestInit]);
	return res.json();
};