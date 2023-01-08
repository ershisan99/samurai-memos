import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default {
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "append" }],
    [
      rehypeToc,
      {
        headings: ["h1", "h2", "h3"],
        position: "afterend",
        cssClasses: {
          toc: "toc-post",
          link: "toc-link",
        },
      },
    ],
  ],
};
