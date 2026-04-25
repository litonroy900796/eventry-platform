export const replaceMongoIdInArray = (array) => {
    const mappedArray = array.map(item => {
      return {
        id: item._id.toString(),
        ...item
      }
    }).map(({_id, ...rest}) => rest);

    return mappedArray;
  }

 export const replaceMongoIdInObject = (obj) => {
  const { _id, interested_ids, going_ids, ...rest } = obj;
  return {
    ...rest,
    id: _id.toString(),
    interested_ids: interested_ids?.map(id => id.toString()) ?? [],
    going_ids: going_ids?.map(id => id.toString()) ?? [],
  };
};