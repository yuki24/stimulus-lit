import { Controller } from "@hotwired/stimulus"
import { html } from "lit-html"
import { useRender } from "../../src"

export class RenderBeforeController extends Controller {
  static targets = ["container"]

  connect() {
    // @ts-ignore
    useRender(this, { renderBefore: this.containerTarget })
  }

  render() {
    return html`<div>rendered.</div>`
  }
}
