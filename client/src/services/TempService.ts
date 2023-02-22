import axios from "axios";

export class TempService {
  public async getDemoData(
    searchText: string,
    currentPage: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `https://jsonmock.hackerrank.com/api/movies/search/?Title=${searchText}&page=${currentPage}`
        );

        resolve(response?.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getTempData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/temp`
        );
        resolve(response?.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async createNewTempData(
    tempDataId: string,
    data: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/temp`,
          {
            tempDataId,
            data,
          }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
