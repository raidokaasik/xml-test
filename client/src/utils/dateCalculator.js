const dateCalculator = (date) => {
  const currentDate = new Date().getTime();
  const newDate = Date.parse(date);
  if (!date || date === null || newDate <= 0) {
    return "No date available";
  } else {
    const daysDifference = Math.ceil(
      Math.abs(currentDate - newDate) / (1000 * 60 * 60 * 24)
    );

    // How many weeks and days function

    const weeksndays = (string1) => {
      const numberofWeeks = Math.floor(string1 / 7);
      const numberofMonths = Math.floor(numberofWeeks / 4);
      const numberofYears = Math.floor(numberofMonths / 12);
      const numberofDays = string1 % 7;
      const weeks =
        Math.floor(string1 / 7) > 1
          ? " weeks "
          : Math.floor(string1 / 7) === 1
          ? " week "
          : null;
      const days =
        string1 % 7 > 1 ? " days" : string1 % 7 === 1 ? " day" : null;
      let output =
        string1 % 7 === 0
          ? numberofWeeks + weeks
          : numberofWeeks + weeks + numberofDays + days;

      return output;
    };

    return weeksndays(daysDifference);
  }
};

export default dateCalculator;
