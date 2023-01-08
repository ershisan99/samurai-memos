import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default {
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
};
