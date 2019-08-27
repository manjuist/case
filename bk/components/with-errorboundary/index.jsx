/**
 * 功能：高阶错误边界
 */
import React from 'react'
import ErrorBoundary from '../errorboundary'
import FallbackComponentView from '../errorboundary-fallbackcomponent'

const onErrorFn = (error, info) => { console.log('error=', error, 'info=', info) }

const withErrorBoundary = function (Component, FallbackComponent = FallbackComponentView, onError = onErrorFn) {
    const Wrapped = props => (
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
            <Component {...props} />
        </ErrorBoundary>
    )
    
    const name = Component.displayName || Component.name
    Wrapped.displayName = name ? `WithErrorBoundary(${name})` : 'WithErrorBoundary'
    
    return Wrapped
}

export default withErrorBoundary
