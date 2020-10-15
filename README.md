# Stimulus Content Loader

[![](https://img.shields.io/npm/dt/stimulus-content-loader.svg)](https://www.npmjs.com/package/stimulus-content-loader)
[![](https://img.shields.io/npm/v/stimulus-content-loader.svg)](https://www.npmjs.com/package/stimulus-content-loader)
[![](https://github.com/stimulus-components/stimulus-content-loader/workflows/Lint/badge.svg)](https://github.com/stimulus-components/stimulus-content-loader)
[![](https://img.shields.io/github/license/stimulus-components/stimulus-content-loader.svg)](https://github.com/stimulus-components/stimulus-content-loader)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bc6c7113-e3e7-4d1f-9508-4b631eea2e70/deploy-status)](https://stimulus-content-loader.netlify.com)

## Getting started

A Stimulus controller to asynchronously load HTML from an url.

## Installation

```bash
$ yarn add stimulus-content-loader
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import ContentLoader from "stimulus-content-loader"

const application = Application.start()
application.register("content-loader", ContentLoader)
```

## Usage

In your controller:
```ruby
class PostsController < ApplicationController
  def comments
    render partial: 'posts/comments', locals: { comments: @post.comments }
  end
end
```

In your routes:
```ruby
Rails.application.routes.draw do
ressources
  get :comments, to: 'posts#comments'
end
```

In your view:
```html
<div
  data-controller="content-loader"
  data-content-loader-url="<%= comments_path %>"
>
  <i class="fas fa-spinner fa-spin"></i> Loading comments...

  This content will be replaced by the content of the `posts/comments` partial generated by Rails.
</div>

<div
  data-controller="content-loader"
  data-content-loader-url="<%= comments_path %>"
  data-content-loader-refresh-interval="5000"
>
  This content will be reloaded every 5 seconds.
</div>

<div
  data-controller="content-loader"
  data-content-loader-url="/message.html"
>
  This content will be replaced by the content of the `/message.html` page in your public folder.
</div>

<div
  data-controller="content-loader"
  data-content-loader-url="/message.html"
  data-content-loader-lazy-loading=""
>
  This content will be replaced only when the element become visible thanks to Intersection Observers.
</div>

<div
  data-controller="content-loader"
  data-content-loader-url="/message.html"
  data-content-loader-lazy-loading=""
  data-content-loader-lazy-loading-root-margin="30px"
  data-content-loader-lazy-loading-threshold="0.4"
>
  You can customize the Intersection Observer options.
</div>

<div
  data-controller="content-loader"
  data-content-loader-url="/message.html"
  data-content-loader-lazy-loading=""
  data-content-loader-refresh-interval="5000"
>
  You can combine lazy loading and refresh interval. The timer will start only after the first fetch.
</div>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-content-loader-refresh-interval` | `undefined` | Interval in milliseconds to reload content. | ✅ |
| `data-content-loader-lazy-loading` | `undefined` | Fetch content when element is visible. | ✅ |
| `data-content-loader-lazy-loading-root-margin` | `0px` | rootMargin option for Intersection Observer. | ✅ |
| `data-content-loader-lazy-loading-threshold` | `0` | threshold option for Intersection Observer. | ✅ |


## Extending Controller

You can use inheritance to extend the functionality of any Stimulus components.

```js
import ContentLoader from "stimulus-content-loader"

export default class extends ContentLoader {
  connect() {
    super.connect()
    console.log("Do what you cant here.")
  }
}
```

These controllers will automatically have access to targets defined in the parent class.

If you override the connect, disconnect or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Credits

This controller is inspired by the [official Stimulus example](https://stimulusjs.org/handbook/working-with-external-resources).

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
