(() => {
    var Ms = Object.defineProperty,
        _s = Object.defineProperties,
        As = Object.getOwnPropertyDescriptors,
        qi = Object.getOwnPropertySymbols,
        ws = Object.prototype.hasOwnProperty,
        ks = Object.prototype.propertyIsEnumerable,
        Wi = t => {
            throw TypeError(t)
        },
        Ee = Math.pow,
        ni = (t, e, i) => e in t ? Ms(t, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: i
        }) : t[e] = i,
        xe = (t, e) => {
            for (var i in e || (e = {})) ws.call(e, i) && ni(t, i, e[i]);
            if (qi)
                for (var i of qi(e)) ks.call(e, i) && ni(t, i, e[i]);
            return t
        },
        ht = (t, e) => _s(t, As(e)),
        O = (t, e, i) => ni(t, "symbol" != typeof e ? e + "" : e, i),
        oi = (t, e, i) => e.has(t) || Wi("Cannot " + i),
        ie = (t, e, i) => (oi(t, e, "read from private field"), i ? i.call(t) : e.get(t)),
        fe = (t, e, i) => e.has(t) ? Wi("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i),
        ae = (t, e, i, r) => (oi(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i),
        H = (t, e, i) => (oi(t, e, "access private method"), i),
        Ot = (t, e, i) => new Promise((r, s) => {
            var a = t => {
                try {
                    o(i.next(t))
                } catch (t) {
                    s(t)
                }
            },
                n = t => {
                    try {
                        o(i.throw(t))
                    } catch (t) {
                        s(t)
                    }
                },
                o = t => t.done ? r(t.value) : Promise.resolve(t.value).then(a, n);
            o((i = i.apply(t, e)).next())
        }),
        Ds = "1.3.8";

    function Ui(t, e, i) {
        return Math.max(t, Math.min(e, i))
    }

    function Is(t, e, i) {
        return (1 - i) * t + i * e
    }

    function Fs(t, e, i, r) {
        return Is(t, e, 1 - Math.exp(-i * r))
    }

    function Ls(t, e) {
        return (t % e + e) % e
    }
    var Os = class {
        constructor() {
            O(this, "isRunning", !1), O(this, "value", 0), O(this, "from", 0), O(this, "to", 0), O(this, "currentTime", 0), O(this, "lerp"), O(this, "duration"), O(this, "easing"), O(this, "onUpdate")
        }
        advance(t) {
            var e;
            if (!this.isRunning) return;
            let i = !1;
            if (this.duration && this.easing) {
                this.currentTime += t;
                let e = Ui(0, this.currentTime / this.duration, 1);
                i = e >= 1;
                let r = i ? 1 : this.easing(e);
                this.value = this.from + (this.to - this.from) * r
            } else this.lerp ? (this.value = Fs(this.value, this.to, 60 * this.lerp, t), Math.round(this.value) === this.to && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
            i && this.stop(), null == (e = this.onUpdate) || e.call(this, this.value, i)
        }
        stop() {
            this.isRunning = !1
        }
        fromTo(t, e, {
            lerp: i,
            duration: r,
            easing: s,
            onStart: a,
            onUpdate: n
        }) {
            this.from = this.value = t, this.to = e, this.lerp = i, this.duration = r, this.easing = s, this.currentTime = 0, this.isRunning = !0, null == a || a(), this.onUpdate = n
        }
    };

    function zs(t, e) {
        let i;
        return function (...r) {
            let s = this;
            clearTimeout(i), i = setTimeout(() => {
                i = void 0, t.apply(s, r)
            }, e)
        }
    }
    var Vs = class {
        constructor(t, e, {
            autoResize: i = !0,
            debounce: r = 250
        } = {}) {
            O(this, "width", 0), O(this, "height", 0), O(this, "scrollHeight", 0), O(this, "scrollWidth", 0), O(this, "debouncedResize"), O(this, "wrapperResizeObserver"), O(this, "contentResizeObserver"), O(this, "resize", () => {
                this.onWrapperResize(), this.onContentResize()
            }), O(this, "onWrapperResize", () => {
                this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
            }), O(this, "onContentResize", () => {
                this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
            }), this.wrapper = t, this.content = e, i && (this.debouncedResize = zs(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
        }
        destroy() {
            var t, e;
            null == (t = this.wrapperResizeObserver) || t.disconnect(), null == (e = this.contentResizeObserver) || e.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, !1)
        }
        get limit() {
            return {
                x: this.scrollWidth - this.width,
                y: this.scrollHeight - this.height
            }
        }
    },
        Ki = class {
            constructor() {
                O(this, "events", {})
            }
            emit(t, ...e) {
                var i;
                let r = this.events[t] || [];
                for (let t = 0, s = r.length; t < s; t++) null == (i = r[t]) || i.call(r, ...e)
            }
            on(t, e) {
                var i;
                return null != (i = this.events[t]) && i.push(e) || (this.events[t] = [e]), () => {
                    var i;
                    this.events[t] = null == (i = this.events[t]) ? void 0 : i.filter(t => e !== t)
                }
            }
            off(t, e) {
                var i;
                this.events[t] = null == (i = this.events[t]) ? void 0 : i.filter(t => e !== t)
            }
            destroy() {
                this.events = {}
            }
        },
        Xi = 100 / 6,
        Fe = {
            passive: !1
        },
        Bs = class {
            constructor(t, e = {
                wheelMultiplier: 1,
                touchMultiplier: 1
            }) {
                O(this, "touchStart", {
                    x: 0,
                    y: 0
                }), O(this, "lastDelta", {
                    x: 0,
                    y: 0
                }), O(this, "window", {
                    width: 0,
                    height: 0
                }), O(this, "emitter", new Ki), O(this, "onTouchStart", t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: 0,
                        y: 0
                    }, this.emitter.emit("scroll", {
                        deltaX: 0,
                        deltaY: 0,
                        event: t
                    })
                }), O(this, "onTouchMove", t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t, r = -(e - this.touchStart.x) * this.options.touchMultiplier, s = -(i - this.touchStart.y) * this.options.touchMultiplier;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: r,
                        y: s
                    }, this.emitter.emit("scroll", {
                        deltaX: r,
                        deltaY: s,
                        event: t
                    })
                }), O(this, "onTouchEnd", t => {
                    this.emitter.emit("scroll", {
                        deltaX: this.lastDelta.x,
                        deltaY: this.lastDelta.y,
                        event: t
                    })
                }), O(this, "onWheel", t => {
                    let {
                        deltaX: e,
                        deltaY: i,
                        deltaMode: r
                    } = t;
                    e *= 1 === r ? Xi : 2 === r ? this.window.width : 1, i *= 1 === r ? Xi : 2 === r ? this.window.height : 1, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
                        deltaX: e,
                        deltaY: i,
                        event: t
                    })
                }), O(this, "onWindowResize", () => {
                    this.window = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }), this.element = t, this.options = e, window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, Fe), this.element.addEventListener("touchstart", this.onTouchStart, Fe), this.element.addEventListener("touchmove", this.onTouchMove, Fe), this.element.addEventListener("touchend", this.onTouchEnd, Fe)
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            destroy() {
                this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel, Fe), this.element.removeEventListener("touchstart", this.onTouchStart, Fe), this.element.removeEventListener("touchmove", this.onTouchMove, Fe), this.element.removeEventListener("touchend", this.onTouchEnd, Fe)
            }
        },
        Yi = t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        Zi = class {
            constructor({
                wrapper: t = window,
                content: e = document.documentElement,
                eventsTarget: i = t,
                smoothWheel: r = !0,
                syncTouch: s = !1,
                syncTouchLerp: a = .075,
                touchInertiaExponent: n = 1.7,
                duration: o,
                easing: l,
                lerp: h = .1,
                infinite: p = !1,
                orientation: c = "vertical",
                gestureOrientation: d = "vertical",
                touchMultiplier: u = 1,
                wheelMultiplier: f = 1,
                autoResize: m = !0,
                prevent: g,
                virtualScroll: y,
                overscroll: v = !0,
                autoRaf: b = !1,
                anchors: S = !1,
                autoToggle: w = !1,
                allowNestedScroll: E = !1,
                __experimental__naiveDimensions: x = !1
            } = {}) {
                O(this, "_isScrolling", !1), O(this, "_isStopped", !1), O(this, "_isLocked", !1), O(this, "_preventNextNativeScrollEvent", !1), O(this, "_resetVelocityTimeout", null), O(this, "__rafID", null), O(this, "isTouching"), O(this, "time", 0), O(this, "userData", {}), O(this, "lastVelocity", 0), O(this, "velocity", 0), O(this, "direction", 0), O(this, "options"), O(this, "targetScroll"), O(this, "animatedScroll"), O(this, "animate", new Os), O(this, "emitter", new Ki), O(this, "dimensions"), O(this, "virtualScroll"), O(this, "onScrollEnd", t => {
                    t instanceof CustomEvent || ("smooth" === this.isScrolling || !1 === this.isScrolling) && t.stopPropagation()
                }), O(this, "dispatchScrollendEvent", () => {
                    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
                        bubbles: this.options.wrapper === window,
                        detail: {
                            lenisScrollEnd: !0
                        }
                    }))
                }), O(this, "onTransitionEnd", t => {
                    if (t.propertyName.includes("overflow")) {
                        let t = this.isHorizontal ? "overflow-x" : "overflow-y",
                            e = getComputedStyle(this.rootElement)[t];
                        ["hidden", "clip"].includes(e) ? this.internalStop() : this.internalStart()
                    }
                }), O(this, "onClick", t => {
                    let e = t.composedPath().find(t => {
                        var e, i, r;
                        return t instanceof HTMLAnchorElement && ((null == (e = t.getAttribute("href")) ? void 0 : e.startsWith("#")) || (null == (i = t.getAttribute("href")) ? void 0 : i.startsWith("/#")) || (null == (r = t.getAttribute("href")) ? void 0 : r.startsWith("./#")))
                    });
                    if (e) {
                        let t = e.getAttribute("href");
                        if (t) {
                            let e = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0,
                                i = `#${t.split("#")[1]}`;
                            ["#", "/#", "./#", "#top", "/#top", "./#top"].includes(t) && (i = 0), this.scrollTo(i, e)
                        }
                    }
                }), O(this, "onPointerDown", t => {
                    1 === t.button && this.reset()
                }), O(this, "onVirtualScroll", t => {
                    if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(t)) return;
                    let {
                        deltaX: e,
                        deltaY: i,
                        event: r
                    } = t;
                    if (this.emitter.emit("virtual-scroll", {
                        deltaX: e,
                        deltaY: i,
                        event: r
                    }), r.ctrlKey || r.lenisStopPropagation) return;
                    let s = r.type.includes("touch"),
                        a = r.type.includes("wheel");
                    this.isTouching = "touchstart" === r.type || "touchmove" === r.type;
                    let n = 0 === e && 0 === i;
                    if (this.options.syncTouch && s && "touchstart" === r.type && n && !this.isStopped && !this.isLocked) return void this.reset();
                    let o = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === e;
                    if (n || o) return;
                    let l = r.composedPath();
                    l = l.slice(0, l.indexOf(this.rootElement));
                    let h = this.options.prevent;
                    if (l.find(t => {
                        var r, n, o;
                        return t instanceof HTMLElement && ("function" == typeof h && (null == h ? void 0 : h(t)) || (null == (r = t.hasAttribute) ? void 0 : r.call(t, "data-lenis-prevent")) || s && (null == (n = t.hasAttribute) ? void 0 : n.call(t, "data-lenis-prevent-touch")) || a && (null == (o = t.hasAttribute) ? void 0 : o.call(t, "data-lenis-prevent-wheel")) || this.options.allowNestedScroll && this.checkNestedScroll(t, {
                            deltaX: e,
                            deltaY: i
                        }))
                    })) return;
                    if (this.isStopped || this.isLocked) return void (r.cancelable && r.preventDefault());
                    if (!(this.options.syncTouch && s || this.options.smoothWheel && a)) return this.isScrolling = "native", this.animate.stop(), void (r.lenisStopPropagation = !0);
                    let p = i;
                    "both" === this.options.gestureOrientation ? p = Math.abs(i) > Math.abs(e) ? i : e : "horizontal" === this.options.gestureOrientation && (p = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault();
                    let c = s && this.options.syncTouch,
                        d = s && "touchend" === r.type;
                    d && (p = Math.sign(this.velocity) * Math.pow(Math.abs(this.velocity), this.options.touchInertiaExponent)), this.scrollTo(this.targetScroll + p, xe({
                        programmatic: !1
                    }, c ? {
                        lerp: d ? this.options.syncTouchLerp : 1
                    } : {
                        lerp: this.options.lerp,
                        duration: this.options.duration,
                        easing: this.options.easing
                    }))
                }), O(this, "onNativeScroll", () => {
                    if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) this._preventNextNativeScrollEvent = !1;
                    else if (!1 === this.isScrolling || "native" === this.isScrolling) {
                        let t = this.animatedScroll;
                        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t, this.direction = Math.sign(this.animatedScroll - t), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
                            this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
                        }, 400))
                    }
                }), O(this, "raf", t => {
                    let e = t - (this.time || t);
                    this.time = t, this.animate.advance(.001 * e), this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
                }), window.lenisVersion = Ds, (!t || t === document.documentElement) && (t = window), "number" == typeof o && "function" != typeof l ? l = Yi : "function" == typeof l && "number" != typeof o && (o = 1), this.options = {
                    wrapper: t,
                    content: e,
                    eventsTarget: i,
                    smoothWheel: r,
                    syncTouch: s,
                    syncTouchLerp: a,
                    touchInertiaExponent: n,
                    duration: o,
                    easing: l,
                    lerp: h,
                    infinite: p,
                    gestureOrientation: d,
                    orientation: c,
                    touchMultiplier: u,
                    wheelMultiplier: f,
                    autoResize: m,
                    prevent: g,
                    virtualScroll: y,
                    overscroll: v,
                    autoRaf: b,
                    anchors: S,
                    autoToggle: w,
                    allowNestedScroll: E,
                    __experimental__naiveDimensions: x
                }, this.dimensions = new Vs(t, e, {
                    autoResize: m
                }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }), this.options.anchors && this.options.wrapper === window && this.options.wrapper.addEventListener("click", this.onClick, !1), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, !1), this.virtualScroll = new Bs(i, {
                    touchMultiplier: u,
                    wheelMultiplier: f
                }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
                    passive: !0
                }), this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
            }
            destroy() {
                this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, !1), this.options.anchors && this.options.wrapper === window && this.options.wrapper.removeEventListener("click", this.onClick, !1), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this.__rafID && cancelAnimationFrame(this.__rafID)
            }
            on(t, e) {
                return this.emitter.on(t, e)
            }
            off(t, e) {
                return this.emitter.off(t, e)
            }
            setScroll(t) {
                this.isHorizontal ? this.options.wrapper.scrollTo({
                    left: t,
                    behavior: "instant"
                }) : this.options.wrapper.scrollTo({
                    top: t,
                    behavior: "instant"
                })
            }
            resize() {
                this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
            }
            emit() {
                this.emitter.emit("scroll", this)
            }
            reset() {
                this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
            }
            start() {
                if (this.isStopped) {
                    if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
                    this.internalStart()
                }
            }
            internalStart() {
                this.isStopped && (this.reset(), this.isStopped = !1, this.emit())
            }
            stop() {
                if (!this.isStopped) {
                    if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
                    this.internalStop()
                }
            }
            internalStop() {
                this.isStopped || (this.reset(), this.isStopped = !0, this.emit())
            }
            scrollTo(t, {
                offset: e = 0,
                immediate: i = !1,
                lock: r = !1,
                duration: s = this.options.duration,
                easing: a = this.options.easing,
                lerp: n = this.options.lerp,
                onStart: o,
                onComplete: l,
                force: h = !1,
                programmatic: p = !0,
                userData: c
            } = {}) {
                if (!this.isStopped && !this.isLocked || h) {
                    if ("string" == typeof t && ["top", "left", "start"].includes(t)) t = 0;
                    else if ("string" == typeof t && ["bottom", "right", "end"].includes(t)) t = this.limit;
                    else {
                        let i;
                        if ("string" == typeof t ? i = document.querySelector(t) : t instanceof HTMLElement && null != t && t.nodeType && (i = t), i) {
                            if (this.options.wrapper !== window) {
                                let t = this.rootElement.getBoundingClientRect();
                                e -= this.isHorizontal ? t.left : t.top
                            }
                            let r = i.getBoundingClientRect();
                            t = (this.isHorizontal ? r.left : r.top) + this.animatedScroll
                        }
                    }
                    if ("number" == typeof t) {
                        if (t += e, t = Math.round(t), this.options.infinite) {
                            if (p) {
                                this.targetScroll = this.animatedScroll = this.scroll;
                                let e = t - this.animatedScroll;
                                e > this.limit / 2 ? t -= this.limit : e < -this.limit / 2 && (t += this.limit)
                            }
                        } else t = Ui(0, t, this.limit);
                        if (t === this.targetScroll) return null == o || o(this), void (null == l || l(this));
                        if (this.userData = null != c ? c : {}, i) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == l || l(this), this.userData = {}, void requestAnimationFrame(() => {
                            this.dispatchScrollendEvent()
                        });
                        p || (this.targetScroll = t), "number" == typeof s && "function" != typeof a ? a = Yi : "function" == typeof a && "number" != typeof s && (s = 1), this.animate.fromTo(this.animatedScroll, t, {
                            duration: s,
                            easing: a,
                            lerp: n,
                            onStart: () => {
                                r && (this.isLocked = !0), this.isScrolling = "smooth", null == o || o(this)
                            },
                            onUpdate: (t, e) => {
                                this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), p && (this.targetScroll = t), e || this.emit(), e && (this.reset(), this.emit(), null == l || l(this), this.userData = {}, requestAnimationFrame(() => {
                                    this.dispatchScrollendEvent()
                                }), this.preventNextNativeScrollEvent())
                            }
                        })
                    }
                }
            }
            preventNextNativeScrollEvent() {
                this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
                    this._preventNextNativeScrollEvent = !1
                })
            }
            checkNestedScroll(t, {
                deltaX: e,
                deltaY: i
            }) {
                var r, s;
                let a, n, o, l, h, p, c, d, u, f, m, g, y, v, b = Date.now(),
                    S = null != (r = t._lenis) ? r : t._lenis = {},
                    w = this.options.gestureOrientation;
                if (b - (null != (s = S.time) ? s : 0) > 2e3) {
                    S.time = Date.now();
                    let e = window.getComputedStyle(t);
                    S.computedStyle = e;
                    let i = e.overflowX,
                        r = e.overflowY;
                    if (a = ["auto", "overlay", "scroll"].includes(i), n = ["auto", "overlay", "scroll"].includes(r), S.hasOverflowX = a, S.hasOverflowY = n, !a && !n || "vertical" === w && !n || "horizontal" === w && !a) return !1;
                    h = t.scrollWidth, p = t.scrollHeight, c = t.clientWidth, d = t.clientHeight, o = h > c, l = p > d, S.isScrollableX = o, S.isScrollableY = l, S.scrollWidth = h, S.scrollHeight = p, S.clientWidth = c, S.clientHeight = d
                } else o = S.isScrollableX, l = S.isScrollableY, a = S.hasOverflowX, n = S.hasOverflowY, h = S.scrollWidth, p = S.scrollHeight, c = S.clientWidth, d = S.clientHeight;
                if (!((a || n) && (o || l) && ("vertical" !== w || n && l) && ("horizontal" !== w || a && o))) return !1;
                if ("horizontal" === w) u = "x";
                else if ("vertical" === w) u = "y";
                else {
                    0 !== e && a && o && (u = "x"), 0 !== i && n && l && (u = "y")
                }
                if (!u) return !1;
                if ("x" === u) f = t.scrollLeft, m = h - c, g = e, y = a, v = o;
                else {
                    if ("y" !== u) return !1;
                    f = t.scrollTop, m = p - d, g = i, y = n, v = l
                }
                return (g > 0 ? f < m : f > 0) && y && v
            }
            get rootElement() {
                return this.options.wrapper === window ? document.documentElement : this.options.wrapper
            }
            get limit() {
                return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
            }
            get isHorizontal() {
                return "horizontal" === this.options.orientation
            }
            get actualScroll() {
                var t, e;
                let i = this.options.wrapper;
                return this.isHorizontal ? null != (t = i.scrollX) ? t : i.scrollLeft : null != (e = i.scrollY) ? e : i.scrollTop
            }
            get scroll() {
                return this.options.infinite ? Ls(this.animatedScroll, this.limit) : this.animatedScroll
            }
            get progress() {
                return 0 === this.limit ? 1 : this.scroll / this.limit
            }
            get isScrolling() {
                return this._isScrolling
            }
            set isScrolling(t) {
                this._isScrolling !== t && (this._isScrolling = t, this.updateClassName())
            }
            get isStopped() {
                return this._isStopped
            }
            set isStopped(t) {
                this._isStopped !== t && (this._isStopped = t, this.updateClassName())
            }
            get isLocked() {
                return this._isLocked
            }
            set isLocked(t) {
                this._isLocked !== t && (this._isLocked = t, this.updateClassName())
            }
            get isSmooth() {
                return "smooth" === this.isScrolling
            }
            get className() {
                let t = "lenis";
                return this.options.autoToggle && (t += " lenis-autoToggle"), this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), "smooth" === this.isScrolling && (t += " lenis-smooth"), t
            }
            updateClassName() {
                this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim()
            }
            cleanUpClassName() {
                this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim()
            }
        },
        Rs = Object.create,
        {
            getPrototypeOf: $s,
            defineProperty: Ji,
            getOwnPropertyNames: Gs
        } = Object,
        Ns = Object.prototype.hasOwnProperty,
        Hs = (t, e, i) => {
            i = null != t ? Rs($s(t)) : {};
            let r = !e && t && t.__esModule ? i : Ji(i, "default", {
                value: t,
                enumerable: !0
            });
            for (let e of Gs(t)) Ns.call(r, e) || Ji(r, e, {
                get: () => t[e],
                enumerable: !0
            });
            return r
        },
        js = (t, e) => () => (e || t((e = {
            exports: {}
        }).exports, e), e.exports),
        qs = js((t, e) => {
            var i, r;
            i = t, r = function () {
                var t = 0;

                function e(e) {
                    return "__private_" + t++ + "_" + e
                }

                function i(t, e) {
                    if (!Object.prototype.hasOwnProperty.call(t, e)) throw new TypeError("attempted to use private field on non-instance");
                    return t
                }

                function r() { }
                r.prototype = {
                    on: function (t, e, i) {
                        var r = this.e || (this.e = {});
                        return (r[t] || (r[t] = [])).push({
                            fn: e,
                            ctx: i
                        }), this
                    },
                    once: function (t, e, i) {
                        var r = this;

                        function s() {
                            r.off(t, s), e.apply(i, arguments)
                        }
                        return s._ = e, this.on(t, s, i)
                    },
                    emit: function (t) {
                        for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), r = 0, s = i.length; r < s; r++) i[r].fn.apply(i[r].ctx, e);
                        return this
                    },
                    off: function (t, e) {
                        var i = this.e || (this.e = {}),
                            r = i[t],
                            s = [];
                        if (r && e)
                            for (var a = 0, n = r.length; a < n; a++) r[a].fn !== e && r[a].fn._ !== e && s.push(r[a]);
                        return s.length ? i[t] = s : delete i[t], this
                    }
                };
                var s = r;
                s.TinyEmitter = r;
                var a, n = "virtualscroll",
                    o = e("options"),
                    l = e("el"),
                    h = e("emitter"),
                    p = e("event"),
                    c = e("touchStart"),
                    d = e("bodyTouchAction");
                return function () {
                    function t(t) {
                        var e = this;
                        Object.defineProperty(this, o, {
                            writable: !0,
                            value: void 0
                        }), Object.defineProperty(this, l, {
                            writable: !0,
                            value: void 0
                        }), Object.defineProperty(this, h, {
                            writable: !0,
                            value: void 0
                        }), Object.defineProperty(this, p, {
                            writable: !0,
                            value: void 0
                        }), Object.defineProperty(this, c, {
                            writable: !0,
                            value: void 0
                        }), Object.defineProperty(this, d, {
                            writable: !0,
                            value: void 0
                        }), this._onWheel = function (t) {
                            var r = i(e, o)[o],
                                s = i(e, p)[p];
                            s.deltaX = t.wheelDeltaX || -1 * t.deltaX, s.deltaY = t.wheelDeltaY || -1 * t.deltaY, a.isFirefox && 1 === t.deltaMode && (s.deltaX *= r.firefoxMultiplier, s.deltaY *= r.firefoxMultiplier), s.deltaX *= r.mouseMultiplier, s.deltaY *= r.mouseMultiplier, e._notify(t)
                        }, this._onMouseWheel = function (t) {
                            var r = i(e, p)[p];
                            r.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, r.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, e._notify(t)
                        }, this._onTouchStart = function (t) {
                            var r = t.targetTouches ? t.targetTouches[0] : t;
                            i(e, c)[c].x = r.pageX, i(e, c)[c].y = r.pageY
                        }, this._onTouchMove = function (t) {
                            var r = i(e, o)[o];
                            r.preventTouch && !t.target.classList.contains(r.unpreventTouchClass) && t.preventDefault();
                            var s = i(e, p)[p],
                                a = t.targetTouches ? t.targetTouches[0] : t;
                            s.deltaX = (a.pageX - i(e, c)[c].x) * r.touchMultiplier, s.deltaY = (a.pageY - i(e, c)[c].y) * r.touchMultiplier, i(e, c)[c].x = a.pageX, i(e, c)[c].y = a.pageY, e._notify(t)
                        }, this._onKeyDown = function (t) {
                            var r = i(e, p)[p];
                            r.deltaX = r.deltaY = 0;
                            var s = window.innerHeight - 40;
                            switch (t.keyCode) {
                                case 37:
                                case 38:
                                    r.deltaY = i(e, o)[o].keyStep;
                                    break;
                                case 39:
                                case 40:
                                    r.deltaY = -i(e, o)[o].keyStep;
                                    break;
                                case 32:
                                    r.deltaY = s * (t.shiftKey ? 1 : -1);
                                    break;
                                default:
                                    return
                            }
                            e._notify(t)
                        }, i(this, l)[l] = window, t && t.el && (i(this, l)[l] = t.el, delete t.el), a || (a = {
                            hasWheelEvent: "onwheel" in document,
                            hasMouseWheelEvent: "onmousewheel" in document,
                            hasTouch: "ontouchstart" in document,
                            hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                            hasPointer: !!window.navigator.msPointerEnabled,
                            hasKeyDown: "onkeydown" in document,
                            isFirefox: navigator.userAgent.indexOf("Firefox") > -1
                        }), i(this, o)[o] = Object.assign({
                            mouseMultiplier: 1,
                            touchMultiplier: 2,
                            firefoxMultiplier: 15,
                            keyStep: 120,
                            preventTouch: !1,
                            unpreventTouchClass: "vs-touchmove-allowed",
                            useKeyboard: !0,
                            useTouch: !0
                        }, t), i(this, h)[h] = new s, i(this, p)[p] = {
                            y: 0,
                            x: 0,
                            deltaX: 0,
                            deltaY: 0
                        }, i(this, c)[c] = {
                            x: null,
                            y: null
                        }, i(this, d)[d] = null, void 0 !== i(this, o)[o].passive && (this.listenerOptions = {
                            passive: i(this, o)[o].passive
                        })
                    }
                    var e = t.prototype;
                    return e._notify = function (t) {
                        var e = i(this, p)[p];
                        e.x += e.deltaX, e.y += e.deltaY, i(this, h)[h].emit(n, {
                            x: e.x,
                            y: e.y,
                            deltaX: e.deltaX,
                            deltaY: e.deltaY,
                            originalEvent: t
                        })
                    }, e._bind = function () {
                        a.hasWheelEvent && i(this, l)[l].addEventListener("wheel", this._onWheel, this.listenerOptions), a.hasMouseWheelEvent && i(this, l)[l].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), a.hasTouch && i(this, o)[o].useTouch && (i(this, l)[l].addEventListener("touchstart", this._onTouchStart, this.listenerOptions), i(this, l)[l].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), a.hasPointer && a.hasTouchWin && (i(this, d)[d] = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", i(this, l)[l].addEventListener("MSPointerDown", this._onTouchStart, !0), i(this, l)[l].addEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && i(this, o)[o].useKeyboard && document.addEventListener("keydown", this._onKeyDown)
                    }, e._unbind = function () {
                        a.hasWheelEvent && i(this, l)[l].removeEventListener("wheel", this._onWheel), a.hasMouseWheelEvent && i(this, l)[l].removeEventListener("mousewheel", this._onMouseWheel), a.hasTouch && (i(this, l)[l].removeEventListener("touchstart", this._onTouchStart), i(this, l)[l].removeEventListener("touchmove", this._onTouchMove)), a.hasPointer && a.hasTouchWin && (document.body.style.msTouchAction = i(this, d)[d], i(this, l)[l].removeEventListener("MSPointerDown", this._onTouchStart, !0), i(this, l)[l].removeEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && i(this, o)[o].useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
                    }, e.on = function (t, e) {
                        i(this, h)[h].on(n, t, e);
                        var r = i(this, h)[h].e;
                        r && r[n] && 1 === r[n].length && this._bind()
                    }, e.off = function (t, e) {
                        i(this, h)[h].off(n, t, e);
                        var r = i(this, h)[h].e;
                        (!r[n] || r[n].length <= 0) && this._unbind()
                    }, e.destroy = function () {
                        i(this, h)[h].off(), this._unbind()
                    }, t
                }()
            }, "object" == typeof t && void 0 !== e ? e.exports = r() : "function" == typeof define && define.amd ? define(r) : (i || self).virtualScroll = r()
        }),
        Ws = Hs(qs(), 1);

    function Vt(t, e, i, r) {
        return t + (e - t) * (1 - Math.exp(-i * r))
    }

    function Qi(t, e) {
        let i = t % e;
        return Math.abs(i) > e / 2 && (i = i > 0 ? i - e : i + e), i
    }
    var Xs = {
        infinite: !0,
        snap: !0,
        dragSensitivity: .005,
        lerpFactor: .3,
        scrollSensitivity: 1,
        snapStrength: .1,
        speedDecay: .85,
        bounceLimit: 1,
        virtualScroll: {
            mouseMultiplier: .5,
            touchMultiplier: 2,
            firefoxMultiplier: 30,
            useKeyboard: !1,
            passive: !0
        },
        setOffset: ({
            itemWidth: t,
            wrapperWidth: e
        }) => t,
        scrollInput: !1
    },
        Xe, ft, Ye, Pe, Le, Te, Ue, $, er, zt, tr, hi, ir, ct, dt, pt, rr, sr, ar, ci, li = class {
            constructor(t, e = {}) {
                fe(this, $), O(this, "speed", 0), fe(this, Xe, 0), fe(this, ft, 0), fe(this, Ye, 0), O(this, "deltaTime", 0), fe(this, Pe, !0), fe(this, Le, !1), fe(this, Te, 0), fe(this, Ue, 0), O(this, "config"), O(this, "wrapper"), O(this, "items"), O(this, "viewport"), O(this, "isDragging", !1), O(this, "dragStart", 0), O(this, "dragStartTarget", 0), O(this, "isVisible", !1), O(this, "current", 0), O(this, "target", 0), O(this, "maxScroll", 0), O(this, "resizeTimeout"), O(this, "virtualScroll"), O(this, "observer"), O(this, "touchStartY"), O(this, "touchStartX"), O(this, "touchPreviousX"), O(this, "scrollDirection"), O(this, "parallaxValues"), O(this, "webglValue", 0), O(this, "onSlideChange"), O(this, "onResize"), O(this, "onUpdate"), this.config = xe(xe({}, Xs), e), e.onSlideChange && (this.onSlideChange = e.onSlideChange), e.onResize && (this.onResize = e.onResize), e.onUpdate && (this.onUpdate = e.onUpdate), delete this.config.onSlideChange, delete this.config.onResize, delete this.config.onUpdate, this.wrapper = t, this.items = [...t.children], this.current = 0, this.target = 0, this.isDragging = !1, this.dragStart = 0, this.dragStartTarget = 0, this.isVisible = !1, ae(this, Te, 0), ae(this, Ue, 0), H(this, $, zt).call(this), H(this, $, er).call(this), H(this, $, tr).call(this), this.wrapper.style.cursor = "grab", H(this, $, zt).call(this), H(this, $, ir).call(this)
            }
            update() {
                var t;
                if (!this.isVisible || !ie(this, Pe)) return;
                let e = performance.now();
                if (this.deltaTime = (e - ie(this, Ye)) / 1e3, ae(this, Ye, e), this.config.snap && !this.isDragging) {
                    let t = Math.round(this.target) - this.target;
                    this.target += t * this.config.snapStrength;
                    Math.abs(Math.round(this.target) - this.target) < 1e-4 && (this.target = Math.round(this.target))
                }
                this.current = Vt(this.current, this.target, 1 / this.config.lerpFactor, this.deltaTime);
                Math.abs(this.current - this.target) < 1e-3 && (this.current = this.target);
                // SETTLE GUARD: the asymptotic lerp never used to converge, so
                // this wrote fresh translateX() strings to every card + inner
                // every frame FOREVER while the slider was on screen. Once the
                // position has landed and momentum has decayed, do nothing.
                if (this.current === this.__settledAt && Math.abs(this.speed) < 1e-3) return;
                this.__settledAt = this.current === this.target ? this.current : null;
                if (this.config.infinite) {
                    let t = Math.round(-this.current),
                        e = this.items.length,
                        i = (t % e + e) % e;
                    H(this, $, ci).call(this, i), H(this, $, sr).call(this)
                } else H(this, $, ci).call(this, Math.round(Math.abs(this.current))), H(this, $, rr).call(this);
                H(this, $, ar).call(this), null == (t = this.onUpdate) || t.call(this, this)
            }
            goToNext() {
                this.config.infinite ? this.target = Math.round(this.target - 1) : this.target = Math.max(this.maxScroll, Math.round(this.target - 1))
            }
            goToPrev() {
                this.config.infinite ? this.target = Math.round(this.target + 1) : this.target = Math.min(0, Math.round(this.target + 1))
            }
            goToIndex(t) {
                this.target = -t
            }
            set snap(t) {
                this.config.snap = t
            }
            getProgress() {
                let t = this.items.length;
                return Math.abs(this.current) % t / t
            }
            destroy() {
                this.kill(), window.removeEventListener("mousemove", t => H(this, $, dt).call(this, t)), window.removeEventListener("mouseup", () => H(this, $, pt).call(this)), window.removeEventListener("touchmove", t => {
                    let e = t.touches[0];
                    H(this, $, dt).call(this, e)
                }), window.removeEventListener("touchend", () => H(this, $, pt).call(this)), this.wrapper.removeEventListener("mousedown", t => H(this, $, ct).call(this, t)), this.wrapper.removeEventListener("touchstart", t => {
                    let e = t.touches[0];
                    H(this, $, ct).call(this, e)
                }), this.resizeTimeout && clearTimeout(this.resizeTimeout), this.virtualScroll && this.config.scrollInput && this.virtualScroll.destroy(), this.observer && this.observer.disconnect()
            }
            get currentSlide() {
                return ie(this, Te)
            }
            kill() {
                ae(this, Pe, !1), this.items.forEach(t => {
                    t.style.transform = ""
                }), this.current = 0, this.target = 0, this.speed = 0, ae(this, Xe, 0), this.touchPreviousX = void 0
            }
            init() {
                ae(this, Pe, !0), ae(this, Ye, performance.now())
            }
            set paused(t) {
                ae(this, Le, t)
            }
            get paused() {
                return ie(this, Le)
            }
            get progress() {
                if (this.config.infinite) {
                    let t = -this.target,
                        e = this.items.length;
                    return (t % e + e) % e / (e - 1)
                } {
                    let t = Math.abs(this.current),
                        e = Math.abs(this.maxScroll);
                    return Math.max(0, Math.min(1, t / e))
                }
            }
            resize() {
                H(this, $, zt).call(this);
                let t = ie(this, Pe),
                    e = this.isVisible;
                ae(this, Pe, !0), this.isVisible = !0, this.update(), ae(this, Pe, t), this.isVisible = e
            }
        };
    Xe = new WeakMap, ft = new WeakMap, Ye = new WeakMap, Pe = new WeakMap, Le = new WeakMap, Te = new WeakMap, Ue = new WeakMap, $ = new WeakSet, er = function () {
        this.observer = new IntersectionObserver(t => {
            t.forEach(t => {
                this.isVisible = t.isIntersecting
            })
        }, {
            root: null,
            rootMargin: "50px",
            threshold: 0
        }), this.observer.observe(this.wrapper)
    }, zt = function () {
        this.viewport = {
            itemWidth: this.items[0].getBoundingClientRect().width,
            wrapperWidth: this.wrapper.clientWidth,
            totalWidth: this.items.reduce((t, e) => t + e.clientWidth, 0)
        }, ae(this, ft, this.config.setOffset(this.viewport)), this.maxScroll = -(this.viewport.totalWidth - ie(this, ft)) / this.viewport.itemWidth, queueMicrotask(() => {
            var t;
            null == (t = this.onResize) || t.call(this, this)
        })
    }, tr = function () {
        this.wrapper.addEventListener("mousedown", t => H(this, $, ct).call(this, t)), window.addEventListener("mousemove", t => H(this, $, dt).call(this, t)), window.addEventListener("mouseup", () => H(this, $, pt).call(this));
        this.wrapper.addEventListener("touchstart", t => {
            let e = t.touches[0];
            this.touchStartY = e.clientY, this.touchStartX = e.clientX, this.touchPreviousX = e.clientX, this.scrollDirection = void 0, H(this, $, ct).call(this, e)
        }), window.addEventListener("touchmove", t => {
            let e = t.touches[0],
                i = Math.abs(e.clientY - this.touchStartY),
                r = Math.abs(e.clientX - this.touchStartX);
            !this.scrollDirection && (r > 5 || i > 5) && (this.scrollDirection = r > i ? "horizontal" : "vertical"), "horizontal" === this.scrollDirection && (t.preventDefault(), H(this, $, dt).call(this, e), this.touchPreviousX = e.clientX)
        }, {
            passive: !1
        }), window.addEventListener("touchend", () => {
            this.scrollDirection = void 0, this.touchPreviousX = void 0, H(this, $, pt).call(this)
        }), new ResizeObserver(() => {
            this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => this.resize(), 10)
        }).observe(this.wrapper)
    }, hi = function (t) {
        if (!this.config.infinite) {
            if (t > this.config.bounceLimit) return this.config.bounceLimit;
            if (t < this.maxScroll - this.config.bounceLimit) return this.maxScroll - this.config.bounceLimit
        }
        return t
    }, ir = function () {
        this.virtualScroll = new Ws.default(ht(xe({}, this.config.virtualScroll), {
            el: this.wrapper
        }));
        this.virtualScroll.on(t => {
            if (!this.isDragging && !ie(this, Le)) {
                if (t.touchDevice) {
                    let e = Math.abs(t.deltaY),
                        i = Math.abs(t.deltaX);
                    if (e < 5 && i < 5 || e > i) return
                }
                let e = (this.config.scrollInput ? Math.abs(t.deltaX) > Math.abs(t.deltaY) ? t.deltaX : t.deltaY : t.deltaX) * this.config.scrollSensitivity * .001,
                    i = this.target + e;
                this.config.infinite || (i > 0 ? i = 0 : i < this.maxScroll && (i = this.maxScroll)), this.target = H(this, $, hi).call(this, i), this.speed = 10 * -e
            }
        })
    }, ct = function (t) {
        ie(this, Le) || (this.isDragging = !0, this.dragStart = t.clientX, this.dragStartTarget = this.target, this.wrapper.style.cursor = "grabbing")
    }, dt = function (t) {
        if (!this.isDragging || ie(this, Le)) return;
        let e = t.clientX - this.dragStart,
            i = this.dragStartTarget + e * this.config.dragSensitivity;
        if (this.target = H(this, $, hi).call(this, i), "movementX" in t) this.speed += .01 * t.movementX;
        else {
            let e = t.clientX,
                i = e - (this.touchPreviousX || e);
            this.speed += .01 * i
        }
    }, pt = function () {
        if (this.isDragging = !1, this.wrapper.style.cursor = "grab", this.config.infinite) this.config.snap && (this.target = Math.round(this.target));
        else if (this.target > 0) this.target = 0;
        else if (this.target < this.maxScroll) this.target = this.maxScroll;
        else if (this.config.snap) {
            let t = Math.round(this.target);
            this.target = Math.min(0, Math.max(this.maxScroll, t))
        }
    }, rr = function () {
        this.parallaxValues = this.items.map((t, e) => {
            let i = this.current * this.viewport.itemWidth;
            return t.style.transform = `translateX(${i}px)`, i
        })
    }, sr = function () {
        this.parallaxValues = this.items.map((t, e) => {
            let i = this.current + e,
                r = (Qi(i, this.items.length) - e) * this.viewport.itemWidth;
            return t.style.transform = `translateX(${r}px)`, Qi(i, this.items.length)
        })
    }, ar = function () {
        ae(this, Xe, Vt(ie(this, Xe), this.speed, 1 / this.config.lerpFactor, this.deltaTime)), this.speed *= this.config.speedDecay
    }, ci = function (t) {
        var e;
        ie(this, Te) !== t && (ae(this, Ue, ie(this, Te)), ae(this, Te, t), null == (e = this.onSlideChange) || e.call(this, ie(this, Te), ie(this, Ue)))
    };
    // ── DEAD CODE REMOVED: the entire Lottie 5.12.2 runtime + @lottiefiles
    // lottie-player web component (~10,400 lines, ~90 KB gzip) shipped here
    // but nothing on the site ever created a lottie animation — the hero's
    // [data-load-stage-logo-lottie] target is a plain hidden <div> with a
    // no-op play() stub (see HeroSection.tsx). Backup of the original kept
    // in git history.
    var nr = li;
    // ── DEAD CODE REMOVED: the entire Swiper bundle (~2,660 lines). The
    // swiper-based flavour slider was replaced by the custom coverflow in
    // FlavourSection.tsx; _o() below is now a documented no-op stub.
    var ho = "fonts-loaded",
        Ps = "is-ready",
        kt, Ni, ii, Gi, co = "M0,0 L0.076,0.5737 L0.1187,0.8382 L0.1419,0.9463 L0.1654,1.0292 L0.1897,1.0886 L0.2153,1.1258 L0.2297,1.137 L0.2448,1.1424 L0.261,1.1423 L0.2786,1.1366 L0.3101,1.1165 L0.3862,1.0507 L0.4257,1.0219 L0.4699,0.9995 L0.5163,0.9872 L0.5877,0.9842 L0.8126,1.0011 L1,1",
        po = "M0,0 L0.017,0.029 L0.036,0.113 L0.111,0.604 L0.15,0.809 L0.191,0.949 L0.213,0.995 L0.236,1.026 L0.262,1.044 L0.293,1.049 L0.435,1.01 L0.512,1 L1,1";
    CustomEase.create("smooth-ease", "0.32, 0.72, 0, 1"), CustomEase.create("elastic-ease-out", co), CustomEase.create("elastic-ease-out-soft", po), gsap.defaults({
        ease: "smooth-ease"
    });
    var Hi = new Set,
        Ts;
    window.addEventListener("resize", () => {
        clearTimeout(Ts), Ts = setTimeout(() => {
            Hi.forEach(t => t())
        }, 60)
    });
    var fo = t => (Hi.add(t), () => Hi.delete(t)),
        we = (t = () => { }) => {
            gsap.matchMedia().add("(min-width: 992px)", t)
        },
        ri = (t = () => { }) => {
            gsap.matchMedia().add("(max-width: 991px)", t)
        };

    function uo() {
        kt = new Zi({
            lerp: .18,
            autoRaf: !0,
            // Smooth-scroll #anchor links (nav Nutrition/Benefits/Reviews,
            // the "1000+ Reviews" chip) — native jumps teleported past every
            // scrubbed section, snapping all scroll-driven animations at once.
            anchors: !0
        });
        window.lenis = kt
    }

    function mo() {
        let t = document.querySelector("[data-sequence]");
        if (!t) return;
        let e = t.querySelector("[data-sequence-trigger]"),
            i = t.querySelector("[data-sequence-canvas]"),
            r = i.getContext("2d"),
            s = {
                frame: 0
            },
            a = i.dataset.sequenceCanvasImgPath,
            n = new Array(200),
            o = t => `${a}seq_0_${t}.webp`;
        // ── FRAME PIPELINE (scrub-jank fix) ─────────────────────────────
        // The frames are 1920×1920 (~15 MB decoded each → ~3 GB for all 200),
        // so browsers evicted decoded copies and the old <img> path re-decoded
        // frames SYNCHRONOUSLY on the main thread mid-scrub — that was the lag.
        // Now: compressed blobs are fetched up-front (~35 MB, stays encoded in
        // memory) and a rolling window of ImageBitmaps is decoded + resized
        // OFF-THREAD to the exact on-screen pixel size (identical rendered
        // quality — the canvas never displayed more pixels than this), so
        // drawImage is a 1:1 blit and the main thread never decodes.
        // Fallback (no createImageBitmap, e.g. iOS 13/14): the old <img> array
        // plus rolling img.decode() hints to keep the browser cache warm.
        // Window maths: the desktop runway is 720lvh ≈ 7.2 viewports for 200
        // frames → ~28 frames consumed per viewport scrolled, i.e. 28–84
        // frames/SECOND at normal scroll speeds. The window is therefore
        //   • DIRECTIONAL — nearly the whole decode budget leads the scroll
        //   • DEEP — 16 (desktop) / 12 (mobile) frames ahead
        //   • HOLD-SAFE — the frame currently on the canvas is NEVER evicted
        //     (the old code evicted the trailing frames being shown as holds,
        //     freezing the can on a stale image until decodes caught up)
        //   • PROGRESSIVE — every decode that lands CLOSER to the requested
        //     frame than what's displayed redraws immediately, so fast flicks
        //     read as a quick continuous spin instead of freeze→jump.
        // Desktop skips the decode-time resize entirely: the display box
        // (~1800px) is within ~6% of the 1920px source, so the lanczos pass
        // only added latency — drawImage's high-quality smoothing does that
        // last 6% exactly like the original pipeline always did.
        let _hasIB = "function" == typeof window.createImageBitmap,
            _blobs = new Array(200),
            _bm = new Map,
            _last = -1,   // last REQUESTED frame index
            _shown = -1,  // frame index actually on the canvas
            _dir = 1,     // direction of frame travel
            _gen = 0,     // bumped on flush — discards stale in-flight decodes
            _desk = window.matchMedia("(min-width: 992px)").matches,
            _AHEAD = _desk ? 16 : 12,
            _BACK = 3,
            _drawH = () => Math.max(2, Math.round(_desk ? i.height : .8 * i.height)),
            _flush = () => {
                _bm.forEach(t => t.close && t.close()), _bm.clear(), _want.clear(), _gen++, _last = -1, _shown = -1
            },
            // ── PRIORITY DECODER ──────────────────────────────────────────
            // A naive fire-everything approach queues decodes FIFO, so during
            // a fast scroll the decoder pool is stuck working through frames
            // 30–80 positions BEHIND the scrub before it ever reaches the
            // current one → the can freezes ("stuck when scrolling fast").
            // Instead: a bounded number of in-flight decodes, and each free
            // slot picks the WANTED frame closest to the live scrub position
            // (preferring the scroll direction). Stale wants are pruned, so
            // the decoder always works on what the user is about to see.
            _want = new Set,
            _inflight = 0,
            _ndec = 0,
            _MAXDEC = _desk ? 6 : 4,
            // ── PRIORITY BLOB FETCH ───────────────────────────────────────
            // The background sweep downloads blobs serially 0→199, so a fast
            // scroll reaches frames whose data hasn't arrived yet (measured:
            // the whole pipeline was rate-limited by blob arrival, not decode)
            // — the can froze at the download frontier. Wanted-but-missing
            // blobs are now fetched on demand, nearest-to-the-scrub first.
            _fetching = new Set,
            _MAXFETCH = 6,
            _fetchOne = r => {
                if (_blobs[r] || _fetching.has(r) || _fetching.size >= _MAXFETCH) return;
                _fetching.add(r);
                fetch(o(r), {
                    priority: "high"
                }).then(t2 => t2.ok ? t2.blob() : Promise.reject()).then(t2 => {
                    _blobs[r] = t2, _fetching.delete(r), _pump()
                }).catch(() => {
                    _fetching.delete(r), console.warn("Failed to load ", o(r))
                })
            },
            _pump = () => {
                if (_inflight >= _MAXDEC) return;
                let c2 = Math.round(s.frame),
                    best = -1,
                    bd = 1 / 0,
                    bestFetch = -1,
                    bf = 1 / 0;
                _want.forEach(r => {
                    if (_bm.has(r)) return void _want.delete(r);
                    let d2 = Math.abs(r - c2);
                    if (d2 > 40) return void _want.delete(r); // stale — never decode
                    (r - c2) * _dir < 0 && (d2 += 100);       // behind us: lowest priority
                    if (!_blobs[r]) return void (d2 < bf && (bf = d2, bestFetch = r));
                    d2 < bd && (bd = d2, best = r)
                });
                bestFetch >= 0 && _fetchOne(bestFetch);
                if (best < 0) return;
                _want.delete(best), _inflight++;
                let g2 = _gen,
                    e = _drawH(),
                    p2 = e < 1440 ? createImageBitmap(_blobs[best], {
                        resizeHeight: e,
                        resizeQuality: "high"
                    }).catch(() => createImageBitmap(_blobs[best])) : createImageBitmap(_blobs[best]);
                p2.then(i2 => {
                    if (_inflight--, _ndec++, g2 !== _gen) return i2.close && i2.close(), _pump(); // stale (resized mid-decode)
                    _bm.set(best, i2);
                    let c3 = Math.round(s.frame);
                    // redraw if this frame IS current, or brings the canvas
                    // closer to current than whatever is displayed
                    (c3 === best || -1 === _shown || Math.abs(best - c3) < Math.abs(_shown - c3)) && x(!0);
                    _pump()
                }).catch(() => {
                    _inflight--, _pump()
                })
            },
            _ensure = t => {
                let lo = Math.max(0, t - (_dir > 0 ? _BACK : _AHEAD)),
                    hi = Math.min(199, t + (_dir > 0 ? _AHEAD : _BACK));
                if (!_hasIB) {
                    for (let e = lo; e <= hi; e++) n[e] && n[e].decode && n[e].decode().catch(() => { });
                    return
                }
                for (let r = lo; r <= hi; r++) !_bm.has(r) && _blobs[r] && _want.add(r);
                _bm.forEach((i2, r) => {
                    if (r === _shown) return;                              // on screen
                    if (Math.abs(r - t) <= Math.abs(_shown - t)) return;   // CATCH-UP path:
                    // closer to the live frame than what's displayed — these are
                    // the frames the canvas is about to advance through. The old
                    // code evicted them the instant they decoded (they land just
                    // behind the moving window), so the can froze while decodes
                    // kept completing and dying. NEVER evict them.
                    (r < lo - 4 || r > hi + 4) && (i2.close && i2.close(), _bm.delete(r))
                });
                for (let e = _inflight; e < _MAXDEC; e++) _pump()
            };
        let _startLoad = () => {
            if (_hasIB) {
                // chunked background sweep (skips anything the priority
                // fetcher already grabbed)
                let t2 = 0,
                    _load = e2 => _blobs[e2] || _fetching.has(e2) ? Promise.resolve() : fetch(o(e2)).then(t3 => t3.ok ? t3.blob() : Promise.reject()).then(t3 => {
                        _blobs[e2] = t3
                    }).catch(() => console.warn("Failed to load ", o(e2)));
                (function _next() {
                    let e2 = Math.min(t2 + 25, 200),
                        i2 = [];
                    for (; t2 < e2; t2++) i2.push(_load(t2));
                    Promise.all(i2).then(() => {
                        _ensure(Math.round(s.frame)), t2 < 200 && _next()
                    })
                })()
            } else
                for (let t2 = 0; t2 <= 199; t2++) {
                    let e2 = new Image;
                    e2.src = o(t2), e2.onerror = () => {
                        console.warn("Failed to load ", e2.src)
                    }, n[t2] = e2
                }
        };
        // Metered/slow connections: don't pull the ~35 MB frame set at page
        // load — wait until the sequence section is within ~2.5 viewports.
        let _conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection,
            _metered = !!_conn && (!0 === _conn.saveData || /(^|-)2g|3g/.test(_conn.effectiveType || ""));
        if (_metered && "function" == typeof IntersectionObserver) {
            let _io = new IntersectionObserver(e2 => {
                e2[0].isIntersecting && (_io.disconnect(), _startLoad())
            }, {
                rootMargin: "2500px 0px"
            });
            _io.observe(t)
        } else _startLoad();
        let l = !1,
            h = t.querySelectorAll("[data-sequence-card]"),
            p = t.querySelector("[data-sequence-title]"),
            c = t.querySelectorAll("[data-sequence-svg] path"),
            d = t.querySelectorAll("[data-sequence-smiley]"),
            u = t.querySelector("[data-sequence-signature]"),
            f = t.querySelector("[data-sequence-title-split]"),
            m = t.querySelectorAll("[data-sequence-final-signature]"),
            g = t.querySelector("[data-sequence-cookie-first]"),
            y = t.querySelector("[data-sequence-cookie-second]"),
            v = t.querySelector("[data-sequence-strawberry-first]"),
            b = t.querySelector("[data-sequence-strawberry-second]"),
            S = SplitText.create(f, {
                type: "words",
                wordsClass: "split-word"
            }),
            w = gsap.timeline({
                scrollTrigger: {
                    trigger: e,
                    start: "top 60%",
                    end: "bottom bottom+=25%",
                    scrub: !0
                }
            });
        we(() => {
            gsap.to(s, {
                frame: n.length - 1,
                snap: "frame",
                ease: "none",
                onUpdate: x,
                scrollTrigger: {
                    trigger: e,
                    start: "top 20%",
                    end: "bottom bottom",
                    scrub: .7,
                    onUpdate: e => {
                        // t/r here are the BLOCK-SCOPED paused timelines declared
                        // at the bottom of this we() block (they shadow the outer
                        // section/context variables): t = the finale-title
                        // SplitText word reveal, r = the finale signatures.
                        // t.play(0) fires the reveal at 85% progress; pause(0)
                        // rewinds it (back to the .from() state) when scrolling
                        // back up so it can replay. Removing these leaves the
                        // finale words IMMEDIATE-RENDERED INVISIBLE forever.
                        1 === e.direction && !l && e.progress >= .85 && (l = !0, t.play(0), r.play(0)), -1 === e.direction && l && e.progress <= .675 && (l = !1, t.pause(0), r.pause(0))
                    }
                }
            }), gsap.set(i, {
                transformOrigin: "center bottom"
            }), gsap.to(i, {
                keyframes: {
                    "75%": {
                        scale: 1
                    },
                    "100%": {
                        scale: .85,
                        yPercent: 3.5
                    }
                },
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: e,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: !0
                }
            }), gsap.set(h, {
                yPercent: 50,
                y: .6 * window.innerHeight,
                xPercent: (t, e) => e.hasAttribute("data-sequence-card-left") ? 4 : -4
            }), gsap.set(u, {
                opacity: 0
            }), gsap.set(p, {
                y: window.innerHeight,
                scale: .7
            }), gsap.set(m, {
                y: window.innerHeight
            }), gsap.set(g, {
                y: window.innerHeight,
                x: 64
            }), gsap.set(y, {
                y: window.innerHeight,
                x: 96
            }), gsap.set(v, {
                y: window.innerHeight,
                x: -64
            }), gsap.set(b, {
                y: window.innerHeight,
                x: -96
            }), w.to(h, {
                yPercent: -50,
                y: -.6 * window.innerHeight,
                xPercent: 0,
                duration: 1,
                rotate: (t, e) => e.hasAttribute("data-sequence-card-left") ? gsap.utils.random(-5, -2) : gsap.utils.random(2, 5),
                stagger: .85,
                ease: CustomEase.create("custom", "M0,0 C0,0.201 0.098,0.459 0.5,0.5 0.904,0.541 1,0.805 1,1 ")
            }, "step").to(p, {
                y: 0,
                scale: .9,
                duration: 1.5,
                ease: "expoScale(0.5,7,power2.out)"
            }, ">+=.2").to(m, {
                y: 0,
                duration: 1,
                ease: "power1.inOut"
            }, "<").to(g, {
                y: 0,
                x: 0,
                duration: 1.25,
                ease: "power1.inOut"
            }, "<").to(v, {
                y: 0,
                x: 0,
                duration: 1.25,
                ease: "power1.inOut"
            }, "<").to(y, {
                y: 0,
                x: 0,
                duration: 1.5,
                ease: "power1.inOut"
            }, "<").to(b, {
                y: 0,
                x: 0,
                duration: 1.5,
                ease: "power1.inOut"
            }, "<"), w.to(d, {
                rotate: (t, e) => e.hasAttribute("data-sequence-smiley-left") ? gsap.utils.random(8, 13) : gsap.utils.random(-13, -8),
                stagger: .85,
                duration: 1
            }, "step"), w.to(u, {
                keyframes: {
                    "10%": {
                        opacity: 1
                    },
                    "70%": {
                        opacity: 1
                    },
                    "90%": {
                        opacity: 0
                    }
                },
                duration: 1.5,
                ease: "none"
            }, "step+=.75");
            // (removed) drawSVG scrub on the hidden rig paths `c`: the rigs are
            // opacity:0 stand-ins kept only so this init finds [data-sequence-svg]
            // — animating their dash offsets wrote 3 style mutations per scroll
            // frame on elements nobody can see. The VISIBLE bolts are driven by
            // initSequenceLightning in useAnimations.ts.
            let t = gsap.timeline({
                paused: !0
            }).from(S.words, {
                xPercent: (t, e, i) => 60 * (Math.floor(i.length / 2) - t),
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "Expo.easeOut",
                stagger: .039
            }, "step").from(S.words, {
                yPercent: 150,
                duration: 1,
                stagger: .039,
                ease: "elastic-ease-out-soft"
            }, "step+=0.05"),
                r = gsap.timeline({
                    paused: !0
                }).from(m, {
                    opacity: 0,
                    duration: .2,
                    ease: "none"
                }, "step").fromTo(g, {
                    opacity: 0,
                    xPercent: 75,
                    yPercent: 80,
                    scale: .5,
                    rotate: -140
                }, {
                    opacity: 1,
                    xPercent: 0,
                    yPercent: 0,
                    scale: 1,
                    rotate: -90,
                    ease: "elastic-ease-out-soft",
                    duration: .8
                }, "step+=0.08").fromTo(v, {
                    opacity: 0,
                    xPercent: -50,
                    yPercent: 90,
                    scale: .5,
                    rotate: 40
                }, {
                    opacity: 1,
                    xPercent: 0,
                    yPercent: 0,
                    scale: 1,
                    rotate: -6,
                    ease: "elastic-ease-out-soft",
                    duration: .8
                }, "step+=0.08").fromTo(y, {
                    opacity: 0,
                    xPercent: 50,
                    yPercent: 75,
                    scale: .5,
                    rotate: -75
                }, {
                    opacity: 1,
                    xPercent: 0,
                    yPercent: 0,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(3px)",
                    ease: "elastic-ease-out-soft",
                    duration: 1.15
                }, "step+=0.16").fromTo(b, {
                    opacity: 0,
                    xPercent: -50,
                    yPercent: 50,
                    scale: .5,
                    rotate: -75
                }, {
                    opacity: 1,
                    xPercent: 0,
                    yPercent: 0,
                    scale: 1,
                    rotate: -23,
                    filter: "blur(4px)",
                    ease: "elastic-ease-out-soft",
                    duration: 1.15
                }, "step+=0.16")
        }), ri(() => {
            gsap.to(s, {
                frame: n.length - 1,
                snap: "frame",
                ease: "none",
                onUpdate: x,
                scrollTrigger: {
                    trigger: e,
                    start: "top 20%",
                    end: "bottom bottom",
                    scrub: .7
                }
            }), gsap.set(i, {
                transformOrigin: "center bottom"
            }), gsap.to(i, {
                keyframes: {
                    "10%": {
                        yPercent: 0,
                        scale: 1
                    },
                    "15%": {
                        yPercent: -10,
                        scale: .95
                    },
                    "70%": {
                        scale: .95
                    },
                    "75%": {
                        scale: 1
                    },
                    "100%": {
                        yPercent: 5,
                        scale: 1
                    }
                },
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: e,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: !0
                }
            })
        });
        let E = Math.min(window.devicePixelRatio || 1, 2);

        function x(force) {
            let t = r,
                e = Math.round(s.frame);
            // settled: the exact requested frame is already on the canvas
            if (!force && e === _last && e === _shown) return;
            e !== _last && (_dir = e >= _last ? 1 : -1, _last = e);
            // DRAW FIRST, decode/evict AFTER — _ensure()'s eviction used to run
            // before the search, destroying freshly-decoded catch-up frames
            // before they could ever be painted.
            let a2 = null,
                sh = -1;
            if (_hasIB) {
                // exact frame, else HOLD the nearest ready frame (never blank)
                if (a2 = _bm.get(e)) sh = e;
                else
                    for (let k = 1; k < 200 && !a2; k++) {
                        if (a2 = _bm.get(e - k)) sh = e - k;
                        else if (a2 = _bm.get(e + k)) sh = e + k
                    }
            } else {
                let m = n[e];
                m && m.complete && 0 !== m.naturalWidth && (a2 = m, sh = e)
            }
            if (a2 && sh !== _shown) {
                _shown = sh;
                t.clearRect(0, 0, i.width / E, i.height / E);
                let o2, l2, h2, p2, W2 = a2.width || a2.naturalWidth,
                    H2 = a2.height || a2.naturalHeight,
                    c = W2 / H2;
                if (_desk) {
                    let t2 = i.height / E,
                        e2 = i.width / E;
                    l2 = t2, o2 = c * l2, h2 = Math.round((e2 - o2) / 2), p2 = 0
                } else {
                    let t2 = i.height / E,
                        e2 = i.width / E;
                    l2 = .8 * t2, o2 = c * l2, h2 = Math.round((e2 - o2) / 2), p2 = Math.round(t2 - l2)
                }
                t.drawImage(a2, Math.round(h2), Math.round(p2), Math.round(o2), Math.round(l2))
            }
            _ensure(e)
        }
        // tiny QA hook: lets tests measure how far the canvas trails the scrub
        i.__seq = {
            get req() { return _last },
            get shown() { return _shown },
            get cached() { return _bm.size },
            get want() { return _want.size },
            get inflight() { return _inflight },
            get ndec() { return _ndec },
            get dir() { return _dir }
        };
        let P = t.querySelector("[data-sequence-stage]");

        function T() {
            let t = P.getBoundingClientRect(),
                e = Math.round(t.width),
                r = Math.round(t.height),
                w2 = Math.round(e * E),
                h2 = Math.round(r * E);
            // Mobile browsers fire resize every time the URL bar collapses —
            // but the sticky stage is 100lvh so its size DOESN'T change.
            // Bail out unless the device-pixel size really differs: assigning
            // canvas.width (even the same value) CLEARS the canvas, and the
            // old unconditional path then flushed the whole bitmap cache →
            // blank can + decode burst on every scroll-direction change.
            if (i.width === w2 && i.height === h2) return !1;
            i.style.width = e + "px", i.style.height = r + "px", i.width = w2, i.height = h2;
            let s = i.getContext("2d");
            s.setTransform(1, 0, 0, 1, 0, 0), s.scale(E, E), s.imageSmoothingEnabled = !0, s.imageSmoothingQuality = "high";
            return !0
        }
        T(), fo(() => {
            // only when the canvas size truly changed → bitmaps are the wrong
            // resolution → flush and re-decode the window at the new size
            T() && (_flush(), x(!0))
        })
    }

    function go() {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        let t = gsap.utils.clamp(-1080, 1080),
            e = gsap.utils.clamp(-60, 60);
        document.querySelectorAll("[data-inertia]").forEach(i => {
            let r = 0,
                s = 0,
                a = 0,
                n = 0,
                o = null;
            i.addEventListener("mousemove", t => {
                o || (o = requestAnimationFrame(() => {
                    a = t.clientX - r, n = t.clientY - s, r = t.clientX, s = t.clientY, o = null
                }))
            }), i.querySelectorAll("[data-inertia-item]").forEach(i => {
                i.addEventListener("mouseenter", r => {
                    let s = i.querySelector("[data-inertia-item-child]");
                    if (!s) return;
                    let {
                        left: o,
                        top: l,
                        width: h,
                        height: p
                    } = s.getBoundingClientRect(), c = o + h / 2, d = l + p / 2, u = r.clientX - c, f = r.clientY - d, m = (u * n - f * a) / (Math.hypot(u, f) || 1), g = t(30 * a), y = t(30 * n), v = e(15 * m);
                    gsap.to(s, {
                        inertia: {
                            x: {
                                velocity: g,
                                end: 0
                            },
                            y: {
                                velocity: y,
                                end: 0
                            },
                            rotation: {
                                velocity: v,
                                end: 0
                            },
                            resistance: 180
                        }
                    })
                })
            })
        })
    }

    function yo() {
        let t = document.querySelector("[data-load-nav]"),
            e = document.querySelector("[data-load-stage]"),
            i = e.querySelector("[data-load-stage-logo]"),
            r = e.querySelector("[data-load-stage-logo-lottie]"),
            s = e.querySelector("[data-load-stage-cta]"),
            a = e.querySelector("[data-load-stage-title]"),
            n = e.querySelector("[data-load-stage-text]"),
            o = e.querySelector("[data-load-stage-underline]"),
            l = e.querySelectorAll("[data-load-stage-fact]"),
            h = e.querySelector("[data-load-stage-visual]"),
            p = e.querySelector("[data-load-stage-canvas]"),
            c = e.querySelector("[data-load-stage-deco-text]"),
            d = e.querySelector("[data-load-stage-deco-arrow]"),
            u = e.querySelector("[data-load-stage-svg] path"),
            f = i.getBoundingClientRect(),
            m = window.innerHeight / 2 - (f.top + f.height / 2),
            g = (document.documentElement, SplitText.create(a, {
                type: "lines",
                linesClass: "split-line"
            })),
            y = SplitText.create(n, {
                type: "lines",
                linesClass: "split-line"
            }),
            v = p.getContext("2d", {
                alpha: !0
            }),
            // DPR capped at 2 like the sequence canvas: the source frames are
            // 733px wide, so a dpr-3 canvas (2199×2733 = 6 MP, redrawn by the
            // idle loop) only upscaled further with zero visible gain — it was
            // a permanent 60fps GPU/CPU burn on the landing screen.
            b = Math.min(Math.max(1, window.devicePixelRatio || 1), 2),
            S = p.dataset.loadStageCanvasImgPath,
            // Only frames 1–23 are ever drawn: the intro tweens frame 0→22 and
            // the idle loop yoyos 22↔0. Frames 24–90 were downloaded (~3.4 MB)
            // and pinned as decoded bitmaps (~180 MB) for NOTHING. The files
            // stay on disk untouched — we simply stop loading the unused ones.
            w = Array.from({
                length: 23
            }, (t, e) => `${S}hypeBamVideo00${e + 1}.webp`),
            E = [],
            x = !1;

        function P(t) {
            return Ot(this, null, function* () {
                let e = yield (yield fetch(t)).blob();
                if (window.createImageBitmap) return yield createImageBitmap(e, {
                    imageOrientation: "from-image"
                }); {
                    let t = new Image;
                    return t.src = URL.createObjectURL(e), t.decode && (yield t.decode()), t
                }
            })
        }

        let _lastHero = -1;

        function T(t) {
            if (!x) return;
            // the yoyo tween only changes the ACTUAL frame ~16×/s but its
            // onUpdate fires every tick — skip the 3-in-4 redraws that would
            // repaint the identical frame
            if (t === _lastHero) return;
            let e = E[t];
            if (!e) return;
            _lastHero = t;
            v.clearRect(0, 0, p.width, p.height);
            let i = e.width,
                r = e.height,
                s = p.width / i / b,
                a = i * s,
                n = r * s,
                o = (p.width / b - a) / 2,
                l = (p.height / b - n) / 2;
            v.save();
            v.translate(o + a / 2, l + n / 2);
            v.drawImage(e, -a / 2, -n / 2, a, n);
            v.restore();
        }
        we(() => {
            kt.stop();
            let e = gsap.timeline();
            Ot(this, null, function* () {
                let a = yield P(w[0]);
                p.width = a.width * b, p.height = a.height * b, v.setTransform(b, 0, 0, b, 0, 0), E = [a, ...yield Promise.all(w.slice(1).map(P))], x = !0, document.documentElement.classList.add("has-seq-ready"), setTimeout(() => {
                    requestAnimationFrame(() => {
                        document.documentElement.classList.add(Ps)
                    })
                }, 50);
                let n = {
                    frame: 0
                };
                r.play(), T(0), gsap.set(i, {
                    y: m
                }), gsap.set(t, {
                    opacity: 0
                }), gsap.set(s, {
                    opacity: 0,
                    y: 60
                }), gsap.set(u, {
                    drawSVG: "50% 50%"
                }), gsap.set(l, {
                    opacity: 0,
                    y: 100,
                    x: -40,
                    rotate: -35,
                    scale: .6
                });
                let f = gsap.fromTo(n, {
                    frame: 22
                }, {
                    frame: 0,
                    snap: "frame",
                    ease: "sine.inOut",
                    yoyo: !0,
                    repeat: -1,
                    duration: 1.38,
                    paused: !0,
                    onUpdate: () => T(Math.round(n.frame)),
                    immediateRender: !1
                }),
                    S = gsap.fromTo(p, {
                        yPercent: -1,
                        rotate: -11,
                        rotateX: 0,
                        rotateY: 0
                    }, {
                        yPercent: 2,
                        rotate: -13,
                        rotateX: -4,
                        rotateY: -5,
                        duration: 1.38,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: !0,
                        paused: !0
                    });
                gsap.set(p, {
                    yPercent: 100,
                    xPercent: -50,
                    rotate: -35,
                    scale: .9,
                    opacity: 0,
                    transformPerspective: 1e3,
                    transformOrigin: "60% 50%"
                }), gsap.set(c, {
                    opacity: 0,
                    rotate: -18,
                    scale: 1.25,
                    yPercent: -65,
                    xPercent: -25
                }), gsap.set(d, {
                    opacity: 0,
                    rotate: -6,
                    scale: 1.25,
                    yPercent: 0,
                    xPercent: -125
                }), gsap.set(g.lines, {
                    transformOrigin: "100% 100%",
                    yPercent: 60,
                    xPercent: 25,
                    opacity: 0,
                    scale: .6
                }), gsap.set(y.lines, {
                    yPercent: 125,
                    opacity: 0
                }), gsap.set(o, {
                    opacity: 0,
                    yPercent: 45
                }), e.to(i, {
                    y: 0,
                    duration: .6,
                    delay: 1
                }).to(t, {
                    opacity: 1,
                    duration: .25
                }, "<+=.125").to(s, {
                    y: 0,
                    opacity: 1,
                    duration: .5
                }, "<+=.05").to(u, {
                    drawSVG: "150% 50%",
                    ease: "power2.out",
                    duration: 1.4
                }, "<+=.005").to(l, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    scale: 1,
                    ease: "elastic-ease-out",
                    duration: .8,
                    stagger: -.048
                }, "<-=.015").to(c, {
                    yPercent: 0,
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: -7,
                    duration: .45
                }, "<-=.015").to(d, {
                    yPercent: 10,
                    opacity: 1,
                    rotate: 9,
                    scale: 1,
                    xPercent: 0,
                    duration: .45
                }, "<+=.005").to(p, {
                    yPercent: -1,
                    xPercent: 0,
                    rotate: -11,
                    scale: 1,
                    opacity: 1,
                    duration: .85,
                    onComplete: () => {
                        ScrollTrigger.create({
                            trigger: h,
                            start: "top bottom",
                            end: "bottom top",
                            onEnter: () => {
                                S.play(), f.play()
                            },
                            onEnterBack: () => {
                                S.play(), f.play()
                            },
                            onLeave: () => {
                                S.pause(), f.pause()
                            },
                            onLeaveBack: () => {
                                S.pause(), f.pause()
                            }
                        })
                    }
                }, "<-=.005").to(n, {
                    frame: 22,
                    duration: .85,
                    ease: "sine.out",
                    snap: "frame",
                    onUpdate: () => T(Math.round(n.frame))
                }, "<-=.005").to(g.lines, {
                    yPercent: 0,
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    ease: "elastic-ease-out-soft",
                    duration: .95,
                    stagger: .039
                }, "<-=.005").to(y.lines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: .5,
                    stagger: .039
                }, "<+=.01").to(o, {
                    yPercent: 0,
                    opacity: 1,
                    duration: .45
                }, "<+=.15"), e.call(() => {
                    kt.start()
                }, null, "-=1")
            })
        }), ri(() => {
            kt.stop();
            let e = gsap.timeline();
            Ot(this, null, function* () {
                let a = yield P(w[0]);
                p.width = a.width * b, p.height = a.height * b, v.setTransform(b, 0, 0, b, 0, 0), E = [a, ...yield Promise.all(w.slice(1).map(P))], x = !0, document.documentElement.classList.add("has-seq-ready"), setTimeout(() => {
                    requestAnimationFrame(() => {
                        document.documentElement.classList.add(Ps)
                    })
                }, 50);
                let n = {
                    frame: 0
                };
                r.play(), T(0);
                let o = gsap.fromTo(n, {
                    frame: 22
                }, {
                    frame: 0,
                    snap: "frame",
                    ease: "sine.inOut",
                    yoyo: !0,
                    repeat: -1,
                    duration: 1.38,
                    paused: !0,
                    onUpdate: () => T(Math.round(n.frame)),
                    immediateRender: !1
                }),
                    f = gsap.fromTo(p, {
                        yPercent: -1,
                        rotate: -11
                    }, {
                        yPercent: 1,
                        rotate: -13,
                        duration: 1.38,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: !0,
                        paused: !0
                    });
                r.play(), gsap.set(i, {
                    y: m
                }), gsap.set(t, {
                    opacity: 0
                }), gsap.set(s, {
                    opacity: 0,
                    y: 60
                }), gsap.set(u, {
                    drawSVG: "50% 50%"
                }), gsap.set(l, {
                    opacity: 0,
                    y: 100,
                    x: -40,
                    rotate: -35,
                    scale: .6
                }), gsap.set(p, {
                    yPercent: 150,
                    xPercent: -50,
                    rotate: -35,
                    scale: 1.1,
                    opacity: 0
                }), gsap.set(c, {
                    rotate: -7
                }), gsap.set(d, {
                    rotate: -105,
                    yPercent: -40
                }), e.to(i, {
                    y: 0,
                    duration: .6,
                    delay: 1
                }).to(t, {
                    opacity: 1,
                    duration: .25
                }, "<+=.125").to(s, {
                    y: 0,
                    opacity: 1,
                    duration: .5
                }, "<+=.05").to(u, {
                    drawSVG: "150% 50%",
                    ease: "power2.out",
                    duration: 1.4
                }, "<+=.005").to(l, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    scale: 1,
                    ease: "elastic-ease-out",
                    duration: .8,
                    stagger: -.048
                }, "<-=.015").to(p, {
                    yPercent: -1,
                    xPercent: 0,
                    rotate: -11,
                    scale: 1,
                    opacity: 1,
                    duration: .85,
                    onComplete: () => {
                        ScrollTrigger.create({
                            trigger: h,
                            start: "top bottom",
                            end: "bottom top",
                            onEnter: () => {
                                f.play(), o.play()
                            },
                            onEnterBack: () => {
                                f.play(), o.play()
                            },
                            onLeave: () => {
                                f.pause(), o.pause()
                            },
                            onLeaveBack: () => {
                                f.pause(), o.pause()
                            }
                        })
                    }
                }, "<-=.005").to(n, {
                    frame: 22,
                    duration: .85,
                    ease: "sine.out",
                    snap: "frame",
                    onUpdate: () => T(Math.round(n.frame))
                }, "<-=.005"), e.call(() => {
                    kt.start()
                }, null, "-=1.25")
            })
        })
    }

    function vo() {
        document.querySelectorAll("[data-marquee]").forEach(t => {
            let e = t.querySelector("[data-marquee-svg] textPath");
            gsap.timeline({
                scrollTrigger: {
                    trigger: t,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: !0
                }
            }).fromTo(e, {
                attr: {
                    startOffset: "-30%"
                }
            }, {
                attr: {
                    startOffset: "-60%"
                },
                ease: "none",
                duration: 1
            })
        })
    }

    function bo() {
        document.querySelectorAll("[data-smiley]").forEach(t => {
            let e = gsap.timeline({
                scrollTrigger: {
                    trigger: t,
                    start: "top 95%"
                }
            });
            we(() => {
                e.fromTo(t, {
                    opacity: 0,
                    scale: .5,
                    rotate: 80,
                    transformOrigin: "left bottom"
                }, {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    ease: "elastic-ease-out",
                    duration: .95
                })
            })
        })
    }

    function So() {
        document.querySelectorAll("[data-highlight-text]").forEach(t => {
            let e = SplitText.create(t, {
                type: "words",
                wordsClass: "split-word"
            });
            we(() => {
                let i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top 96%",
                        once: !0
                    }
                });
                gsap.set(e.words, {
                    transformOrigin: "bottom right"
                }), i.fromTo(e.words, {
                    yPercent: 25,
                    xPercent: 75,
                    opacity: 0,
                    scale: .6
                }, {
                    yPercent: 0,
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    ease: "elastic-ease-out-soft",
                    duration: 1,
                    stagger: .039
                }).to(e.words, {
                    color: "var(--light-green)",
                    ease: "none",
                    duration: .15,
                    stagger: .039
                }, "<+.1")
            }), ri(() => {
                let i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top 90%",
                        once: !0
                    }
                });
                gsap.set(e.words, {
                    transformOrigin: "center center"
                }), i.to(e.words, {
                    color: "var(--light-green)",
                    ease: "none",
                    duration: .15,
                    stagger: .039
                })
            })
        })
    }

    function Eo() {
        document.querySelectorAll("[data-fill-line]").forEach(t => {
            let e = t.querySelector("path"),
                i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top 70%",
                        once: !0
                    }
                });
            we(() => {
                i.fromTo(e, {
                    drawSVG: "0% 0%"
                }, {
                    drawSVG: "100% 0%",
                    ease: "none",
                    duration: .75
                })
            })
        })
    }

    function xo() {
        document.querySelectorAll("[data-benefit-table]").forEach(t => {
            let e = t.querySelectorAll("[data-benefit-table-line]"),
                i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top 90%",
                        once: !0
                    }
                });
            we(() => {
                gsap.set(e, {
                    transformOrigin: "left center"
                }), i.fromTo(e, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    stagger: .076,
                    duration: .85
                })
            })
        })
    }

    function Po() {
        document.querySelectorAll("[data-benefit-table-check]").forEach(t => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: t,
                    start: "top 49%",
                    end: "bottom 51%",
                    toggleActions: "restart none restart none"
                }
            }).to(t, {
                keyframes: {
                    "0%": {
                        scaleX: 1,
                        yPercent: 0,
                        rotate: 0
                    },
                    "20%": {
                        scaleX: .65,
                        yPercent: 25,
                        rotate: 25,
                        ease: "power2.in"
                    },
                    "100%": {
                        scaleX: 1,
                        yPercent: 0,
                        rotate: 0,
                        ease: "elastic.out(1,0.4)"
                    }
                },
                duration: .85
            })
        })
    }

    function To() {
        document.querySelectorAll("[data-payment]").forEach(t => {
            let e = t.querySelectorAll("[data-payment-item]"),
                i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top 96%",
                        once: !0
                    }
                });
            we(() => {
                i.fromTo(e, {
                    opacity: 0,
                    y: 100,
                    x: -40,
                    rotate: -35,
                    scale: .6
                }, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    scale: 1,
                    ease: "elastic-ease-out",
                    duration: .8,
                    stagger: -.048
                })
            })
        })
    }
    var si, ai, Cs, ji = class extends nr {
        constructor(t, e) {
            super(t, e), fe(this, ai), O(this, "lspeed", 0), O(this, "onUpdate", ({
                parallaxValues: t,
                speed: e,
                deltaTime: i
            }) => {
                this.lspeed = Vt(this.lspeed, e, 5, i), this.sliderItemInner.forEach((e, i) => e.style.transform = `translateX(${t[i] * Math.abs(this.lspeed) * 20}%)`)
            }), O(this, "onSlideChange", (t, e) => {
                this.items[e].classList.remove("is-active"), this.items[t].classList.add("is-active")
            }), fe(this, si, t => {
                if (this.isVisible) {
                    if (/^[0-9]$/.test(t.key)) {
                        let e = parseInt(t.key);
                        if (this.config.infinite) this.goToIndex(e);
                        else {
                            if (e > this.items.length - 1) return;
                            this.goToIndex(e)
                        }
                        return
                    }
                    switch (t.key) {
                        case "ArrowLeft":
                            this.goToPrev();
                            break;
                        case "ArrowRight":
                        case " ":
                            this.goToNext()
                    }
                }
            }), this.sliderItemInner = [...t.querySelectorAll("[data-slider-item-inner]")], this.onSlideChange(0, 0), gsap.ticker.add(this.update.bind(this)), H(this, ai, Cs).call(this), this.createInterface(document.querySelector("[data-slider-interface]"))
        }
        createInterface(t) {
            [...t.querySelector("[data-slider-arrows]").children].forEach((t, e) => t.onclick = () => 0 === e ? this.goToPrev() : this.goToNext())
        }
    };

    function Co() {
        document.querySelectorAll("[data-testimonial-inview]").forEach(t => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: t,
                    start: "top 75%",
                    once: !0,
                    onEnter: () => {
                        Ni.goToNext()
                    }
                }
            })
        })
    }

    function Mo() {
        document.querySelectorAll("[data-testimonial-parallax]").forEach(t => {
            let e = t.querySelectorAll("[data-testimonial-parallax-item]"),
                i = gsap.timeline({
                    scrollTrigger: {
                        trigger: t,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: !0
                    }
                });
            we(() => {
                i.to(e, {
                    yPercent: 5,
                    ease: "none",
                    duration: 1
                })
            })
        })
    }

    function _o() {
        // Swiper-based flavour slider stub. The Swiper bundle was removed as
        // dead code (the flavour carousel is the custom GSAP coverflow in
        // FlavourSection.tsx). This stub keeps wo()'s call site valid.
        if (document.querySelector("[data-flavour-slider]"))
            console.warn("[app.js] swiper flavour slider markup found but the Swiper bundle was removed; use FlavourSection instead.");
    }

    function Ao() {
        document.querySelectorAll("[data-video]").forEach(t => {
            let e = t.parentElement.parentElement.querySelector("[data-video-button]");
            // play() returns a promise — swallow the AbortError fired when a
            // fast scroll pauses the video before playback actually started.
            let safePlay = () => { let p = t.play(); p && p.catch && p.catch(() => { }) };
            t.pause(), ScrollTrigger.create({
                trigger: t,
                start: "top bottom",
                end: "bottom top",
                onEnter: safePlay,
                onEnterBack: safePlay,
                onLeave: () => t.pause(),
                onLeaveBack: () => t.pause()
            }), e.addEventListener("click", e => {
                var i;
                let r = t.muted,
                    s = e.currentTarget;
                if (t.muted = !r, s.classList.toggle("is-clicked", r), r) {
                    let e = null == (i = t.play) ? void 0 : i.call(t);
                    e && "function" == typeof e.catch && e.catch(() => { })
                }
            })
        })
    }

    function wo() {
        uo(), mo(), go(), vo(), bo(), Eo(), xo(), Po(), To(), Co(), Mo(), _o(), Ao();
        let t = document.querySelector("[data-slider]");
        if (t) {
            // NOTE: the ji constructor already registers this.update on
            // gsap.ticker — the rAF loop that used to live here ran update()
            // a SECOND time every frame (double lerp speed, double writes).
            Ni = new ji(t, {
                infinite: !0,
                snap: !0,
                scrollSensitivity: 1.5,
                speedDecay: .9,
                virtualScroll: {
                    touchMultiplier: 8.5
                }
            })
        } (() => {
            let t = window.matchMedia("(prefers-reduced-motion)");
            t.addEventListener("change", () => {
                window.location.reload()
            }), t.matches
        })(), (() => {
            let t = window.matchMedia("(min-width: 992px)");
            t.addEventListener("change", () => {
                window.location.reload()
            }), t.matches
        })(), (() => {
            let t = window.matchMedia("(orientation: portrait)");
            t.addEventListener("change", () => {
                window.location.reload()
            }), t.matches
        })()
    }

    function ko() {
        yo(), So()
    }
    si = new WeakMap, ai = new WeakSet, Cs = function () {
        window.addEventListener("keydown", ie(this, si))
    };

    function initializeApp() {
        ScrollTrigger.clearScrollMemory("manual");
        history.scrollRestoration && (history.scrollRestoration = "manual");
        wo();
        document.fonts.ready.then(function () {
            document.documentElement.classList.add(ho);
            ko();
        });
    }

    if (document.readyState === "complete") {
        initializeApp();
    } else {
        window.addEventListener("load", initializeApp);
    }
})();
/*! Bundled license information:

@lottiefiles/lottie-player/dist/lottie-player.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/