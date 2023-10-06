# Stimulus Lit

Stimulus Lit provides the ability to reactively render HTML templates using [Lit](https://lit.dev/) and
[Stimulus](https://stimulus.hotwired.dev/).

## Differences between [`stimulus-render`](https://github.com/marcoroth/stimulus-render)

1. **No transpiler required:** Stimulus Lit uses the native browser API to render HTML templates (through
   [`lit-html`](https://lit.dev/docs/libraries/standalone-templates/)).
2. **Reactive rendering we are all familiar with**: Did you miss reactive rendering like you used to with React? This
   library has you covered. Use Stimulus values like React's state and you can reactively render anything.
3. **Faster and smaller than React:** Did you know
   [virtual DOM libraries like React are actually slower](https://codelabs.developers.google.com/codelabs/lit-2-for-react-devs#1)?
   Bonus point for being smaller (**5kb** minified and gzipped) than React (40+kb).

## Getting Started

npm:

```bash
npm install stimulus-lit lit-html
```

yarn:

```bash
yarn add stimulus-lit lit-html
```

Let's say there is an HTMl with the `hello` controller declaration:

```html
<div data-controller="hello">
  <!-- This is where the `render` method will put HTML. -->
</div>
```

And in the stimulus controller, import `userRender` and `html` from the `stimulus-lit` package:

```ts
// app/javascript/controllers/hello_controller.js
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  connect () {
    useRender(this)
  }

  render () {
    return html`<span>Hello world!</span>`
  }
}
```

Then this will render the following HTML:

```html
<div data-controller="hello">
  <span>Hello world!</span>
</div>
```

### Rendering with Values

Let's build something more interesting with reactive rendering. We'll build a counter that increments and decrements
a number using [Values](https://stimulus.hotwired.dev/reference/values). Given that we have a controlelr with a
`counter` value.

When there is an HTMl with the `counter` controller declaration:

```html
<div data-controller="counter" data-counter-counter-value="0">
</div>
```

And in the stimulus controller, the button has a `@click` action that increments the value of the counter:

```ts
// app/javascript/controllers/counter_controller.js
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  static values = { counter: 0 }

  connect () {
    useRender(this)
  }

  increment () {
    this.counterValue += 1
  }

  render () {
    return html`
     <button @click=${this.increment}>
       Count: ${this.counterValue}
     </button>
    `
  }
}
```

Then this controller will render the HTML below and the counter will increment when the button is clicked:

```html
<div data-controller="counter" data-counter-counter-value="0">
 <button>
   Count: 0
 </button>
</div>
```

### Specifying Where to Render

#### `renderBefore`

By default, `stimulus-lit` renders the template at the end of the controller host. You could change this by providing
a `renderBefore` option:

```html
<div data-controller="counter">
  <div data-counter-target="container">
     <!-- This is the element specified as `renderBefore` -->
  </div>
</div>
```

```js
// app/javascript/controllers/counter_controller.js
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  static targets = ["container"]

  connect () {
    useRender(this, { renderBefore: this.containerTarget })
  }

  render () {
    return html`<span>Hello world!</span>`
  }
}
```

Which will render:

```html
<div data-controller="counter">
  <span>
    Hello world!
  </span>

  <div data-counter-target="container">
     <!-- This is the element specified as `renderBefore` -->
  </div>
</div>
```

The second argument of `useRender` is an [`RenderOptions`](https://lit.dev/docs/api/LitElement/#RenderOptions) object.
Which means you can also use other options than `renderBefore`, such as `creationScope`,`host` and `isConnected`.

#### `container`

You can also change the container element where the HTML will be rendered to, with the `container` option:

```html
<div data-controller="counter">
  <!-- other elements... -->

  <div data-counter-target="container">
     <!-- This is the element specified as `container` -->
  </div>
</div>
```

```js
// app/javascript/controllers/counter_controller.js
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  static targets = ["container"]

  connect () {
    useRender(this, { container: this.containerTarget })  // Notice the `container` option here.
  }

  render () {
    return html`<span>Hello world!</span>`
  }
}
```

Which will render:

```html
<div data-controller="counter">
  <!-- other elements... -->

  <div data-counter-target="container">
    <span>
      Hello world!
    </span>
  </div>
</div>
```

## License

Copyright (c) 2022 Yuki Nishijima. See MIT-LICENSE for further details.

This project started as a fork of [stimulus-render](https://github.com/marcoroth/stimulus-render), a proof-of-concept
library for providing HTML rendering for Stimulus controllers, developed by [Marco Roth](https://github.com/marcoroth).
The original project is licensed under the MIT License.
