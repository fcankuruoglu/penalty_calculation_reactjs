import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Table,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import CalculationContext from '../contexts/calculation/calculationContext';
import { DayPicker } from 'react-day-picker';
import { addDays, format } from 'date-fns';

const css = `
  .my-selected{
    border: 2 px solid currentColor;
    background-color: #fff600;
  }
`

const pastMonth = new Date();

const Homepage = () => {
  const [countryId, setCountryId] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  const [range, setRange] = useState();

  const { businessDays, penalty, currency, countryDetails, getCalculatedPenalty, getCountryDetail } = useContext(CalculationContext)

  useEffect(() => {
    getCountryDetail();
    console.log(countryDetails)
  }, [])

  useEffect(() => {
    if(range) {
      setCheckoutDate(dayjs(range.from).format("YYYY-MM-DD"));
      setCheckinDate(dayjs(range.to).format("YYYY-MM-DD"));
    }
  }, [range]);

  const formatMoney = (amount, currency) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency }).format(
      amount
    );
  };

  return(
    <Container maxW={"container.xl"}>
      <Box my={4} mx={"auto"} width={"50%"}>
        <FormControl isRequired my={5}>
          <FormLabel size="md">Country</FormLabel>
          <Select value={countryId} onChange={(e) => setCountryId(e.target.value)} size="md" placeholder='Select country'>
            {countryDetails && (countryDetails).map(row => (
              <option key={row.id} value={row.id} size="md">{row.name}</option>
              ))
            }
          </Select>
        </FormControl>
        <FormControl border={"1px solid"} borderColor={"black"} my={5}>
          <style>
            {css}
          </style>
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            modifiersClassNames={{
              selected: 'my-selected',
            }}
          />
        </FormControl>
        <Button disabled={!(checkoutDate && checkinDate && countryId) ? true : false} onClick={(e) => {getCalculatedPenalty(countryId, checkoutDate, checkinDate )}} ml={"auto"} width={"48"} display={"block"} >
          Calculate Penalty
        </Button>
        <Box my={5}>
          <hr/>
          <Table variant={'simple'}>
            <Tbody>
              <Tr>
                <Th>
                  Business Day
                </Th>
                <Td>
                  {businessDays} Days
                </Td>
              </Tr>
              <Tr>
                <Th>
                  Total Penalty
                </Th>
                <Td>
                  {penalty && currency && formatMoney(penalty, currency)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  )
}

export default Homepage;
