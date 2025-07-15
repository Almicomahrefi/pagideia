// Action Links Functionality
class ActionManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupShareAPI();
  }

  bindEvents() {
    // View Flowers action
    const viewFlowersBtn = document.getElementById('viewFlowers');
    if (viewFlowersBtn) {
      viewFlowersBtn.addEventListener('click', this.handleViewFlowers.bind(this));
    }

    // Download action
    const downloadBtn = document.getElementById('downloadFlowers');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', this.handleDownload.bind(this));
    }

    // Share action
    const shareBtn = document.getElementById('shareFlowers');
    if (shareBtn) {
      shareBtn.addEventListener('click', this.handleShare.bind(this));
    }

    // Reset action
    const resetBtn = document.getElementById('resetAnimation');
    if (resetBtn) {
      resetBtn.addEventListener('click', this.handleReset.bind(this));
    }
  }

  handleViewFlowers(e) {
    e.preventDefault();
    this.showLoading(e.target);
    
    // Simulate loading and redirect
    setTimeout(() => {
      window.location.href = 'flower.html';
    }, 800);
  }

  handleDownload(e) {
    e.preventDefault();
    this.showLoading(e.target);

    // Create a simple text file with flower message
    const content = `
🌸 Flowers for Someone Special 🌸

Thank you for visiting our flower garden!
This beautiful animation was created with love.

Visit us again at: ${window.location.origin}

Have a wonderful day! 🌺
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowers-message.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setTimeout(() => {
      this.hideLoading(e.target);
    }, 1000);
  }

  async handleShare(e) {
    e.preventDefault();
    this.showLoading(e.target);

    const shareData = {
      title: 'Beautiful Flowers Animation',
      text: 'Check out this amazing flower animation! 🌸',
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        this.showNotification('Link copied to clipboard! 📋');
      }
    } catch (error) {
      console.log('Share failed:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.showNotification('Link copied to clipboard! 📋');
      } catch (clipboardError) {
        this.showNotification('Unable to share or copy link');
      }
    }

    setTimeout(() => {
      this.hideLoading(e.target);
    }, 1000);
  }

  handleReset(e) {
    e.preventDefault();
    this.showLoading(e.target);

    // Reset animation by reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }

  showLoading(button) {
    const link = button.closest('.action-link');
    link.classList.add('action-link--loading');
  }

  hideLoading(button) {
    const link = button.closest('.action-link');
    link.classList.remove('action-link--loading');
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 300);
    }, 3000);
  }

  setupShareAPI() {
    // Check if Web Share API is supported
    if (!navigator.share) {
      console.log('Web Share API not supported');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ActionManager();
});