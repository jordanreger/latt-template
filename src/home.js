import { LitElement, html, css } from "lit-element";
import "latt";
import { until } from "lit-html/directives/until.js";

class Lander extends LitElement {
  static get properties() {
    return {
      username: { type: String }
    };
  }

  static get styles() {
    return css`
      /* app css */
      ::selection {
        color: #c4c4c4;
        background: #424242;
      }

      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background: #a4a4a4;
      }

      ::-webkit-scrollbar-thumb {
        background: #888888;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555555;
      }

      a {
        color: inherit;
        text-decoration: none;
        border-bottom: 2px solid #c4c4c4;
      }

      @media only screen and (max-width: 600px) {
        .page {
          width: 90%;
          height: 90%;
          top: 52.5%;
        }

        #username {
          font-size: 4vw;
        }

        input[type="text"] {
          font-size: 4vw;
        }

        ul {
          font-size: 4vw;
        }
      }

      @media only screen and (min-width: 600px) {
        .page {
          width: 50%;
          height: 75%;
          top: 50%;
        }

        #username {
          font-size: 1.25vw;
        }

        input[type="text"] {
          font-size: 1.25vw;
        }

        ul {
          font-size: 1.25vw;
        }
      }

      /* page css */
      .page {
        font-weight: 500;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-auto-rows: 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: 15fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
          "terminal"
          "command-line";
      }

      .terminal {
        grid-area: terminal;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .terminal::-webkit-scrollbar {
        display: none;
      }

      ul {
        position: absolute;
        left: 0;
        margin-top: 2vh;
        bottom: 0vh;
        right: 1vw;
        padding: 0;
        list-style-position: outside;
        list-style-type: none;
        max-height: calc(100% - 2vh);
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        color: #c4c4c4;
      }

      li:first-child {
        padding-top: 1vh;
      }

      li:not(:last-child) {
        padding-bottom: 1vh;
      }

      .command-line {
        grid-area: command-line;
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: min-content auto;
      }

      #username {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #c4c4c4;
      }

      input[type="text"] {
        position: relative;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-family: Jetbrains Mono;
        background-color: transparent;
        outline: none;
        border: none;
        color: #c4c4c4;
        margin-left: 0.5vw;
        width: 100%;
        font-weight: 600;
      }
    `;
  }

  firstUpdated(){
    let page = this.shadowRoot.childNodes[2].childNodes;
    let input;
    for(var i = 0; i < page.length; i++){
      if(page[i].className === "command-line"){
        input = page[i].childNodes[3].childNodes[0];
      }
    }

    input.focus();
    window.addEventListener("keydown", (e) => {this.handleKeys(e)});
  }

  constructor() {
    super();
    this.username = "user";
    this.cmds = [];
  }

  async handleKeys(e) {
    let page = this.shadowRoot.childNodes[2].childNodes;
    let input, form;
    for(var i = 0; i < page.length; i++){
      if(page[i].className === "command-line"){
        form = page[i];
        input = page[i].childNodes[3].childNodes[0];
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.cmds[this.cmds.length - 1] !== undefined ? input.setAttribute('value', this.cmds[this.cmds.length - 1].join(" ")) : input.setAttribute('value', "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      input.setAttribute('value', "");
    }
  }

  async handleCmd(e, val){
    if(e !== undefined){
      e.preventDefault();
    }
    //console.log(this.shadowRoot);
    let page = this.shadowRoot.childNodes[2].childNodes;
    let list = page[1].childNodes[1];
    let value, form, username;
    for(var i = 0; i < page.length; i++){
      if(page[i].className === "command-line"){
        form = page[i];
        username = page[i].childNodes[1].childNodes[1];
        if(val === undefined){
          value = page[i].childNodes[3].childNodes[0].value;
        } else {
          value = val;
        }
      }
    }
    var fns = value.split(", ");
    value = value.split(" ");
    var temp;
    for(var i = 0; i < fns.length; i++){
      temp = fns[i].split(" ");
      //this.handleCmd(undefined, temp);
      delete fns[i];
    }

    this.cmds.push(value);

    var br = document.createElement("br");
    list.appendChild(br);
    list.scrollTop = list.scrollHeight;

    var cmd = document.createElement("li");
    cmd.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> ${value.join(' ')}`));
    list.appendChild(cmd);

    if(value[0] === "help"){
      var li = document.createElement("li");

      if(value[1] === "about"){
        li.appendChild(document.createTextNode(`not much here; it should explain itself pretty well...`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }

      else if(value[1] === "clear"){
        li.appendChild(document.createTextNode(`not much here; it should explain itself pretty well...`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }

      else if(value[1] === "echo"){
        li.appendChild(document.createTextNode(`not much here; it should explain itself pretty well...`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }

      else if(value[1] === "settings"){
        li.appendChild(document.createTextNode(`USERNAME {new username} · changes your username (konst.{new username})`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }

      else {
        if(value[1] !== undefined){
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`no command "${value[1]}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`GENERAL`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`ABOUT · displays information about konst`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`CLEAR    · clears the screen`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`ECHO     · displays messages`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`HELP     · displays this message`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`SETTINGS · displays settings messages`));
          li.appendChild(br.cloneNode());
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`SPECIFIC COMMAND HELP`));
          li.appendChild(br.cloneNode());
          li.appendChild(document.createTextNode(`HELP {command} · displays settings for specific command (if applicable)`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }

    else if(value[0] === "install"){
      var params = value.slice(1);
      if(params[0] !== "" && params.length !== 0){
        var response = fetch(params[0]).then(response => { if(response.url !== `${window.location.href}${params[0]}`){ return response.text() } else { return `cannot install from "${params[0]}"; not a valid URL` } }).then(data => {
          var li = document.createElement("li");
          if(data !== `cannot install from "${params[0]}"; not a valid URL`){
            var data = JSON.parse(data);
            if(!localStorage.getItem(`${data.name}`)){
              localStorage.setItem(`${data.name}`, JSON.stringify(data));
              li.appendChild(document.createTextNode(`installed "${data.name}"`));
            } else {
              li.appendChild(document.createTextNode(`"${data.name}" exists already. try using "${data.name}"`));
            }
          } else {
            li.appendChild(document.createTextNode(`error: ${data}`));
          }
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
        });
        form.reset();
      }
    }

    else if(value[0] === "uninstall"){
      var params = value.slice(1);
      if(params[0] !== "" && params.length !== 0){
        if(localStorage.getItem(`${params[0]}`)){
          localStorage.removeItem(`${params[0]}`);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`uninstalled "${params[0]}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`can't find "${params[0]}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }

    else if(value[0] === "about"){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`KONST — a web-based console`));
      li.appendChild(br.cloneNode());
      li.appendChild(document.createTextNode(`built by `));
      var link = document.createElement('a');
      link.href = "https://majel.me";
      link.innerText = "jordan reger";
      li.appendChild(link);
      li.appendChild(document.createTextNode(`, 2021`));

      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    else if(value[0] === "clear"){
      list.innerHTML = "";
      form.reset();
    }

    else if(value[0] === "echo"){
      var params = value.slice(1);
      if(params[0] !== "" && params.length !== 0){
        if(params.length !== 1){
          params = params.join(" ");
        } else {
          params = params[0];
        }
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`${params}`));
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }
    }

    else if(value[0] === "settings"){
      var params = value.slice(1);
      var li = document.createElement("li");
      if(params[0] === "username"){
        localStorage.setItem("username", params[1]);
        li.appendChild(document.createTextNode(`username set to "${params[1]}". please refresh to see the changes.`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      } else {
        li.appendChild(document.createTextNode(`USERNAME {username} · changes your global username. requires refresh (as of now)`));
        //li.appendChild(br.cloneNode());
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }
    }

    else if(value[0] === "generate_hex"){
      function invert(hex) {
        if(hex.length === 4){
          hex = `#` + hex.split("#").pop() + hex.split("#").pop();
        }
        hex = RGB(hex);
        let r = hex.red;
        let g = hex.green;
        let b = hex.blue;
        let light = ((r * 0.299 + g * 0.587 + b * 0.114) > 186);
        if(light){
          return "#212121";
        } else {
          return "#e0e0e0";
        }
      }

      function RGB(hex){
        hex = hex.replace("#", "0x");
        return {
          red: (hex >> 16) & 0xFF,
          green: (hex >> 8) & 0xFF,
          blue: hex & 0xFF,
        }
      }

      var params = value.slice(1);
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`background color set to ${params[0]} - text set to ${invert(params[0])}`));
      li.setAttribute("style", `color: ${invert(params[0])}; background-color: ${params[0]}`);
      //li.appendChild(br.cloneNode());
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    /*else if(value.includes("import")){
      if(value.split("import ").pop() !== ""){
        var url = value.split("import ").pop();
        var response = fetch(url).then(response => { if(response.url !== `${window.location.href}${url}`){ return response.text() } else { return `cannot import from ${url}` } }).then(data => {
          var li = document.createElement("li");
          if(data !== `cannot import from ${url}`){
            var data = JSON.parse(data);
            if(!localStorage.getItem(`${data.name}`)){
              localStorage.setItem(`${data.name}`, JSON.stringify(data));
              li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> imported "${data.name}"`));
            } else {
              li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> "${data.name}" exists already. try using "${data.name}"`));
            }
          } else {
            li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> error: ${data}`));
          }
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
        });
        form.reset();
      }
    }

    else if(value.includes("install")){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> please use the command "import"`));
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    else if(value.includes("eval")){
      var mod = value.split("eval ").pop();
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> ${JSON.parse(localStorage.getItem(`${mod}`)).function}`));
      list.appendChild(li);
      list.scrollTop = list.scrollHeight;
      form.reset();
    }

    else if(value.includes("uninstall")){
      if(value.split("uninstall ").pop() !== ""){
        var url = value.split("uninstall ").pop();
        if(localStorage.getItem(`${url}`)){
          localStorage.removeItem(`${url}`)
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> uninstalled "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> can't find mod "${url}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }

    else if(!value.includes("echo") || !value.includes("clear") || !value.includes("install") || !value.includes("import") || !value.includes("uninstall") || !value.includes("eval")){
      if(value !== ""){
        let fnName = value.split(" ")[0];
        if(localStorage.getItem(`${fnName}`)){
          let fnFunction = JSON.parse(localStorage.getItem(`${fnName}`)).function;
          this.handleCmd(undefined, fnFunction);
          form.reset();
        } else {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}> can't find function "${fnName}"`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }*/

    else {
      if(localStorage.getItem(`${value[0]}`)){
        var li = document.createElement("li");
        var fn = JSON.parse(localStorage.getItem(`${value[0]}`)).function;
        li.appendChild(document.createTextNode(`${fn}`));
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
        this.handleCmd(undefined, fn);
      }
      else if(value[0] !== ""){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`no command "${value[0]}"`));
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        form.reset();
      }
    }

    /*if(value.includes("username")){
      if(value.includes(":")){
        if(value.split("username:").pop() !== ""){
          this.username = value.split("username:").pop();
          localStorage.setItem("username", this.username);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> username set to ${this.username}`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        } else {
          // send err
        }
      } else {
        if(value.split("username ").pop() === "clear"){
          this.username = "user";
          localStorage.setItem("username", this.username);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`spelatt> username cleared`));
          list.appendChild(li);
          list.scrollTop = list.scrollHeight;
          form.reset();
        }
      }
    }*/
  }

  render() {
    if (window.location.pathname === "/") {
      return html`
      <div class="page">
        <div class="terminal">
          <ul>
          </ul>
        </div>
        <form @submit="${(e) => this.handleCmd(e)}" class="command-line">
          <div class="username">
            <div id="username">konst.${localStorage.getItem("username") ? localStorage.getItem("username") : this.username}></div>
          </div>
          <div class="input"><input type="text" /></div>
        </form>
      </div>
    `;
    } else {
      return undefined;
    }
  }
}
customElements.get("app-lander") || customElements.define("app-lander", Lander);
