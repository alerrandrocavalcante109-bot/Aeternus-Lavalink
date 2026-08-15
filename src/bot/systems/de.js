const state = new Map();
module.exports = { name: "de", get(id) { if (!state.has(id)) state.set(id, {}); return state.get(id); }, note: "Crie o sistema de carregamento dos comandos de prefixos." };
