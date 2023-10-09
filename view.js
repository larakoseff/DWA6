
import { authors } from './data.js'

export const html = {
    list: {
        items: document.querySelector('[data-list-items]'),
        button: document.querySelector('[data-list-button]'),
        close: document.querySelector('[data-list-close]'),
        active: document.querySelector('[data-list-active]'),
        message: document.querySelector('[data-list-message]'),
        blur: document.querySelector('[data-list-blur]'),
        image: document.querySelector('[data-list-image]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]')
    },
    search: {
        authors: document.querySelector('[data-search-authors]'),
        genres: document.querySelector('[data-search-genres]'),
        cancel: document.querySelector('[data-search-cancel]'),
        overlay: document.querySelector('[data-search-overlay]'),
        form: document.querySelector('[data-search-form]'),
        title: document.querySelector('[data-search-title]'),
    },
    settings: {
        theme: document.querySelector('[data-settings-theme]'),
        cancel: document.querySelector('[data-settings-cancel]'),
        overlay: document.querySelector('[data-settings-overlay]'),
        form: document.querySelector('[data-settings-form]'),
    },
    header: {
        search: document.querySelector('[data-header-search]'),
        settings: document.querySelector('[data-header-settings]'),  
    },
   
}

export const createPreview = (id, image, title, author) => {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
  
    element.innerHTML = `
      <img
        class="preview__image"
        src="${image}"
      />
      
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `
    return element;
  }

  export const createDropdownOptions = (element, data, defaultOptionText) => {
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement('option');
    defaultOption.value = 'any';
    defaultOption.innerText = defaultOptionText;
    fragment.appendChild(defaultOption);
  
    for (const [id, name] of Object.entries(data)) {
      const option = document.createElement('option');
      option.value = id;
      option.innerText = name;
      fragment.appendChild(option);
    }
  
    element.appendChild(fragment);
  }

  export const setTheme = (theme) => {
    const darkColors = '10, 10, 20';
    const lightColors = '255, 255, 255';
    const root = document.documentElement;
  
    if (theme === 'night') {
      html.settings.theme.value = 'night';
      root.style.setProperty('--color-dark', lightColors);
      root.style.setProperty('--color-light', darkColors);
    } else {
      html.settings.theme.value = 'day';
      root.style.setProperty('--color-dark', darkColors);
      root.style.setProperty('--color-light', lightColors);
    }
  }

