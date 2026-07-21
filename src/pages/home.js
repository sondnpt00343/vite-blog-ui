import * as api from "../api";

const postDetailUrl = (post) => `post-detail.html?slug=${encodeURIComponent(post.slug)}`;

const categoryUrl = (category) => `category.html?slug=${encodeURIComponent(category.slug)}`;

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const showMessage = (container, type, message) => {
  container.removeAttribute("aria-busy");

  container.innerHTML = `
    <div class="col-12">
      <div class="message message--${type}" role="${type === "error" ? "alert" : "status"}">
        <i class="fa-solid ${type === "error" ? "fa-circle-xmark" : "fa-circle-info"}" aria-hidden="true"></i>
        <span>${escapeHtml(message)}</span>
      </div>
    </div>
  `;
};

const renderPageInfo = ({ seoTitle, metaDescription, title, lead }) => {
  const metaTitleEl = document.querySelector("[data-home-meta-title]");
  const metaDescEl = document.querySelector("[data-home-meta-desc]");
  const titleEl = document.querySelector("[data-home-title]");
  const leadEl = document.querySelector("[data-home-lead]");

  if (seoTitle && metaTitleEl) {
    metaTitleEl.textContent = seoTitle;
  }

  if (metaDescription && metaDescEl) {
    metaDescEl.setAttribute("content", metaDescription);
  }

  if (title && titleEl) {
    titleEl.classList.remove("skeleton", "skeleton-title");
    titleEl.textContent = title;
  }

  if (lead && leadEl) {
    leadEl.classList.remove("skeleton", "skeleton-lead");
    leadEl.textContent = lead;
  }
};

const renderSlides = (slides = []) => {
  const container = document.querySelector("[data-home-slides]");
  if (!container || !slides.length) return;

  container.innerHTML = slides
    .map(
      (slide, index) => `
        <div class="hero-slider__slide hero-slider__slide--${index + 1}">
          ${escapeHtml(slide.title)}
        </div>
      `,
    )
    .join("");
};

const renderPosts = (posts = []) => {
  const container = document.querySelector("[data-home-posts]");
  if (!container) return;

  container.removeAttribute("aria-busy");

  if (!posts.length) {
    showMessage(container, "info", "Chưa có bài viết nào.");
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const category = post.category || {};
      const cover = post.cover || {};

      return `
        <div class="col-3 col-xl-6 col-md-6 col-sm-12">
          <article class="post-card">
            <a class="post-card__image" href="${postDetailUrl(post)}" aria-label="Xem chi tiết: ${escapeHtml(post.title)}">
              <img class="post-card__thumb" src="${escapeHtml(cover.url)}" alt="${escapeHtml(cover.altText || post.title)}" width="${cover.width || 640}" height="${cover.height || 360}" loading="lazy" decoding="async" />
            </a>
            <div class="post-card__body">
              <a class="post-card__meta" href="${categoryUrl(category)}">${escapeHtml(category.name || "Chưa phân loại")}</a>
              <h2 class="post-card__title">
                <a href="${postDetailUrl(post)}">${escapeHtml(post.title)}</a>
              </h2>
              <p class="post-card__excerpt">${escapeHtml(post.excerpt)}</p>
              <a class="post-card__link" href="${postDetailUrl(post)}">
                Đọc tiếp <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
};

const renderTopics = (topics = []) => {
  const container = document.querySelector("[data-home-topics]");
  if (!container || !topics.length) return;

  container.removeAttribute("aria-busy");
  container.innerHTML = topics
    .map(
      (topic) => `
        <li>
          <a class="topic-tag" href="category.html?tag=${encodeURIComponent(topic.slug)}">${escapeHtml(topic.name)}</a>
        </li>
      `,
    )
    .join("");
};

export const initHome = async () => {
  const postsContainer = document.querySelector("[data-home-posts]");
  if (!postsContainer) return;

  try {
    const { data } = await api.get("/home");

    renderPageInfo(data.page);
    renderSlides(data.heroSlides);
    renderPosts(data.latestPosts);
    renderTopics(data.topicTags);
  } catch (error) {
    showMessage(
      postsContainer,
      "error",
      error.message || "Không tải được dữ liệu trang chủ. Vui lòng thử lại.",
    );
  }
};
