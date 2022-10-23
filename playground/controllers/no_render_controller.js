// list_controller.js

import { Controller } from '@hotwired/stimulus'
import { useRender, h } from 'stimulus-lit'

export default class extends Controller {
  connect() {
    useRender(this)
  }
}
