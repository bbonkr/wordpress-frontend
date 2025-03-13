"use client";
import Prism from "prismjs";
import React, { useEffect } from "react";

// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-jsx";
// import "prismjs/themes/prism-tomorrow.css";

interface PostContent {
  content: string | undefined;
  classNames: string;
}

export const PostContent = ({ content, classNames }: Readonly<PostContent>) => {
  useEffect(() => {}, []);

  useEffect(() => {
    const cdeBlockRegex = /<pre>.*<code.*class=.*language/gi;

    const hasCodeBlock = cdeBlockRegex.test(content ?? "");

    console.info("hasCodeBlock", hasCodeBlock);
    if (hasCodeBlock) {
      Prism.highlightAll();
    }

    return () => {};
  }, []);

  return (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: content ?? "" }}
    />
  );
};
