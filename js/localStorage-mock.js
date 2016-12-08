var storage = [ Object({ text: 'Columbus, OH' }), Object({ text: 'Westerville, OH' }) ];

// Storage Mock
  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return storage[key] || null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }

  // mock the localStorage
window.localStorage = storageMock();
// mock the sessionStorage
window.sessionStorage = storageMock();
