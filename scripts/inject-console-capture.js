const fs = require('fs');
const path = require('path');

// Console capture script content
const consoleScriptContent = `
<script>
(function() {
  // Only activate when in iframe (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Function to capture and send logs
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }
  
  // Override console methods
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    captureLog('log', args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    captureLog('warn', args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    captureLog('error', args);
  };
  
  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    captureLog('info', args);
  };
  
  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    captureLog('debug', args);
  };
  
  // Capture unhandled errors and promises
  window.addEventListener('error', function(event) {
    captureLog('error', ['Unhandled Error: ' + (event.error?.message || event.message)]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection: ' + event.reason]);
  });
  
  // Send ready notification
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
      
      sendRouteChange();
    } catch (e) {}
  }
  
  // Route change tracking
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  // Monitor SPA navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    setTimeout(sendRouteChange, 100);
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    setTimeout(sendRouteChange, 100);
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendReady);
  } else {
    setTimeout(sendReady, 100);
  }
  
  window.addEventListener('load', sendReady);
})();
</script>
`;

// Function to inject script into HTML files
function injectConsoleCapture() {
  const outputDir = path.join(process.cwd(), 'out');
  
  if (!fs.existsSync(outputDir)) {
    console.log('No output directory found. Run build first.');
    return;
  }
  
  function processHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processHTMLFiles(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if script is already injected
        if (!content.includes('console-capture-ready')) {
          // Inject before closing head tag
          content = content.replace('</head>', `${consoleScriptContent}\n</head>`);
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Injected console capture into ${filePath}`);
        }
      }
    }
  }
  
  processHTMLFiles(outputDir);
  console.log('Console capture injection complete!');
}

// Run the injection
if (require.main === module) {
  injectConsoleCapture();
}

module.exports = injectConsoleCapture;