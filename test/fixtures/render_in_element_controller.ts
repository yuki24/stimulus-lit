import { Controller } from "@hotwired/stimulus"
import { html } from "lit-html"
import { useRender } from "../../src"

export class RenderInElementController extends Controller {
  static targets = ["container"]

  connect() {
    // @ts-ignore
    useRender(this, { container: this.containerTarget })
  }

  render() {
    return html`<div>rendered.</div>`
  }
}
