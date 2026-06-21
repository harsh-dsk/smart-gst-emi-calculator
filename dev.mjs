/**
 * dev.mjs — safe Vite dev server startup for Windows
 *
 * On Windows, Vite's chokidar watcher can call fs.watch() on locked OS files
 * (e.g. AppData\Roaming\Antigravity\Network\Cookies).  Node's C++ binding
 * throws EBUSY *synchronously inside the FSWatcher constructor*, before any
 * chokidar error-handler or ignored-filter can intercept it.
 *
 * Fix: patch fs.watch BEFORE loading Vite so every internal call — including
 * those from the optimizer's own separate chokidar instance — is wrapped in a
 * try/catch.  EBUSY paths silently receive a no-op watcher; everything else
 * behaves normally.
 */

import fs from 'node:fs'
import { EventEmitter } from 'node:events'

const _originalFsWatch = fs.watch

fs.watch = function patchedFsWatch(filename, options, listener) {
  try {
    return _originalFsWatch.apply(this, arguments)
  } catch (err) {
    if (err.code === 'EBUSY') {
      // Return a harmless no-op so chokidar can keep tracking other paths
      const noop = new EventEmitter()
      noop.close = () => {}
      return noop
    }
    throw err // re-throw anything that isn't EBUSY
  }
}

// --- Dynamic import ensures the patch above runs FIRST ---
// (Top-level static imports are hoisted and evaluated before any code runs,
//  which would defeat the patch.  Dynamic import() respects execution order.)
const { createServer } = await import('vite')

const server = await createServer()
await server.listen()
server.printUrls()
server.bindCLIShortcuts({ print: true })
