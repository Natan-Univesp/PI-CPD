function setSupplyStatusFormat(supplyInfo) {
   const statusTypes = Object.freeze({
      1: "Pronto para a retirada",
      2: "Indisponível"
   })
   
   if(Array.isArray(supplyInfo)) {
      const formattedSupply = supplyInfo.map(item => {
         return {...item, status: statusTypes[item.status]}
      })
      return formattedSupply;
   
   } else {
      return {...supplyInfo, status: statusTypes[supplyInfo.status]};
   }

   

}

module.exports = { setSupplyStatusFormat };