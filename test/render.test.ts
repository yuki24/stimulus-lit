import { fixture, expect, html } from "@open-wc/testing"

import { register } from "./setup"
import {
  RenderController,
  CounterController,
  NoRenderController,
  RenderInElementController,
  RenderBeforeController,
} from "./fixtures"

describe("render()", () => {
  it("can render html", async () => {
    register("render", RenderController)
    const el = await fixture(`<div data-controller="render"></div>`)

    expect(el).dom.to.equal(`<div data-controller="render"><div>rendered.</div></div>`)
  })

  it("does not require the render() method to be implemented", async () => {
    register("no-render", NoRenderController)
    const el = await fixture(`<div data-controller="no-render"></div>`)

    expect(el).dom.to.equal(`<div data-controller="no-render"></div>`)
  })

  it("can render html with a value", async () => {
    register("counter", CounterController)
    const el = await fixture(`<div data-controller="counter"></div>`)

    expect(el).dom.to.equal(`<div data-controller="counter"><button>Count: 0</button></div>`)
  })

  it("can update render when the value is updated", async () => {
    register("counter", CounterController)
    const el = await fixture(`<div data-controller="counter"></div>`)

    await el.querySelector("button")!.click()

    expect(el).dom.to.equal(
      `<div data-controller="counter" data-counter-counter-value="1"><button>Count: 1</button></div>`
    )
  })

  it("can render html with a value with a default value", async () => {
    register("counter", CounterController)
    const el = await fixture(`<div data-controller="counter" data-counter-counter-value="10"></div>`)

    expect(el).dom.to.equal(
      `<div data-controller="counter" data-counter-counter-value="10"><button>Count: 10</button></div>`
    )
  })

  it("can render html in the specified element", async () => {
    register("render", RenderInElementController)

    const el = await fixture(html`
      <div data-controller="render">
        This text should not be deleted.

        <div data-render-target="container">
          This element should include the rendered html. This element should include the rendered html.
        </div>
      </div>
    `)

    expect(el).dom.to.equal(`
      <div data-controller="render">
        This text should not be deleted.

        <div data-render-target="container">
          This element should include the rendered html. This element should include the rendered html.
          <div>
            rendered.
          </div>
        </div>
      </div>
    `)
  })

  it("can render before the specified element", async () => {
    register("render", RenderBeforeController)

    const el = await fixture(html`
      <div data-controller="render">
        This text should not be deleted.

        <div data-render-target="container">
          The html should be rendered above this element. The html should be rendered above this element.
        </div>
      </div>
    `)

    expect(el).dom.to.equal(`
      <div data-controller="render">
        This text should not be deleted.

        <div>
          rendered.
        </div>
        <div data-render-target="container">
          The html should be rendered above this element. The html should be rendered above this element.
        </div>
      </div>
    `)
  })
})
