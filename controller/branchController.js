import {
  addBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../services/branch.service.js";

const allowedOrigins = [
  "https://librarymanagementweb.vercel.app",
  "http://localhost:5173",
];

export const addBranchController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { name, shortName } = req.body;
    if (!name || !shortName) {
      res.status(404);
      throw new Error("Empty field");
    }
    const data = await addBranch(name, shortName);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ message: false, error: error.message });
  }
};

export const getBranchesController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const data = await getBranches(id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ message: false, error: error.message });
  }
};
export const getBranchByIdController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const data = await getBranchById(id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ message: false, error: error.message });
  }
};

export const updateBranchesController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const { name, shortName } = req.body;
    if (!name || !shortName) {
      res.status(404);
      throw new Error("Empty field");
    }
    const data = await updateBranch(id, name, shortName);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ message: false, error: error.message });
  }
};

export const deleteBranchController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const data = await deleteBranch(id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(401).json({ message: false, error: error.message });
  }
};
