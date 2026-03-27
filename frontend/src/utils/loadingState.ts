type LoadingCallback = (isLoading: boolean) => void;

class LoadingManager {
  private listeners: Set<LoadingCallback> = new Set();
  private activeRequests: number = 0;

  addListener(callback: LoadingCallback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  startLoading() {
    this.activeRequests++;
    this.emit();
  }

  stopLoading() {             
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.emit();
  }

  private emit() {
    const isLoading = this.activeRequests > 0;
    this.listeners.forEach((callback) => callback(isLoading));
  }
}

export const loadingManager = new LoadingManager();
