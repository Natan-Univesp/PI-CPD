export function searchFilterSupply(supplyCollection, searchValue) {
   const filteredSupply = supplyCollection.filter(
      (supply) =>
         supply.marca.toLowerCase().includes(searchValue.toLowerCase()) ||
         supply.modelo.toLowerCase().includes(searchValue.toLowerCase()) ||
         supply.printer_compat.toLowerCase().includes(searchValue.toLowerCase())
   );
   return filteredSupply;
}

export function searchFilterReestoqueSupply(supplyCollection, searchValue) {
   const filteredSupply = supplyCollection.filter(
      (supply) =>
         supply.marca.toLowerCase().includes(searchValue.toLowerCase()) ||
         supply.modelo.toLowerCase().includes(searchValue.toLowerCase())
   );
   return filteredSupply;
}

export function searchFilterRetiradaSupply(retiradaCollection, searchValue) {
   const filteredRetirada = retiradaCollection.filter(
      (retiradaItem) =>
         retiradaItem.retirado_por.toLowerCase().includes(searchValue.toLowerCase()) ||
         retiradaItem.solicitante.toLowerCase().includes(searchValue.toLowerCase()) ||
         retiradaItem.setor.toLowerCase().includes(searchValue.toLowerCase()) ||
         retiradaItem.local.toLowerCase().includes(searchValue.toLowerCase()) || 
         retiradaItem.marca.toLowerCase().includes(searchValue.toLowerCase()) || 
         retiradaItem.modelo.toLowerCase().includes(searchValue.toLowerCase())
   );
   return filteredRetirada;
}
