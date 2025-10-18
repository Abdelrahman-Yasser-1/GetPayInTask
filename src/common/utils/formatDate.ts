export const formatDate = (dateString: string) => {
  const FormattedString = dateString.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
    '$1-$2-$3T$4:$5:$6Z',
  );
  // Create the date object
  const date = new Date(FormattedString);

  // format the date to get the correct order: 'Day, DayNumber Month year'
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const day = date.toLocaleDateString('en-US', { day: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });

  return `${weekday}, ${day} ${month} ${year}`;
};
