var customExtractor = {
  title: {
    selectors: ["h1"],
  },
  author: {
    selectors: [".byline-name"],
  },
  content: {
    selectors: ["article"],
  },
  extend: {
    uniqueKeyFromFixture: {
      selectors: [".single__hero-category"],
    },
  },
};

module.exports = customExtractor;
