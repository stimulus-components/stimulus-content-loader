import { Controller } from 'stimulus'

export default class extends Controller {
  static values = {
    url: String,
    lazyLoading: Boolean,
    lazyLoadingThreshold: Number,
    lazyLoadingRootMargin: String,
    refreshInterval: Number,
    loadScripts: Boolean
  }

  connect () {
    if (!this.hasUrlValue) {
      console.error('[stimulus-content-loader] You need to pass an url to fetch the remote content.')
      return
    }

    this.hasLazyLoadingValue ? this.lazyLoad() : this.load()
  }

  disconnect () {
    this.stopRefreshing()
  }

  load () {
    this.fetch()

    if (this.hasRefreshIntervalValue) {
      this.startRefreshing()
    }
  }

  lazyLoad () {
    const options = {
      threshold: this.lazyLoadingThresholdValue,
      rootMargin: this.lazyLoadingRootMarginValue || '0px'
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.load()

          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(this.element)
  }

  fetch () {
    fetch(this.urlValue)
      .then(response => response.text())
      .then(html => {
        this.element.innerHTML = html

        if (this.loadScriptsValue) {
          this.loadScripts()
        }
      })
  }

  startRefreshing () {
    this.refreshTimer = setInterval(() => {
      this.fetch()
    }, this.refreshIntervalValue)
  }

  stopRefreshing () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }

  loadScripts () {
    this.element.querySelectorAll('script').forEach(content => {
      const script = document.createElement('script')
      script.innerHTML = content.innerHTML

      document.head.appendChild(script).parentNode.removeChild(script)
    })
  }
}
