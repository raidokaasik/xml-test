const cleanName = (name) => {
  if (name !== null && name.includes("@")) {
    return name.substring(name.lastIndexOf("(") + 1, name.lastIndexOf(")"));
  } else {
    return name;
  }
};
export default cleanName;
