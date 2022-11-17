import { Controller } from "@hotwired/stimulus"
import { html } from "lit-html"
import { useRender } from "../../src"

export class CounterController extends Controller {
  static values = { counter: Number }

  connect() {
    useRender(this)
  }

  render() {
    // @ts-ignore
    return html`<button @click="${() => (this.counterValue += 1)}">Count: ${this.counterValue}</button>`
  }
}
