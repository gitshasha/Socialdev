const sanityClient = require("./client");
const fs = require("fs");
const path = require("path");
// function createPost(user, caption, image) {
//   return sanityClient.assets
//     .upload("image", createReadStream(image.path), {
//       filename: basename(image.path),
//     })
//     .then((data) =>
//       functions.getUserId(user).then((ids) => {
//         const id = ids[0]._id;
//         return sanityClient.create({
//           _type: "post",
//           author: { _ref: id },
//           photo: { asset: { _ref: data._id } },
//           description: caption,
//           created_at: new Date(),
//         });
//       })
//     );
// }

module.exports = {
  setMyVar: function (user, caption, desc, image) {
    console.log(user, image);
    return sanityClient.sanityClient.assets
      .upload("image", fs.createReadStream(image.path), {
        filename: path.basename(image.path),
      })
      .then((data) =>
        sanityClient.sanityClient
          .fetch(
            `*[_type == "author" && name == "${user}"]{
    _id
  }`
          )
          .then((ids) => {
            console.log(ids);
            const id = ids[0]._id;
            return sanityClient.sanityClient.create({
              _type: "post",
              author: { _ref: id },
              mainImage: { asset: { _ref: data._id } },
              body: desc,
              title: caption,
            });
          })
      );
  },
};
