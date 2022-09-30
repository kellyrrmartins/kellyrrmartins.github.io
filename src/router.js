export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    //eveitar o carregamento da pagina
    event = event || window.event
    event.preventDefault()

    //mudar o historico do window toda vez que mudar de pagina
    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  handle() {
    //acessa o barra e adicona os nomes da rota no pathname
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      //resebeu os dados e transformou em texto
      .then(data => data.text())

      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
