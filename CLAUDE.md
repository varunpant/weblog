# CLAUDE.md

Personal weblog at **https://varunpant.com** — a Hugo static site whose build output is
committed to git and served directly by GitHub Pages.

## Stack

| Piece | Value |
|---|---|
| Generator | Hugo `v0.164.0+extended` (extended is **required** — the theme compiles SCSS via `css.Sass`) |
| Theme | `hello-friend` (git submodule) |
| Config | `config.toml` (TOML, single file — no `config/` dir) |
| Output dir | `docs/` (`publishDir` in `config.toml`) |
| Hosting | GitHub Pages, `master` branch → `/docs` folder |
| Domain | `varunpant.com` via `CNAME` |
| Comments | Disqus (`varunpant`) |
| Analytics | Google Analytics `UA-16978408-1` + AdSense partials |

## Deployment — read this before touching anything

There is **no CI pipeline**. No `.github/workflows`. Deployment is:

```bash
hugo --minify          # or: make build  /  ./build.sh
git add docs/
git commit
git push               # GitHub Pages serves master:/docs immediately
```

Consequences that matter:

- **`docs/` is tracked in git and must be committed.** A content or layout change that
  isn't followed by a rebuild + commit of `docs/` will not appear on the live site.
  Conversely, never hand-edit files in `docs/` — the next build overwrites them.
- A single rebuild rewrites hundreds of files in `docs/` (fingerprinted asset names,
  pagination pages, every post). Large diffs there are normal and expected.
- **`static/CNAME` must survive.** `make clean` runs `rm -rf docs/`, which previously
  deleted `docs/CNAME` and took down the custom domain. The fix (commit `e047789`) was to
  keep the canonical copy at `static/CNAME` so Hugo re-emits `docs/CNAME` on every build.
  Do not delete `static/CNAME`, and prefer `hugo --minify` over `make clean && make build`.

### Fresh clone

The theme is a git submodule — a plain `git clone` yields an empty `themes/hello-friend`
and every build fails:

```bash
git submodule update --init --recursive
```

### Local development

```bash
make serve     # hugo server -D  (includes drafts)
make watch     # hugo --minify --watch
make help
```

## Directory layout

```
config.toml            Site config: baseurl, theme, publishDir, menus, i18n strings
content/               Markdown source
  posts/               ~90 blog posts — the main content type
  arttracer/           Section: app landing page (_index.md, privacy.md, support.md)
  about.md
  archives.md          url = "/archives", type = "archive" → themes/.../archive/list.html
  showcase.md          Apps/projects index
layouts/               LOCAL overrides — win over the theme (see cascade below)
themes/hello-friend/   Submodule. Treat as read-only; override in layouts/ instead.
static/                Copied verbatim to docs/ — CNAME, style.css, favicons, img/, resources/
  style.css            Small custom CSS layered ON TOP of the theme's compiled SCSS
  resources/           Legacy assets from the old blog (images, demos, zips) — keep, old
                       posts deep-link into these paths
archetypes/default.md  `hugo new` template (note: emits YAML `---`, but posts use TOML `+++`)
resources/_gen/        Hugo's SCSS build cache (partially tracked — harmless)
docs/                  BUILD OUTPUT. Generated. Committed. Never edit by hand.
```

## Layout cascade

Hugo resolves `layouts/` before `themes/hello-friend/layouts/`. Only these are overridden
locally — everything else comes from the theme:

| File | Why it's overridden |
|---|---|
| `_default/baseof.html` | Adds the Google Analytics template block |
| `_default/rss.xml` | Custom feed (with `outputFormats.RSS.baseName = "feed"` → `/feed.xml`, not `index.xml`) |
| `404.html` | Minimal standalone 404 |
| `partials/head.html` | Theme CSS + `/style.css` override + fonts + OG/Twitter cards |
| `partials/prepended_head.html` | OpenSearch, `rel=me` links, site-verification meta |
| `partials/extended_head.html` | AdSense top banner (468x60) |
| `partials/extended_footer.html` | AdSense footer banner (728x90) + Disqus comment counts |
| `partials/comments.html` | Wraps Disqus in `#blog-comments` |

`extended_head` / `extended_footer` / `prepended_head` are deliberate empty extension
points provided by the theme — that's the intended way to inject custom markup.

To restyle: prefer editing `static/style.css` (loaded after the theme's compiled SCSS) over
modifying the submodule.

## Content conventions

Posts use **TOML front matter** (`+++`), not YAML — 90 of 90 posts. Match the existing form:

```toml
+++
title = "Auto Complete with Redis (Python)"
date = "2012-05-06"
author = " "
cover = ""
description = ""
tags = ["general","how to","python","redis","utility"]
+++
```

- `date` is `YYYY-MM-DD`; `dateFormatSingle`/`dateFormatList` render it as-is.
- `tags` are lowercase, free-form, plural-ish; reuse existing tags rather than inventing near-duplicates.
- Filenames are kebab-case and become the URL slug (`/posts/<filename>/`). A few legacy
  files contain spaces — leave them alone unless the URL is being intentionally changed.
- Front matter `url = "..."` pins a custom path (see `content/archives.md`).
- Home page paginates at 5 posts (`[pagination] pagerSize = 5`).

### Duplicate-heading gotcha

The theme's `single.html` already renders `<h1 class="post-title">{{ .Title }}</h1>`.
Do **not** repeat the page title as an `#` heading in the Markdown body — that was the bug
fixed in commit `2ce9f80`. Start body content at `##`.

## Menu

Nav items live in `config.toml` under `[[languages.en.menu.main]]`: About, Feed
(`/feed.xml`), Archives, Showcase. `showMenuItems = 5` controls how many render before the
"Show more" trigger.

## Known build warnings (non-blocking, as of Hugo 0.164.0)

The build succeeds but emits two recurring warnings. Neither is a regression — don't
"fix" them reflexively, but know what they mean:

- **`.Site.LanguageCode was deprecated in Hugo v0.158.0`** — comes from
  `layouts/_default/rss.xml:27` (and the identical line in the theme's copy). It still
  works, but will break the RSS feed on some future Hugo. The migration is
  `.Site.Language.Locale`.
- **`Raw HTML omitted while rendering ...`** ×9 — Goldmark strips inline HTML unless
  `markup.goldmark.renderer.unsafe = true`. Affects 9 legacy posts (`ternary-search-tree`,
  `simple-forecasting`, `serving-raster-layers-on-google-cloud-platform`,
  `ccs3-only-loading-icon`, `turn-off-autocomplete-for-input`,
  `sqlite3-bulk-import-csv-from-command-line`,
  `importing-exporting-csv-files-in-postgresql-databases-via-copy`,
  `how-to-integrate-google-container-engine-with-stackdriver-with-kubernaties`,
  `cloud composer orchestration via cloud build`). Enabling `unsafe` would restore that
  markup site-wide — a deliberate call, not a cleanup.

To test a build without dirtying the committed output:
`hugo --minify --destination /tmp/weblog-buildcheck`

## Checklist for a typical change

1. Edit `content/` (or `layouts/` / `static/`).
2. `make serve` and verify at `localhost:1313`.
3. `hugo --minify` to regenerate `docs/`.
4. Sanity-check that `docs/CNAME` still exists.
5. Commit **both** the source change and the `docs/` output in one commit.
