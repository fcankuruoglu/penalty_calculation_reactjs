const CalculationReducer = (state, action) => {
  switch(action.type) {
    case "GET_COUNTRY_DETAIL":
      return {
        ...state,
        countryDetails: action.payload
      }
    case "CALCULATE_PENALTY":
      return {
        ...state,
        businessDays: action.payload.businessDays,
        penalty: action.payload.penalty,
        currency: action.payload.currency
      }
    default:
      return state
  }
}

export default CalculationReducer;
