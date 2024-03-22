import RNPrinter from './module';

const search = async (): Promise<any> => await RNPrinter.searchPrinter();
const connectPrinter = async (printerName: string): Promise<any> =>
  await RNPrinter.connectPrinter(printerName);

const print = (text: string, printerName: string) =>
  RNPrinter.print(text, printerName);

export { search, connectPrinter, print };
