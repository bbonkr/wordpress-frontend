"use client";
import Prism from "prismjs";
import React, { useEffect } from "react";

interface PostContent {
  content: string | undefined;
  classNames: string;
}

export const PostContent = ({ content, classNames }: Readonly<PostContent>) => {
  useEffect(() => {}, []);

  useEffect(() => {
    const cdeBlockRegex = /<pre>(\W|\s)?<code(\W|\s)?(class="language)?/gi;

    const hasCodeBlock = cdeBlockRegex.test(content ?? "");

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
