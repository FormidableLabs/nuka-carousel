import React from 'react';
import easingTypes, { easeInOutQuad } from 'tween-functions';
import requestAnimationFrame from 'raf';
const DEFAULT_STACK_BEHAVIOR = 'ADDITIVE';
const DEFAULT_EASING = easeInOutQuad;
const DEFAULT_DURATION = 300;
const DEFAULT_DELAY = 0;
const stackBehavior = {
    ADDITIVE: 'ADDITIVE',
    DESTRUCTIVE: 'DESTRUCTIVE',
};
function tweenMixin(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.tweenState = (path, { easing, duration, delay, beginValue, endValue, onEnd, stackBehavior: configSB }) => {
                this.setState((state) => {
                    let cursor = state;
                    let stateName;
                    // see comment below on pash hash
                    let pathHash;
                    if (typeof path === 'string') {
                        stateName = path;
                        pathHash = path;
                    }
                    else {
                        for (let i = 0; i < path.length - 1; i++) {
                            cursor = cursor[path[i]];
                        }
                        stateName = path[path.length - 1];
                        pathHash = path.join('|');
                    }
                    // see the reasoning for these defaults at the top of file
                    const newConfig = {
                        easing: easing || DEFAULT_EASING,
                        duration: duration == null ? DEFAULT_DURATION : duration,
                        delay: delay == null ? DEFAULT_DELAY : delay,
                        beginValue: beginValue == null ? cursor[stateName] : beginValue,
                        endValue: endValue,
                        onEnd: onEnd,
                        stackBehavior: configSB || DEFAULT_STACK_BEHAVIOR,
                    };
                    let newTweenQueue = state.tweenQueue;
                    if (newConfig.stackBehavior === stackBehavior.DESTRUCTIVE) {
                        newTweenQueue = state.tweenQueue.filter(item => item.pathHash !== pathHash);
                    }
                    // we store path hash, so that during value retrieval we can use hash
                    // comparison to find the path. See the kind of shitty thing you have to
                    // do when you don't have value comparison for collections?
                    newTweenQueue.push({
                        pathHash: pathHash,
                        config: newConfig,
                        initTime: Date.now() + newConfig.delay,
                    });
                    // sorry for mutating. For perf reasons we don't want to deep clone.
                    // guys, can we please all start using persistent collections so that
                    // we can stop worrying about nonesense like this
                    cursor[stateName] = newConfig.endValue;
                    if (newTweenQueue.length === 1) {
                        this._rafID = requestAnimationFrame(this._rafCb.bind(this));
                    }
                    // this will also include the above mutated update
                    return { tweenQueue: newTweenQueue };
                });
            };
            this.getTweeningValue = (path) => {
                const state = this.state;
                let tweeningValue;
                let pathHash;
                if (typeof path === 'string') {
                    tweeningValue = state[path];
                    pathHash = path;
                }
                else {
                    tweeningValue = state;
                    for (let i = 0; i < path.length; i++) {
                        tweeningValue = tweeningValue[path[i]];
                    }
                    pathHash = path.join('|');
                }
                let now = Date.now();
                for (let i = 0; i < state.tweenQueue.length; i++) {
                    const { pathHash: itemPathHash, initTime, config } = state.tweenQueue[i];
                    if (itemPathHash !== pathHash) {
                        continue;
                    }
                    const progressTime = now - initTime > config.duration
                        ? config.duration
                        : Math.max(0, now - initTime);
                    // `now - initTime` can be negative if initTime is scheduled in the
                    // future by a delay. In this case we take 0
                    // if duration is 0, consider that as jumping to endValue directly. This
                    // is needed because the easing functino might have undefined behavior for
                    // duration = 0
                    const easeValue = config.duration === 0 ? config.endValue : config.easing(progressTime, config.beginValue, config.endValue, config.duration);
                    const contrib = easeValue - config.endValue;
                    tweeningValue += contrib;
                }
                return tweeningValue;
            };
            this.state = {
                tweenQueue: [],
            };
            this._rafID = null;
        }
        componentWillUnmount() {
            requestAnimationFrame.cancel(this._rafID);
            this._rafID = -1;
        }
        _rafCb() {
            const state = this.state;
            if (state.tweenQueue.length === 0) {
                return;
            }
            const now = Date.now();
            let newTweenQueue = [];
            for (let i = 0; i < state.tweenQueue.length; i++) {
                const item = state.tweenQueue[i];
                const { initTime, config } = item;
                if (now - initTime < config.duration) {
                    newTweenQueue.push(item);
                }
                else {
                    config.onEnd && config.onEnd();
                }
            }
            // onEnd might trigger a parent callback that removes this component
            // -1 means we've canceled it in componentWillUnmount
            if (this._rafID === -1) {
                return;
            }
            this.setState({
                tweenQueue: newTweenQueue,
            });
            this._rafID = requestAnimationFrame(this._rafCb.bind(this));
        }
        render() {
            return <WrappedComponent tweenQueue={this.state.tweenQueue} {...this.props} getTweeningValue={this.getTweeningValue} tweenState={this.tweenState}/>;
        }
    };
}
export default {
    tweenMixin,
    easingTypes,
    stackBehavior,
};
