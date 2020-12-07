import service from './service';

/**
 * get请求
 * @param url
 * @param query
 */
export const fetchGet = (url: string, query: any) => {
  return service({
    url: url,
    method: 'get',
    params: query
  });
};

/**
 * post请求
 * @param url
 * @param form
 */
export const fetchPost = (url: string, form: any) => {
  return service({
    url: url, //mock在这里拦截,返回数据
    method: 'post',
    data: form
  });
};
