const OnezeroMediumComExtractor = {
  domain: "onezero.medium.com",

  title: {
    selectors: [
      "h1",
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      // enter author selectors
      "p.ba.b.bb.bc.fj",
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
      ["meta[name='article:published_time']", "value"],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="twitter:image:src"]', "value"],

      // enter selectors
    ],
  },

  content: {
    selectors: [
      "div article.meteredContent",
      //   "div.n.p div.ao.ap.aq.ar.as.gq.au.v",
      //   "p.kr.ks.gt.kt.b.ib.ku.kv.kw.ie.kx.ky.kz.la.lb.lc.ld.le.lf.lg.lh.li.lj.lk.ll.lm.gm.gb",

      // enter content selectors
    ],
    defaultCleaner: false,
    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ["p a", "h2", "h1"],
  },
};

module.exports = OnezeroMediumComExtractor;
