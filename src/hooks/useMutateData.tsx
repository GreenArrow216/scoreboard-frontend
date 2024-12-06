import { useState } from 'react';

function useMutateData() {
  const [error, setError] = useState<unknown|null>(null);
  const [loading, setLoading] = useState(false);

  async function mutateData(url:string, method = 'POST', body = {}) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (err) {
      setError({err});
      throw err; // rethrow error for optional handling by caller
    } finally {
      setLoading(false);
    }
  }

  return { mutateData, error, loading };
}

export default useMutateData;
