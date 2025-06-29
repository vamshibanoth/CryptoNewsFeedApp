import Branch from "react-native-branch";

let branchUniversalObject = null;

export const createBranchObject = async (metaData = {}) => {
  return Branch.createBranchUniversalObject("CryptoNewsfeed", {
    title: "CryptoNews",
    contentDescription: "Join Crypto",
    contentMetadata: {
      customMetadata: {
        ...metaData,
      },
    },
  });
};

export const getBranchObject = () => {
  return branchUniversalObject;
};
