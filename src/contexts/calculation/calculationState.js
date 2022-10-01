import { useReducer } from "react";
import CalculationReducer from "./calculationReducer";
import CalculationContext from "./calculationContext";
import axios from "axios";

const CalculationState = (props) => {
  const initialState = {
    businessDays: 0,
    penalty: 0,
    currency: '',
    countryDetails: []
  };

  const [state, dispatch] = useReducer(CalculationReducer, initialState);

  const getCountryDetail = (param) => {
    axios
      .get(`http://localhost:9090/v1/api/country/all`, param, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch({
          type: "GET_COUNTRY_DETAIL",
          payload: res.data
        })
      })
      .catch((errors) => {
      })
  }

  const getCalculatedPenalty = (countryId, checkoutDate, checkinDate) => {
    axios
      .get(`http://localhost:9090/v1/api/calculation/${countryId}?checkedOutDate=${checkoutDate}&returnedDate=${checkinDate}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res)
        dispatch({
          type: "CALCULATE_PENALTY",
          payload: res.data
        })
      })
      .catch((errors) => {
      })
  }

  return (
    <CalculationContext.Provider
      value={{
        businessDays: state.businessDays,
        penalty: state.penalty,
        currency: state.currency,
        countryDetails: state.countryDetails,
        getCalculatedPenalty,
        getCountryDetail
      }}>
      {props.children}
    </CalculationContext.Provider>
  );
}

export default CalculationState;
