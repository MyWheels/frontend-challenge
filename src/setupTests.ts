import '@testing-library/jest-dom'
import 'whatwg-fetch'
import ResizeObserver from 'resize-observer-polyfill'
;(global as any).performance = require('perf_hooks').performance
;(global as any).ResizeObserver = ResizeObserver
