import { LitElement, html } from "lit-element";
import "latt";

class App extends LitElement {
  render() {
    return html`
      <latt-router>
        <latt-route path="/">
          home
        </latt-route>
        <latt-route path="/asdf">
          <latt-redirect to="/test" />
        </latt-route>
        <latt-route path="/test">
          test (hello from /asdf!)
        </latt-route>
        <latt-route path="/pee">
          <latt-redirect to="/test" />
        </latt-route>
        <latt-catch to="/" />
      </latt-router>
    `;
  }
}
customElements.get("app-root") || customElements.define("app-root", App);
