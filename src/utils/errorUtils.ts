export const errorUtils = {
  isQuotaError(error: any) {
    return error?.status === 429 || error?.response?.status === 429;
  }
};