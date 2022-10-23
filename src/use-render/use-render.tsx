import { Controller } from '@hotwired/stimulus'
import { html, render, RenderOptions } from "lit-html";

import { method, camelize } from '../support'
import { useValues } from './values'

const EMPTY_HTML = html``

class RenderController extends Controller {
  declare __render: () => void
  declare __rerender: () => void
  declare state: () => Object
  declare values: () => Object
}

export const useRender = (stimulusController: Controller, options: RenderOptions = {}) => {
  if (!stimulusController) {
    console.error("Make sure you pass in `this` to `useRender(this)` in your Stimulus Controller.")
    return
  }

  const controller = stimulusController as RenderController

  useValues(controller)

  const constructor = controller.constructor as any
  const renderMethod = method(controller, 'render')

  Object.assign(controller, {
    __rerender() {
      this.__render()
      console.info("re-render", controller.values())
    },

    __render() {
      render(renderMethod?.call(controller) || EMPTY_HTML, controller.element as HTMLElement, options)
    }
  })

  Object.keys(constructor.values).forEach((value) => {
    const methodName = camelize(`${value}ValueChanged`)
    const originalMethod = method(controller, methodName)

    const assignments: { [key: string]: Function } = {}

    if (originalMethod) {
      assignments[methodName] = (...params: any) => {
        originalMethod.call(controller, ...params)
        controller.__rerender()
      }
    } else {
      assignments[methodName] = () => {
        controller.__rerender()
      }
    }

    Object.assign(controller, assignments)
  })

  controller.__render()
}
