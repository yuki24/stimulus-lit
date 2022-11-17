import { Application, ControllerConstructor } from "@hotwired/stimulus"

afterEach(() => {
  ;(window as any).Stimulus.stop()
})

export const register = (identifier: string, controllerConstructor: ControllerConstructor) => {
  const application = Application.start()
  ;(window as any).Stimulus = application

  application.register(identifier, controllerConstructor)
}
