## About The Project

A website to showcase some of my past work, including development, design and copywriting.

https://taylorsimpson.ca


### Built With
* [Astro](https://astro.build/) (static site generator, with MDX for case studies)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


### Working on the site

```sh
npm install      # once
npm run dev      # live preview at http://localhost:4321
npm run build    # build the site into dist/
npm run preview  # serve the built site locally
```

Pushing to `master` builds and deploys the site through GitHub Actions
(`.github/workflows/deploy.yml`).


### Where things live

* `src/content/projects/*.mdx`: one file per case study (served at `/projects/<name>/`)
* `src/components/editorial/`: the blocks case studies are built from (images, videos, personas, etc.)
* `src/pages/`: Astro pages, including the case study template
* `src/styles/project.css`: case study styles
* `public/`: files copied to the site as-is: images, the homepage, 404 and lab pages, résumé, CNAME
* `public/project.html`: forwards old `project.html?id=…` links to `/projects/…/`
