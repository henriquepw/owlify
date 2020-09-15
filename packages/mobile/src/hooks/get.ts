import api from '@services/api';
import useSWR, { ConfigInterface } from 'swr';

async function fetcher<Data>(url: string): Promise<Data> {
  const response = await api.get<Data>(url);

  return response.data;
}

function useGet<Data = Record<string, unknown>, Err = Error>(
  url: string,
  options?: ConfigInterface,
): [Data | undefined, boolean, Err | undefined] {
  const { data, error } = useSWR<Data, Err>(url, fetcher, options);

  const isLoading = !data || !error;

  return [data, isLoading, error];
}

export default useGet;
