import axios, { AxiosError, AxiosResponse } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/`
});

api.interceptors.request.use((config) => {
  const controller = new AbortController();
  const cfg = {
    ...config,
    signal: controller.signal,
  };

  return cfg
}, (error: AxiosError<any>) => {
  console.log('request error');

  return Promise.reject(error);
});

const useAuthHttp = () => {
  function fetcher(url: string) {
    return api.get(url)
      .then((res) => {
        return res.data
      })
      .catch(err => {
        console.log('fetch err', err);
      });
  };

  return {
    get: <Data = any, Error = any>(
      url: string | null,
      config?: SWRConfiguration
    ) => {
      return useSWR<Data, AxiosError<Error>>(url, fetcher, {
        ...config,
      });
    },

    getOnce: <RES = any, DATA = any>(
      url: string,

      errorProcess?: (err: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .get<RES, AxiosResponse<RES>, DATA>(url)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            } else {
              // handleErrorToast(err)
            }
            reject(err);
          });
      });
    },
    post: <RES = any, DATA = any>(
      url: string,
      data: DATA,

      responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' = 'json',
      errorProcess?: (err: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .post<RES, AxiosResponse<RES>, DATA>(url, data, { responseType })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            } else {
              // handleErrorToast(err)
            }
            reject(err);
          });
      });
    },
    put: <RES = any, DATA = any>(
      url: string,
      data: DATA,

      errorProcess?: (err: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .put<RES, AxiosResponse<RES>, DATA>(url, data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            } else {
              // handleErrorToast(err)
            }
            reject(err);
          });
      });
    },
    delete: <RES = any, DATA = any>(
      url: string,
      data?: DATA,

      errorProcess?: (err: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .delete<RES, AxiosResponse<RES>, DATA>(url, { data })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            } else {
              // handleErrorToast(err)
            }
            reject(err);
          });
      });
    },
    patch: <RES = any, DATA = any>(
      url: string,
      data: DATA,

      errorProcess?: (err: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .patch<RES, AxiosResponse<RES>, DATA>(url, data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            if (errorProcess) {
              errorProcess(err);
            } else {
              // handleErrorToast(err)
            }
            reject(err);
          });
      });
    },
  };
};

export default useAuthHttp;
