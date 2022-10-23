// list_controller.js

import { Controller } from '@hotwired/stimulus'
import { useRender, h } from 'stimulus-render'

export default class extends Controller {
  connect() {
    useRender(this)
  }
}
