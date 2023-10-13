
import { books, authors, genres, BOOKS_PER_PAGE } from './modules/data.js'
import { html, createPreview } from './modules/html.js'
import { createDropdownOptions, setTheme } from './modules/view.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  const previewButton = createPreview(id, image, title, author)
  starting.appendChild(previewButton)
}

html.list.items.appendChild(starting)

createDropdownOptions(html.search.genres, genres, 'All Genres');
createDropdownOptions(html.search.authors, authors, 'All Authors');

setTheme(html.settings.theme.value);

html.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
html.list.button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0

html.list.button.innerHTML =  `
<span>Show more</span>
<span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) 
    > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

html.search.cancel.addEventListener('click', () => {
    html.search.overlay.open = false
})

html.settings.cancel.addEventListener('click', () => {
    html.settings.overlay.open = false
})

html.header.search.addEventListener('click', () => {
     html.search.overlay.open = true 
    html.search.title.focus()
})

html.header.settings.addEventListener('click', () => {
    html.settings.overlay.open = true 
})

html.list.close.addEventListener('click', () => {
    html.list.active.open = false
})

html.settings.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
  
    setTheme(theme);
  
    html.settings.overlay.open = false;
  });

html.search.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        html.list.message.classList.add('list__message_show')
    } else {
      html.list.message.classList.remove('list__message_show')
    }

    html.list.items.innerHTML = ''
    const newItems = document.createDocumentFragment()

for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
  const previewButton = createPreview(id, image, title, author)
  newItems.appendChild(previewButton)
}

html.list.items.appendChild(newItems)
    html.list.button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    html.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) 
            > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
})

html.list.button.addEventListener('click', () => {

const fragment = document.createDocumentFragment()

for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
  const previewButton = createPreview(id, image, title, author)
  fragment.appendChild(previewButton)
}


html.list.items.appendChild(fragment)
page += 1
})

html.list.items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        html.list.active.open = true
        html.list.blur.src = active.image
        html.list.image.src = active.image
        html.list.title.innerText = active.title
        html.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.list.description.innerText = active.description
    }
})

