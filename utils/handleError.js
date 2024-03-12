export const handleError = async (req, res, error) => {
  return res.status(500).json(error);
};
