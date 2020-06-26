import { useEffect, useState } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  // componentWillMount in functional Container
  const reqInteceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInteceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      // Cleanup
      httpClient.interceptors.request.eject(reqInteceptor);
      httpClient.interceptors.response.eject(resInteceptor);
    };
  }, [reqInteceptor, resInteceptor]);

  const dismissErrorHandler = () => {
    setError(null);
  };

  return [error, dismissErrorHandler];
};
