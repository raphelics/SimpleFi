/**
 * 
 * @param {Array} userFields - all fields the user has invested in 
 * @param {Object} tokenPrices - prices of all user tokens
 * @return {Array} user fields updated with the value of the user's investment in them
 */

function addFieldInvestmentValues(userFields, tokenPrices) {
  const updatedFields = [...userFields];
  
  updatedFields.forEach(field => {
    let totalFieldValue = 0;
    field.seedTokens.forEach(token => {
      totalFieldValue += token.fieldReserve * tokenPrices[token.name].usd;
    })
    
    if (field.userBalance) {
      field.unstakedUserInvestmentValue = (field.userBalance / field.totalSupply) * totalFieldValue;
    } else {
      field.unstakedUserInvestmentValue = 0;
    }
    if (field.stakedBalance) {
      field.stakedBalance.forEach(
        stakedBalance => stakedBalance.userInvestmentValue = (stakedBalance.balance / field.totalSupply) * totalFieldValue
      )
    }
  })

  return updatedFields;
}

export default addFieldInvestmentValues;