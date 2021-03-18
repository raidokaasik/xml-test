const contentLoading = (id, value, fetchedData, error) => {
  const copiedState = [...fetchedData];
  const index = copiedState.indexOf(
    copiedState.filter((item) => item.guid === id)[0]
  );

  const selectedItem = copiedState[index];
  if (error) {
    selectedItem.title = "Sorry, could not load content";
  }
  selectedItem.contentLoading = value;
  return copiedState;
};

export default contentLoading;
