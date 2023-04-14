export const isCsvFile = (fileName: string) => {
  const extension = fileName.substr(-3).toLowerCase();
  return extension === 'csv';
};
