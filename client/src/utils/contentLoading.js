const contentLoading = (id, value, fetchedData) => {
  const copiedState = [...fetchedData];
  const index = copiedState.indexOf(
    copiedState.filter((item) => item.guid === id)[0]
  );
  const selectedItem = copiedState[index];
  selectedItem.contentLoading = value;
  return copiedState;
};

export default contentLoading;
