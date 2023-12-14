export const customEncodeURIComponent = (url: string) => {
  return encodeURIComponent(url).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toLocaleLowerCase();
  });
};
