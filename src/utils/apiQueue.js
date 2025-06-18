// Simple API request queue to prevent overwhelming the Hacker News API
class ApiQueue {
  constructor() {
    this.queue = []
    this.processing = false
    this.maxConcurrent = 5
    this.activeRequests = 0
    this.cache = new Map()
  }

  async request(url) {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ url, resolve, reject })
      this.processQueue()
    })
  }

  async processQueue() {
    if (this.processing || this.activeRequests >= this.maxConcurrent || this.queue.length === 0) {
      return
    }

    this.processing = true

    while (this.queue.length > 0 && this.activeRequests < this.maxConcurrent) {
      const { url, resolve, reject } = this.queue.shift()
      this.activeRequests++

      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Cache the result
          this.cache.set(url, data)
          resolve(data)
        })
        .catch(error => {
          console.error('API request failed:', error)
          reject(error)
        })
        .finally(() => {
          this.activeRequests--
          // Process next items in queue after a short delay
          setTimeout(() => this.processQueue(), 100)
        })
    }

    this.processing = false
  }
}

export const apiQueue = new ApiQueue()