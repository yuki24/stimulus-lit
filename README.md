# Stimulus Lit

## Getting Started

```bash
yarn add stimulus-lit
```

### Counter Example

```html
<div data-controller="counter"></div>
```


```js
// app/javascript/controllers/counter_controller.js

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

## License

Copyright (c) 2022 Yuki Nishijima. See MIT-LICENSE for further details.

This project started as a fork of [stimulus-render](https://github.com/marcoroth/stimulus-render), a proof-of-concept
library for providing HTML rendering for Stimulus controllers, developed by [Marco Roth](https://github.com/marcoroth).
The original project is licensed under the MIT License.
