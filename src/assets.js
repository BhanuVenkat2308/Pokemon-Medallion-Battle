// Vite supplies the deployment base; Node-based game tests use the root path.
export const assetUrl = path => `${import.meta.env?.BASE_URL || '/'}${path.replace(/^\//, '')}`;
