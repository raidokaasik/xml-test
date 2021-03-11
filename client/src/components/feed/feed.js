import React, { Fragment } from "react";
import Modal from "../modal/modal";
import Blackscreen from "../blackscreen/blackscreen";
import Card from "../card/card";
import Loadedcard from "../card/loadedcard.js";
import Loader from "../loader/loader";

const Feed = ({
  fetchedData,
  saveEdit,
  editFeed,
  loadFull,
  removeFeed,
  loadDetails,
}) => {
  return fetchedData.map((item, index) => {
    const loadedFeed = item.details
      ? item.details.map((detail, index) => {
          const { title, author } = detail.body;
          return (
            <Loadedcard
              key={index}
              tag={detail.tag}
              submit={() => saveEdit(item.guid)}
              editing={item.contentEditing}
              edit={(e) => editFeed(e, item.guid)}
              image={detail.body.lead_image_url}
              title={title}
              author={author ? author : item.author}
              loadFull={() => loadFull(title, item.guid)}
              remove={() => removeFeed(item.guid)}
              date={
                detail.body.date
                  ? detail.body.date
                  : detail.body.date_published
                  ? detail.body.date_published
                  : item.pubDate
              }
            />
          );
        })
      : null;
    return (
      <Fragment key={index}>
        {!item.loaded ? (
          <Card
            author={item.author}
            loading={item.contentLoading}
            editing={item.contentEditing}
            edit={() => editFeed(item.guid)}
            title={item.title}
            content={item.content}
            close={() => removeFeed(item.guid)}
            add={() => loadDetails(item.guid)}
            date={item.pubDate}
          />
        ) : item.contentLoading ? (
          <Loader />
        ) : item.loaded ? (
          loadedFeed
        ) : null}
      </Fragment>
    );
  });
};

export default Feed;

// const feed = this.state.fetchedData.map((item, index) => {
//   const full = this.state.fullArticle;
//   const loadedFeed = item.details
//     ? item.details.map((detail, index) => {
//         const { title, author } = detail.body;
//         return (
//           <Loadedcard
//             key={index}
//             tag={detail.tag}
//             submit={() => this.saveEdit(item.guid)}
//             editing={item.contentEditing}
//             edit={(e) => this.editFeed(e, item.guid)}
//             image={detail.body.lead_image_url}
//             title={title}
//             author={author ? author : item.author}
//             loadFull={() => this.loadFullArticle(title, item.guid)}
//             remove={() => this.removeFeed(item.guid)}
//             date={
//               detail.body.date
//                 ? detail.body.date
//                 : detail.body.date_published
//                 ? detail.body.date_published
//                 : item.pubDate
//             }
//           />
//         );
//       })
//     : null;
//   return (
//     <Fragment key={index}>
//       {!item.loaded ? (
//         <Card
//           author={item.author}
//           loading={item.contentLoading}
//           editing={item.contentEditing}
//           edit={() => this.editFeed(item.guid)}
//           title={item.title}
//           content={item.content}
//           close={() => this.removeFeed(item.guid)}
//           add={() => this.loadDetails(item.guid)}
//           date={item.pubDate}
//         />
//       ) : item.contentLoading ? (
//         <Loader />
//       ) : item.loaded ? (
//         loadedFeed
//       ) : null}
//     </Fragment>
//   );
// });
