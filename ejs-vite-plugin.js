import ejs from "ejs";
import { fileURLToPath, URL } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

/**
 * Renders EJS in index HTML entry files so partials and layouts resolve from each file’s directory.
 */
export function viteEjs() {
    return {
        name: "vite-ejs",
        transformIndexHtml: {
            order: "pre",
            handler(html, ctx) {
                if (!html.includes("<%")) {
                    return html;
                }
                return ejs.render(
                    html,
                    {},
                    {
                        filename: ctx.filename,
                        root: projectRoot,
                    },
                );
            },
        },
    };
}
