import { Controller } from "@hotwired/stimulus"
import { html } from "lit-html"
import { useRender } from "../../src"

export class RenderController extends Controller {
  connect() {
    useRender(this)
  }

  render() {
    return html`<div>rendered.</div>`
  }
}
