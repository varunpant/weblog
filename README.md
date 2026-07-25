# weblog

My static blog — **[varunpant.com](https://varunpant.com)**

Built with [Hugo](https://gohugo.io) (extended) using the
[hello-friend](https://github.com/panr/hugo-theme-hello-friend) theme, and served by
GitHub Pages from the `docs/` folder on `master`.

## Getting started

```bash
git clone https://github.com/varunpant/weblog.git
cd weblog
git submodule update --init --recursive   # required — the theme is a submodule
make serve                                # http://localhost:1313
```

## Building

```bash
make build     # hugo --minify → docs/
make watch     # rebuild on change
make clean     # removes docs/  (see note below)
```

The generated site in `docs/` is committed to the repository — that is what GitHub Pages
serves, so a rebuild must be committed alongside any content change for it to go live.

> **Note:** `make clean` deletes `docs/` entirely. The custom-domain `CNAME` lives in
> `static/CNAME` so it is regenerated on the next build.

See [CLAUDE.md](CLAUDE.md) for the full layout and deployment notes.
