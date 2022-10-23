// list_controller.js

import { Controller } from '@hotwired/stimulus'
import { useRender, html } from 'stimulus-render'

export default class extends Controller {
  static targets = ['item']

  connect () {
    useRender(this)
  }

  renderListTarget(target) {
    return html`
      <span>
        ${target.dataset.value}
      </span>
    `
  }
}
