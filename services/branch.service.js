import Branch from "../model/branch.js";

export const addBranch = async (name, shortName) => {
  try {
    const data = await Branch.create({ name, shortName });
    return data;
  } catch (error) {
    return error;
  }
};

export const getBranches = async () => {
  try {
    const data = await Branch.find();
    return data;
  } catch (error) {
    return error;
  }
};

export const getBranchById = async (id) => {
  try {
    const data = await Branch.findById(id);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateBranch = async (id, name, shortName) => {
  try {
    const data = await Branch.findByIdAndUpdate(
      id,
      { name, shortName },
      {
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBranch = async (id) => {
  try {
    const data = await Branch.findByIdAndDelete(id);
    return data;
  } catch (error) {
    return error;
  }
};
