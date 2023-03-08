interface ITransactions {
  id: string;
  price: number;
  description: string;
  type: boolean;
  created_at: Date;
  user_id: string;
  type_transation: boolean;
  title: string;
}
export const sumOfPrices = (type: boolean, data: ITransactions[]): number => {
  const transationFilter = data?.filter((entry) => !!entry.type === !!type);
  if (transationFilter.length <= 0) return 0;
  const arraySum = transationFilter.map((item) => item.price);
  const sum = arraySum.reduce((som, i) => som + i);
  return sum;
};
