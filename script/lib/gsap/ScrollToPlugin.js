/*!
 * ScrollToPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports)
		: "function" == typeof define && define.amd
		? define(["exports"], t)
		: t(((e = e || self).window = e.window || {}));
})(this, function (e) {
	"use strict";
	function l() {
		return "undefined" != typeof window;
	}
	function m() {
		return f || (l() && (f = window.gsap) && f.registerPlugin && f);
	}
	function n(e) {
		return "string" == typeof e;
	}
	function o(e) {
		return "function" == typeof e;
	}
	function p(e, t) {
		var o = "x" === t ? "Width" : "Height",
			n = "scroll" + o,
			r = "client" + o;
		return e === T || e === i || e === c ? Math.max(i[n], c[n]) - (T["inner" + o] || i[r] || c[r]) : e[n] - e["offset" + o];
	}
	function q(e, t) {
		var o = "scroll" + ("x" === t ? "Left" : "Top");
		return (
			e === T && (null != e.pageXOffset ? (o = "page" + t.toUpperCase() + "Offset") : (e = null != i[o] ? i : c)),
			function () {
				return e[o];
			}
		);
	}
	function s(e, t) {
		if (!(e = y(e)[0]) || !e.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || { x: 0, y: 0 };
		var o = e.getBoundingClientRect(),
			n = !t || t === T || t === c,
			r = n
				? { top: i.clientTop - (T.pageYOffset || i.scrollTop || c.scrollTop || 0), left: i.clientLeft - (T.pageXOffset || i.scrollLeft || c.scrollLeft || 0) }
				: t.getBoundingClientRect(),
			l = { x: o.left - r.left, y: o.top - r.top };
		return !n && t && ((l.x += q(t, "x")()), (l.y += q(t, "y")())), l;
	}
	function t(e, t, o, r, l) {
		return isNaN(e) || "object" == typeof e
			? n(e) && "=" === e.charAt(1)
				? parseFloat(e.substr(2)) * ("-" === e.charAt(0) ? -1 : 1) + r - l
				: "max" === e
				? p(t, o) - l
				: Math.min(p(t, o), s(e, t)[o] - l)
			: parseFloat(e) - l;
	}
	function u() {
		(f = m()),
			l() &&
				f &&
				"undefined" != typeof document &&
				document.body &&
				((T = window),
				(c = document.body),
				(i = document.documentElement),
				(y = f.utils.toArray),
				f.config({ autoKillThreshold: 7 }),
				(h = f.config()),
				(a = 1));
	}
	var f,
		a,
		T,
		i,
		c,
		y,
		h,
		v,
		r = {
			version: "3.12.5",
			name: "scrollTo",
			rawVars: 1,
			register: function register(e) {
				(f = e), u();
			},
			init: function init(e, r, l, s, i) {
				a || u();
				var p = this,
					c = f.getProperty(e, "scrollSnapType");
				(p.isWin = e === T),
					(p.target = e),
					(p.tween = l),
					(r = (function _clean(e, t, r, l) {
						if ((o(e) && (e = e(t, r, l)), "object" != typeof e)) return n(e) && "max" !== e && "=" !== e.charAt(1) ? { x: e, y: e } : { y: e };
						if (e.nodeType) return { y: e, x: e };
						var s,
							i = {};
						for (s in e) i[s] = "onAutoKill" !== s && o(e[s]) ? e[s](t, r, l) : e[s];
						return i;
					})(r, s, e, i)),
					(p.vars = r),
					(p.autoKill = !!r.autoKill),
					(p.getX = q(e, "x")),
					(p.getY = q(e, "y")),
					(p.x = p.xPrev = p.getX()),
					(p.y = p.yPrev = p.getY()),
					(v = v || f.core.globals().ScrollTrigger),
					"smooth" === f.getProperty(e, "scrollBehavior") && f.set(e, { scrollBehavior: "auto" }),
					c && "none" !== c && ((p.snap = 1), (p.snapInline = e.style.scrollSnapType), (e.style.scrollSnapType = "none")),
					null != r.x ? (p.add(p, "x", p.x, t(r.x, e, "x", p.x, r.offsetX || 0), s, i), p._props.push("scrollTo_x")) : (p.skipX = 1),
					null != r.y ? (p.add(p, "y", p.y, t(r.y, e, "y", p.y, r.offsetY || 0), s, i), p._props.push("scrollTo_y")) : (p.skipY = 1);
			},
			render: function render(e, t) {
				for (var o, n, r, l, s, i = t._pt, c = t.target, u = t.tween, f = t.autoKill, a = t.xPrev, y = t.yPrev, d = t.isWin, g = t.snap, x = t.snapInline; i; )
					i.r(e, i.d), (i = i._next);
				(o = d || !t.skipX ? t.getX() : a),
					(r = (n = d || !t.skipY ? t.getY() : y) - y),
					(l = o - a),
					(s = h.autoKillThreshold),
					t.x < 0 && (t.x = 0),
					t.y < 0 && (t.y = 0),
					f &&
						(!t.skipX && (s < l || l < -s) && o < p(c, "x") && (t.skipX = 1),
						!t.skipY && (s < r || r < -s) && n < p(c, "y") && (t.skipY = 1),
						t.skipX && t.skipY && (u.kill(), t.vars.onAutoKill && t.vars.onAutoKill.apply(u, t.vars.onAutoKillParams || []))),
					d ? T.scrollTo(t.skipX ? o : t.x, t.skipY ? n : t.y) : (t.skipY || (c.scrollTop = t.y), t.skipX || (c.scrollLeft = t.x)),
					!g ||
						(1 !== e && 0 !== e) ||
						((n = c.scrollTop),
						(o = c.scrollLeft),
						x ? (c.style.scrollSnapType = x) : c.style.removeProperty("scroll-snap-type"),
						(c.scrollTop = n + 1),
						(c.scrollLeft = o + 1),
						(c.scrollTop = n),
						(c.scrollLeft = o)),
					(t.xPrev = t.x),
					(t.yPrev = t.y),
					v && v.update();
			},
			kill: function kill(e) {
				var t = "scrollTo" === e,
					o = this._props.indexOf(e);
				return (
					(!t && "scrollTo_x" !== e) || (this.skipX = 1),
					(!t && "scrollTo_y" !== e) || (this.skipY = 1),
					-1 < o && this._props.splice(o, 1),
					!this._props.length
				);
			},
		};
	(r.max = p), (r.getOffset = s), (r.buildGetter = q), m() && f.registerPlugin(r), (e.ScrollToPlugin = r), (e.default = r);
	if (typeof window === "undefined" || window !== e) {
		Object.defineProperty(e, "__esModule", { value: !0 });
	} else {
		delete e.default;
	}
});
