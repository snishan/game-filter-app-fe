Object.defineProperty(global, 'import', {
    value: {
      meta: {
        env: {
          VITE_BE_URL: 'http://localhost:3001', // Mock during tests
        },
      },
    },
  });
  