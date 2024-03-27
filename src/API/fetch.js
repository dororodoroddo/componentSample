export const getInternalData = async (uri) => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(`'${uri}'에 대한 get 요청이 실패했습니다.`);
  }

  const json = await response.json();
  return json;
};
