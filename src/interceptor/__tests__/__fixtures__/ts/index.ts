export const tsTests = [
  {
    fileIndex: 1,
    fileId: 'test-file-id',
    expected: {
      areInterceptorsInjected: true,
      functions: [
        {
          content: `(code: string) => {
  return parse(code);
}`,
          id: 'test-file-id/parseJs',
          name: 'parseJs',
          type: 'arrow',
        },
      ],
    },
  },
  {
    fileIndex: 2,
    fileId: 'test-file-id',
    expected: {
      areInterceptorsInjected: true,
      functions: [
        {
          content: `(code: string) => {
  return parse(code);
}`,
          id: 'test-file-id/parseJs',
          name: 'parseJs',
          type: 'arrow',
        },
      ],
    },
  },
  {
    fileIndex: 3,
    fileId: 'test-file-id',
    expected: {
      areInterceptorsInjected: false,
      functions: [],
    },
  },
  {
    fileIndex: 4,
    fileId: 'test-file-id',
    expected: {
      areInterceptorsInjected: true,
      functions: [
        {
          content: `(code: string) => {
  return parse(code);
}`,
          id: 'test-file-id/parseJs',
          name: 'parseJs',
          type: 'arrow',
        },
      ],
    },
  },
  {
    fileIndex: 5,
    fileId: 'test-file-id',
    expected: {
      areInterceptorsInjected: true,
      functions: [
        {
          content: `(code: string) => {
  return parse(code);
}`,
          id: 'test-file-id/parseJs',
          name: 'parseJs',
          type: 'arrow',
        },
        {
          content: `(code: string) => {
  return parse(code);
}`,
          id: 'test-file-id/parseTs',
          name: 'parseTs',
          type: 'arrow',
        },
      ],
    },
  },
];
