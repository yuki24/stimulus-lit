import { Controller } from "@hotwired/stimulus"
import { useRender } from "../../src"

export class NoRenderController extends Controller {
  connect() {
    useRender(this)
  }
}
