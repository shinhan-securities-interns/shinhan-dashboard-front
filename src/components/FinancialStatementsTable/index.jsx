import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../apis/index';
import { Loading } from '../index';
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from './styled';

const FinancialStatementsTable = ({ code }) => {
  const [data, setDate] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/total_yearly/quarter/${code}`);
      setDate(Object.values(response.data)[0]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, [code]);

  const years = data ? Object.keys(data) : [];

  return (
    <Container>
      {data.length === 0 ? (
        <Loading flag={isEmpty} />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {years.map((year) => (
                  <TableCell key={year}>{year}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data[years[0]]).map((date) => (
                <TableRow key={date}>
                  <TableCell>{date}</TableCell>
                  {years.map((year) => (
                    <TableCell key={year}>{data[year][date]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default FinancialStatementsTable;
