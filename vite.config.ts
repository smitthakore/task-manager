// vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'https://task-manager-smitthakore.vercel.app/',
    },
  },
};
