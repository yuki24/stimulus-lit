// hello_world_controller.js

import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-lit'

export default class extends Controller {
  connect() {
    useRender(this)
  }

  render () {
    return html`<div>Hello World ${1 + 1}</div>`
  }
}
