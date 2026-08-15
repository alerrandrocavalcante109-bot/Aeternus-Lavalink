const state = new Map();
module.exports = { name: "de", get(id) { if (!state.has(id)) state.set(id, {}); return state.get(id); }, note: "Edite o sistema de prefixo para (O.)" };
