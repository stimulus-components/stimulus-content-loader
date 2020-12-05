import { Controller } from 'stimulus'

export default class extends Controller {
  static values = {
    url: String,
    lazyLoading: Boolean,
    lazyLoadingThreshold: Number,
    lazyLoadingRootMargin: String,
    refreshInterval: Number
  }

  connect () {
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
}
