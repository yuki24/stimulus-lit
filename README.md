# Stimulus Render

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
