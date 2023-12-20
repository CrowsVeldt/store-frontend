export const formatPhone = (number) => {
  const phoneSegments = number.match(/.{1,3}/g);
  const endDigits = number.slice(-4);
  return `(${phoneSegments[0]}) ${phoneSegments[1]}-${endDigits}`;
};

export const uniqueObjectArray = (arrayOfObjects) =>
  arrayOfObjects.filter(
    (object, index) =>
      index ===
      arrayOfObjects.findIndex(
        (obj) => JSON.stringify(obj) === JSON.stringify(object)
      )
  );
