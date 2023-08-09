import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  refreshTimer: number
  hasUrlValue: boolean
  hasLazyLoadingValue: boolean
  hasRefreshIntervalValue: boolean
  lazyLoadingThresholdValue: number
  lazyLoadingRootMarginValue: string
  urlValue: string
  loadScriptsValue: boolean
  refreshIntervalValue: number

  // @ts-ignore
  element: HTMLElement

  static values = {
    url: String,
    lazyLoading: Boolean,
    lazyLoadingThreshold: Number,
    lazyLoadingRootMargin: {
      type: String,
      default: '0px'
    },
    refreshInterval: Number,
    loadScripts: Boolean
  }

  connect (): void {
    if (!this.hasUrlValue) {
      console.error('[stimulus-content-loader] You need to pass an url to fetch the remote content.')
      return
    }

    this.hasLazyLoadingValue ? this.lazyLoad() : this.load()
  }

  disconnect (): void {
    this.stopRefreshing()
  }

  load (): void {
    this.fetch()

    if (this.hasRefreshIntervalValue) {
      this.startRefreshing()
    }
  }

  lazyLoad (): void {
    const options: IntersectionObserverInit = {
      threshold: this.lazyLoadingThresholdValue,
      rootMargin: this.lazyLoadingRootMarginValue
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            this.load()

            observer.unobserve(entry.target)
          }
        })
      },
      options
    )

    observer.observe(this.element)
  }

  fetch (): void {
    fetch(this.urlValue)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        return response.text()
      })
      .then((html: string) => {
        this.element.innerHTML = html

        if (this.loadScriptsValue) {
          this.loadScripts()
        }

        this.dispatch('success')
      })
      .catch(error => {
        this.dispatch('error', { detail: { error: error } })
      })
  }

  startRefreshing (): void {
    this.refreshTimer = setInterval(() => {
      this.fetch()
    }, this.refreshIntervalValue)
  }

  stopRefreshing (): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }

  loadScripts (): void {
    this.element.querySelectorAll('script').forEach((content: HTMLScriptElement) => {
      const script: HTMLScriptElement = document.createElement('script')
      script.innerHTML = content.innerHTML

      document.head.appendChild(script).parentNode.removeChild(script)
    })
  }
}
