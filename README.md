# Stimulus Lit

Stimulus Lit provides the ability to reactively render HTML templates using [Lit](https://lit.dev/) and
[Stimulus](https://stimulus.hotwired.dev/).

## What are the differences between [`stimulus-render`](https://github.com/marcoroth/stimulus-render)?

1. **No transpiler required:** Stimulus Lit uses the native browser API to render HTML templates (through
   [`lit-html`](https://lit.dev/docs/libraries/standalone-templates/)).
2. **Accepts the Lit APIs:** You can use Lit's
   [more flexible and intuitive expressions](https://lit.dev/docs/templates/expressions/), including `renderBefore`
   for controlling where the HTML will render.

## Getting Started

```bash
yarn add stimulus-lit lit-html
```

In a Stimulus controller, import `userRender` and `html` from the `stimulus-lit` package:

```ts
// app/javascript/controllers/hello_controller.ts
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

When there is an HTMl with the `hello` controller declaration:

```html
<div data-controller="hello">
  <!-- This is where the `render` method will put HTML. -->
</div>
```

Then this will render:

```html
<div data-controller="hello">
  <span>Hello world!</span>
</div>
```

### Rendering with Values

Let's build something more interesting. We'll build a counter that increments and decrements a number using
[Values](https://stimulus.hotwired.dev/reference/values).

```html
<div data-controller="counter">
</div>
```

```ts
// app/javascript/controllers/counter_controller.ts
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  static values = { counter: 1 }

  connect () {
    useRender(this)
  }

  increment () {
    this.counterValue += 1
  }

  render () {
    return html`
      <div id="counter">
        <button @click="${this.increment}">
          Count: ${this.counterValue}
        </button>
      </div>
    `
  }
}
```

This will render the HTML below and the counter will increment when the button is clicked.

```html
<div data-controller="counter">
  <div id="counter">
    <button>
      Count: 0
    </button>
  </div>
</div>
```

### Specifying Where to Render

By default, `stimulus-lit` renders the template at the end of the controller host. You could change this by providing
a `renderBefore` option:

```html
<div data-controller="counter">
  <div data-counter-target="container">
    This is a counter.
  </div>
</div>
```

```js
// app/javascript/controllers/counter_controller.ts
import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  static targets = ["container"]
  static values = { counter: 1 }

  connect () {
    useRender(this, { renderBefore: this.containerTarget })
  }

  increment () {
    this.counterValue += 1
  }

  render () {
    return html`
      <div id="counter">
        <button @click="${this.increment}">
          Count: ${this.counterValue}
        </button>
      </div>
    `
  }
}
```

Which will render:

```html
<div data-controller="counter">
  <div id="counter">
    <button>
      Count: 0
    </button>
  </div>

  <div data-counter-target="container">
    This is a counter.
  </div>
</div>
```

The second argument of `useRender` is an [`RenderOptions`](https://lit.dev/docs/api/LitElement/#RenderOptions) object.
Which means you can also use other options than `renderBefore`, such as `creationScope`,`host` and `isConnected`.

## License

Copyright (c) 2022 Yuki Nishijima. See MIT-LICENSE for further details.

This project started as a fork of [stimulus-render](https://github.com/marcoroth/stimulus-render), a proof-of-concept
library for providing HTML rendering for Stimulus controllers, developed by [Marco Roth](https://github.com/marcoroth).
The original project is licensed under the MIT License.
