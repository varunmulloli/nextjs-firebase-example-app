const getMonth = date => String(date.getMonth()+1).padStart(2, '0');
const getDate = date => String(date.getDate()).padStart(2, '0');

export const getReadableDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : null;
  return date ? `${getDate(date)}.${getMonth(date)}.${date.getFullYear()}` : null;
}

export const getDateForInput = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : null;
  return date ? `${date.getFullYear()}-${getMonth(date)}-${getDate(date)}` : null;
}



