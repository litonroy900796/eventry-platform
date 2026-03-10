// Single object এর _id কে id তে convert করো
export function formatDocument(doc) {
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest,
  };
}

// Array of objects এর সব _id কে id তে convert করো
export function formatDocuments(docs) {
  return docs.map((doc) => formatDocument(doc));
}
