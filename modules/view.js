 import { html } from './html.js'
 
 /**
   * 
   * @param {HTMLElement} element 
   * @param {object} data 
   * @param {string} defaultOptionText 
   * 
   */
 export const createDropdownOptions = (element, data, defaultOptionText) => {
    const fragment = document.createDocumentFragment()
    const defaultOption = document.createElement('option')
    defaultOption.value = 'any'
    defaultOption.innerText = defaultOptionText
    fragment.appendChild(defaultOption)
  
    for (const [id, name] of Object.entries(data)) {
      const option = document.createElement('option')
      option.value = id
      option.innerText = name
      fragment.appendChild(option)
    }
  
    element.appendChild(fragment)
  }
  
/**
 * 
 * @param {string} theme 
 * 
 */
  export const setTheme = (theme) => {
    const darkColors = '10, 10, 20'
    const lightColors = '255, 255, 255'
    const root = document.documentElement;
  
    if (theme === 'night') {
      html.settings.theme.value = 'night'
      root.style.setProperty('--color-dark', lightColors)
      root.style.setProperty('--color-light', darkColors)
    } else {
      html.settings.theme.value = 'day';
      root.style.setProperty('--color-dark', darkColors)
      root.style.setProperty('--color-light', lightColors)
    }
  }
