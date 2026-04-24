import ejs from "ejs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const viewsRoot = fileURLToPath(new URL("./src/views", import.meta.url));

function isViewsEjs(file) {
    if (!file.endsWith(".ejs")) {
        return false;
    }
    const rel = path.relative(projectRoot, file).split(path.sep).join("/");
    return rel.startsWith("src/views/");
}

/**
 * Renders EJS in index HTML entry files so partials and layouts resolve from each file’s directory.
 */
export function viteEjs() {
    return {
        name: "vite-ejs",
        configureServer(server) {
            server.watcher.add(viewsRoot);
            server.watcher.on("change", (file) => {
                if (isViewsEjs(file)) {
                    server.ws.send({ type: "full-reload", path: "*" });
                }
            });
        },
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
