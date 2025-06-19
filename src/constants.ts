export default {
  pagination: {
    first: 10,
    last: 10,
  } as const,
  colors: {
    backgroundColor: "#ffffff",
    themeColor: "#e32f12",
  },
  contentTypeNames: {
    page: "page",
    post: "post",
  } as const,
} as const;
