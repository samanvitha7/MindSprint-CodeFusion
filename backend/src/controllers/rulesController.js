import rules from "../data/rulesData.js";

export const getRules = (req, res) => {
  res.json(rules);
};

export const getRuleById = (req, res) => {
  const { id } = req.params;
  const rule = rules.find(r => r.id === parseInt(id));
  if (!rule) {
    return res.status(404).json({ message: "Rule not found" });
  }
  res.json(rule);
};
