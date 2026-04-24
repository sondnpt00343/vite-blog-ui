import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: `${root}index.html`,
                about: `${root}about.html`,
                contact: `${root}contact.html`,
                register: `${root}register.html`,
                login: `${root}login.html`,
                category: `${root}category.html`,
                "post-detail": `${root}post-detail.html`,
                "my-posts": `${root}my-posts.html`,
                write: `${root}write.html`,
                elements: `${root}elements.html`,
            },
        },
    },
});
