const fetcher = (url: string | URL, options?: RequestInit) => {
  console.log(options);
  return fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Internal Server Error");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};
export default fetcher;
