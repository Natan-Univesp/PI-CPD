function removeUndefinedValuesOfObject(obj) {
   const newObj = Object.entries(obj)
      .filter(([key, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
         acc[key] = value;
         return acc;
      }, {});

   return newObj;
}

module.exports = { removeUndefinedValuesOfObject }
