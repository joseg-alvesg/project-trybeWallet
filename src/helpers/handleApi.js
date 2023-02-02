const URL = 'https://economia.awesomeapi.com.br/json/all';

const coinsApi = async () => {
  const request = await fetch(URL);
  const data = await request.json();
  delete data.USDT;
  return data;
};

export default coinsApi;
