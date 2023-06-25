const fetcher = (url: string | URL, options?: RequestInit) => {
  return fetch(url, options).then((res) => res.json());
};
export default fetcher;
