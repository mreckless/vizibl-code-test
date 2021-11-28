class CatFact extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        const div = document.createElement('div')
        div.setAttribute('class', 'container')

        const text = document.createElement('span')
        const style = document.createElement('style')

        style.textContent = `
            .container {
                padding: 10px;
                margin: 15px 0;
                border-left: 5px solid #262626;
            }
        `

        div.appendChild(text)
        shadow.appendChild(div)
        shadow.appendChild(style)
    }
}

customElements.define('cat-fact', CatFact);

const results = document.querySelector('#results')
const loadMore = document.querySelector('#more')

function addFacts(facts) {
    for (const fact of facts) {
        const catFact = document.createElement('cat-fact')
        catFact.shadowRoot.querySelector('span').innerText = fact.fact
        results.appendChild(catFact)
    }

    loadMore.disabled = false
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
    })
}

function generateFacts(limit = 10) {
    loadMore.disabled = true

    fetch(`https://catfact.ninja/facts?limit=${limit}`)
        .then(res => res.json())
        .then(res => addFacts(res.data))
}

loadMore.onclick = generateFacts

generateFacts()
