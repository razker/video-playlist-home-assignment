import { Typography, Button, useTheme } from "@mui/material";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { TempService } from "../../services/TempService";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./Home.module.css";

const headersMap: Record<string, string> = {
  name: "MOVIE NAME",
  year: "YEAR",
};

const numberOfPages = 3;

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const [searchTextInput, setSearchTextInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [sortDescObject, setSortDescObject] = useState<any>({
    header: Object.keys(headersMap)[0],
    desc: true,
  });

  const theme = useTheme();

  const getData = async () => {
    const tempService = new TempService();

    const data = await tempService.getDemoData(searchText, currentPage);

    const dataArray: any[] = data?.data?.map((element: any) => ({
      name: element?.Title,
      year: element?.Year,
      id: element?.imdbID,
    }));

    setFetchedData(dataArray);
  };

  const handleSubmit = () => {
    setSearchText(searchTextInput);
  };

  useEffect(() => {
    if (searchText) {
      getData();
    }
  }, [searchText, currentPage]);

  const onHeaderClick = (header: any) => {
    setSortDescObject({ header, desc: !sortDescObject.desc });
  };

  const dataToDisplay = useMemo(
    () => [
      ...fetchedData.sort((a: any, b: any) => {
        if (sortDescObject.desc) {
          return a[sortDescObject.header] > b[sortDescObject.header] ? 1 : -1;
        } else {
          return a[sortDescObject.header] <= b[sortDescObject.header] ? 1 : -1;
        }
      }),
    ],
    [sortDescObject, fetchedData]
  );

  const onButtonPageClick = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <ColumnBox maxHeight className={styles.container}>
      <FBox className={styles.container}>
        <Typography variant="subtitle1">Movie search</Typography>
      </FBox>
      <FBox className={styles.container}>
        <Typography variant="subtitle2">
          Search for any movie you like:
        </Typography>
      </FBox>
      <FBox className={styles.container}>
        <FBox>
          <input
            onChange={(e) => setSearchTextInput(e.target.value)}
            value={searchTextInput}
            className={styles.input}
            placeholder="Search"
            style={{ width: "100%" }}
          />
        </FBox>
        <FBox paddingLeft={theme.spacing(2)}>
          <Button
            style={{
              textTransform: "none",
              width: "130px",
              height: "100%",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            <Typography variant="body2">Search</Typography>
          </Button>
        </FBox>
      </FBox>
      {dataToDisplay.length ? (
        <ColumnBox className={styles.container}>
          <FBox className={styles.container}>
            <table>
              <thead>
                <tr>
                  {Object.keys(headersMap).map((header) => (
                    <th key={header} onClick={(e) => onHeaderClick(header)}>
                      {headersMap[header]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((element) => (
                  <tr key={element.id}>
                    {Object.keys(headersMap).map((header) => (
                      <td key={header}>{element[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </FBox>
          <FBox className={styles.container}>
            <FBox className={styles.container}>
              {_.range(numberOfPages).map((element: any) => (
                <Button
                  onClick={() => onButtonPageClick(element + 1)}
                  key={element + 1}
                  disabled={currentPage === element + 1}
                >
                  {element + 1}
                </Button>
              ))}
            </FBox>
          </FBox>
        </ColumnBox>
      ) : null}
    </ColumnBox>
  );
};

export default Home;
