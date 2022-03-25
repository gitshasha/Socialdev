const sanityClient = require("@sanity/client");
module.exports = {
  sanityClient: sanityClient({
    projectId: "jodtrtcy",
    dataset: "production",
    useCdn: "false",
    apiVersion: "2022-02-22",
    token:
      "skrMWFMaGi37Eq23rzZ3uUksTg47iXGbCjDVoVZMSjeiJgCVPuh1IBGJeKBTihoq7XBJi5GdvzdhPRfARw6G3oo0E8HXR6Z6rEyy6UoXvfJwM8uJ1CAHfBDQ2Yvexh1fEtt9IflXbyphBL8w25TQBSeFzgG25Az2pSoN6xfwTW3c3m8VAMA4",
  }),
};
