function saveCookie(n, t, i, r) {
    var u = new Date(),
        f;
    u.setTime(u.getTime());
    i && (i = i * 864e5);
    f = new Date(u.getTime() + i);
    document.cookie = n + "=" + escape(t) + (i ? ";expires=" + f.toUTCString() : "") + ";path=" + r + ";samesite=lax";
}
function getCookie(n) {
    var i = document.cookie.indexOf(n + "="),
        r = i + n.length + 1,
        t;
    return !i && n != document.cookie.substring(0, n.length) ? null : i == -1 ? null : ((t = document.cookie.indexOf(";", r)), t == -1 && (t = document.cookie.length), unescape(document.cookie.substring(r, t)));
}
function readCookie(n) {
    var t = RegExp("" + n + "[^;]+").exec(document.cookie);
    return decodeURIComponent(!t ? "" : t.toString().replace(/^[^=]+./, ""));
}
function deleteCookie(n) {
    document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function queryString(n) {
    if (((hu = window.location.search.substring(1)), (r = ""), hu != "")) {
        for (gy = hu.split("&"), i = 0; i < gy.length; i++) (ft = gy[i].split("=")), ft[0] == n && (r = ft[1]);
        return r;
    }
    return "";
}
function parseQueryString(n, t) {
    if (((r = ""), n != "")) {
        for (gy = n.split("&"), i = 0; i < gy.length; i++) (ft = gy[i].split("=")), ft[0] == t && (r = ft[1]);
        return r;
    }
    return "";
}
function queryStringMvc(n) {
    var i = new RegExp("\\/" + n + "\\.(.+?)\\/", "i"),
        t = i.exec(window.location.href);
    return t ? t[1] : "";
}
function regExMatch(n, t, i) {
    var r = n.exec(t);
    return r ? r[i] : "";
}
function getFormVal(n) {
    var t = encodeURIComponent($.trim($("#" + n).val()));
    return t == "undefined" ? "" : t;
}
function getCurrentUrl(n) {
    if (arguments.length > 0 && n) return window.location.pathname;
    var i = window.location,
        t = window.location.port;
    return i.protocol + "//" + i.hostname + (t != "" && t != "80" && t != "443" ? ":" + t : "") + i.pathname;
}
function getCheckVal(n) {
    var t = $("#" + n);
    return t.is(":checked") ? encodeURIComponent(t.val()) : "";
}
function getCheckValGroup(n) {
    var t = "";
    return (
        $("input[name='" + n + "']:checked").each(function () {
            t += t ? "," + $(this).val() : $(this).val();
        }),
        t
    );
}
function getRadioVal(n) {
    return encodeURIComponent($("input[name='" + n + "']:checked").val());
}
function disableButton(n, t) {
    var i = $("#" + n);
    i.attr("data-orig-text", i.html());
    i.html(t);
    i.attr("disabled", "disabled").addClass("disabled");
}
function reenableButton(n) {
    var t = $("#" + n);
    t.html(t.attr("data-orig-text"));
    t.removeAttr("data-orig-text").removeAttr("disabled").removeClass("disabled");
}
function getSecToken() {
    return encodeURIComponent($("input[name=__RequestVerificationToken]").val());
}
function getSecTokenRaw() {
    return $("input[name=__RequestVerificationToken]").val();
}
function serializeSecToken(n) {
    return n == !0 ? "__RequestVerificationToken=" + getSecToken() : "&__RequestVerificationToken=" + getSecToken();
}
function handleResponseError(n) {
    isAdmin = window.location.toString().indexOf("/admin") > -1 ? !0 : !1;
    n.errType ? (window.location = (isAdmin ? "/admin" : "") + "/error/?err=" + n.errType) : n.redirect && (window.location = n.redirect);
}
function formObj() {
    this.onStart = function () {
        disableButton(this.button, this.disabledText);
    };
    this.reenableForm = function () {
        reenableButton(this.button);
    };
    this.clearFields = function () {
        $("#" + this.button)
            .closest("form")
            .find("input")
            .each(function () {
                var n = $(this),
                    t;
                n.val("");
                n.attr("type") == "password" && ((t = $("#" + n.attr("id") + "-temp")), t.length > 0 && (n.hide(), t.show()));
            });
    };
    this.onSuccess = function () {
        var n = this.resp;
        return (
            n.errType ? (window.location = (this.isAdmin ? "/admin" : "") + "/error/?err=" + n.errType) : n.redirect ? (window.location = n.redirect) : this.callback(n),
            n.IsValid ? (this.formRedirects || this.reenableForm(), unhideCode(this.button), (!n.Data || (n.Data && !n.Data.overrideReset == !0)) && resetAction(this.button)) : this.reenableForm(),
            !1
        );
    };
    this.initForm = function (n) {
        var t = this;
        $("#" + t.button).click(function () {
            if ((!$(this).is(":visible") && t.checkButtonVisibility) || (n && !confirm(n))) return !1;
            try {
                return (
                    removeFeedback(),
                    t.onStart(),
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        url: t.service,
                        data: t.data() + serializeSecToken(),
                        timeout: t.timeout,
                        success: function (n) {
                            t.resp = n;
                            t.onSuccess();
                        },
                        error: function () {
                            alert("An error occurred");
                            t.reenableForm();
                        },
                    }),
                    !1
                );
            } catch (i) {
                return t.reenableForm(), !1;
            }
        });
    };
}
function showPopover(n, t, i, r) {
    var u = $("#" + n),
        f,
        o,
        e;
    i && !u.is(":visible") && (u = $("#" + i));
    r && !u.is(":visible") && (u = $("#" + r));
    f = u.data("popover");
    f
        ? (f.$tip.find(".content p").html(t), f.$tip.show())
        : (u.popover({ content: t, trigger: "manual" }), u.popover("show"), window.pageYOffset > 0 && ((o = u.data("popover").$tip), (e = parseInt(o.css("top").replace("px", ""))), (e = e - window.pageYOffset), o.css("top", e + "px")));
}
function showAlert(n, t, i, r) {
    i || (i = "alert-error");
    t || (t = "fa fa-times-circle fa-spacer");
    r || (r = "alert");
    $("#" + r).after('<div class="alert ' + i + '"><i class="' + t + '"></i>&nbsp;' + n + "</div>");
    window.location = "#";
}
function showValidationError(n, t, i) {
    var r, u, f;
    arguments.length === 3 ? ((u = $("#" + i + "")), (r = u.find("#" + n + ""))) : (r = $("#" + n + ""));
    document.location.href.indexOf("/admin/") > -1
        ? (r.closest(".control-group").addClass("error"), t && (r.after('<span class="help-inline">' + t + "</span>"), (f = r.closest(".controls")), f.children(".code").hide()))
        : (r.closest(".form-group").addClass("has-error"),
          r.is("input") &&
              (r.is("input[type=hidden],input[type=checkbox]") ||
                  (r.closest(".form-group").length && (r.closest(".form-group").addClass("has-feedback"), r.after('<span class="far fa-times form-control-feedback" aria-hidden="true"></span>')))));
}
function hideValidationError(n) {
    var t = $("#" + n + "");
    document.location.href.indexOf("/admin/") > -1 && (t.closest(".control-group").removeClass("error"), t.next(".help-inline").remove(), t.closest(".controls").children(".code").show());
}
function showValidationErrorField(n) {
    var t = $("#" + n + "");
    t.addClass("error");
}
function showUploaderValidationError(n) {
    var t = $(".uploadify-button-text");
    t.text(n);
    t.css("color", "#B94A48");
    t.closest(".control-group").addClass("error");
}
function showEditorValidationError(n, t) {
    t || (t = $(".redactor_box"));
    t.css("border", "1px solid #B94A48");
    t.closest(".control-group").addClass("error");
    n && t.after('<span class="help-inline">' + n + "</span>");
}
function unhideCode(n) {
    $("#" + n)
        .closest("form")
        .find(".code")
        .show();
}
function resetAction(n) {
    $("#" + n)
        .closest("form")
        .find("input[id$='action']")
        .val("edit");
}
function removeFeedback() {
    $(".uploadify-button-text").css("color", "#333333");
    $(".redactor_box").css("border", "1px solid #DDDDDD");
    $(".error").removeClass("error");
    $(".has-error").removeClass("has-error");
    $(".has-feedback").removeClass("has-feedback");
    $(".form-control-feedback").remove();
    $(".help-inline:not([class*='no-clear'])").remove();
    $(".help-block:not([class*='no-clear'])").remove();
    $(".alert:not([class*='no-clear'])").hide();
}
function getSafeHtml(n) {
    var t = $("#" + n).val();
    return (t = encodeURIComponent(t)), t.replace(/%/g, "~");
}
function convertSafeHtml(n) {
    return (n = encodeURIComponent(n)), n.replace(/%/g, "~");
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function trim(n, t) {
    while (n.substring(0, 1) == t) n = n.substring(1);
    while (n.substring(n.length - 1) == t) n = n.substring(0, n.length - 1);
    return n;
}
function isHTML5UploadEnabled() {
    return typeof window.FormData != "undefined";
}
function initUpload(n, t, i) {
    var r = n ? $(n) : $(".file-upload");
    r.length > 0 &&
        r.each(function (n, r) {
            function ft() {
                var n;
                return (
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        async: !1,
                        url: "/ws/file/upload-token/",
                        data: serializeSecToken(),
                        success: function (t) {
                            t.Ok ? (n = t.token) : handleResponseError(t);
                        },
                        error: function () {
                            alert("An error occurred");
                        },
                    }),
                    n
                );
            }
            function s(n) {
                if ((nt++, p)) {
                    var t = Math.random().toString(36).substring(2);
                    v.append('<div id="Err_' + t + '" class="alert alert-error" style="margin-bottom: 5px; line-height: 150%">' + n + "</div>");
                    setTimeout(function () {
                        v.find("#Err_" + t).fadeOut("fast", function () {
                            $(this).remove();
                        });
                    }, 5e3);
                } else alert(n);
            }
            var u = $(r),
                a = u.attr("id"),
                nt,
                o,
                l;
            a || ((a = "file-upload-" + n), u.attr("id", a));
            var et = u.closest("form"),
                it = u.attr("id") + "-queue",
                v = et.find(".file-upload-queue").attr("id", it),
                p = v.length > 0 ? !0 : !1,
                k = u.attr("id") + "-thumbnail",
                h = u.attr("id") + "-file",
                e = $("#" + k).length ? $("#" + k) : u.parent().find(".file-upload-thumbnail").attr("id", k),
                rt = e.length > 0 ? !0 : !1,
                w = u.attr("data-size-limit"),
                d = parseInt(u.attr("data-file-limit")),
                b = u.attr("data-button-class"),
                y = u.attr("data-button-text"),
                ut = u.attr("data-uploader-path"),
                ot = u.attr("data-filetype-desc"),
                g = u.attr("data-filetype-exts"),
                f = u.attr("data-redirect"),
                st = u.attr("data-no-reenable"),
                c;
            if ((e.length && e.attr("src") == "" && e.hide(), u.hide(), (nt = 0), isHTML5UploadEnabled())) {
                u.after("<label for='" + a + "' class='btn btn-default uploader-btn " + b + "'>" + y + "</label>");
                o = $(".uploader-btn[for='" + a + "']");
                d > 1 && u.attr("multiple", "multiple");
                g && u.attr("accept", g.replace(/\*/g, "").replace(/\;/g, ","));
                l = function () {
                    var n = !1;
                    return i && typeof i == "function" && ((n = i()), n || o.removeClass("disabled")), n && (o.text(y), o.addClass("disabled")), n;
                };
                function tt() {
                    o.text(y);
                    l() || o.removeClass("disabled");
                }
                l();
                u.on("change", function (n) {
                    var i, v;
                    if (!l()) {
                        i = n.target.files;
                        o.addClass("disabled");
                        o.text("Uploading...");
                        var y = 0,
                            r = 0,
                            a = 0;
                        $.each(i, function (n, f) {
                            var o, v, p;
                            l() ||
                                ((o = i[y++]),
                                (v = new FormData()),
                                w === "" || o.size < w * 1048576
                                    ? ((p = ft(function () {})),
                                      v.append("token", p),
                                      v.append("fileId", h),
                                      v.append("Filename", o.name),
                                      v.append("Filedata", f),
                                      a++,
                                      $.ajax({
                                          url: ut,
                                          enctype: "multipart/form-data",
                                          type: "POST",
                                          data: v,
                                          cache: !1,
                                          processData: !1,
                                          contentType: !1,
                                          success: function (n) {
                                              typeof n.error == "undefined"
                                                  ? (t && typeof t == "function"
                                                        ? t(u, o, n)
                                                        : ((c = o.name),
                                                          n === "error"
                                                              ? s("An error occurred processing " + o.name)
                                                              : n === "size-error"
                                                              ? s("Incorrect file size(W X H) used.")
                                                              : rt
                                                              ? (e.attr("src", u.attr("data-thumbnail-url") + n), e.attr("data-filename", n), e.show())
                                                              : h && $("#" + h).data("data-filename", n)),
                                                    l())
                                                  : s("An error occurred processing " + o.name);
                                              r++;
                                          },
                                          error: function () {
                                              s("An error occurred processing " + o.name);
                                          },
                                      }))
                                    : alert(o.name + " Exceeds file size limit " + w + " MB."));
                        });
                        v = setInterval(function () {
                            a === r && (clearInterval(v), f && f !== "" ? (f.indexOf("{lastFile}") > -1 && (f = c ? f.replace("{lastFile}", c) : ""), (window.location = f)) : tt());
                        }, 1e3);
                    }
                });
            } else {
                function tt() {
                    u.uploadify("settings", "buttonText", y);
                    u.uploadify("settings", "buttonClass", b);
                    u.uploadify("disable", !1);
                }
                u.uploadify({
                    buttonClass: b,
                    width: 190,
                    height: 34,
                    buttonText: y,
                    progressData: "percentage",
                    swf: "/js/uploadify.swf",
                    uploader: ut,
                    queueID: p ? it : !1,
                    auto: !0,
                    fileTypeDesc: ot,
                    fileTypeExts: g,
                    queueSizeLimit: d,
                    multi: d > 1 ? !0 : !1,
                    fileSizeLimit: w + "MB",
                    removeTimeout: 1,
                    successTimeout: 180,
                    overrideEvents: ["onDialogClose"],
                    itemTemplate: p
                        ? '<div id="${fileID}" class="alert alert-success" style="margin-bottom: 5px; line-height: 150%"><button type="button" class="close" onclick="$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">&#215;</button><span class="fileName">${fileName} (${fileSize})</span><span class="data"></span></div>'
                        : null,
                    onFallback: function () {
                        s("You need Flash installed to upload files");
                    },
                    onUploadSuccess: function (n, i) {
                        t && typeof t == "function"
                            ? t(u, n, i)
                            : ((c = n.name),
                              i === "error"
                                  ? s("An error occurred processing " + n.name)
                                  : rt
                                  ? (e.attr("src", u.attr("data-thumbnail-url") + i), e.attr("data-filename", i), e.show(), u.trigger("uploaded", i))
                                  : h && ($("#" + h).data("data-filename", i), u.trigger("uploaded", i)));
                    },
                    onUploadStart: function () {
                        var n = !1,
                            t;
                        i && typeof i == "function" && (n = i());
                        n ||
                            ((t = ft()),
                            u.uploadify("settings", "formData", { token: t, fileId: h }),
                            u.uploadify("settings", "buttonText", "Uploading..."),
                            u.uploadify("settings", "buttonClass", b + " disabled"),
                            u.uploadify("disable", !0));
                    },
                    onQueueComplete: function () {
                        st != "true" && tt();
                        i && typeof i == "function" && i() && u.uploadify("disable", !0);
                    },
                    onDialogClose: function (n) {
                        if ((n.filesErrored > 0 && s(n.errorMsg), p && f))
                            var t = setInterval(function () {
                                var n = v.find("div[id^='SWFUpload']").length,
                                    i = v.find("div[id^='Err_']").length;
                                n == 0 && i == 0 && (clearInterval(t), f.indexOf("{lastFile}") > -1 && (f = c ? f.replace("{lastFile}", c) : ""), f != "" && nt == 0 ? (window.location = f) : tt());
                            }, 100);
                        return !1;
                    },
                    onSWFReady: function () {
                        i && typeof i == "function" && i() && u.uploadify("disable", !0);
                    },
                });
            }
        });
}
function getCombinedAlert(n) {
    var t = "",
        i;
    for (i in n.ErrFields) t += (t == "" ? "* " : "\n* ") + n.ErrFields[i].replace(/^\*/, "");
    return t;
}
function isIE() {
    var u,
        t = -1,
        n = window.navigator.userAgent,
        i = n.indexOf("MSIE "),
        f = n.indexOf("Trident/"),
        r;
    return i > 0 ? (t = parseInt(n.substring(i + 5, n.indexOf(".", i)), 10)) : f > 0 && ((r = n.indexOf("rv:")), (t = parseInt(n.substring(r + 3, n.indexOf(".", r)), 10))), t > -1 ? t : u;
}
function parseGoogleAddress(n) {
    var i = n ? n.address_components : null,
        u = n ? (n.partial_match === !0 ? !0 : !1) : !1,
        t,
        r;
    if (
        ((this.address1 = ""),
        (this.address2 = ""),
        (this.city = ""),
        (this.neighborhood = ""),
        (this.state = ""),
        (this.county = ""),
        (this.zip = ""),
        (this.country = ""),
        (this.latitude = ""),
        (this.longitude = ""),
        (this.formatted_address = ""),
        i && u === !1)
    ) {
        for (t = 0; t < i.length; t++)
            (r = i[t].types[0]),
                r === "street_number"
                    ? (this.address1 = i[t].short_name)
                    : r === "route"
                    ? (this.address1 += " " + i[t].short_name)
                    : r === "locality"
                    ? (this.city = i[t].short_name)
                    : r === "administrative_area_level_1"
                    ? (this.state = i[t].short_name)
                    : r === "administrative_area_level_2"
                    ? (this.county = i[t].short_name)
                    : r === "postal_code"
                    ? (this.zip = i[t].short_name)
                    : r === "country"
                    ? ((this.country = i[t].short_name), this.country === "US" && (this.country = "USA"))
                    : r === "subpremise"
                    ? (this.address2 = i[t].short_name)
                    : r === "neighborhood" && (this.neighborhood = i[t].short_name);
        this.formatted_address = n.formatted_address;
        this.latitude = n.geometry.location.lat();
        this.longitude = n.geometry.location.lng();
    }
}
function checkWebNotificationPermission() {
    "Notification" in window && Notification.permission !== "denied" && Notification.requestPermission();
}
function checkIfWebNotificationExists(n) {
    var t = !1;
    return (
        $.lstWebNotification &&
            (t =
                $.lstWebNotification
                    .map(function (n) {
                        return n.id;
                    })
                    .indexOf(n) > -1),
        t
    );
}
function removeWebNotificationFromList(n) {
    if ($.lstWebNotification) {
        var t = $.lstWebNotification
            .map(function (n) {
                return n.id;
            })
            .indexOf(n);
        $.lstWebNotification.splice(t, 1);
    }
}
function closeWebNotification(n) {
    checkIfWebNotificationExists(n) &&
        $.lstWebNotification &&
        $.each(lstWebNotification, function (t, i) {
            i.id == n && i.notification.close();
        });
}
function showWebNotification(n, t, i, r, u, f) {
    function o(n, t, i, r, u) {
        if (((e = !0), !checkIfWebNotificationExists(n))) {
            var o = new Notification(t, { body: i, icon: r, requireInteraction: !0, tag: n });
            u &&
                typeof u == "function" &&
                (o.onclick = function () {
                    u();
                });
            f &&
                setTimeout(function () {
                    o.close();
                }, f);
            $.lstWebNotification || ($.lstWebNotification = []);
            $.lstWebNotification.push({ id: n, notification: o });
            o.onclose = function () {
                removeWebNotificationFromList(n);
            };
        }
    }
    var e = !1;
    return (
        "Notification" in window
            ? Notification.permission === "granted"
                ? o(n, t, i, r, u)
                : Notification.permission !== "denied" &&
                  Notification.requestPermission().then(function (f) {
                      f === "granted" && o(n, t, i, r, u);
                  })
            : (e = !1),
        e
    );
}
function getGoogleMapsAPIKey() {
    var n = "AIzaSyCrbIZfzcbHeyfQ6pYLlrEipI9raqJcF_4";
    return (
        // $.ajax({
        //     type: "POST",
        //     cache: !1,
        //     dataType: "json",
        //     async: !1,
        //     url: "/ws/googlemaps-apikey/",
        //     data: serializeSecToken(),
        //     success: function (t) {
        //         n = t;
        //     },
        // }),
        n
    );
}
function UpdateQueryString(n, t, i) {
    var u, r, f;
    return (
        i || (i = window.location.href),
        (u = new RegExp("([?&])" + n + "=.*?(&|#|$)(.*)", "gi")),
        u.test(i)
            ? typeof t != "undefined" && t !== null
                ? i.replace(u, "$1" + n + "=" + t + "$2$3")
                : ((r = i.split("#")), (i = r[0].replace(u, "$1$3").replace(/(&|\?)$/, "")), typeof r[1] != "undefined" && r[1] !== null && (i += "#" + r[1]), i)
            : typeof t != "undefined" && t !== null
            ? ((f = i.indexOf("?") !== -1 ? "&" : "?"), (r = i.split("#")), (i = r[0] + f + n + "=" + t), typeof r[1] != "undefined" && r[1] !== null && (i += "#" + r[1]), i)
            : i
    );
}
if (
    ((function (n, t) {
        typeof module == "object" && typeof module.exports == "object"
            ? (module.exports = n.document
                  ? t(n, !0)
                  : function (n) {
                        if (!n.document) throw new Error("jQuery requires a window with a document");
                        return t(n);
                    })
            : t(n);
    })(typeof window != "undefined" ? window : this, function (n, t) {
        function ri(n) {
            var t = n.length,
                r = i.type(n);
            return r === "function" || i.isWindow(n) ? !1 : n.nodeType === 1 && t ? !0 : r === "array" || t === 0 || (typeof t == "number" && t > 0 && t - 1 in n);
        }
        function ui(n, t, r) {
            if (i.isFunction(t))
                return i.grep(n, function (n, i) {
                    return !!t.call(n, i, n) !== r;
                });
            if (t.nodeType)
                return i.grep(n, function (n) {
                    return (n === t) !== r;
                });
            if (typeof t == "string") {
                if (re.test(t)) return i.filter(t, n, r);
                t = i.filter(t, n);
            }
            return i.grep(n, function (n) {
                return i.inArray(n, t) >= 0 !== r;
            });
        }
        function hr(n, t) {
            do n = n[t];
            while (n && n.nodeType !== 1);
            return n;
        }
        function ee(n) {
            var t = (fi[n] = {});
            return (
                i.each(n.match(h) || [], function (n, i) {
                    t[i] = !0;
                }),
                t
            );
        }
        function cr() {
            u.addEventListener ? (u.removeEventListener("DOMContentLoaded", a, !1), n.removeEventListener("load", a, !1)) : (u.detachEvent("onreadystatechange", a), n.detachEvent("onload", a));
        }
        function a() {
            (u.addEventListener || event.type === "load" || u.readyState === "complete") && (cr(), i.ready());
        }
        function yr(n, t, r) {
            if (r === undefined && n.nodeType === 1) {
                var u = "data-" + t.replace(vr, "-$1").toLowerCase();
                if (((r = n.getAttribute(u)), typeof r == "string")) {
                    try {
                        r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : ar.test(r) ? i.parseJSON(r) : r;
                    } catch (f) {}
                    i.data(n, t, r);
                } else r = undefined;
            }
            return r;
        }
        function ei(n) {
            var t;
            for (t in n) if ((t !== "data" || !i.isEmptyObject(n[t])) && t !== "toJSON") return !1;
            return !0;
        }
        function pr(n, t, r, u) {
            if (i.acceptData(n)) {
                var s,
                    e,
                    h = i.expando,
                    l = n.nodeType,
                    o = l ? i.cache : n,
                    f = l ? n[h] : n[h] && h;
                if ((f && o[f] && (u || o[f].data)) || r !== undefined || typeof t != "string")
                    return (
                        f || (f = l ? (n[h] = c.pop() || i.guid++) : h),
                        o[f] || (o[f] = l ? {} : { toJSON: i.noop }),
                        (typeof t == "object" || typeof t == "function") && (u ? (o[f] = i.extend(o[f], t)) : (o[f].data = i.extend(o[f].data, t))),
                        (e = o[f]),
                        u || (e.data || (e.data = {}), (e = e.data)),
                        r !== undefined && (e[i.camelCase(t)] = r),
                        typeof t == "string" ? ((s = e[t]), s == null && (s = e[i.camelCase(t)])) : (s = e),
                        s
                    );
            }
        }
        function wr(n, t, u) {
            if (i.acceptData(n)) {
                var e,
                    s,
                    h = n.nodeType,
                    f = h ? i.cache : n,
                    o = h ? n[i.expando] : i.expando;
                if (f[o]) {
                    if (t && ((e = u ? f[o] : f[o].data), e)) {
                        for (i.isArray(t) ? (t = t.concat(i.map(t, i.camelCase))) : (t in e) ? (t = [t]) : ((t = i.camelCase(t)), (t = (t in e) ? [t] : t.split(" "))), s = t.length; s--; ) delete e[t[s]];
                        if (u ? !ei(e) : !i.isEmptyObject(e)) return;
                    }
                    (u || (delete f[o].data, ei(f[o]))) && (h ? i.cleanData([n], !0) : r.deleteExpando || f != f.window ? delete f[o] : (f[o] = null));
                }
            }
        }
        function vt() {
            return !0;
        }
        function it() {
            return !1;
        }
        function dr() {
            try {
                return u.activeElement;
            } catch (n) {}
        }
        function gr(n) {
            var i = nu.split("|"),
                t = n.createDocumentFragment();
            if (t.createElement) while (i.length) t.createElement(i.pop());
            return t;
        }
        function f(n, t) {
            var e,
                u,
                s = 0,
                r = typeof n.getElementsByTagName !== o ? n.getElementsByTagName(t || "*") : typeof n.querySelectorAll !== o ? n.querySelectorAll(t || "*") : undefined;
            if (!r) for (r = [], e = n.childNodes || n; (u = e[s]) != null; s++) !t || i.nodeName(u, t) ? r.push(u) : i.merge(r, f(u, t));
            return t === undefined || (t && i.nodeName(n, t)) ? i.merge([n], r) : r;
        }
        function we(n) {
            oi.test(n.type) && (n.defaultChecked = n.checked);
        }
        function eu(n, t) {
            return i.nodeName(n, "table") && i.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n;
        }
        function ou(n) {
            return (n.type = (i.find.attr(n, "type") !== null) + "/" + n.type), n;
        }
        function su(n) {
            var t = ve.exec(n.type);
            return t ? (n.type = t[1]) : n.removeAttribute("type"), n;
        }
        function li(n, t) {
            for (var u, r = 0; (u = n[r]) != null; r++) i._data(u, "globalEval", !t || i._data(t[r], "globalEval"));
        }
        function hu(n, t) {
            if (t.nodeType === 1 && i.hasData(n)) {
                var u,
                    f,
                    o,
                    s = i._data(n),
                    r = i._data(t, s),
                    e = s.events;
                if (e) {
                    delete r.handle;
                    r.events = {};
                    for (u in e) for (f = 0, o = e[u].length; f < o; f++) i.event.add(t, u, e[u][f]);
                }
                r.data && (r.data = i.extend({}, r.data));
            }
        }
        function be(n, t) {
            var u, e, f;
            if (t.nodeType === 1) {
                if (((u = t.nodeName.toLowerCase()), !r.noCloneEvent && t[i.expando])) {
                    f = i._data(t);
                    for (e in f.events) i.removeEvent(t, e, f.handle);
                    t.removeAttribute(i.expando);
                }
                u === "script" && t.text !== n.text
                    ? ((ou(t).text = n.text), su(t))
                    : u === "object"
                    ? (t.parentNode && (t.outerHTML = n.outerHTML), r.html5Clone && n.innerHTML && !i.trim(t.innerHTML) && (t.innerHTML = n.innerHTML))
                    : u === "input" && oi.test(n.type)
                    ? ((t.defaultChecked = t.checked = n.checked), t.value !== n.value && (t.value = n.value))
                    : u === "option"
                    ? (t.defaultSelected = t.selected = n.defaultSelected)
                    : (u === "input" || u === "textarea") && (t.defaultValue = n.defaultValue);
            }
        }
        function cu(t, r) {
            var f,
                u = i(r.createElement(t)).appendTo(r.body),
                e = n.getDefaultComputedStyle && (f = n.getDefaultComputedStyle(u[0])) ? f.display : i.css(u[0], "display");
            return u.detach(), e;
        }
        function yt(n) {
            var r = u,
                t = ai[n];
            return (
                t ||
                    ((t = cu(n, r)),
                    (t !== "none" && t) ||
                        ((ot = (ot || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement)), (r = (ot[0].contentWindow || ot[0].contentDocument).document), r.write(), r.close(), (t = cu(n, r)), ot.detach()),
                    (ai[n] = t)),
                t
            );
        }
        function au(n, t) {
            return {
                get: function () {
                    var i = n();
                    if (i != null) {
                        if (i) {
                            delete this.get;
                            return;
                        }
                        return (this.get = t).apply(this, arguments);
                    }
                },
            };
        }
        function pu(n, t) {
            if (t in n) return t;
            for (var r = t.charAt(0).toUpperCase() + t.slice(1), u = t, i = yu.length; i--; ) if (((t = yu[i] + r), t in n)) return t;
            return u;
        }
        function wu(n, t) {
            for (var f, r, o, e = [], u = 0, s = n.length; u < s; u++)
                ((r = n[u]), r.style) &&
                    ((e[u] = i._data(r, "olddisplay")),
                    (f = r.style.display),
                    t
                        ? (e[u] || f !== "none" || (r.style.display = ""), r.style.display === "" && et(r) && (e[u] = i._data(r, "olddisplay", yt(r.nodeName))))
                        : ((o = et(r)), ((f && f !== "none") || !o) && i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
            for (u = 0; u < s; u++) ((r = n[u]), r.style) && ((t && r.style.display !== "none" && r.style.display !== "") || (r.style.display = t ? e[u] || "" : "none"));
            return n;
        }
        function bu(n, t, i) {
            var r = no.exec(t);
            return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t;
        }
        function ku(n, t, r, u, f) {
            for (var e = r === (u ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0; e < 4; e += 2)
                r === "margin" && (o += i.css(n, r + w[e], !0, f)),
                    u
                        ? (r === "content" && (o -= i.css(n, "padding" + w[e], !0, f)), r !== "margin" && (o -= i.css(n, "border" + w[e] + "Width", !0, f)))
                        : ((o += i.css(n, "padding" + w[e], !0, f)), r !== "padding" && (o += i.css(n, "border" + w[e] + "Width", !0, f)));
            return o;
        }
        function du(n, t, u) {
            var o = !0,
                f = t === "width" ? n.offsetWidth : n.offsetHeight,
                e = k(n),
                s = r.boxSizing && i.css(n, "boxSizing", !1, e) === "border-box";
            if (f <= 0 || f == null) {
                if (((f = d(n, t, e)), (f < 0 || f == null) && (f = n.style[t]), pt.test(f))) return f;
                o = s && (r.boxSizingReliable() || f === n.style[t]);
                f = parseFloat(f) || 0;
            }
            return f + ku(n, t, u || (s ? "border" : "content"), o, e) + "px";
        }
        function e(n, t, i, r, u) {
            return new e.prototype.init(n, t, i, r, u);
        }
        function nf() {
            return (
                setTimeout(function () {
                    rt = undefined;
                }),
                (rt = i.now())
            );
        }
        function kt(n, t) {
            var r,
                i = { height: n },
                u = 0;
            for (t = t ? 1 : 0; u < 4; u += 2 - t) (r = w[u]), (i["margin" + r] = i["padding" + r] = n);
            return t && (i.opacity = i.width = n), i;
        }
        function tf(n, t, i) {
            for (var u, f = (st[t] || []).concat(st["*"]), r = 0, e = f.length; r < e; r++) if ((u = f[r].call(i, t, n))) return u;
        }
        function fo(n, t, u) {
            var f,
                a,
                p,
                v,
                s,
                w,
                h,
                b,
                l = this,
                y = {},
                o = n.style,
                c = n.nodeType && et(n),
                e = i._data(n, "fxshow");
            u.queue ||
                ((s = i._queueHooks(n, "fx")),
                s.unqueued == null &&
                    ((s.unqueued = 0),
                    (w = s.empty.fire),
                    (s.empty.fire = function () {
                        s.unqueued || w();
                    })),
                s.unqueued++,
                l.always(function () {
                    l.always(function () {
                        s.unqueued--;
                        i.queue(n, "fx").length || s.empty.fire();
                    });
                }));
            n.nodeType === 1 &&
                ("height" in t || "width" in t) &&
                ((u.overflow = [o.overflow, o.overflowX, o.overflowY]),
                (h = i.css(n, "display")),
                (b = h === "none" ? i._data(n, "olddisplay") || yt(n.nodeName) : h),
                b === "inline" && i.css(n, "float") === "none" && (r.inlineBlockNeedsLayout && yt(n.nodeName) !== "inline" ? (o.zoom = 1) : (o.display = "inline-block")));
            u.overflow &&
                ((o.overflow = "hidden"),
                r.shrinkWrapBlocks() ||
                    l.always(function () {
                        o.overflow = u.overflow[0];
                        o.overflowX = u.overflow[1];
                        o.overflowY = u.overflow[2];
                    }));
            for (f in t)
                if (((a = t[f]), ro.exec(a))) {
                    if ((delete t[f], (p = p || a === "toggle"), a === (c ? "hide" : "show")))
                        if (a === "show" && e && e[f] !== undefined) c = !0;
                        else continue;
                    y[f] = (e && e[f]) || i.style(n, f);
                } else h = undefined;
            if (i.isEmptyObject(y)) (h === "none" ? yt(n.nodeName) : h) === "inline" && (o.display = h);
            else {
                e ? "hidden" in e && (c = e.hidden) : (e = i._data(n, "fxshow", {}));
                p && (e.hidden = !c);
                c
                    ? i(n).show()
                    : l.done(function () {
                          i(n).hide();
                      });
                l.done(function () {
                    var t;
                    i._removeData(n, "fxshow");
                    for (t in y) i.style(n, t, y[t]);
                });
                for (f in y) (v = tf(c ? e[f] : 0, f, l)), f in e || ((e[f] = v.start), c && ((v.end = v.start), (v.start = f === "width" || f === "height" ? 1 : 0)));
            }
        }
        function eo(n, t) {
            var r, f, e, u, o;
            for (r in n)
                if (((f = i.camelCase(r)), (e = t[f]), (u = n[r]), i.isArray(u) && ((e = u[1]), (u = n[r] = u[0])), r !== f && ((n[f] = u), delete n[r]), (o = i.cssHooks[f]), o && "expand" in o)) {
                    u = o.expand(u);
                    delete n[f];
                    for (r in u) r in n || ((n[r] = u[r]), (t[r] = e));
                } else t[f] = e;
        }
        function rf(n, t, r) {
            var e,
                o,
                s = 0,
                l = bt.length,
                f = i.Deferred().always(function () {
                    delete c.elem;
                }),
                c = function () {
                    if (o) return !1;
                    for (var s = rt || nf(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, e = u.tweens.length; r < e; r++) u.tweens[r].run(i);
                    return f.notifyWith(n, [u, i, t]), i < 1 && e ? t : (f.resolveWith(n, [u]), !1);
                },
                u = f.promise({
                    elem: n,
                    props: i.extend({}, t),
                    opts: i.extend(!0, { specialEasing: {} }, r),
                    originalProperties: t,
                    originalOptions: r,
                    startTime: rt || nf(),
                    duration: r.duration,
                    tweens: [],
                    createTween: function (t, r) {
                        var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(f), f;
                    },
                    stop: function (t) {
                        var i = 0,
                            r = t ? u.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; i < r; i++) u.tweens[i].run(1);
                        return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this;
                    },
                }),
                h = u.props;
            for (eo(h, u.opts.specialEasing); s < l; s++) if (((e = bt[s].call(u, n, h, u.opts)), e)) return e;
            return (
                i.map(h, tf, u),
                i.isFunction(u.opts.start) && u.opts.start.call(n, u),
                i.fx.timer(i.extend(c, { elem: n, anim: u, queue: u.opts.queue })),
                u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            );
        }
        function af(n) {
            return function (t, r) {
                typeof t != "string" && ((r = t), (t = "*"));
                var u,
                    f = 0,
                    e = t.toLowerCase().match(h) || [];
                if (i.isFunction(r)) while ((u = e[f++])) u.charAt(0) === "+" ? ((u = u.slice(1) || "*"), (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r);
            };
        }
        function vf(n, t, r, u) {
            function e(s) {
                var h;
                return (
                    (f[s] = !0),
                    i.each(n[s] || [], function (n, i) {
                        var s = i(t, r, u);
                        if (typeof s != "string" || o || f[s]) {
                            if (o) return !(h = s);
                        } else return t.dataTypes.unshift(s), e(s), !1;
                    }),
                    h
                );
            }
            var f = {},
                o = n === bi;
            return e(t.dataTypes[0]) || (!f["*"] && e("*"));
        }
        function ki(n, t) {
            var u,
                r,
                f = i.ajaxSettings.flatOptions || {};
            for (r in t) t[r] !== undefined && ((f[r] ? n : u || (u = {}))[r] = t[r]);
            return u && i.extend(!0, n, u), n;
        }
        function ao(n, t, i) {
            for (var o, e, u, f, s = n.contents, r = n.dataTypes; r[0] === "*"; ) r.shift(), e === undefined && (e = n.mimeType || t.getResponseHeader("Content-Type"));
            if (e)
                for (f in s)
                    if (s[f] && s[f].test(e)) {
                        r.unshift(f);
                        break;
                    }
            if (r[0] in i) u = r[0];
            else {
                for (f in i) {
                    if (!r[0] || n.converters[f + " " + r[0]]) {
                        u = f;
                        break;
                    }
                    o || (o = f);
                }
                u = u || o;
            }
            if (u) return u !== r[0] && r.unshift(u), i[u];
        }
        function vo(n, t, i, r) {
            var h,
                u,
                f,
                s,
                e,
                o = {},
                c = n.dataTypes.slice();
            if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
            for (u = c.shift(); u; )
                if ((n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), (e = u), (u = c.shift()), u))
                    if (u === "*") u = e;
                    else if (e !== "*" && e !== u) {
                        if (((f = o[e + " " + u] || o["* " + u]), !f))
                            for (h in o)
                                if (((s = h.split(" ")), s[1] === u && ((f = o[e + " " + s[0]] || o["* " + s[0]]), f))) {
                                    f === !0 ? (f = o[h]) : o[h] !== !0 && ((u = s[0]), c.unshift(s[1]));
                                    break;
                                }
                        if (f !== !0)
                            if (f && n.throws) t = f(t);
                            else
                                try {
                                    t = f(t);
                                } catch (l) {
                                    return { state: "parsererror", error: f ? l : "No conversion from " + e + " to " + u };
                                }
                    }
            return { state: "success", data: t };
        }
        function di(n, t, r, u) {
            var f;
            if (i.isArray(t))
                i.each(t, function (t, i) {
                    r || po.test(n) ? u(n, i) : di(n + "[" + (typeof i == "object" ? t : "") + "]", i, r, u);
                });
            else if (r || i.type(t) !== "object") u(n, t);
            else for (f in t) di(n + "[" + f + "]", t[f], r, u);
        }
        function pf() {
            try {
                return new n.XMLHttpRequest();
            } catch (t) {}
        }
        function go() {
            try {
                return new n.ActiveXObject("Microsoft.XMLHTTP");
            } catch (t) {}
        }
        function wf(n) {
            return i.isWindow(n) ? n : n.nodeType === 9 ? n.defaultView || n.parentWindow : !1;
        }
        var c = [],
            l = c.slice,
            ir = c.concat,
            ii = c.push,
            rr = c.indexOf,
            ct = {},
            df = ct.toString,
            tt = ct.hasOwnProperty,
            r = {},
            ur = "1.11.1",
            i = function (n, t) {
                return new i.fn.init(n, t);
            },
            gf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ne = /^-ms-/,
            te = /-([\da-z])/gi,
            ie = function (n, t) {
                return t.toUpperCase();
            },
            p,
            or,
            sr,
            h,
            fi,
            lt,
            o,
            lr,
            ar,
            vr,
            ot,
            ai,
            uf,
            ef,
            of,
            gt,
            gi,
            ti,
            nr,
            tr,
            bf,
            kf;
        i.fn = i.prototype = {
            jquery: ur,
            constructor: i,
            selector: "",
            length: 0,
            toArray: function () {
                return l.call(this);
            },
            get: function (n) {
                return n != null ? (n < 0 ? this[n + this.length] : this[n]) : l.call(this);
            },
            pushStack: function (n) {
                var t = i.merge(this.constructor(), n);
                return (t.prevObject = this), (t.context = this.context), t;
            },
            each: function (n, t) {
                return i.each(this, n, t);
            },
            map: function (n) {
                return this.pushStack(
                    i.map(this, function (t, i) {
                        return n.call(t, i, t);
                    })
                );
            },
            slice: function () {
                return this.pushStack(l.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (n) {
                var i = this.length,
                    t = +n + (n < 0 ? i : 0);
                return this.pushStack(t >= 0 && t < i ? [this[t]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor(null);
            },
            push: ii,
            sort: c.sort,
            splice: c.splice,
        };
        i.extend = i.fn.extend = function () {
            var r,
                e,
                t,
                f,
                o,
                s,
                n = arguments[0] || {},
                u = 1,
                c = arguments.length,
                h = !1;
            for (typeof n == "boolean" && ((h = n), (n = arguments[u] || {}), u++), typeof n == "object" || i.isFunction(n) || (n = {}), u === c && ((n = this), u--); u < c; u++)
                if ((o = arguments[u]) != null)
                    for (f in o)
                        ((r = n[f]), (t = o[f]), n !== t) &&
                            (h && t && (i.isPlainObject(t) || (e = i.isArray(t))) ? (e ? ((e = !1), (s = r && i.isArray(r) ? r : [])) : (s = r && i.isPlainObject(r) ? r : {}), (n[f] = i.extend(h, s, t))) : t !== undefined && (n[f] = t));
            return n;
        };
        i.extend({
            expando: "jQuery" + (ur + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (n) {
                throw new Error(n);
            },
            noop: function () {},
            isFunction: function (n) {
                return i.type(n) === "function";
            },
            isArray:
                Array.isArray ||
                function (n) {
                    return i.type(n) === "array";
                },
            isWindow: function (n) {
                return n != null && n == n.window;
            },
            isNumeric: function (n) {
                return !i.isArray(n) && n - parseFloat(n) >= 0;
            },
            isEmptyObject: function (n) {
                var t;
                for (t in n) return !1;
                return !0;
            },
            isPlainObject: function (n) {
                var t;
                if (!n || i.type(n) !== "object" || n.nodeType || i.isWindow(n)) return !1;
                try {
                    if (n.constructor && !tt.call(n, "constructor") && !tt.call(n.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (u) {
                    return !1;
                }
                if (r.ownLast) for (t in n) return tt.call(n, t);
                for (t in n);
                return t === undefined || tt.call(n, t);
            },
            type: function (n) {
                return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? ct[df.call(n)] || "object" : typeof n;
            },
            globalEval: function (t) {
                t &&
                    i.trim(t) &&
                    (
                        n.execScript ||
                        function (t) {
                            n.eval.call(n, t);
                        }
                    )(t);
            },
            camelCase: function (n) {
                return n.replace(ne, "ms-").replace(te, ie);
            },
            nodeName: function (n, t) {
                return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
            },
            each: function (n, t, i) {
                var u,
                    r = 0,
                    f = n.length,
                    e = ri(n);
                if (i) {
                    if (e) {
                        for (; r < f; r++) if (((u = t.apply(n[r], i)), u === !1)) break;
                    } else for (r in n) if (((u = t.apply(n[r], i)), u === !1)) break;
                } else if (e) {
                    for (; r < f; r++) if (((u = t.call(n[r], r, n[r])), u === !1)) break;
                } else for (r in n) if (((u = t.call(n[r], r, n[r])), u === !1)) break;
                return n;
            },
            trim: function (n) {
                return n == null ? "" : (n + "").replace(gf, "");
            },
            makeArray: function (n, t) {
                var r = t || [];
                return n != null && (ri(Object(n)) ? i.merge(r, typeof n == "string" ? [n] : n) : ii.call(r, n)), r;
            },
            inArray: function (n, t, i) {
                var r;
                if (t) {
                    if (rr) return rr.call(t, n, i);
                    for (r = t.length, i = i ? (i < 0 ? Math.max(0, r + i) : i) : 0; i < r; i++) if (i in t && t[i] === n) return i;
                }
                return -1;
            },
            merge: function (n, t) {
                for (var r = +t.length, i = 0, u = n.length; i < r; ) n[u++] = t[i++];
                if (r !== r) while (t[i] !== undefined) n[u++] = t[i++];
                return (n.length = u), n;
            },
            grep: function (n, t, i) {
                for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++) (u = !t(n[r], r)), u !== o && f.push(n[r]);
                return f;
            },
            map: function (n, t, i) {
                var u,
                    r = 0,
                    e = n.length,
                    o = ri(n),
                    f = [];
                if (o) for (; r < e; r++) (u = t(n[r], r, i)), u != null && f.push(u);
                else for (r in n) (u = t(n[r], r, i)), u != null && f.push(u);
                return ir.apply([], f);
            },
            guid: 1,
            proxy: function (n, t) {
                var u, r, f;
                return (typeof t == "string" && ((f = n[t]), (t = n), (n = f)), !i.isFunction(n))
                    ? undefined
                    : ((u = l.call(arguments, 2)),
                      (r = function () {
                          return n.apply(t || this, u.concat(l.call(arguments)));
                      }),
                      (r.guid = n.guid = n.guid || i.guid++),
                      r);
            },
            now: function () {
                return +new Date();
            },
            support: r,
        });
        i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (n, t) {
            ct["[object " + t + "]"] = t.toLowerCase();
        });
        p = (function (n) {
            function r(n, t, i, r) {
                var w, h, c, v, k, y, d, l, nt, g;
                if (((t ? t.ownerDocument || t : s) !== e && p(t), (t = t || e), (i = i || []), !n || typeof n != "string")) return i;
                if ((v = t.nodeType) !== 1 && v !== 9) return [];
                if (a && !r) {
                    if ((w = sr.exec(n)))
                        if ((c = w[1])) {
                            if (v === 9)
                                if (((h = t.getElementById(c)), h && h.parentNode)) {
                                    if (h.id === c) return i.push(h), i;
                                } else return i;
                            else if (t.ownerDocument && (h = t.ownerDocument.getElementById(c)) && ot(t, h) && h.id === c) return i.push(h), i;
                        } else {
                            if (w[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                            if ((c = w[3]) && u.getElementsByClassName && t.getElementsByClassName) return b.apply(i, t.getElementsByClassName(c)), i;
                        }
                    if (u.qsa && (!o || !o.test(n))) {
                        if (((l = d = f), (nt = t), (g = v === 9 && n), v === 1 && t.nodeName.toLowerCase() !== "object")) {
                            for (y = et(n), (d = t.getAttribute("id")) ? (l = d.replace(hr, "\\$&")) : t.setAttribute("id", l), l = "[id='" + l + "'] ", k = y.length; k--; ) y[k] = l + yt(y[k]);
                            nt = (gt.test(n) && ii(t.parentNode)) || t;
                            g = y.join(",");
                        }
                        if (g)
                            try {
                                return b.apply(i, nt.querySelectorAll(g)), i;
                            } catch (tt) {
                            } finally {
                                d || t.removeAttribute("id");
                            }
                    }
                }
                return si(n.replace(at, "$1"), t, i, r);
            }
            function ni() {
                function n(r, u) {
                    return i.push(r + " ") > t.cacheLength && delete n[i.shift()], (n[r + " "] = u);
                }
                var i = [];
                return n;
            }
            function h(n) {
                return (n[f] = !0), n;
            }
            function c(n) {
                var t = e.createElement("div");
                try {
                    return !!n(t);
                } catch (i) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                    t = null;
                }
            }
            function ti(n, i) {
                for (var u = n.split("|"), r = n.length; r--; ) t.attrHandle[u[r]] = i;
            }
            function wi(n, t) {
                var i = t && n,
                    r = i && n.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || ai) - (~n.sourceIndex || ai);
                if (r) return r;
                if (i) while ((i = i.nextSibling)) if (i === t) return -1;
                return n ? 1 : -1;
            }
            function cr(n) {
                return function (t) {
                    var i = t.nodeName.toLowerCase();
                    return i === "input" && t.type === n;
                };
            }
            function lr(n) {
                return function (t) {
                    var i = t.nodeName.toLowerCase();
                    return (i === "input" || i === "button") && t.type === n;
                };
            }
            function tt(n) {
                return h(function (t) {
                    return (
                        (t = +t),
                        h(function (i, r) {
                            for (var u, f = n([], i.length, t), e = f.length; e--; ) i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
                        })
                    );
                });
            }
            function ii(n) {
                return n && typeof n.getElementsByTagName !== ut && n;
            }
            function bi() {}
            function yt(n) {
                for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
                return i;
            }
            function ri(n, t, i) {
                var r = t.dir,
                    u = i && r === "parentNode",
                    e = ki++;
                return t.first
                    ? function (t, i, f) {
                          while ((t = t[r])) if (t.nodeType === 1 || u) return n(t, i, f);
                      }
                    : function (t, i, o) {
                          var s,
                              h,
                              c = [v, e];
                          if (o) {
                              while ((t = t[r])) if ((t.nodeType === 1 || u) && n(t, i, o)) return !0;
                          } else
                              while ((t = t[r]))
                                  if (t.nodeType === 1 || u) {
                                      if (((h = t[f] || (t[f] = {})), (s = h[r]) && s[0] === v && s[1] === e)) return (c[2] = s[2]);
                                      if (((h[r] = c), (c[2] = n(t, i, o)))) return !0;
                                  }
                      };
            }
            function ui(n) {
                return n.length > 1
                    ? function (t, i, r) {
                          for (var u = n.length; u--; ) if (!n[u](t, i, r)) return !1;
                          return !0;
                      }
                    : n[0];
            }
            function ar(n, t, i) {
                for (var u = 0, f = t.length; u < f; u++) r(n, t[u], i);
                return i;
            }
            function pt(n, t, i, r, u) {
                for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++) (e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
                return o;
            }
            function fi(n, t, i, r, u, e) {
                return (
                    r && !r[f] && (r = fi(r)),
                    u && !u[f] && (u = fi(u, e)),
                    h(function (f, e, o, s) {
                        var l,
                            c,
                            a,
                            p = [],
                            y = [],
                            w = e.length,
                            k = f || ar(t || "*", o.nodeType ? [o] : o, []),
                            v = n && (f || !t) ? pt(k, p, n, o, s) : k,
                            h = i ? (u || (f ? n : w || r) ? [] : e) : v;
                        if ((i && i(v, h, o, s), r)) for (l = pt(h, y), r(l, [], o, s), c = l.length; c--; ) (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                        if (f) {
                            if (u || n) {
                                if (u) {
                                    for (l = [], c = h.length; c--; ) (a = h[c]) && l.push((v[c] = a));
                                    u(null, (h = []), l, s);
                                }
                                for (c = h.length; c--; ) (a = h[c]) && (l = u ? nt.call(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a));
                            }
                        } else (h = pt(h === e ? h.splice(w, h.length) : h)), u ? u(null, e, h, s) : b.apply(e, h);
                    })
                );
            }
            function ei(n) {
                for (
                    var s,
                        u,
                        r,
                        o = n.length,
                        h = t.relative[n[0].type],
                        c = h || t.relative[" "],
                        i = h ? 1 : 0,
                        l = ri(
                            function (n) {
                                return n === s;
                            },
                            c,
                            !0
                        ),
                        a = ri(
                            function (n) {
                                return nt.call(s, n) > -1;
                            },
                            c,
                            !0
                        ),
                        e = [
                            function (n, t, i) {
                                return (!h && (i || t !== ct)) || ((s = t).nodeType ? l(n, t, i) : a(n, t, i));
                            },
                        ];
                    i < o;
                    i++
                )
                    if ((u = t.relative[n[i].type])) e = [ri(ui(e), u)];
                    else {
                        if (((u = t.filter[n[i].type].apply(null, n[i].matches)), u[f])) {
                            for (r = ++i; r < o; r++) if (t.relative[n[r].type]) break;
                            return fi(i > 1 && ui(e), i > 1 && yt(n.slice(0, i - 1).concat({ value: n[i - 2].type === " " ? "*" : "" })).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < o && ei((n = n.slice(r))), r < o && yt(n));
                        }
                        e.push(u);
                    }
                return ui(e);
            }
            function vr(n, i) {
                var u = i.length > 0,
                    f = n.length > 0,
                    o = function (o, s, h, c, l) {
                        var y,
                            d,
                            w,
                            k = 0,
                            a = "0",
                            g = o && [],
                            p = [],
                            nt = ct,
                            tt = o || (f && t.find.TAG("*", l)),
                            it = (v += nt == null ? 1 : Math.random() || 0.1),
                            rt = tt.length;
                        for (l && (ct = s !== e && s); a !== rt && (y = tt[a]) != null; a++) {
                            if (f && y) {
                                for (d = 0; (w = n[d++]); )
                                    if (w(y, s, h)) {
                                        c.push(y);
                                        break;
                                    }
                                l && (v = it);
                            }
                            u && ((y = !w && y) && k--, o && g.push(y));
                        }
                        if (((k += a), u && a !== k)) {
                            for (d = 0; (w = i[d++]); ) w(g, p, s, h);
                            if (o) {
                                if (k > 0) while (a--) g[a] || p[a] || (p[a] = gi.call(c));
                                p = pt(p);
                            }
                            b.apply(c, p);
                            l && !o && p.length > 0 && k + i.length > 1 && r.uniqueSort(c);
                        }
                        return l && ((v = it), (ct = nt)), g;
                    };
                return u ? h(o) : o;
            }
            var it,
                u,
                t,
                ht,
                oi,
                et,
                wt,
                si,
                ct,
                y,
                rt,
                p,
                e,
                l,
                a,
                o,
                g,
                lt,
                ot,
                f = "sizzle" + -new Date(),
                s = n.document,
                v = 0,
                ki = 0,
                hi = ni(),
                ci = ni(),
                li = ni(),
                bt = function (n, t) {
                    return n === t && (rt = !0), 0;
                },
                ut = typeof undefined,
                ai = -2147483648,
                di = {}.hasOwnProperty,
                w = [],
                gi = w.pop,
                nr = w.push,
                b = w.push,
                vi = w.slice,
                nt =
                    w.indexOf ||
                    function (n) {
                        for (var t = 0, i = this.length; t < i; t++) if (this[t] === n) return t;
                        return -1;
                    },
                kt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                i = "[\\x20\\t\\r\\n\\f]",
                ft = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                yi = ft.replace("w", "w#"),
                pi = "\\[" + i + "*(" + ft + ")(?:" + i + "*([*^$|!~]?=)" + i + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + yi + "))|)" + i + "*\\]",
                dt = ":(" + ft + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + pi + ")*)|.*)\\)|)",
                at = new RegExp("^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$", "g"),
                tr = new RegExp("^" + i + "*," + i + "*"),
                ir = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"),
                rr = new RegExp("=" + i + "*([^\\]'\"]*?)" + i + "*\\]", "g"),
                ur = new RegExp(dt),
                fr = new RegExp("^" + yi + "$"),
                vt = {
                    ID: new RegExp("^#(" + ft + ")"),
                    CLASS: new RegExp("^\\.(" + ft + ")"),
                    TAG: new RegExp("^(" + ft.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + pi),
                    PSEUDO: new RegExp("^" + dt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + i + "*(even|odd|(([+-]|)(\\d*)n|)" + i + "*(?:([+-]|)" + i + "*(\\d+)|))" + i + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + kt + ")$", "i"),
                    needsContext: new RegExp("^" + i + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + i + "*((?:-\\d)?\\d*)" + i + "*\\)|)(?=[^-]|$)", "i"),
                },
                er = /^(?:input|select|textarea|button)$/i,
                or = /^h\d$/i,
                st = /^[^{]+\{\s*\[native \w/,
                sr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                gt = /[+~]/,
                hr = /'|\\/g,
                k = new RegExp("\\\\([\\da-f]{1,6}" + i + "?|(" + i + ")|.)", "ig"),
                d = function (n, t, i) {
                    var r = "0x" + t - 65536;
                    return r !== r || i ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode((r >> 10) | 55296, (r & 1023) | 56320);
                };
            try {
                b.apply((w = vi.call(s.childNodes)), s.childNodes);
                w[s.childNodes.length].nodeType;
            } catch (yr) {
                b = {
                    apply: w.length
                        ? function (n, t) {
                              nr.apply(n, vi.call(t));
                          }
                        : function (n, t) {
                              for (var i = n.length, r = 0; (n[i++] = t[r++]); );
                              n.length = i - 1;
                          },
                };
            }
            u = r.support = {};
            oi = r.isXML = function (n) {
                var t = n && (n.ownerDocument || n).documentElement;
                return t ? t.nodeName !== "HTML" : !1;
            };
            p = r.setDocument = function (n) {
                var v,
                    r = n ? n.ownerDocument || n : s,
                    h = r.defaultView;
                return r === e || r.nodeType !== 9 || !r.documentElement
                    ? e
                    : ((e = r),
                      (l = r.documentElement),
                      (a = !oi(r)),
                      h &&
                          h !== h.top &&
                          (h.addEventListener
                              ? h.addEventListener(
                                    "unload",
                                    function () {
                                        p();
                                    },
                                    !1
                                )
                              : h.attachEvent &&
                                h.attachEvent("onunload", function () {
                                    p();
                                })),
                      (u.attributes = c(function (n) {
                          return (n.className = "i"), !n.getAttribute("className");
                      })),
                      (u.getElementsByTagName = c(function (n) {
                          return n.appendChild(r.createComment("")), !n.getElementsByTagName("*").length;
                      })),
                      (u.getElementsByClassName =
                          st.test(r.getElementsByClassName) &&
                          c(function (n) {
                              return (n.innerHTML = "<div class='a'></div><div class='a i'></div>"), (n.firstChild.className = "i"), n.getElementsByClassName("i").length === 2;
                          })),
                      (u.getById = c(function (n) {
                          return (l.appendChild(n).id = f), !r.getElementsByName || !r.getElementsByName(f).length;
                      })),
                      u.getById
                          ? ((t.find.ID = function (n, t) {
                                if (typeof t.getElementById !== ut && a) {
                                    var i = t.getElementById(n);
                                    return i && i.parentNode ? [i] : [];
                                }
                            }),
                            (t.filter.ID = function (n) {
                                var t = n.replace(k, d);
                                return function (n) {
                                    return n.getAttribute("id") === t;
                                };
                            }))
                          : (delete t.find.ID,
                            (t.filter.ID = function (n) {
                                var t = n.replace(k, d);
                                return function (n) {
                                    var i = typeof n.getAttributeNode !== ut && n.getAttributeNode("id");
                                    return i && i.value === t;
                                };
                            })),
                      (t.find.TAG = u.getElementsByTagName
                          ? function (n, t) {
                                if (typeof t.getElementsByTagName !== ut) return t.getElementsByTagName(n);
                            }
                          : function (n, t) {
                                var i,
                                    r = [],
                                    f = 0,
                                    u = t.getElementsByTagName(n);
                                if (n === "*") {
                                    while ((i = u[f++])) i.nodeType === 1 && r.push(i);
                                    return r;
                                }
                                return u;
                            }),
                      (t.find.CLASS =
                          u.getElementsByClassName &&
                          function (n, t) {
                              if (typeof t.getElementsByClassName !== ut && a) return t.getElementsByClassName(n);
                          }),
                      (g = []),
                      (o = []),
                      (u.qsa = st.test(r.querySelectorAll)) &&
                          (c(function (n) {
                              n.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                              n.querySelectorAll("[msallowclip^='']").length && o.push("[*^$]=" + i + "*(?:''|\"\")");
                              n.querySelectorAll("[selected]").length || o.push("\\[" + i + "*(?:value|" + kt + ")");
                              n.querySelectorAll(":checked").length || o.push(":checked");
                          }),
                          c(function (n) {
                              var t = r.createElement("input");
                              t.setAttribute("type", "hidden");
                              n.appendChild(t).setAttribute("name", "D");
                              n.querySelectorAll("[name=d]").length && o.push("name" + i + "*[*^$|!~]?=");
                              n.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled");
                              n.querySelectorAll("*,:x");
                              o.push(",.*:");
                          })),
                      (u.matchesSelector = st.test((lt = l.matches || l.webkitMatchesSelector || l.mozMatchesSelector || l.oMatchesSelector || l.msMatchesSelector))) &&
                          c(function (n) {
                              u.disconnectedMatch = lt.call(n, "div");
                              lt.call(n, "[s!='']:x");
                              g.push("!=", dt);
                          }),
                      (o = o.length && new RegExp(o.join("|"))),
                      (g = g.length && new RegExp(g.join("|"))),
                      (v = st.test(l.compareDocumentPosition)),
                      (ot =
                          v || st.test(l.contains)
                              ? function (n, t) {
                                    var r = n.nodeType === 9 ? n.documentElement : n,
                                        i = t && t.parentNode;
                                    return n === i || !!(i && i.nodeType === 1 && (r.contains ? r.contains(i) : n.compareDocumentPosition && n.compareDocumentPosition(i) & 16));
                                }
                              : function (n, t) {
                                    if (t) while ((t = t.parentNode)) if (t === n) return !0;
                                    return !1;
                                }),
                      (bt = v
                          ? function (n, t) {
                                if (n === t) return (rt = !0), 0;
                                var i = !n.compareDocumentPosition - !t.compareDocumentPosition;
                                return i
                                    ? i
                                    : ((i = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1), i & 1 || (!u.sortDetached && t.compareDocumentPosition(n) === i))
                                    ? n === r || (n.ownerDocument === s && ot(s, n))
                                        ? -1
                                        : t === r || (t.ownerDocument === s && ot(s, t))
                                        ? 1
                                        : y
                                        ? nt.call(y, n) - nt.call(y, t)
                                        : 0
                                    : i & 4
                                    ? -1
                                    : 1;
                            }
                          : function (n, t) {
                                if (n === t) return (rt = !0), 0;
                                var i,
                                    u = 0,
                                    o = n.parentNode,
                                    h = t.parentNode,
                                    f = [n],
                                    e = [t];
                                if (o && h) {
                                    if (o === h) return wi(n, t);
                                } else return n === r ? -1 : t === r ? 1 : o ? -1 : h ? 1 : y ? nt.call(y, n) - nt.call(y, t) : 0;
                                for (i = n; (i = i.parentNode); ) f.unshift(i);
                                for (i = t; (i = i.parentNode); ) e.unshift(i);
                                while (f[u] === e[u]) u++;
                                return u ? wi(f[u], e[u]) : f[u] === s ? -1 : e[u] === s ? 1 : 0;
                            }),
                      r);
            };
            r.matches = function (n, t) {
                return r(n, null, null, t);
            };
            r.matchesSelector = function (n, t) {
                if (((n.ownerDocument || n) !== e && p(n), (t = t.replace(rr, "='$1']")), u.matchesSelector && a && (!g || !g.test(t)) && (!o || !o.test(t))))
                    try {
                        var i = lt.call(n, t);
                        if (i || u.disconnectedMatch || (n.document && n.document.nodeType !== 11)) return i;
                    } catch (f) {}
                return r(t, e, null, [n]).length > 0;
            };
            r.contains = function (n, t) {
                return (n.ownerDocument || n) !== e && p(n), ot(n, t);
            };
            r.attr = function (n, i) {
                (n.ownerDocument || n) !== e && p(n);
                var f = t.attrHandle[i.toLowerCase()],
                    r = f && di.call(t.attrHandle, i.toLowerCase()) ? f(n, i, !a) : undefined;
                return r !== undefined ? r : u.attributes || !a ? n.getAttribute(i) : (r = n.getAttributeNode(i)) && r.specified ? r.value : null;
            };
            r.error = function (n) {
                throw new Error("Syntax error, unrecognized expression: " + n);
            };
            r.uniqueSort = function (n) {
                var r,
                    f = [],
                    t = 0,
                    i = 0;
                if (((rt = !u.detectDuplicates), (y = !u.sortStable && n.slice(0)), n.sort(bt), rt)) {
                    while ((r = n[i++])) r === n[i] && (t = f.push(i));
                    while (t--) n.splice(f[t], 1);
                }
                return (y = null), n;
            };
            ht = r.getText = function (n) {
                var r,
                    i = "",
                    u = 0,
                    t = n.nodeType;
                if (t) {
                    if (t === 1 || t === 9 || t === 11) {
                        if (typeof n.textContent == "string") return n.textContent;
                        for (n = n.firstChild; n; n = n.nextSibling) i += ht(n);
                    } else if (t === 3 || t === 4) return n.nodeValue;
                } else while ((r = n[u++])) i += ht(r);
                return i;
            };
            t = r.selectors = {
                cacheLength: 50,
                createPseudo: h,
                match: vt,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (n) {
                        return (n[1] = n[1].replace(k, d)), (n[3] = (n[3] || n[4] || n[5] || "").replace(k, d)), n[2] === "~=" && (n[3] = " " + n[3] + " "), n.slice(0, 4);
                    },
                    CHILD: function (n) {
                        return (
                            (n[1] = n[1].toLowerCase()),
                            n[1].slice(0, 3) === "nth" ? (n[3] || r.error(n[0]), (n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * (n[3] === "even" || n[3] === "odd"))), (n[5] = +(n[7] + n[8] || n[3] === "odd"))) : n[3] && r.error(n[0]),
                            n
                        );
                    },
                    PSEUDO: function (n) {
                        var i,
                            t = !n[6] && n[2];
                        return vt.CHILD.test(n[0])
                            ? null
                            : (n[3] ? (n[2] = n[4] || n[5] || "") : t && ur.test(t) && (i = et(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))), n.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (n) {
                        var t = n.replace(k, d).toLowerCase();
                        return n === "*"
                            ? function () {
                                  return !0;
                              }
                            : function (n) {
                                  return n.nodeName && n.nodeName.toLowerCase() === t;
                              };
                    },
                    CLASS: function (n) {
                        var t = hi[n + " "];
                        return (
                            t ||
                            ((t = new RegExp("(^|" + i + ")" + n + "(" + i + "|$)")) &&
                                hi(n, function (n) {
                                    return t.test((typeof n.className == "string" && n.className) || (typeof n.getAttribute !== ut && n.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (n, t, i) {
                        return function (u) {
                            var f = r.attr(u, n);
                            return f == null
                                ? t === "!="
                                : t
                                ? ((f += ""),
                                  t === "="
                                      ? f === i
                                      : t === "!="
                                      ? f !== i
                                      : t === "^="
                                      ? i && f.indexOf(i) === 0
                                      : t === "*="
                                      ? i && f.indexOf(i) > -1
                                      : t === "$="
                                      ? i && f.slice(-i.length) === i
                                      : t === "~="
                                      ? (" " + f + " ").indexOf(i) > -1
                                      : t === "|="
                                      ? f === i || f.slice(0, i.length + 1) === i + "-"
                                      : !1)
                                : !0;
                        };
                    },
                    CHILD: function (n, t, i, r, u) {
                        var s = n.slice(0, 3) !== "nth",
                            o = n.slice(-4) !== "last",
                            e = t === "of-type";
                        return r === 1 && u === 0
                            ? function (n) {
                                  return !!n.parentNode;
                              }
                            : function (t, i, h) {
                                  var a,
                                      k,
                                      c,
                                      l,
                                      y,
                                      w,
                                      b = s !== o ? "nextSibling" : "previousSibling",
                                      p = t.parentNode,
                                      g = e && t.nodeName.toLowerCase(),
                                      d = !h && !e;
                                  if (p) {
                                      if (s) {
                                          while (b) {
                                              for (c = t; (c = c[b]); ) if (e ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                              w = b = n === "only" && !w && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((w = [o ? p.firstChild : p.lastChild]), o && d)) {
                                          for (k = p[f] || (p[f] = {}), a = k[n] || [], y = a[0] === v && a[1], l = a[0] === v && a[2], c = y && p.childNodes[y]; (c = (++y && c && c[b]) || (l = y = 0) || w.pop()); )
                                              if (c.nodeType === 1 && ++l && c === t) {
                                                  k[n] = [v, y, l];
                                                  break;
                                              }
                                      } else if (d && (a = (t[f] || (t[f] = {}))[n]) && a[0] === v) l = a[1];
                                      else while ((c = (++y && c && c[b]) || (l = y = 0) || w.pop())) if ((e ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++l && (d && ((c[f] || (c[f] = {}))[n] = [v, l]), c === t)) break;
                                      return (l -= u), l === r || (l % r == 0 && l / r >= 0);
                                  }
                              };
                    },
                    PSEUDO: function (n, i) {
                        var e,
                            u = t.pseudos[n] || t.setFilters[n.toLowerCase()] || r.error("unsupported pseudo: " + n);
                        return u[f]
                            ? u(i)
                            : u.length > 1
                            ? ((e = [n, n, "", i]),
                              t.setFilters.hasOwnProperty(n.toLowerCase())
                                  ? h(function (n, t) {
                                        for (var r, f = u(n, i), e = f.length; e--; ) (r = nt.call(n, f[e])), (n[r] = !(t[r] = f[e]));
                                    })
                                  : function (n) {
                                        return u(n, 0, e);
                                    })
                            : u;
                    },
                },
                pseudos: {
                    not: h(function (n) {
                        var i = [],
                            r = [],
                            t = wt(n.replace(at, "$1"));
                        return t[f]
                            ? h(function (n, i, r, u) {
                                  for (var e, o = t(n, null, u, []), f = n.length; f--; ) (e = o[f]) && (n[f] = !(i[f] = e));
                              })
                            : function (n, u, f) {
                                  return (i[0] = n), t(i, null, f, r), !r.pop();
                              };
                    }),
                    has: h(function (n) {
                        return function (t) {
                            return r(n, t).length > 0;
                        };
                    }),
                    contains: h(function (n) {
                        return function (t) {
                            return (t.textContent || t.innerText || ht(t)).indexOf(n) > -1;
                        };
                    }),
                    lang: h(function (n) {
                        return (
                            fr.test(n || "") || r.error("unsupported lang: " + n),
                            (n = n.replace(k, d).toLowerCase()),
                            function (t) {
                                var i;
                                do if ((i = a ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (i = i.toLowerCase()), i === n || i.indexOf(n + "-") === 0;
                                while ((t = t.parentNode) && t.nodeType === 1);
                                return !1;
                            }
                        );
                    }),
                    target: function (t) {
                        var i = n.location && n.location.hash;
                        return i && i.slice(1) === t.id;
                    },
                    root: function (n) {
                        return n === l;
                    },
                    focus: function (n) {
                        return n === e.activeElement && (!e.hasFocus || e.hasFocus()) && !!(n.type || n.href || ~n.tabIndex);
                    },
                    enabled: function (n) {
                        return n.disabled === !1;
                    },
                    disabled: function (n) {
                        return n.disabled === !0;
                    },
                    checked: function (n) {
                        var t = n.nodeName.toLowerCase();
                        return (t === "input" && !!n.checked) || (t === "option" && !!n.selected);
                    },
                    selected: function (n) {
                        return n.parentNode && n.parentNode.selectedIndex, n.selected === !0;
                    },
                    empty: function (n) {
                        for (n = n.firstChild; n; n = n.nextSibling) if (n.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (n) {
                        return !t.pseudos.empty(n);
                    },
                    header: function (n) {
                        return or.test(n.nodeName);
                    },
                    input: function (n) {
                        return er.test(n.nodeName);
                    },
                    button: function (n) {
                        var t = n.nodeName.toLowerCase();
                        return (t === "input" && n.type === "button") || t === "button";
                    },
                    text: function (n) {
                        var t;
                        return n.nodeName.toLowerCase() === "input" && n.type === "text" && ((t = n.getAttribute("type")) == null || t.toLowerCase() === "text");
                    },
                    first: tt(function () {
                        return [0];
                    }),
                    last: tt(function (n, t) {
                        return [t - 1];
                    }),
                    eq: tt(function (n, t, i) {
                        return [i < 0 ? i + t : i];
                    }),
                    even: tt(function (n, t) {
                        for (var i = 0; i < t; i += 2) n.push(i);
                        return n;
                    }),
                    odd: tt(function (n, t) {
                        for (var i = 1; i < t; i += 2) n.push(i);
                        return n;
                    }),
                    lt: tt(function (n, t, i) {
                        for (var r = i < 0 ? i + t : i; --r >= 0; ) n.push(r);
                        return n;
                    }),
                    gt: tt(function (n, t, i) {
                        for (var r = i < 0 ? i + t : i; ++r < t; ) n.push(r);
                        return n;
                    }),
                },
            };
            t.pseudos.nth = t.pseudos.eq;
            for (it in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) t.pseudos[it] = cr(it);
            for (it in { submit: !0, reset: !0 }) t.pseudos[it] = lr(it);
            return (
                (bi.prototype = t.filters = t.pseudos),
                (t.setFilters = new bi()),
                (et = r.tokenize = function (n, i) {
                    var e,
                        f,
                        s,
                        o,
                        u,
                        h,
                        c,
                        l = ci[n + " "];
                    if (l) return i ? 0 : l.slice(0);
                    for (u = n, h = [], c = t.preFilter; u; ) {
                        (!e || (f = tr.exec(u))) && (f && (u = u.slice(f[0].length) || u), h.push((s = [])));
                        e = !1;
                        (f = ir.exec(u)) && ((e = f.shift()), s.push({ value: e, type: f[0].replace(at, " ") }), (u = u.slice(e.length)));
                        for (o in t.filter) (f = vt[o].exec(u)) && (!c[o] || (f = c[o](f))) && ((e = f.shift()), s.push({ value: e, type: o, matches: f }), (u = u.slice(e.length)));
                        if (!e) break;
                    }
                    return i ? u.length : u ? r.error(n) : ci(n, h).slice(0);
                }),
                (wt = r.compile = function (n, t) {
                    var r,
                        u = [],
                        e = [],
                        i = li[n + " "];
                    if (!i) {
                        for (t || (t = et(n)), r = t.length; r--; ) (i = ei(t[r])), i[f] ? u.push(i) : e.push(i);
                        i = li(n, vr(e, u));
                        i.selector = n;
                    }
                    return i;
                }),
                (si = r.select = function (n, i, r, f) {
                    var s,
                        e,
                        o,
                        l,
                        v,
                        c = typeof n == "function" && n,
                        h = !f && et((n = c.selector || n));
                    if (((r = r || []), h.length === 1)) {
                        if (((e = h[0] = h[0].slice(0)), e.length > 2 && (o = e[0]).type === "ID" && u.getById && i.nodeType === 9 && a && t.relative[e[1].type])) {
                            if (((i = (t.find.ID(o.matches[0].replace(k, d), i) || [])[0]), i)) c && (i = i.parentNode);
                            else return r;
                            n = n.slice(e.shift().value.length);
                        }
                        for (s = vt.needsContext.test(n) ? 0 : e.length; s--; ) {
                            if (((o = e[s]), t.relative[(l = o.type)])) break;
                            if ((v = t.find[l]) && (f = v(o.matches[0].replace(k, d), (gt.test(e[0].type) && ii(i.parentNode)) || i))) {
                                if ((e.splice(s, 1), (n = f.length && yt(e)), !n)) return b.apply(r, f), r;
                                break;
                            }
                        }
                    }
                    return (c || wt(n, h))(f, i, !a, r, (gt.test(n) && ii(i.parentNode)) || i), r;
                }),
                (u.sortStable = f.split("").sort(bt).join("") === f),
                (u.detectDuplicates = !!rt),
                p(),
                (u.sortDetached = c(function (n) {
                    return n.compareDocumentPosition(e.createElement("div")) & 1;
                })),
                c(function (n) {
                    return (n.innerHTML = "<a href='#'></a>"), n.firstChild.getAttribute("href") === "#";
                }) ||
                    ti("type|href|height|width", function (n, t, i) {
                        if (!i) return n.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2);
                    }),
                (u.attributes &&
                    c(function (n) {
                        return (n.innerHTML = "<input/>"), n.firstChild.setAttribute("value", ""), n.firstChild.getAttribute("value") === "";
                    })) ||
                    ti("value", function (n, t, i) {
                        if (!i && n.nodeName.toLowerCase() === "input") return n.defaultValue;
                    }),
                c(function (n) {
                    return n.getAttribute("disabled") == null;
                }) ||
                    ti(kt, function (n, t, i) {
                        var r;
                        if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null;
                    }),
                r
            );
        })(n);
        i.find = p;
        i.expr = p.selectors;
        i.expr[":"] = i.expr.pseudos;
        i.unique = p.uniqueSort;
        i.text = p.getText;
        i.isXMLDoc = p.isXML;
        i.contains = p.contains;
        var fr = i.expr.match.needsContext,
            er = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            re = /^.[^:#\[\.,]*$/;
        i.filter = function (n, t, r) {
            var u = t[0];
            return (
                r && (n = ":not(" + n + ")"),
                t.length === 1 && u.nodeType === 1
                    ? i.find.matchesSelector(u, n)
                        ? [u]
                        : []
                    : i.find.matches(
                          n,
                          i.grep(t, function (n) {
                              return n.nodeType === 1;
                          })
                      )
            );
        };
        i.fn.extend({
            find: function (n) {
                var t,
                    r = [],
                    u = this,
                    f = u.length;
                if (typeof n != "string")
                    return this.pushStack(
                        i(n).filter(function () {
                            for (t = 0; t < f; t++) if (i.contains(u[t], this)) return !0;
                        })
                    );
                for (t = 0; t < f; t++) i.find(n, u[t], r);
                return (r = this.pushStack(f > 1 ? i.unique(r) : r)), (r.selector = this.selector ? this.selector + " " + n : n), r;
            },
            filter: function (n) {
                return this.pushStack(ui(this, n || [], !1));
            },
            not: function (n) {
                return this.pushStack(ui(this, n || [], !0));
            },
            is: function (n) {
                return !!ui(this, typeof n == "string" && fr.test(n) ? i(n) : n || [], !1).length;
            },
        });
        var ft,
            u = n.document,
            ue = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            fe = (i.fn.init = function (n, t) {
                var r, f;
                if (!n) return this;
                if (typeof n == "string") {
                    if (((r = n.charAt(0) === "<" && n.charAt(n.length - 1) === ">" && n.length >= 3 ? [null, n, null] : ue.exec(n)), r && (r[1] || !t))) {
                        if (r[1]) {
                            if (((t = t instanceof i ? t[0] : t), i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), er.test(r[1]) && i.isPlainObject(t)))
                                for (r in t) i.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                            return this;
                        }
                        if (((f = u.getElementById(r[2])), f && f.parentNode)) {
                            if (f.id !== r[2]) return ft.find(n);
                            this.length = 1;
                            this[0] = f;
                        }
                        return (this.context = u), (this.selector = n), this;
                    }
                    return !t || t.jquery ? (t || ft).find(n) : this.constructor(t).find(n);
                }
                return n.nodeType
                    ? ((this.context = this[0] = n), (this.length = 1), this)
                    : i.isFunction(n)
                    ? typeof ft.ready != "undefined"
                        ? ft.ready(n)
                        : n(i)
                    : (n.selector !== undefined && ((this.selector = n.selector), (this.context = n.context)), i.makeArray(n, this));
            });
        fe.prototype = i.fn;
        ft = i(u);
        or = /^(?:parents|prev(?:Until|All))/;
        sr = { children: !0, contents: !0, next: !0, prev: !0 };
        i.extend({
            dir: function (n, t, r) {
                for (var f = [], u = n[t]; u && u.nodeType !== 9 && (r === undefined || u.nodeType !== 1 || !i(u).is(r)); ) u.nodeType === 1 && f.push(u), (u = u[t]);
                return f;
            },
            sibling: function (n, t) {
                for (var i = []; n; n = n.nextSibling) n.nodeType === 1 && n !== t && i.push(n);
                return i;
            },
        });
        i.fn.extend({
            has: function (n) {
                var t,
                    r = i(n, this),
                    u = r.length;
                return this.filter(function () {
                    for (t = 0; t < u; t++) if (i.contains(this, r[t])) return !0;
                });
            },
            closest: function (n, t) {
                for (var r, f = 0, o = this.length, u = [], e = fr.test(n) || typeof n != "string" ? i(n, t || this.context) : 0; f < o; f++)
                    for (r = this[f]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (e ? e.index(r) > -1 : r.nodeType === 1 && i.find.matchesSelector(r, n))) {
                            u.push(r);
                            break;
                        }
                return this.pushStack(u.length > 1 ? i.unique(u) : u);
            },
            index: function (n) {
                return n ? (typeof n == "string" ? i.inArray(this[0], i(n)) : i.inArray(n.jquery ? n[0] : n, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (n, t) {
                return this.pushStack(i.unique(i.merge(this.get(), i(n, t))));
            },
            addBack: function (n) {
                return this.add(n == null ? this.prevObject : this.prevObject.filter(n));
            },
        });
        i.each(
            {
                parent: function (n) {
                    var t = n.parentNode;
                    return t && t.nodeType !== 11 ? t : null;
                },
                parents: function (n) {
                    return i.dir(n, "parentNode");
                },
                parentsUntil: function (n, t, r) {
                    return i.dir(n, "parentNode", r);
                },
                next: function (n) {
                    return hr(n, "nextSibling");
                },
                prev: function (n) {
                    return hr(n, "previousSibling");
                },
                nextAll: function (n) {
                    return i.dir(n, "nextSibling");
                },
                prevAll: function (n) {
                    return i.dir(n, "previousSibling");
                },
                nextUntil: function (n, t, r) {
                    return i.dir(n, "nextSibling", r);
                },
                prevUntil: function (n, t, r) {
                    return i.dir(n, "previousSibling", r);
                },
                siblings: function (n) {
                    return i.sibling((n.parentNode || {}).firstChild, n);
                },
                children: function (n) {
                    return i.sibling(n.firstChild);
                },
                contents: function (n) {
                    return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.merge([], n.childNodes);
                },
            },
            function (n, t) {
                i.fn[n] = function (r, u) {
                    var f = i.map(this, t, r);
                    return n.slice(-5) !== "Until" && (u = r), u && typeof u == "string" && (f = i.filter(u, f)), this.length > 1 && (sr[n] || (f = i.unique(f)), or.test(n) && (f = f.reverse())), this.pushStack(f);
                };
            }
        );
        h = /\S+/g;
        fi = {};
        i.Callbacks = function (n) {
            n = typeof n == "string" ? fi[n] || ee(n) : i.extend({}, n);
            var o,
                u,
                h,
                f,
                e,
                c,
                t = [],
                r = !n.once && [],
                l = function (i) {
                    for (u = n.memory && i, h = !0, e = c || 0, c = 0, f = t.length, o = !0; t && e < f; e++)
                        if (t[e].apply(i[0], i[1]) === !1 && n.stopOnFalse) {
                            u = !1;
                            break;
                        }
                    o = !1;
                    t && (r ? r.length && l(r.shift()) : u ? (t = []) : s.disable());
                },
                s = {
                    add: function () {
                        if (t) {
                            var r = t.length;
                            (function e(r) {
                                i.each(r, function (r, u) {
                                    var f = i.type(u);
                                    f === "function" ? (n.unique && s.has(u)) || t.push(u) : u && u.length && f !== "string" && e(u);
                                });
                            })(arguments);
                            o ? (f = t.length) : u && ((c = r), l(u));
                        }
                        return this;
                    },
                    remove: function () {
                        return (
                            t &&
                                i.each(arguments, function (n, r) {
                                    for (var u; (u = i.inArray(r, t, u)) > -1; ) t.splice(u, 1), o && (u <= f && f--, u <= e && e--);
                                }),
                            this
                        );
                    },
                    has: function (n) {
                        return n ? i.inArray(n, t) > -1 : !!(t && t.length);
                    },
                    empty: function () {
                        return (t = []), (f = 0), this;
                    },
                    disable: function () {
                        return (t = r = u = undefined), this;
                    },
                    disabled: function () {
                        return !t;
                    },
                    lock: function () {
                        return (r = undefined), u || s.disable(), this;
                    },
                    locked: function () {
                        return !r;
                    },
                    fireWith: function (n, i) {
                        return t && (!h || r) && ((i = i || []), (i = [n, i.slice ? i.slice() : i]), o ? r.push(i) : l(i)), this;
                    },
                    fire: function () {
                        return s.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!h;
                    },
                };
            return s;
        };
        i.extend({
            Deferred: function (n) {
                var u = [
                        ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", i.Callbacks("memory")],
                    ],
                    f = "pending",
                    r = {
                        state: function () {
                            return f;
                        },
                        always: function () {
                            return t.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var n = arguments;
                            return i
                                .Deferred(function (f) {
                                    i.each(u, function (u, e) {
                                        var o = i.isFunction(n[u]) && n[u];
                                        t[e[1]](function () {
                                            var n = o && o.apply(this, arguments);
                                            n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments);
                                        });
                                    });
                                    n = null;
                                })
                                .promise();
                        },
                        promise: function (n) {
                            return n != null ? i.extend(n, r) : r;
                        },
                    },
                    t = {};
                return (
                    (r.pipe = r.then),
                    i.each(u, function (n, i) {
                        var e = i[2],
                            o = i[3];
                        r[i[1]] = e.add;
                        o &&
                            e.add(
                                function () {
                                    f = o;
                                },
                                u[n ^ 1][2].disable,
                                u[2][2].lock
                            );
                        t[i[0]] = function () {
                            return t[i[0] + "With"](this === t ? r : this, arguments), this;
                        };
                        t[i[0] + "With"] = e.fireWith;
                    }),
                    r.promise(t),
                    n && n.call(t, t),
                    t
                );
            },
            when: function (n) {
                var t = 0,
                    u = l.call(arguments),
                    r = u.length,
                    e = r !== 1 || (n && i.isFunction(n.promise)) ? r : 0,
                    f = e === 1 ? n : i.Deferred(),
                    h = function (n, t, i) {
                        return function (r) {
                            t[n] = this;
                            i[n] = arguments.length > 1 ? l.call(arguments) : r;
                            i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i);
                        };
                    },
                    o,
                    c,
                    s;
                if (r > 1) for (o = new Array(r), c = new Array(r), s = new Array(r); t < r; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
                return e || f.resolveWith(s, u), f.promise();
            },
        });
        i.fn.ready = function (n) {
            return i.ready.promise().done(n), this;
        };
        i.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (n) {
                n ? i.readyWait++ : i.ready(!0);
            },
            ready: function (n) {
                if (n === !0 ? !--i.readyWait : !i.isReady) {
                    if (!u.body) return setTimeout(i.ready);
                    ((i.isReady = !0), n !== !0 && --i.readyWait > 0) || (lt.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready")));
                }
            },
        });
        i.ready.promise = function (t) {
            if (!lt)
                if (((lt = i.Deferred()), u.readyState === "complete")) setTimeout(i.ready);
                else if (u.addEventListener) u.addEventListener("DOMContentLoaded", a, !1), n.addEventListener("load", a, !1);
                else {
                    u.attachEvent("onreadystatechange", a);
                    n.attachEvent("onload", a);
                    var r = !1;
                    try {
                        r = n.frameElement == null && u.documentElement;
                    } catch (e) {}
                    r &&
                        r.doScroll &&
                        (function f() {
                            if (!i.isReady) {
                                try {
                                    r.doScroll("left");
                                } catch (n) {
                                    return setTimeout(f, 50);
                                }
                                cr();
                                i.ready();
                            }
                        })();
                }
            return lt.promise(t);
        };
        o = typeof undefined;
        for (lr in i(r)) break;
        r.ownLast = lr !== "0";
        r.inlineBlockNeedsLayout = !1;
        i(function () {
            var f, t, n, i;
            ((n = u.getElementsByTagName("body")[0]), n && n.style) &&
                ((t = u.createElement("div")),
                (i = u.createElement("div")),
                (i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                n.appendChild(i).appendChild(t),
                typeof t.style.zoom !== o && ((t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (r.inlineBlockNeedsLayout = f = t.offsetWidth === 3), f && (n.style.zoom = 1)),
                n.removeChild(i));
        }),
            (function () {
                var n = u.createElement("div");
                if (r.deleteExpando == null) {
                    r.deleteExpando = !0;
                    try {
                        delete n.test;
                    } catch (t) {
                        r.deleteExpando = !1;
                    }
                }
                n = null;
            })();
        i.acceptData = function (n) {
            var t = i.noData[(n.nodeName + " ").toLowerCase()],
                r = +n.nodeType || 1;
            return r !== 1 && r !== 9 ? !1 : !t || (t !== !0 && n.getAttribute("classid") === t);
        };
        ar = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
        vr = /([A-Z])/g;
        i.extend({
            cache: {},
            noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
            hasData: function (n) {
                return (n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando]), !!n && !ei(n);
            },
            data: function (n, t, i) {
                return pr(n, t, i);
            },
            removeData: function (n, t) {
                return wr(n, t);
            },
            _data: function (n, t, i) {
                return pr(n, t, i, !0);
            },
            _removeData: function (n, t) {
                return wr(n, t, !0);
            },
        });
        i.fn.extend({
            data: function (n, t) {
                var f,
                    u,
                    e,
                    r = this[0],
                    o = r && r.attributes;
                if (n === undefined) {
                    if (this.length && ((e = i.data(r)), r.nodeType === 1 && !i._data(r, "parsedAttrs"))) {
                        for (f = o.length; f--; ) o[f] && ((u = o[f].name), u.indexOf("data-") === 0 && ((u = i.camelCase(u.slice(5))), yr(r, u, e[u])));
                        i._data(r, "parsedAttrs", !0);
                    }
                    return e;
                }
                return typeof n == "object"
                    ? this.each(function () {
                          i.data(this, n);
                      })
                    : arguments.length > 1
                    ? this.each(function () {
                          i.data(this, n, t);
                      })
                    : r
                    ? yr(r, n, i.data(r, n))
                    : undefined;
            },
            removeData: function (n) {
                return this.each(function () {
                    i.removeData(this, n);
                });
            },
        });
        i.extend({
            queue: function (n, t, r) {
                var u;
                if (n) return (t = (t || "fx") + "queue"), (u = i._data(n, t)), r && (!u || i.isArray(r) ? (u = i._data(n, t, i.makeArray(r))) : u.push(r)), u || [];
            },
            dequeue: function (n, t) {
                t = t || "fx";
                var r = i.queue(n, t),
                    e = r.length,
                    u = r.shift(),
                    f = i._queueHooks(n, t),
                    o = function () {
                        i.dequeue(n, t);
                    };
                u === "inprogress" && ((u = r.shift()), e--);
                u && (t === "fx" && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
                !e && f && f.empty.fire();
            },
            _queueHooks: function (n, t) {
                var r = t + "queueHooks";
                return (
                    i._data(n, r) ||
                    i._data(n, r, {
                        empty: i.Callbacks("once memory").add(function () {
                            i._removeData(n, t + "queue");
                            i._removeData(n, r);
                        }),
                    })
                );
            },
        });
        i.fn.extend({
            queue: function (n, t) {
                var r = 2;
                return (typeof n != "string" && ((t = n), (n = "fx"), r--), arguments.length < r)
                    ? i.queue(this[0], n)
                    : t === undefined
                    ? this
                    : this.each(function () {
                          var r = i.queue(this, n, t);
                          i._queueHooks(this, n);
                          n === "fx" && r[0] !== "inprogress" && i.dequeue(this, n);
                      });
            },
            dequeue: function (n) {
                return this.each(function () {
                    i.dequeue(this, n);
                });
            },
            clearQueue: function (n) {
                return this.queue(n || "fx", []);
            },
            promise: function (n, t) {
                var r,
                    f = 1,
                    e = i.Deferred(),
                    u = this,
                    o = this.length,
                    s = function () {
                        --f || e.resolveWith(u, [u]);
                    };
                for (typeof n != "string" && ((t = n), (n = undefined)), n = n || "fx"; o--; ) (r = i._data(u[o], n + "queueHooks")), r && r.empty && (f++, r.empty.add(s));
                return s(), e.promise(t);
            },
        });
        var at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            w = ["Top", "Right", "Bottom", "Left"],
            et = function (n, t) {
                return (n = t || n), i.css(n, "display") === "none" || !i.contains(n.ownerDocument, n);
            },
            b = (i.access = function (n, t, r, u, f, e, o) {
                var s = 0,
                    c = n.length,
                    h = r == null;
                if (i.type(r) === "object") {
                    f = !0;
                    for (s in r) i.access(n, t, s, r[s], !0, e, o);
                } else if (
                    u !== undefined &&
                    ((f = !0),
                    i.isFunction(u) || (o = !0),
                    h &&
                        (o
                            ? (t.call(n, u), (t = null))
                            : ((h = t),
                              (t = function (n, t, r) {
                                  return h.call(i(n), r);
                              }))),
                    t)
                )
                    for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
                return f ? n : h ? t.call(n) : c ? t(n[0], r) : e;
            }),
            oi = /^(?:checkbox|radio)$/i;
        (function () {
            var t = u.createElement("input"),
                n = u.createElement("div"),
                i = u.createDocumentFragment();
            if (
                ((n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (r.leadingWhitespace = n.firstChild.nodeType === 3),
                (r.tbody = !n.getElementsByTagName("tbody").length),
                (r.htmlSerialize = !!n.getElementsByTagName("link").length),
                (r.html5Clone = u.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>"),
                (t.type = "checkbox"),
                (t.checked = !0),
                i.appendChild(t),
                (r.appendChecked = t.checked),
                (n.innerHTML = "<textarea>x</textarea>"),
                (r.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue),
                i.appendChild(n),
                (n.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
                (r.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked),
                (r.noCloneEvent = !0),
                n.attachEvent &&
                    (n.attachEvent("onclick", function () {
                        r.noCloneEvent = !1;
                    }),
                    n.cloneNode(!0).click()),
                r.deleteExpando == null)
            ) {
                r.deleteExpando = !0;
                try {
                    delete n.test;
                } catch (f) {
                    r.deleteExpando = !1;
                }
            }
        })(),
            (function () {
                var t,
                    i,
                    f = u.createElement("div");
                for (t in { submit: !0, change: !0, focusin: !0 }) (i = "on" + t), (r[t + "Bubbles"] = i in n) || (f.setAttribute(i, "t"), (r[t + "Bubbles"] = f.attributes[i].expando === !1));
                f = null;
            })();
        var si = /^(?:input|select|textarea)$/i,
            oe = /^key/,
            se = /^(?:mouse|pointer|contextmenu)|click/,
            br = /^(?:focusinfocus|focusoutblur)$/,
            kr = /^([^.]*)(?:\.(.+)|)$/;
        i.event = {
            global: {},
            add: function (n, t, r, u, f) {
                var w,
                    y,
                    b,
                    p,
                    s,
                    c,
                    l,
                    a,
                    e,
                    k,
                    d,
                    v = i._data(n);
                if (v) {
                    for (
                        r.handler && ((p = r), (r = p.handler), (f = p.selector)),
                            r.guid || (r.guid = i.guid++),
                            (y = v.events) || (y = v.events = {}),
                            (c = v.handle) ||
                                ((c = v.handle = function (n) {
                                    return typeof i !== o && (!n || i.event.triggered !== n.type) ? i.event.dispatch.apply(c.elem, arguments) : undefined;
                                }),
                                (c.elem = n)),
                            t = (t || "").match(h) || [""],
                            b = t.length;
                        b--;

                    )
                        ((w = kr.exec(t[b]) || []), (e = d = w[1]), (k = (w[2] || "").split(".").sort()), e) &&
                            ((s = i.event.special[e] || {}),
                            (e = (f ? s.delegateType : s.bindType) || e),
                            (s = i.event.special[e] || {}),
                            (l = i.extend({ type: e, origType: d, data: u, handler: r, guid: r.guid, selector: f, needsContext: f && i.expr.match.needsContext.test(f), namespace: k.join(".") }, p)),
                            (a = y[e]) || ((a = y[e] = []), (a.delegateCount = 0), (s.setup && s.setup.call(n, u, k, c) !== !1) || (n.addEventListener ? n.addEventListener(e, c, !1) : n.attachEvent && n.attachEvent("on" + e, c))),
                            s.add && (s.add.call(n, l), l.handler.guid || (l.handler.guid = r.guid)),
                            f ? a.splice(a.delegateCount++, 0, l) : a.push(l),
                            (i.event.global[e] = !0));
                    n = null;
                }
            },
            remove: function (n, t, r, u, f) {
                var y,
                    o,
                    s,
                    b,
                    p,
                    a,
                    c,
                    l,
                    e,
                    w,
                    k,
                    v = i.hasData(n) && i._data(n);
                if (v && (a = v.events)) {
                    for (t = (t || "").match(h) || [""], p = t.length; p--; ) {
                        if (((s = kr.exec(t[p]) || []), (e = k = s[1]), (w = (s[2] || "").split(".").sort()), !e)) {
                            for (e in a) i.event.remove(n, e + t[p], r, u, !0);
                            continue;
                        }
                        for (c = i.event.special[e] || {}, e = (u ? c.delegateType : c.bindType) || e, l = a[e] || [], s = s[2] && new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"), b = y = l.length; y--; )
                            (o = l[y]),
                                (f || k === o.origType) &&
                                    (!r || r.guid === o.guid) &&
                                    (!s || s.test(o.namespace)) &&
                                    (!u || u === o.selector || (u === "**" && o.selector)) &&
                                    (l.splice(y, 1), o.selector && l.delegateCount--, c.remove && c.remove.call(n, o));
                        b && !l.length && ((c.teardown && c.teardown.call(n, w, v.handle) !== !1) || i.removeEvent(n, e, v.handle), delete a[e]);
                    }
                    i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"));
                }
            },
            trigger: function (t, r, f, e) {
                var l,
                    a,
                    o,
                    p,
                    c,
                    h,
                    w,
                    y = [f || u],
                    s = tt.call(t, "type") ? t.type : t,
                    v = tt.call(t, "namespace") ? t.namespace.split(".") : [];
                if (
                    ((o = h = f = f || u), f.nodeType !== 3 && f.nodeType !== 8) &&
                    !br.test(s + i.event.triggered) &&
                    (s.indexOf(".") >= 0 && ((v = s.split(".")), (s = v.shift()), v.sort()),
                    (a = s.indexOf(":") < 0 && "on" + s),
                    (t = t[i.expando] ? t : new i.Event(s, typeof t == "object" && t)),
                    (t.isTrigger = e ? 2 : 3),
                    (t.namespace = v.join(".")),
                    (t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (t.result = undefined),
                    t.target || (t.target = f),
                    (r = r == null ? [t] : i.makeArray(r, [t])),
                    (c = i.event.special[s] || {}),
                    e || !c.trigger || c.trigger.apply(f, r) !== !1)
                ) {
                    if (!e && !c.noBubble && !i.isWindow(f)) {
                        for (p = c.delegateType || s, br.test(p + s) || (o = o.parentNode); o; o = o.parentNode) y.push(o), (h = o);
                        h === (f.ownerDocument || u) && y.push(h.defaultView || h.parentWindow || n);
                    }
                    for (w = 0; (o = y[w++]) && !t.isPropagationStopped(); )
                        (t.type = w > 1 ? p : c.bindType || s),
                            (l = (i._data(o, "events") || {})[t.type] && i._data(o, "handle")),
                            l && l.apply(o, r),
                            (l = a && o[a]),
                            l && l.apply && i.acceptData(o) && ((t.result = l.apply(o, r)), t.result === !1 && t.preventDefault());
                    if (((t.type = s), !e && !t.isDefaultPrevented() && (!c._default || c._default.apply(y.pop(), r) === !1) && i.acceptData(f) && a && f[s] && !i.isWindow(f))) {
                        h = f[a];
                        h && (f[a] = null);
                        i.event.triggered = s;
                        try {
                            f[s]();
                        } catch (b) {}
                        i.event.triggered = undefined;
                        h && (f[a] = h);
                    }
                    return t.result;
                }
            },
            dispatch: function (n) {
                n = i.event.fix(n);
                var e,
                    f,
                    t,
                    r,
                    o,
                    s = [],
                    h = l.call(arguments),
                    c = (i._data(this, "events") || {})[n.type] || [],
                    u = i.event.special[n.type] || {};
                if (((h[0] = n), (n.delegateTarget = this), !u.preDispatch || u.preDispatch.call(this, n) !== !1)) {
                    for (s = i.event.handlers.call(this, n, c), e = 0; (r = s[e++]) && !n.isPropagationStopped(); )
                        for (n.currentTarget = r.elem, o = 0; (t = r.handlers[o++]) && !n.isImmediatePropagationStopped(); )
                            (!n.namespace_re || n.namespace_re.test(t.namespace)) &&
                                ((n.handleObj = t), (n.data = t.data), (f = ((i.event.special[t.origType] || {}).handle || t.handler).apply(r.elem, h)), f !== undefined && (n.result = f) === !1 && (n.preventDefault(), n.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, n), n.result;
                }
            },
            handlers: function (n, t) {
                var f,
                    e,
                    u,
                    o,
                    h = [],
                    s = t.delegateCount,
                    r = n.target;
                if (s && r.nodeType && (!n.button || n.type !== "click"))
                    for (; r != this; r = r.parentNode || this)
                        if (r.nodeType === 1 && (r.disabled !== !0 || n.type !== "click")) {
                            for (u = [], o = 0; o < s; o++) (e = t[o]), (f = e.selector + " "), u[f] === undefined && (u[f] = e.needsContext ? i(f, this).index(r) >= 0 : i.find(f, this, null, [r]).length), u[f] && u.push(e);
                            u.length && h.push({ elem: r, handlers: u });
                        }
                return s < t.length && h.push({ elem: this, handlers: t.slice(s) }), h;
            },
            fix: function (n) {
                if (n[i.expando]) return n;
                var e,
                    o,
                    s,
                    r = n.type,
                    f = n,
                    t = this.fixHooks[r];
                for (t || (this.fixHooks[r] = t = se.test(r) ? this.mouseHooks : oe.test(r) ? this.keyHooks : {}), s = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(f), e = s.length; e--; ) (o = s[e]), (n[o] = f[o]);
                return n.target || (n.target = f.srcElement || u), n.target.nodeType === 3 && (n.target = n.target.parentNode), (n.metaKey = !!n.metaKey), t.filter ? t.filter(n, f) : n;
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (n, t) {
                    return n.which == null && (n.which = t.charCode != null ? t.charCode : t.keyCode), n;
                },
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (n, t) {
                    var i,
                        e,
                        r,
                        f = t.button,
                        o = t.fromElement;
                    return (
                        n.pageX == null &&
                            t.clientX != null &&
                            ((e = n.target.ownerDocument || u),
                            (r = e.documentElement),
                            (i = e.body),
                            (n.pageX = t.clientX + ((r && r.scrollLeft) || (i && i.scrollLeft) || 0) - ((r && r.clientLeft) || (i && i.clientLeft) || 0)),
                            (n.pageY = t.clientY + ((r && r.scrollTop) || (i && i.scrollTop) || 0) - ((r && r.clientTop) || (i && i.clientTop) || 0))),
                        !n.relatedTarget && o && (n.relatedTarget = o === n.target ? t.toElement : o),
                        n.which || f === undefined || (n.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0),
                        n
                    );
                },
            },
            special: {
                load: { noBubble: !0 },
                focus: {
                    trigger: function () {
                        if (this !== dr() && this.focus)
                            try {
                                return this.focus(), !1;
                            } catch (n) {}
                    },
                    delegateType: "focusin",
                },
                blur: {
                    trigger: function () {
                        if (this === dr() && this.blur) return this.blur(), !1;
                    },
                    delegateType: "focusout",
                },
                click: {
                    trigger: function () {
                        if (i.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1;
                    },
                    _default: function (n) {
                        return i.nodeName(n.target, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (n) {
                        n.result !== undefined && n.originalEvent && (n.originalEvent.returnValue = n.result);
                    },
                },
            },
            simulate: function (n, t, r, u) {
                var f = i.extend(new i.Event(), r, { type: n, isSimulated: !0, originalEvent: {} });
                u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
                f.isDefaultPrevented() && r.preventDefault();
            },
        };
        i.removeEvent = u.removeEventListener
            ? function (n, t, i) {
                  n.removeEventListener && n.removeEventListener(t, i, !1);
              }
            : function (n, t, i) {
                  var r = "on" + t;
                  n.detachEvent && (typeof n[r] === o && (n[r] = null), n.detachEvent(r, i));
              };
        i.Event = function (n, t) {
            if (!(this instanceof i.Event)) return new i.Event(n, t);
            n && n.type ? ((this.originalEvent = n), (this.type = n.type), (this.isDefaultPrevented = n.defaultPrevented || (n.defaultPrevented === undefined && n.returnValue === !1) ? vt : it)) : (this.type = n);
            t && i.extend(this, t);
            this.timeStamp = (n && n.timeStamp) || i.now();
            this[i.expando] = !0;
        };
        i.Event.prototype = {
            isDefaultPrevented: it,
            isPropagationStopped: it,
            isImmediatePropagationStopped: it,
            preventDefault: function () {
                var n = this.originalEvent;
                ((this.isDefaultPrevented = vt), n) && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1));
            },
            stopPropagation: function () {
                var n = this.originalEvent;
                ((this.isPropagationStopped = vt), n) && (n.stopPropagation && n.stopPropagation(), (n.cancelBubble = !0));
            },
            stopImmediatePropagation: function () {
                var n = this.originalEvent;
                this.isImmediatePropagationStopped = vt;
                n && n.stopImmediatePropagation && n.stopImmediatePropagation();
                this.stopPropagation();
            },
        };
        i.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (n, t) {
            i.event.special[n] = {
                delegateType: t,
                bindType: t,
                handle: function (n) {
                    var u,
                        f = this,
                        r = n.relatedTarget,
                        e = n.handleObj;
                    return (r && (r === f || i.contains(f, r))) || ((n.type = e.origType), (u = e.handler.apply(this, arguments)), (n.type = t)), u;
                },
            };
        });
        r.submitBubbles ||
            (i.event.special.submit = {
                setup: function () {
                    if (i.nodeName(this, "form")) return !1;
                    i.event.add(this, "click._submit keypress._submit", function (n) {
                        var r = n.target,
                            t = i.nodeName(r, "input") || i.nodeName(r, "button") ? r.form : undefined;
                        t &&
                            !i._data(t, "submitBubbles") &&
                            (i.event.add(t, "submit._submit", function (n) {
                                n._submit_bubble = !0;
                            }),
                            i._data(t, "submitBubbles", !0));
                    });
                },
                postDispatch: function (n) {
                    n._submit_bubble && (delete n._submit_bubble, this.parentNode && !n.isTrigger && i.event.simulate("submit", this.parentNode, n, !0));
                },
                teardown: function () {
                    if (i.nodeName(this, "form")) return !1;
                    i.event.remove(this, "._submit");
                },
            });
        r.changeBubbles ||
            (i.event.special.change = {
                setup: function () {
                    if (si.test(this.nodeName))
                        return (
                            (this.type === "checkbox" || this.type === "radio") &&
                                (i.event.add(this, "propertychange._change", function (n) {
                                    n.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                                }),
                                i.event.add(this, "click._change", function (n) {
                                    this._just_changed && !n.isTrigger && (this._just_changed = !1);
                                    i.event.simulate("change", this, n, !0);
                                })),
                            !1
                        );
                    i.event.add(this, "beforeactivate._change", function (n) {
                        var t = n.target;
                        si.test(t.nodeName) &&
                            !i._data(t, "changeBubbles") &&
                            (i.event.add(t, "change._change", function (n) {
                                !this.parentNode || n.isSimulated || n.isTrigger || i.event.simulate("change", this.parentNode, n, !0);
                            }),
                            i._data(t, "changeBubbles", !0));
                    });
                },
                handle: function (n) {
                    var t = n.target;
                    if (this !== t || n.isSimulated || n.isTrigger || (t.type !== "radio" && t.type !== "checkbox")) return n.handleObj.handler.apply(this, arguments);
                },
                teardown: function () {
                    return i.event.remove(this, "._change"), !si.test(this.nodeName);
                },
            });
        r.focusinBubbles ||
            i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
                var r = function (n) {
                    i.event.simulate(t, n.target, i.event.fix(n), !0);
                };
                i.event.special[t] = {
                    setup: function () {
                        var u = this.ownerDocument || this,
                            f = i._data(u, t);
                        f || u.addEventListener(n, r, !0);
                        i._data(u, t, (f || 0) + 1);
                    },
                    teardown: function () {
                        var u = this.ownerDocument || this,
                            f = i._data(u, t) - 1;
                        f ? i._data(u, t, f) : (u.removeEventListener(n, r, !0), i._removeData(u, t));
                    },
                };
            });
        i.fn.extend({
            on: function (n, t, r, u, f) {
                var o, e;
                if (typeof n == "object") {
                    typeof t != "string" && ((r = r || t), (t = undefined));
                    for (o in n) this.on(o, t, r, n[o], f);
                    return this;
                }
                if ((r == null && u == null ? ((u = t), (r = t = undefined)) : u == null && (typeof t == "string" ? ((u = r), (r = undefined)) : ((u = r), (r = t), (t = undefined))), u === !1)) u = it;
                else if (!u) return this;
                return (
                    f === 1 &&
                        ((e = u),
                        (u = function (n) {
                            return i().off(n), e.apply(this, arguments);
                        }),
                        (u.guid = e.guid || (e.guid = i.guid++))),
                    this.each(function () {
                        i.event.add(this, n, u, r, t);
                    })
                );
            },
            one: function (n, t, i, r) {
                return this.on(n, t, i, r, 1);
            },
            off: function (n, t, r) {
                var u, f;
                if (n && n.preventDefault && n.handleObj) return (u = n.handleObj), i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
                if (typeof n == "object") {
                    for (f in n) this.off(f, t, n[f]);
                    return this;
                }
                return (
                    (t === !1 || typeof t == "function") && ((r = t), (t = undefined)),
                    r === !1 && (r = it),
                    this.each(function () {
                        i.event.remove(this, n, r, t);
                    })
                );
            },
            trigger: function (n, t) {
                return this.each(function () {
                    i.event.trigger(n, t, this);
                });
            },
            triggerHandler: function (n, t) {
                var r = this[0];
                if (r) return i.event.trigger(n, t, r, !0);
            },
        });
        var nu = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            he = / jQuery\d+="(?:null|\d+)"/g,
            tu = new RegExp("<(?:" + nu + ")[\\s/>]", "i"),
            hi = /^\s+/,
            iu = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            ru = /<([\w:]+)/,
            uu = /<tbody/i,
            ce = /<|&#?\w+;/,
            le = /<(?:script|style|link)/i,
            ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
            fu = /^$|\/(?:java|ecma)script/i,
            ve = /^true\/(.*)/,
            ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            s = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: r.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
            },
            pe = gr(u),
            ci = pe.appendChild(u.createElement("div"));
        s.optgroup = s.option;
        s.tbody = s.tfoot = s.colgroup = s.caption = s.thead;
        s.th = s.td;
        i.extend({
            clone: function (n, t, u) {
                var e,
                    c,
                    s,
                    o,
                    h,
                    l = i.contains(n.ownerDocument, n);
                if (
                    (r.html5Clone || i.isXMLDoc(n) || !tu.test("<" + n.nodeName + ">") ? (s = n.cloneNode(!0)) : ((ci.innerHTML = n.outerHTML), ci.removeChild((s = ci.firstChild))),
                    (!r.noCloneEvent || !r.noCloneChecked) && (n.nodeType === 1 || n.nodeType === 11) && !i.isXMLDoc(n))
                )
                    for (e = f(s), h = f(n), o = 0; (c = h[o]) != null; ++o) e[o] && be(c, e[o]);
                if (t)
                    if (u) for (h = h || f(n), e = e || f(s), o = 0; (c = h[o]) != null; o++) hu(c, e[o]);
                    else hu(n, s);
                return (e = f(s, "script")), e.length > 0 && li(e, !l && f(n, "script")), (e = h = c = null), s;
            },
            buildFragment: function (n, t, u, e) {
                for (var c, o, b, h, p, w, a, k = n.length, v = gr(t), l = [], y = 0; y < k; y++)
                    if (((o = n[y]), o || o === 0))
                        if (i.type(o) === "object") i.merge(l, o.nodeType ? [o] : o);
                        else if (ce.test(o)) {
                            for (h = h || v.appendChild(t.createElement("div")), p = (ru.exec(o) || ["", ""])[1].toLowerCase(), a = s[p] || s._default, h.innerHTML = a[1] + o.replace(iu, "<$1></$2>") + a[2], c = a[0]; c--; )
                                h = h.lastChild;
                            if ((!r.leadingWhitespace && hi.test(o) && l.push(t.createTextNode(hi.exec(o)[0])), !r.tbody))
                                for (o = p === "table" && !uu.test(o) ? h.firstChild : a[1] === "<table>" && !uu.test(o) ? h : 0, c = o && o.childNodes.length; c--; )
                                    i.nodeName((w = o.childNodes[c]), "tbody") && !w.childNodes.length && o.removeChild(w);
                            for (i.merge(l, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                            h = v.lastChild;
                        } else l.push(t.createTextNode(o));
                for (h && v.removeChild(h), r.appendChecked || i.grep(f(l, "input"), we), y = 0; (o = l[y++]); )
                    if ((!e || i.inArray(o, e) === -1) && ((b = i.contains(o.ownerDocument, o)), (h = f(v.appendChild(o), "script")), b && li(h), u)) for (c = 0; (o = h[c++]); ) fu.test(o.type || "") && u.push(o);
                return (h = null), v;
            },
            cleanData: function (n, t) {
                for (var u, s, f, e, a = 0, h = i.expando, l = i.cache, v = r.deleteExpando, y = i.event.special; (u = n[a]) != null; a++)
                    if ((t || i.acceptData(u)) && ((f = u[h]), (e = f && l[f]), e)) {
                        if (e.events) for (s in e.events) y[s] ? i.event.remove(u, s) : i.removeEvent(u, s, e.handle);
                        l[f] && (delete l[f], v ? delete u[h] : typeof u.removeAttribute !== o ? u.removeAttribute(h) : (u[h] = null), c.push(f));
                    }
            },
        });
        i.fn.extend({
            text: function (n) {
                return b(
                    this,
                    function (n) {
                        return n === undefined ? i.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || u).createTextNode(n));
                    },
                    null,
                    n,
                    arguments.length
                );
            },
            append: function () {
                return this.domManip(arguments, function (n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = eu(this, n);
                        t.appendChild(n);
                    }
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = eu(this, n);
                        t.insertBefore(n, t.firstChild);
                    }
                });
            },
            before: function () {
                return this.domManip(arguments, function (n) {
                    this.parentNode && this.parentNode.insertBefore(n, this);
                });
            },
            after: function () {
                return this.domManip(arguments, function (n) {
                    this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
                });
            },
            remove: function (n, t) {
                for (var r, e = n ? i.filter(n, this) : this, u = 0; (r = e[u]) != null; u++)
                    t || r.nodeType !== 1 || i.cleanData(f(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && li(f(r, "script")), r.parentNode.removeChild(r));
                return this;
            },
            empty: function () {
                for (var n, t = 0; (n = this[t]) != null; t++) {
                    for (n.nodeType === 1 && i.cleanData(f(n, !1)); n.firstChild; ) n.removeChild(n.firstChild);
                    n.options && i.nodeName(n, "select") && (n.options.length = 0);
                }
                return this;
            },
            clone: function (n, t) {
                return (
                    (n = n == null ? !1 : n),
                    (t = t == null ? n : t),
                    this.map(function () {
                        return i.clone(this, n, t);
                    })
                );
            },
            html: function (n) {
                return b(
                    this,
                    function (n) {
                        var t = this[0] || {},
                            u = 0,
                            e = this.length;
                        if (n === undefined) return t.nodeType === 1 ? t.innerHTML.replace(he, "") : undefined;
                        if (typeof n == "string" && !le.test(n) && (r.htmlSerialize || !tu.test(n)) && (r.leadingWhitespace || !hi.test(n)) && !s[(ru.exec(n) || ["", ""])[1].toLowerCase()]) {
                            n = n.replace(iu, "<$1></$2>");
                            try {
                                for (; u < e; u++) (t = this[u] || {}), t.nodeType === 1 && (i.cleanData(f(t, !1)), (t.innerHTML = n));
                                t = 0;
                            } catch (o) {}
                        }
                        t && this.empty().append(n);
                    },
                    null,
                    n,
                    arguments.length
                );
            },
            replaceWith: function () {
                var n = arguments[0];
                return (
                    this.domManip(arguments, function (t) {
                        n = this.parentNode;
                        i.cleanData(f(this));
                        n && n.replaceChild(t, this);
                    }),
                    n && (n.length || n.nodeType) ? this : this.remove()
                );
            },
            detach: function (n) {
                return this.remove(n, !0);
            },
            domManip: function (n, t) {
                n = ir.apply([], n);
                var h,
                    u,
                    c,
                    o,
                    v,
                    s,
                    e = 0,
                    l = this.length,
                    p = this,
                    w = l - 1,
                    a = n[0],
                    y = i.isFunction(a);
                if (y || (l > 1 && typeof a == "string" && !r.checkClone && ae.test(a)))
                    return this.each(function (i) {
                        var r = p.eq(i);
                        y && (n[0] = a.call(this, i, r.html()));
                        r.domManip(n, t);
                    });
                if (l && ((s = i.buildFragment(n, this[0].ownerDocument, !1, this)), (h = s.firstChild), s.childNodes.length === 1 && (s = h), h)) {
                    for (o = i.map(f(s, "script"), ou), c = o.length; e < l; e++) (u = s), e !== w && ((u = i.clone(u, !0, !0)), c && i.merge(o, f(u, "script"))), t.call(this[e], u, e);
                    if (c)
                        for (v = o[o.length - 1].ownerDocument, i.map(o, su), e = 0; e < c; e++)
                            (u = o[e]), fu.test(u.type || "") && !i._data(u, "globalEval") && i.contains(v, u) && (u.src ? i._evalUrl && i._evalUrl(u.src) : i.globalEval((u.text || u.textContent || u.innerHTML || "").replace(ye, "")));
                    s = h = null;
                }
                return this;
            },
        });
        i.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (n, t) {
            i.fn[n] = function (n) {
                for (var u, r = 0, f = [], e = i(n), o = e.length - 1; r <= o; r++) (u = r === o ? this : this.clone(!0)), i(e[r])[t](u), ii.apply(f, u.get());
                return this.pushStack(f);
            };
        });
        (ai = {}),
            (function () {
                var n;
                r.shrinkWrapBlocks = function () {
                    if (n != null) return n;
                    n = !1;
                    var t, i, r;
                    if (((i = u.getElementsByTagName("body")[0]), i && i.style))
                        return (
                            (t = u.createElement("div")),
                            (r = u.createElement("div")),
                            (r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                            i.appendChild(r).appendChild(t),
                            typeof t.style.zoom !== o &&
                                ((t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                                (t.appendChild(u.createElement("div")).style.width = "5px"),
                                (n = t.offsetWidth !== 3)),
                            i.removeChild(r),
                            n
                        );
                };
            })();
        var lu = /^margin/,
            pt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"),
            k,
            d,
            ke = /^(top|right|bottom|left)$/;
        n.getComputedStyle
            ? ((k = function (n) {
                  return n.ownerDocument.defaultView.getComputedStyle(n, null);
              }),
              (d = function (n, t, r) {
                  var e,
                      o,
                      s,
                      u,
                      f = n.style;
                  return (
                      (r = r || k(n)),
                      (u = r ? r.getPropertyValue(t) || r[t] : undefined),
                      r &&
                          (u !== "" || i.contains(n.ownerDocument, n) || (u = i.style(n, t)),
                          pt.test(u) && lu.test(t) && ((e = f.width), (o = f.minWidth), (s = f.maxWidth), (f.minWidth = f.maxWidth = f.width = u), (u = r.width), (f.width = e), (f.minWidth = o), (f.maxWidth = s))),
                      u === undefined ? u : u + ""
                  );
              }))
            : u.documentElement.currentStyle &&
              ((k = function (n) {
                  return n.currentStyle;
              }),
              (d = function (n, t, i) {
                  var o,
                      f,
                      e,
                      r,
                      u = n.style;
                  return (
                      (i = i || k(n)),
                      (r = i ? i[t] : undefined),
                      r == null && u && u[t] && (r = u[t]),
                      pt.test(r) &&
                          !ke.test(t) &&
                          ((o = u.left), (f = n.runtimeStyle), (e = f && f.left), e && (f.left = n.currentStyle.left), (u.left = t === "fontSize" ? "1em" : r), (r = u.pixelLeft + "px"), (u.left = o), e && (f.left = e)),
                      r === undefined ? r : r + "" || "auto"
                  );
              })),
            (function () {
                function c() {
                    var i, r, f, t;
                    ((r = u.getElementsByTagName("body")[0]), r && r.style) &&
                        ((i = u.createElement("div")),
                        (f = u.createElement("div")),
                        (f.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                        r.appendChild(f).appendChild(i),
                        (i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                        (o = s = !1),
                        (h = !0),
                        n.getComputedStyle &&
                            ((o = (n.getComputedStyle(i, null) || {}).top !== "1%"),
                            (s = (n.getComputedStyle(i, null) || { width: "4px" }).width === "4px"),
                            (t = i.appendChild(u.createElement("div"))),
                            (t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                            (t.style.marginRight = t.style.width = "0"),
                            (i.style.width = "1px"),
                            (h = !parseFloat((n.getComputedStyle(t, null) || {}).marginRight))),
                        (i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                        (t = i.getElementsByTagName("td")),
                        (t[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                        (e = t[0].offsetHeight === 0),
                        e && ((t[0].style.display = ""), (t[1].style.display = "none"), (e = t[0].offsetHeight === 0)),
                        r.removeChild(f));
                }
                var f, t, l, o, s, e, h;
                ((f = u.createElement("div")), (f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"), (l = f.getElementsByTagName("a")[0]), (t = l && l.style), t) &&
                    ((t.cssText = "float:left;opacity:.5"),
                    (r.opacity = t.opacity === "0.5"),
                    (r.cssFloat = !!t.cssFloat),
                    (f.style.backgroundClip = "content-box"),
                    (f.cloneNode(!0).style.backgroundClip = ""),
                    (r.clearCloneStyle = f.style.backgroundClip === "content-box"),
                    (r.boxSizing = t.boxSizing === "" || t.MozBoxSizing === "" || t.WebkitBoxSizing === ""),
                    i.extend(r, {
                        reliableHiddenOffsets: function () {
                            return e == null && c(), e;
                        },
                        boxSizingReliable: function () {
                            return s == null && c(), s;
                        },
                        pixelPosition: function () {
                            return o == null && c(), o;
                        },
                        reliableMarginRight: function () {
                            return h == null && c(), h;
                        },
                    }));
            })();
        i.swap = function (n, t, i, r) {
            var f,
                u,
                e = {};
            for (u in t) (e[u] = n.style[u]), (n.style[u] = t[u]);
            f = i.apply(n, r || []);
            for (u in t) n.style[u] = e[u];
            return f;
        };
        var vi = /alpha\([^)]*\)/i,
            de = /opacity\s*=\s*([^)]*)/,
            ge = /^(none|table(?!-c[ea]).+)/,
            no = new RegExp("^(" + at + ")(.*)$", "i"),
            to = new RegExp("^([+-])=(" + at + ")", "i"),
            io = { position: "absolute", visibility: "hidden", display: "block" },
            vu = { letterSpacing: "0", fontWeight: "400" },
            yu = ["Webkit", "O", "Moz", "ms"];
        i.extend({
            cssHooks: {
                opacity: {
                    get: function (n, t) {
                        if (t) {
                            var i = d(n, "opacity");
                            return i === "" ? "1" : i;
                        }
                    },
                },
            },
            cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { float: r.cssFloat ? "cssFloat" : "styleFloat" },
            style: function (n, t, u, f) {
                if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
                    var o,
                        h,
                        e,
                        s = i.camelCase(t),
                        c = n.style;
                    if (((t = i.cssProps[s] || (i.cssProps[s] = pu(c, s))), (e = i.cssHooks[t] || i.cssHooks[s]), u !== undefined)) {
                        if (((h = typeof u), h === "string" && (o = to.exec(u)) && ((u = (o[1] + 1) * o[2] + parseFloat(i.css(n, t))), (h = "number")), u == null || u !== u)) return;
                        if ((h !== "number" || i.cssNumber[s] || (u += "px"), r.clearCloneStyle || u !== "" || t.indexOf("background") !== 0 || (c[t] = "inherit"), !e || !("set" in e) || (u = e.set(n, u, f)) !== undefined))
                            try {
                                c[t] = u;
                            } catch (l) {}
                    } else return e && "get" in e && (o = e.get(n, !1, f)) !== undefined ? o : c[t];
                }
            },
            css: function (n, t, r, u) {
                var s,
                    f,
                    e,
                    o = i.camelCase(t);
                return ((t = i.cssProps[o] || (i.cssProps[o] = pu(n.style, o))),
                (e = i.cssHooks[t] || i.cssHooks[o]),
                e && "get" in e && (f = e.get(n, !0, r)),
                f === undefined && (f = d(n, t, u)),
                f === "normal" && t in vu && (f = vu[t]),
                r === "" || r)
                    ? ((s = parseFloat(f)), r === !0 || i.isNumeric(s) ? s || 0 : f)
                    : f;
            },
        });
        i.each(["height", "width"], function (n, t) {
            i.cssHooks[t] = {
                get: function (n, r, u) {
                    if (r)
                        return ge.test(i.css(n, "display")) && n.offsetWidth === 0
                            ? i.swap(n, io, function () {
                                  return du(n, t, u);
                              })
                            : du(n, t, u);
                },
                set: function (n, u, f) {
                    var e = f && k(n);
                    return bu(n, u, f ? ku(n, t, f, r.boxSizing && i.css(n, "boxSizing", !1, e) === "border-box", e) : 0);
                },
            };
        });
        r.opacity ||
            (i.cssHooks.opacity = {
                get: function (n, t) {
                    return de.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
                },
                set: function (n, t) {
                    var r = n.style,
                        u = n.currentStyle,
                        e = i.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                        f = (u && u.filter) || r.filter || "";
                    ((r.zoom = 1), (t >= 1 || t === "") && i.trim(f.replace(vi, "")) === "" && r.removeAttribute && (r.removeAttribute("filter"), t === "" || (u && !u.filter))) || (r.filter = vi.test(f) ? f.replace(vi, e) : f + " " + e);
                },
            });
        i.cssHooks.marginRight = au(r.reliableMarginRight, function (n, t) {
            if (t) return i.swap(n, { display: "inline-block" }, d, [n, "marginRight"]);
        });
        i.each({ margin: "", padding: "", border: "Width" }, function (n, t) {
            i.cssHooks[n + t] = {
                expand: function (i) {
                    for (var r = 0, f = {}, u = typeof i == "string" ? i.split(" ") : [i]; r < 4; r++) f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
                    return f;
                },
            };
            lu.test(n) || (i.cssHooks[n + t].set = bu);
        });
        i.fn.extend({
            css: function (n, t) {
                return b(
                    this,
                    function (n, t, r) {
                        var f,
                            e,
                            o = {},
                            u = 0;
                        if (i.isArray(t)) {
                            for (f = k(n), e = t.length; u < e; u++) o[t[u]] = i.css(n, t[u], !1, f);
                            return o;
                        }
                        return r !== undefined ? i.style(n, t, r) : i.css(n, t);
                    },
                    n,
                    t,
                    arguments.length > 1
                );
            },
            show: function () {
                return wu(this, !0);
            },
            hide: function () {
                return wu(this);
            },
            toggle: function (n) {
                return typeof n == "boolean"
                    ? n
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          et(this) ? i(this).show() : i(this).hide();
                      });
            },
        });
        i.Tween = e;
        e.prototype = {
            constructor: e,
            init: function (n, t, r, u, f, e) {
                this.elem = n;
                this.prop = r;
                this.easing = f || "swing";
                this.options = t;
                this.start = this.now = this.cur();
                this.end = u;
                this.unit = e || (i.cssNumber[r] ? "" : "px");
            },
            cur: function () {
                var n = e.propHooks[this.prop];
                return n && n.get ? n.get(this) : e.propHooks._default.get(this);
            },
            run: function (n) {
                var t,
                    r = e.propHooks[this.prop];
                return (
                    (this.pos = this.options.duration ? (t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration)) : (t = n)),
                    (this.now = (this.end - this.start) * t + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    r && r.set ? r.set(this) : e.propHooks._default.set(this),
                    this
                );
            },
        };
        e.prototype.init.prototype = e.prototype;
        e.propHooks = {
            _default: {
                get: function (n) {
                    var t;
                    return n.elem[n.prop] != null && (!n.elem.style || n.elem.style[n.prop] == null) ? n.elem[n.prop] : ((t = i.css(n.elem, n.prop, "")), !t || t === "auto" ? 0 : t);
                },
                set: function (n) {
                    i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (n.elem.style[i.cssProps[n.prop]] != null || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : (n.elem[n.prop] = n.now);
                },
            },
        };
        e.propHooks.scrollTop = e.propHooks.scrollLeft = {
            set: function (n) {
                n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
            },
        };
        i.easing = {
            linear: function (n) {
                return n;
            },
            swing: function (n) {
                return 0.5 - Math.cos(n * Math.PI) / 2;
            },
        };
        i.fx = e.prototype.init;
        i.fx.step = {};
        var rt,
            wt,
            ro = /^(?:toggle|show|hide)$/,
            gu = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"),
            uo = /queueHooks$/,
            bt = [fo],
            st = {
                "*": [
                    function (n, t) {
                        var f = this.createTween(n, t),
                            s = f.cur(),
                            u = gu.exec(t),
                            e = (u && u[3]) || (i.cssNumber[n] ? "" : "px"),
                            r = (i.cssNumber[n] || (e !== "px" && +s)) && gu.exec(i.css(f.elem, n)),
                            o = 1,
                            h = 20;
                        if (r && r[3] !== e) {
                            e = e || r[3];
                            u = u || [];
                            r = +s || 1;
                            do (o = o || ".5"), (r = r / o), i.style(f.elem, n, r + e);
                            while (o !== (o = f.cur() / s) && o !== 1 && --h);
                        }
                        return u && ((r = f.start = +r || +s || 0), (f.unit = e), (f.end = u[1] ? r + (u[1] + 1) * u[2] : +u[2])), f;
                    },
                ],
            };
        i.Animation = i.extend(rf, {
            tweener: function (n, t) {
                i.isFunction(n) ? ((t = n), (n = ["*"])) : (n = n.split(" "));
                for (var r, u = 0, f = n.length; u < f; u++) (r = n[u]), (st[r] = st[r] || []), st[r].unshift(t);
            },
            prefilter: function (n, t) {
                t ? bt.unshift(n) : bt.push(n);
            },
        });
        i.speed = function (n, t, r) {
            var u = n && typeof n == "object" ? i.extend({}, n) : { complete: r || (!r && t) || (i.isFunction(n) && n), duration: n, easing: (r && t) || (t && !i.isFunction(t) && t) };
            return (
                (u.duration = i.fx.off ? 0 : typeof u.duration == "number" ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default),
                (u.queue == null || u.queue === !0) && (u.queue = "fx"),
                (u.old = u.complete),
                (u.complete = function () {
                    i.isFunction(u.old) && u.old.call(this);
                    u.queue && i.dequeue(this, u.queue);
                }),
                u
            );
        };
        i.fn.extend({
            fadeTo: function (n, t, i, r) {
                return this.filter(et).css("opacity", 0).show().end().animate({ opacity: t }, n, i, r);
            },
            animate: function (n, t, r, u) {
                var o = i.isEmptyObject(n),
                    e = i.speed(t, r, u),
                    f = function () {
                        var t = rf(this, i.extend({}, n), e);
                        (o || i._data(this, "finish")) && t.stop(!0);
                    };
                return (f.finish = f), o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f);
            },
            stop: function (n, t, r) {
                var u = function (n) {
                    var t = n.stop;
                    delete n.stop;
                    t(r);
                };
                return (
                    typeof n != "string" && ((r = t), (t = n), (n = undefined)),
                    t && n !== !1 && this.queue(n || "fx", []),
                    this.each(function () {
                        var o = !0,
                            t = n != null && n + "queueHooks",
                            e = i.timers,
                            f = i._data(this);
                        if (t) f[t] && f[t].stop && u(f[t]);
                        else for (t in f) f[t] && f[t].stop && uo.test(t) && u(f[t]);
                        for (t = e.length; t--; ) e[t].elem === this && (n == null || e[t].queue === n) && (e[t].anim.stop(r), (o = !1), e.splice(t, 1));
                        (o || !r) && i.dequeue(this, n);
                    })
                );
            },
            finish: function (n) {
                return (
                    n !== !1 && (n = n || "fx"),
                    this.each(function () {
                        var t,
                            f = i._data(this),
                            r = f[n + "queue"],
                            e = f[n + "queueHooks"],
                            u = i.timers,
                            o = r ? r.length : 0;
                        for (f.finish = !0, i.queue(this, n, []), e && e.stop && e.stop.call(this, !0), t = u.length; t--; ) u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0), u.splice(t, 1));
                        for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                        delete f.finish;
                    })
                );
            },
        });
        i.each(["toggle", "show", "hide"], function (n, t) {
            var r = i.fn[t];
            i.fn[t] = function (n, i, u) {
                return n == null || typeof n == "boolean" ? r.apply(this, arguments) : this.animate(kt(t, !0), n, i, u);
            };
        });
        i.each({ slideDown: kt("show"), slideUp: kt("hide"), slideToggle: kt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (n, t) {
            i.fn[n] = function (n, i, r) {
                return this.animate(t, n, i, r);
            };
        });
        i.timers = [];
        i.fx.tick = function () {
            var r,
                n = i.timers,
                t = 0;
            for (rt = i.now(); t < n.length; t++) (r = n[t]), r() || n[t] !== r || n.splice(t--, 1);
            n.length || i.fx.stop();
            rt = undefined;
        };
        i.fx.timer = function (n) {
            i.timers.push(n);
            n() ? i.fx.start() : i.timers.pop();
        };
        i.fx.interval = 13;
        i.fx.start = function () {
            wt || (wt = setInterval(i.fx.tick, i.fx.interval));
        };
        i.fx.stop = function () {
            clearInterval(wt);
            wt = null;
        };
        i.fx.speeds = { slow: 600, fast: 200, _default: 400 };
        (i.fn.delay = function (n, t) {
            return (
                (n = i.fx ? i.fx.speeds[n] || n : n),
                (t = t || "fx"),
                this.queue(t, function (t, i) {
                    var r = setTimeout(t, n);
                    i.stop = function () {
                        clearTimeout(r);
                    };
                })
            );
        }),
            (function () {
                var n, t, f, i, e;
                t = u.createElement("div");
                t.setAttribute("className", "t");
                t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                i = t.getElementsByTagName("a")[0];
                f = u.createElement("select");
                e = f.appendChild(u.createElement("option"));
                n = t.getElementsByTagName("input")[0];
                i.style.cssText = "top:1px";
                r.getSetAttribute = t.className !== "t";
                r.style = /top/.test(i.getAttribute("style"));
                r.hrefNormalized = i.getAttribute("href") === "/a";
                r.checkOn = !!n.value;
                r.optSelected = e.selected;
                r.enctype = !!u.createElement("form").enctype;
                f.disabled = !0;
                r.optDisabled = !e.disabled;
                n = u.createElement("input");
                n.setAttribute("value", "");
                r.input = n.getAttribute("value") === "";
                n.value = "t";
                n.setAttribute("type", "radio");
                r.radioValue = n.value === "t";
            })();
        uf = /\r/g;
        i.fn.extend({
            val: function (n) {
                var t,
                    r,
                    f,
                    u = this[0];
                return arguments.length
                    ? ((f = i.isFunction(n)),
                      this.each(function (r) {
                          var u;
                          this.nodeType === 1 &&
                              ((u = f ? n.call(this, r, i(this).val()) : n),
                              u == null
                                  ? (u = "")
                                  : typeof u == "number"
                                  ? (u += "")
                                  : i.isArray(u) &&
                                    (u = i.map(u, function (n) {
                                        return n == null ? "" : n + "";
                                    })),
                              (t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()]),
                              (t && "set" in t && t.set(this, u, "value") !== undefined) || (this.value = u));
                      }))
                    : u
                    ? ((t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()]), t && "get" in t && (r = t.get(u, "value")) !== undefined)
                        ? r
                        : ((r = u.value), typeof r == "string" ? r.replace(uf, "") : r == null ? "" : r)
                    : void 0;
            },
        });
        i.extend({
            valHooks: {
                option: {
                    get: function (n) {
                        var t = i.find.attr(n, "value");
                        return t != null ? t : i.trim(i.text(n));
                    },
                },
                select: {
                    get: function (n) {
                        for (var o, t, s = n.options, u = n.selectedIndex, f = n.type === "select-one" || u < 0, h = f ? null : [], c = f ? u + 1 : s.length, e = u < 0 ? c : f ? u : 0; e < c; e++)
                            if (((t = s[e]), (t.selected || e === u) && (r.optDisabled ? !t.disabled : t.getAttribute("disabled") === null) && (!t.parentNode.disabled || !i.nodeName(t.parentNode, "optgroup")))) {
                                if (((o = i(t).val()), f)) return o;
                                h.push(o);
                            }
                        return h;
                    },
                    set: function (n, t) {
                        for (var f, r, u = n.options, o = i.makeArray(t), e = u.length; e--; )
                            if (((r = u[e]), i.inArray(i.valHooks.option.get(r), o) >= 0))
                                try {
                                    r.selected = f = !0;
                                } catch (s) {
                                    r.scrollHeight;
                                }
                            else r.selected = !1;
                        return f || (n.selectedIndex = -1), u;
                    },
                },
            },
        });
        i.each(["radio", "checkbox"], function () {
            i.valHooks[this] = {
                set: function (n, t) {
                    if (i.isArray(t)) return (n.checked = i.inArray(i(n).val(), t) >= 0);
                },
            };
            r.checkOn ||
                (i.valHooks[this].get = function (n) {
                    return n.getAttribute("value") === null ? "on" : n.value;
                });
        });
        var ut,
            ff,
            v = i.expr.attrHandle,
            yi = /^(?:checked|selected)$/i,
            g = r.getSetAttribute,
            dt = r.input;
        i.fn.extend({
            attr: function (n, t) {
                return b(this, i.attr, n, t, arguments.length > 1);
            },
            removeAttr: function (n) {
                return this.each(function () {
                    i.removeAttr(this, n);
                });
            },
        });
        i.extend({
            attr: function (n, t, r) {
                var u,
                    f,
                    e = n.nodeType;
                if (n && e !== 3 && e !== 8 && e !== 2) {
                    if (typeof n.getAttribute === o) return i.prop(n, t, r);
                    if (((e === 1 && i.isXMLDoc(n)) || ((t = t.toLowerCase()), (u = i.attrHooks[t] || (i.expr.match.bool.test(t) ? ff : ut))), r !== undefined))
                        if (r === null) i.removeAttr(n, t);
                        else return u && "set" in u && (f = u.set(n, r, t)) !== undefined ? f : (n.setAttribute(t, r + ""), r);
                    else return u && "get" in u && (f = u.get(n, t)) !== null ? f : ((f = i.find.attr(n, t)), f == null ? undefined : f);
                }
            },
            removeAttr: function (n, t) {
                var r,
                    u,
                    e = 0,
                    f = t && t.match(h);
                if (f && n.nodeType === 1)
                    while ((r = f[e++])) (u = i.propFix[r] || r), i.expr.match.bool.test(r) ? ((dt && g) || !yi.test(r) ? (n[u] = !1) : (n[i.camelCase("default-" + r)] = n[u] = !1)) : i.attr(n, r, ""), n.removeAttribute(g ? r : u);
            },
            attrHooks: {
                type: {
                    set: function (n, t) {
                        if (!r.radioValue && t === "radio" && i.nodeName(n, "input")) {
                            var u = n.value;
                            return n.setAttribute("type", t), u && (n.value = u), t;
                        }
                    },
                },
            },
        });
        ff = {
            set: function (n, t, r) {
                return t === !1 ? i.removeAttr(n, r) : (dt && g) || !yi.test(r) ? n.setAttribute((!g && i.propFix[r]) || r, r) : (n[i.camelCase("default-" + r)] = n[r] = !0), r;
            },
        };
        i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
            var r = v[t] || i.find.attr;
            v[t] =
                (dt && g) || !yi.test(t)
                    ? function (n, t, i) {
                          var u, f;
                          return i || ((f = v[t]), (v[t] = u), (u = r(n, t, i) != null ? t.toLowerCase() : null), (v[t] = f)), u;
                      }
                    : function (n, t, r) {
                          if (!r) return n[i.camelCase("default-" + t)] ? t.toLowerCase() : null;
                      };
        });
        (dt && g) ||
            (i.attrHooks.value = {
                set: function (n, t, r) {
                    if (i.nodeName(n, "input")) n.defaultValue = t;
                    else return ut && ut.set(n, t, r);
                },
            });
        g ||
            ((ut = {
                set: function (n, t, i) {
                    var r = n.getAttributeNode(i);
                    return r || n.setAttributeNode((r = n.ownerDocument.createAttribute(i))), (r.value = t += ""), i === "value" || t === n.getAttribute(i) ? t : void 0;
                },
            }),
            (v.id = v.name = v.coords = function (n, t, i) {
                var r;
                if (!i) return (r = n.getAttributeNode(t)) && r.value !== "" ? r.value : null;
            }),
            (i.valHooks.button = {
                get: function (n, t) {
                    var i = n.getAttributeNode(t);
                    if (i && i.specified) return i.value;
                },
                set: ut.set,
            }),
            (i.attrHooks.contenteditable = {
                set: function (n, t, i) {
                    ut.set(n, t === "" ? !1 : t, i);
                },
            }),
            i.each(["width", "height"], function (n, t) {
                i.attrHooks[t] = {
                    set: function (n, i) {
                        if (i === "") return n.setAttribute(t, "auto"), i;
                    },
                };
            }));
        r.style ||
            (i.attrHooks.style = {
                get: function (n) {
                    return n.style.cssText || undefined;
                },
                set: function (n, t) {
                    return (n.style.cssText = t + "");
                },
            });
        ef = /^(?:input|select|textarea|button|object)$/i;
        of = /^(?:a|area)$/i;
        i.fn.extend({
            prop: function (n, t) {
                return b(this, i.prop, n, t, arguments.length > 1);
            },
            removeProp: function (n) {
                return (
                    (n = i.propFix[n] || n),
                    this.each(function () {
                        try {
                            this[n] = undefined;
                            delete this[n];
                        } catch (t) {}
                    })
                );
            },
        });
        i.extend({
            propFix: { for: "htmlFor", class: "className" },
            prop: function (n, t, r) {
                var f,
                    u,
                    o,
                    e = n.nodeType;
                if (n && e !== 3 && e !== 8 && e !== 2)
                    return (
                        (o = e !== 1 || !i.isXMLDoc(n)),
                        o && ((t = i.propFix[t] || t), (u = i.propHooks[t])),
                        r !== undefined ? (u && "set" in u && (f = u.set(n, r, t)) !== undefined ? f : (n[t] = r)) : u && "get" in u && (f = u.get(n, t)) !== null ? f : n[t]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (n) {
                        var t = i.find.attr(n, "tabindex");
                        return t ? parseInt(t, 10) : ef.test(n.nodeName) || (of.test(n.nodeName) && n.href) ? 0 : -1;
                    },
                },
            },
        });
        r.hrefNormalized ||
            i.each(["href", "src"], function (n, t) {
                i.propHooks[t] = {
                    get: function (n) {
                        return n.getAttribute(t, 4);
                    },
                };
            });
        r.optSelected ||
            (i.propHooks.selected = {
                get: function (n) {
                    var t = n.parentNode;
                    return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
                },
            });
        i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            i.propFix[this.toLowerCase()] = this;
        });
        r.enctype || (i.propFix.enctype = "encoding");
        gt = /[\t\r\n\f]/g;
        i.fn.extend({
            addClass: function (n) {
                var o,
                    t,
                    r,
                    u,
                    s,
                    f,
                    e = 0,
                    c = this.length,
                    l = typeof n == "string" && n;
                if (i.isFunction(n))
                    return this.each(function (t) {
                        i(this).addClass(n.call(this, t, this.className));
                    });
                if (l)
                    for (o = (n || "").match(h) || []; e < c; e++)
                        if (((t = this[e]), (r = t.nodeType === 1 && (t.className ? (" " + t.className + " ").replace(gt, " ") : " ")), r)) {
                            for (s = 0; (u = o[s++]); ) r.indexOf(" " + u + " ") < 0 && (r += u + " ");
                            f = i.trim(r);
                            t.className !== f && (t.className = f);
                        }
                return this;
            },
            removeClass: function (n) {
                var o,
                    t,
                    r,
                    u,
                    s,
                    f,
                    e = 0,
                    c = this.length,
                    l = arguments.length === 0 || (typeof n == "string" && n);
                if (i.isFunction(n))
                    return this.each(function (t) {
                        i(this).removeClass(n.call(this, t, this.className));
                    });
                if (l)
                    for (o = (n || "").match(h) || []; e < c; e++)
                        if (((t = this[e]), (r = t.nodeType === 1 && (t.className ? (" " + t.className + " ").replace(gt, " ") : "")), r)) {
                            for (s = 0; (u = o[s++]); ) while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
                            f = n ? i.trim(r) : "";
                            t.className !== f && (t.className = f);
                        }
                return this;
            },
            toggleClass: function (n, t) {
                var r = typeof n;
                return typeof t == "boolean" && r === "string"
                    ? t
                        ? this.addClass(n)
                        : this.removeClass(n)
                    : i.isFunction(n)
                    ? this.each(function (r) {
                          i(this).toggleClass(n.call(this, r, this.className, t), t);
                      })
                    : this.each(function () {
                          if (r === "string") for (var t, f = 0, u = i(this), e = n.match(h) || []; (t = e[f++]); ) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                          else (r === o || r === "boolean") && (this.className && i._data(this, "__className__", this.className), (this.className = this.className || n === !1 ? "" : i._data(this, "__className__") || ""));
                      });
            },
            hasClass: function (n) {
                for (var i = " " + n + " ", t = 0, r = this.length; t < r; t++) if (this[t].nodeType === 1 && (" " + this[t].className + " ").replace(gt, " ").indexOf(i) >= 0) return !0;
                return !1;
            },
        });
        i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (
            n,
            t
        ) {
            i.fn[t] = function (n, i) {
                return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t);
            };
        });
        i.fn.extend({
            hover: function (n, t) {
                return this.mouseenter(n).mouseleave(t || n);
            },
            bind: function (n, t, i) {
                return this.on(n, null, t, i);
            },
            unbind: function (n, t) {
                return this.off(n, null, t);
            },
            delegate: function (n, t, i, r) {
                return this.on(t, n, i, r);
            },
            undelegate: function (n, t, i) {
                return arguments.length === 1 ? this.off(n, "**") : this.off(t, n || "**", i);
            },
        });
        var pi = i.now(),
            wi = /\?/,
            oo = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        i.parseJSON = function (t) {
            if (n.JSON && n.JSON.parse) return n.JSON.parse(t + "");
            var f,
                r = null,
                u = i.trim(t + "");
            return u &&
                !i.trim(
                    u.replace(oo, function (n, t, i, u) {
                        return (f && t && (r = 0), r === 0) ? n : ((f = i || t), (r += !u - !i), "");
                    })
                )
                ? Function("return " + u)()
                : i.error("Invalid JSON: " + t);
        };
        i.parseXML = function (t) {
            var r, u;
            if (!t || typeof t != "string") return null;
            try {
                n.DOMParser ? ((u = new DOMParser()), (r = u.parseFromString(t, "text/xml"))) : ((r = new ActiveXObject("Microsoft.XMLDOM")), (r.async = "false"), r.loadXML(t));
            } catch (f) {
                r = undefined;
            }
            return (r && r.documentElement && !r.getElementsByTagName("parsererror").length) || i.error("Invalid XML: " + t), r;
        };
        var nt,
            y,
            so = /#.*$/,
            sf = /([?&])_=[^&]*/,
            ho = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            co = /^(?:GET|HEAD)$/,
            lo = /^\/\//,
            hf = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            cf = {},
            bi = {},
            lf = "*/".concat("*");
        try {
            y = location.href;
        } catch (ns) {
            y = u.createElement("a");
            y.href = "";
            y = y.href;
        }
        nt = hf.exec(y.toLowerCase()) || [];
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: y,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(nt[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": lf, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /xml/, html: /html/, json: /json/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": i.parseJSON, "text xml": i.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (n, t) {
                return t ? ki(ki(n, i.ajaxSettings), t) : ki(i.ajaxSettings, n);
            },
            ajaxPrefilter: af(cf),
            ajaxTransport: af(bi),
            ajax: function (n, t) {
                function w(n, t, s, h) {
                    var v,
                        it,
                        nt,
                        y,
                        w,
                        c = t;
                    e !== 2 &&
                        ((e = 2),
                        k && clearTimeout(k),
                        (l = undefined),
                        (b = h || ""),
                        (u.readyState = n > 0 ? 4 : 0),
                        (v = (n >= 200 && n < 300) || n === 304),
                        s && (y = ao(r, u, s)),
                        (y = vo(r, y, u, v)),
                        v
                            ? (r.ifModified && ((w = u.getResponseHeader("Last-Modified")), w && (i.lastModified[f] = w), (w = u.getResponseHeader("etag")), w && (i.etag[f] = w)),
                              n === 204 || r.type === "HEAD" ? (c = "nocontent") : n === 304 ? (c = "notmodified") : ((c = y.state), (it = y.data), (nt = y.error), (v = !nt)))
                            : ((nt = c), (n || !c) && ((c = "error"), n < 0 && (n = 0))),
                        (u.status = n),
                        (u.statusText = (t || c) + ""),
                        v ? g.resolveWith(o, [it, c, u]) : g.rejectWith(o, [u, c, nt]),
                        u.statusCode(p),
                        (p = undefined),
                        a && d.trigger(v ? "ajaxSuccess" : "ajaxError", [u, r, v ? it : nt]),
                        tt.fireWith(o, [u, c]),
                        a && (d.trigger("ajaxComplete", [u, r]), --i.active || i.event.trigger("ajaxStop")));
                }
                typeof n == "object" && ((t = n), (n = undefined));
                t = t || {};
                var s,
                    c,
                    f,
                    b,
                    k,
                    a,
                    l,
                    v,
                    r = i.ajaxSetup({}, t),
                    o = r.context || r,
                    d = r.context && (o.nodeType || o.jquery) ? i(o) : i.event,
                    g = i.Deferred(),
                    tt = i.Callbacks("once memory"),
                    p = r.statusCode || {},
                    it = {},
                    rt = {},
                    e = 0,
                    ut = "canceled",
                    u = {
                        readyState: 0,
                        getResponseHeader: function (n) {
                            var t;
                            if (e === 2) {
                                if (!v) for (v = {}; (t = ho.exec(b)); ) v[t[1].toLowerCase()] = t[2];
                                t = v[n.toLowerCase()];
                            }
                            return t == null ? null : t;
                        },
                        getAllResponseHeaders: function () {
                            return e === 2 ? b : null;
                        },
                        setRequestHeader: function (n, t) {
                            var i = n.toLowerCase();
                            return e || ((n = rt[i] = rt[i] || n), (it[n] = t)), this;
                        },
                        overrideMimeType: function (n) {
                            return e || (r.mimeType = n), this;
                        },
                        statusCode: function (n) {
                            var t;
                            if (n)
                                if (e < 2) for (t in n) p[t] = [p[t], n[t]];
                                else u.always(n[u.status]);
                            return this;
                        },
                        abort: function (n) {
                            var t = n || ut;
                            return l && l.abort(t), w(0, t), this;
                        },
                    };
                if (
                    ((g.promise(u).complete = tt.add),
                    (u.success = u.done),
                    (u.error = u.fail),
                    (r.url = ((n || r.url || y) + "").replace(so, "").replace(lo, nt[1] + "//")),
                    (r.type = t.method || t.type || r.method || r.type),
                    (r.dataTypes = i
                        .trim(r.dataType || "*")
                        .toLowerCase()
                        .match(h) || [""]),
                    r.crossDomain == null &&
                        ((s = hf.exec(r.url.toLowerCase())), (r.crossDomain = !!(s && (s[1] !== nt[1] || s[2] !== nt[2] || (s[3] || (s[1] === "http:" ? "80" : "443")) !== (nt[3] || (nt[1] === "http:" ? "80" : "443")))))),
                    r.data && r.processData && typeof r.data != "string" && (r.data = i.param(r.data, r.traditional)),
                    vf(cf, r, t, u),
                    e === 2)
                )
                    return u;
                a = r.global;
                a && i.active++ == 0 && i.event.trigger("ajaxStart");
                r.type = r.type.toUpperCase();
                r.hasContent = !co.test(r.type);
                f = r.url;
                r.hasContent || (r.data && ((f = r.url += (wi.test(f) ? "&" : "?") + r.data), delete r.data), r.cache === !1 && (r.url = sf.test(f) ? f.replace(sf, "$1_=" + pi++) : f + (wi.test(f) ? "&" : "?") + "_=" + pi++));
                r.ifModified && (i.lastModified[f] && u.setRequestHeader("If-Modified-Since", i.lastModified[f]), i.etag[f] && u.setRequestHeader("If-None-Match", i.etag[f]));
                ((r.data && r.hasContent && r.contentType !== !1) || t.contentType) && u.setRequestHeader("Content-Type", r.contentType);
                u.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + lf + "; q=0.01" : "") : r.accepts["*"]);
                for (c in r.headers) u.setRequestHeader(c, r.headers[c]);
                if (r.beforeSend && (r.beforeSend.call(o, u, r) === !1 || e === 2)) return u.abort();
                ut = "abort";
                for (c in { success: 1, error: 1, complete: 1 }) u[c](r[c]);
                if (((l = vf(bi, r, t, u)), l)) {
                    u.readyState = 1;
                    a && d.trigger("ajaxSend", [u, r]);
                    r.async &&
                        r.timeout > 0 &&
                        (k = setTimeout(function () {
                            u.abort("timeout");
                        }, r.timeout));
                    try {
                        e = 1;
                        l.send(it, w);
                    } catch (ft) {
                        if (e < 2) w(-1, ft);
                        else throw ft;
                    }
                } else w(-1, "No Transport");
                return u;
            },
            getJSON: function (n, t, r) {
                return i.get(n, t, r, "json");
            },
            getScript: function (n, t) {
                return i.get(n, undefined, t, "script");
            },
        });
        i.each(["get", "post"], function (n, t) {
            i[t] = function (n, r, u, f) {
                return i.isFunction(r) && ((f = f || u), (u = r), (r = undefined)), i.ajax({ url: n, type: t, dataType: f, data: r, success: u });
            };
        });
        i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
            i.fn[t] = function (n) {
                return this.on(t, n);
            };
        });
        i._evalUrl = function (n) {
            return i.ajax({ url: n, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        };
        i.fn.extend({
            wrapAll: function (n) {
                if (i.isFunction(n))
                    return this.each(function (t) {
                        i(this).wrapAll(n.call(this, t));
                    });
                if (this[0]) {
                    var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]);
                    t.map(function () {
                        for (var n = this; n.firstChild && n.firstChild.nodeType === 1; ) n = n.firstChild;
                        return n;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function (n) {
                return i.isFunction(n)
                    ? this.each(function (t) {
                          i(this).wrapInner(n.call(this, t));
                      })
                    : this.each(function () {
                          var t = i(this),
                              r = t.contents();
                          r.length ? r.wrapAll(n) : t.append(n);
                      });
            },
            wrap: function (n) {
                var t = i.isFunction(n);
                return this.each(function (r) {
                    i(this).wrapAll(t ? n.call(this, r) : n);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        i.nodeName(this, "body") || i(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        });
        i.expr.filters.hidden = function (n) {
            return (n.offsetWidth <= 0 && n.offsetHeight <= 0) || (!r.reliableHiddenOffsets() && ((n.style && n.style.display) || i.css(n, "display")) === "none");
        };
        i.expr.filters.visible = function (n) {
            return !i.expr.filters.hidden(n);
        };
        var yo = /%20/g,
            po = /\[\]$/,
            yf = /\r?\n/g,
            wo = /^(?:submit|button|image|reset|file)$/i,
            bo = /^(?:input|select|textarea|keygen)/i;
        i.param = function (n, t) {
            var r,
                u = [],
                f = function (n, t) {
                    t = i.isFunction(t) ? t() : t == null ? "" : t;
                    u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t);
                };
            if ((t === undefined && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || (n.jquery && !i.isPlainObject(n))))
                i.each(n, function () {
                    f(this.name, this.value);
                });
            else for (r in n) di(r, n[r], t, f);
            return u.join("&").replace(yo, "+");
        };
        i.fn.extend({
            serialize: function () {
                return i.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var n = i.prop(this, "elements");
                    return n ? i.makeArray(n) : this;
                })
                    .filter(function () {
                        var n = this.type;
                        return this.name && !i(this).is(":disabled") && bo.test(this.nodeName) && !wo.test(n) && (this.checked || !oi.test(n));
                    })
                    .map(function (n, t) {
                        var r = i(this).val();
                        return r == null
                            ? null
                            : i.isArray(r)
                            ? i.map(r, function (n) {
                                  return { name: t.name, value: n.replace(yf, "\r\n") };
                              })
                            : { name: t.name, value: r.replace(yf, "\r\n") };
                    })
                    .get();
            },
        });
        i.ajaxSettings.xhr =
            n.ActiveXObject !== undefined
                ? function () {
                      return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && pf()) || go();
                  }
                : pf;
        var ko = 0,
            ni = {},
            ht = i.ajaxSettings.xhr();
        if (n.ActiveXObject)
            i(n).on("unload", function () {
                for (var n in ni) ni[n](undefined, !0);
            });
        return (
            (r.cors = !!ht && "withCredentials" in ht),
            (ht = r.ajax = !!ht),
            ht &&
                i.ajaxTransport(function (n) {
                    if (!n.crossDomain || r.cors) {
                        var t;
                        return {
                            send: function (r, u) {
                                var e,
                                    f = n.xhr(),
                                    o = ++ko;
                                if ((f.open(n.type, n.url, n.async, n.username, n.password), n.xhrFields)) for (e in n.xhrFields) f[e] = n.xhrFields[e];
                                n.mimeType && f.overrideMimeType && f.overrideMimeType(n.mimeType);
                                n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                                for (e in r) r[e] !== undefined && f.setRequestHeader(e, r[e] + "");
                                f.send((n.hasContent && n.data) || null);
                                t = function (r, e) {
                                    var s, c, h;
                                    if (t && (e || f.readyState === 4))
                                        if ((delete ni[o], (t = undefined), (f.onreadystatechange = i.noop), e)) f.readyState !== 4 && f.abort();
                                        else {
                                            h = {};
                                            s = f.status;
                                            typeof f.responseText == "string" && (h.text = f.responseText);
                                            try {
                                                c = f.statusText;
                                            } catch (l) {
                                                c = "";
                                            }
                                            s || !n.isLocal || n.crossDomain ? s === 1223 && (s = 204) : (s = h.text ? 200 : 404);
                                        }
                                    h && u(s, c, h, f.getAllResponseHeaders());
                                };
                                n.async ? (f.readyState === 4 ? setTimeout(t) : (f.onreadystatechange = ni[o] = t)) : t();
                            },
                            abort: function () {
                                t && t(undefined, !0);
                            },
                        };
                    }
                }),
            i.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /(?:java|ecma)script/ },
                converters: {
                    "text script": function (n) {
                        return i.globalEval(n), n;
                    },
                },
            }),
            i.ajaxPrefilter("script", function (n) {
                n.cache === undefined && (n.cache = !1);
                n.crossDomain && ((n.type = "GET"), (n.global = !1));
            }),
            i.ajaxTransport("script", function (n) {
                if (n.crossDomain) {
                    var t,
                        r = u.head || i("head")[0] || u.documentElement;
                    return {
                        send: function (i, f) {
                            t = u.createElement("script");
                            t.async = !0;
                            n.scriptCharset && (t.charset = n.scriptCharset);
                            t.src = n.url;
                            t.onload = t.onreadystatechange = function (n, i) {
                                (i || !t.readyState || /loaded|complete/.test(t.readyState)) && ((t.onload = t.onreadystatechange = null), t.parentNode && t.parentNode.removeChild(t), (t = null), i || f(200, "success"));
                            };
                            r.insertBefore(t, r.firstChild);
                        },
                        abort: function () {
                            if (t) t.onload(undefined, !0);
                        },
                    };
                }
            }),
            (gi = []),
            (ti = /(=)\?(?=&|$)|\?\?/),
            i.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var n = gi.pop() || i.expando + "_" + pi++;
                    return (this[n] = !0), n;
                },
            }),
            i.ajaxPrefilter("json jsonp", function (t, r, u) {
                var f,
                    o,
                    e,
                    s = t.jsonp !== !1 && (ti.test(t.url) ? "url" : typeof t.data == "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(t.data) && "data");
                if (s || t.dataTypes[0] === "jsonp")
                    return (
                        (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                        s ? (t[s] = t[s].replace(ti, "$1" + f)) : t.jsonp !== !1 && (t.url += (wi.test(t.url) ? "&" : "?") + t.jsonp + "=" + f),
                        (t.converters["script json"] = function () {
                            return e || i.error(f + " was not called"), e[0];
                        }),
                        (t.dataTypes[0] = "json"),
                        (o = n[f]),
                        (n[f] = function () {
                            e = arguments;
                        }),
                        u.always(function () {
                            n[f] = o;
                            t[f] && ((t.jsonpCallback = r.jsonpCallback), gi.push(f));
                            e && i.isFunction(o) && o(e[0]);
                            e = o = undefined;
                        }),
                        "script"
                    );
            }),
            (i.parseHTML = function (n, t, r) {
                if (!n || typeof n != "string") return null;
                typeof t == "boolean" && ((r = t), (t = !1));
                t = t || u;
                var f = er.exec(n),
                    e = !r && [];
                return f ? [t.createElement(f[1])] : ((f = i.buildFragment([n], t, e)), e && e.length && i(e).remove(), i.merge([], f.childNodes));
            }),
            (nr = i.fn.load),
            (i.fn.load = function (n, t, r) {
                if (typeof n != "string" && nr) return nr.apply(this, arguments);
                var u,
                    o,
                    s,
                    f = this,
                    e = n.indexOf(" ");
                return (
                    e >= 0 && ((u = i.trim(n.slice(e, n.length))), (n = n.slice(0, e))),
                    i.isFunction(t) ? ((r = t), (t = undefined)) : t && typeof t == "object" && (s = "POST"),
                    f.length > 0 &&
                        i
                            .ajax({ url: n, type: s, dataType: "html", data: t })
                            .done(function (n) {
                                o = arguments;
                                f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n);
                            })
                            .complete(
                                r &&
                                    function (n, t) {
                                        f.each(r, o || [n.responseText, t, n]);
                                    }
                            ),
                    this
                );
            }),
            (i.expr.filters.animated = function (n) {
                return i.grep(i.timers, function (t) {
                    return n === t.elem;
                }).length;
            }),
            (tr = n.document.documentElement),
            (i.offset = {
                setOffset: function (n, t, r) {
                    var e,
                        o,
                        s,
                        h,
                        u,
                        c,
                        v,
                        l = i.css(n, "position"),
                        a = i(n),
                        f = {};
                    l === "static" && (n.style.position = "relative");
                    u = a.offset();
                    s = i.css(n, "top");
                    c = i.css(n, "left");
                    v = (l === "absolute" || l === "fixed") && i.inArray("auto", [s, c]) > -1;
                    v ? ((e = a.position()), (h = e.top), (o = e.left)) : ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0));
                    i.isFunction(t) && (t = t.call(n, r, u));
                    t.top != null && (f.top = t.top - u.top + h);
                    t.left != null && (f.left = t.left - u.left + o);
                    "using" in t ? t.using.call(n, f) : a.css(f);
                },
            }),
            i.fn.extend({
                offset: function (n) {
                    if (arguments.length)
                        return n === undefined
                            ? this
                            : this.each(function (t) {
                                  i.offset.setOffset(this, n, t);
                              });
                    var t,
                        f,
                        u = { top: 0, left: 0 },
                        r = this[0],
                        e = r && r.ownerDocument;
                    if (e)
                        return ((t = e.documentElement), !i.contains(t, r))
                            ? u
                            : (typeof r.getBoundingClientRect !== o && (u = r.getBoundingClientRect()),
                              (f = wf(e)),
                              { top: u.top + (f.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: u.left + (f.pageXOffset || t.scrollLeft) - (t.clientLeft || 0) });
                },
                position: function () {
                    if (this[0]) {
                        var n,
                            r,
                            t = { top: 0, left: 0 },
                            u = this[0];
                        return (
                            i.css(u, "position") === "fixed"
                                ? (r = u.getBoundingClientRect())
                                : ((n = this.offsetParent()), (r = this.offset()), i.nodeName(n[0], "html") || (t = n.offset()), (t.top += i.css(n[0], "borderTopWidth", !0)), (t.left += i.css(n[0], "borderLeftWidth", !0))),
                            { top: r.top - t.top - i.css(u, "marginTop", !0), left: r.left - t.left - i.css(u, "marginLeft", !0) }
                        );
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var n = this.offsetParent || tr; n && !i.nodeName(n, "html") && i.css(n, "position") === "static"; ) n = n.offsetParent;
                        return n || tr;
                    });
                },
            }),
            i.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (n, t) {
                var r = /Y/.test(t);
                i.fn[n] = function (u) {
                    return b(
                        this,
                        function (n, u, f) {
                            var e = wf(n);
                            if (f === undefined) return e ? (t in e ? e[t] : e.document.documentElement[u]) : n[u];
                            e ? e.scrollTo(r ? i(e).scrollLeft() : f, r ? f : i(e).scrollTop()) : (n[u] = f);
                        },
                        n,
                        u,
                        arguments.length,
                        null
                    );
                };
            }),
            i.each(["top", "left"], function (n, t) {
                i.cssHooks[t] = au(r.pixelPosition, function (n, r) {
                    if (r) return (r = d(n, t)), pt.test(r) ? i(n).position()[t] + "px" : r;
                });
            }),
            i.each({ Height: "height", Width: "width" }, function (n, t) {
                i.each({ padding: "inner" + n, content: t, "": "outer" + n }, function (r, u) {
                    i.fn[u] = function (u, f) {
                        var e = arguments.length && (r || typeof u != "boolean"),
                            o = r || (u === !0 || f === !0 ? "margin" : "border");
                        return b(
                            this,
                            function (t, r, u) {
                                var f;
                                return i.isWindow(t)
                                    ? t.document.documentElement["client" + n]
                                    : t.nodeType === 9
                                    ? ((f = t.documentElement), Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n]))
                                    : u === undefined
                                    ? i.css(t, r, o)
                                    : i.style(t, r, u, o);
                            },
                            t,
                            e ? u : undefined,
                            e,
                            null
                        );
                    };
                });
            }),
            (i.fn.size = function () {
                return this.length;
            }),
            (i.fn.andSelf = i.fn.addBack),
            typeof define == "function" &&
                define.amd &&
                define("jquery", [], function () {
                    return i;
                }),
            (bf = n.jQuery),
            (kf = n.$),
            (i.noConflict = function (t) {
                return n.$ === i && (n.$ = kf), t && n.jQuery === i && (n.jQuery = bf), i;
            }),
            typeof t === o && (n.jQuery = n.$ = i),
            i
        );
    }),
    (function (n, t, i, r) {
        "use strict";
        function ci(n, t, i) {
            return setTimeout(ai(n, i), t);
        }
        function ut(n, t, i) {
            return Array.isArray(n) ? (v(n, i[t], i), !0) : !1;
        }
        function v(n, t, i) {
            var u;
            if (n)
                if (n.forEach) n.forEach(t, i);
                else if (n.length !== r) for (u = 0; u < n.length; ) t.call(i, n[u], u, n), u++;
                else for (u in n) n.hasOwnProperty(u) && t.call(i, n[u], u, n);
        }
        function or(t, i, r) {
            var u = "DEPRECATED METHOD: " + i + "\n" + r + " AT \n";
            return function () {
                var i = new Error("get-stack-trace"),
                    f =
                        i && i.stack
                            ? i.stack
                                  .replace(/^[^\(]+?[\n$]/gm, "")
                                  .replace(/^\s+at\s+/gm, "")
                                  .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
                            : "Unknown Stack Trace",
                    r = n.console && (n.console.warn || n.console.log);
                return r && r.call(n.console, u, f), t.apply(this, arguments);
            };
        }
        function o(n, t, i) {
            var u = t.prototype,
                r;
            r = n.prototype = Object.create(u);
            r.constructor = n;
            r._super = u;
            i && y(r, i);
        }
        function ai(n, t) {
            return function () {
                return n.apply(t, arguments);
            };
        }
        function vi(n, t) {
            return typeof n == bu ? n.apply(t ? t[0] || r : r, t) : n;
        }
        function hr(n, t) {
            return n === r ? t : n;
        }
        function pt(n, t, i) {
            v(bt(t), function (t) {
                n.addEventListener(t, i, !1);
            });
        }
        function wt(n, t, i) {
            v(bt(t), function (t) {
                n.removeEventListener(t, i, !1);
            });
        }
        function cr(n, t) {
            while (n) {
                if (n == t) return !0;
                n = n.parentNode;
            }
            return !1;
        }
        function g(n, t) {
            return n.indexOf(t) > -1;
        }
        function bt(n) {
            return n.trim().split(/\s+/g);
        }
        function ft(n, t, i) {
            if (n.indexOf && !i) return n.indexOf(t);
            for (var r = 0; r < n.length; ) {
                if ((i && n[r][i] == t) || (!i && n[r] === t)) return r;
                r++;
            }
            return -1;
        }
        function kt(n) {
            return Array.prototype.slice.call(n, 0);
        }
        function lr(n, t, i) {
            for (var u = [], e = [], r = 0, f; r < n.length; ) (f = t ? n[r][t] : n[r]), ft(e, f) < 0 && u.push(n[r]), (e[r] = f), r++;
            return (
                i &&
                    (u = t
                        ? u.sort(function (n, i) {
                              return n[t] > i[t];
                          })
                        : u.sort()),
                u
            );
        }
        function dt(n, t) {
            for (var i, u, e = t[0].toUpperCase() + t.slice(1), f = 0; f < er.length; ) {
                if (((i = er[f]), (u = i ? i + e : t), u in n)) return u;
                f++;
            }
            return r;
        }
        function ku() {
            return ar++;
        }
        function vr(t) {
            var i = t.ownerDocument || t;
            return i.defaultView || i.parentWindow || n;
        }
        function s(n, t) {
            var i = this;
            this.manager = n;
            this.callback = t;
            this.element = n.element;
            this.target = n.options.inputTarget;
            this.domHandler = function (t) {
                vi(n.options.enable, [n]) && i.handler(t);
            };
            this.init();
        }
        function tf(n) {
            var t,
                i = n.options.inputClass;
            return (t = i ? i : du ? wi : gu ? ri : yr ? ki : ii), new t(n, rf);
        }
        function rf(n, t, i) {
            var r = i.pointers.length,
                o = i.changedPointers.length,
                s = t & f && r - o == 0,
                h = t & (u | e) && r - o == 0;
            i.isFirst = !!s;
            i.isFinal = !!h;
            s && (n.session = {});
            i.eventType = t;
            uf(n, i);
            n.emit("hammer.input", i);
            n.recognize(i);
            n.session.prevInput = i;
        }
        function uf(n, t) {
            var i = n.session,
                f = t.pointers,
                o = f.length,
                r,
                e;
            i.firstInput || (i.firstInput = br(t));
            o > 1 && !i.firstMultiple ? (i.firstMultiple = br(t)) : o === 1 && (i.firstMultiple = !1);
            var s = i.firstInput,
                u = i.firstMultiple,
                h = u ? u.center : s.center,
                c = (t.center = kr(f));
            t.timeStamp = hi();
            t.deltaTime = t.timeStamp - s.timeStamp;
            t.angle = pi(h, c);
            t.distance = ti(h, c);
            ff(i, t);
            t.offsetDirection = gr(t.deltaX, t.deltaY);
            r = dr(t.deltaTime, t.deltaX, t.deltaY);
            t.overallVelocityX = r.x;
            t.overallVelocityY = r.y;
            t.overallVelocity = d(r.x) > d(r.y) ? r.x : r.y;
            t.scale = u ? sf(u.pointers, f) : 1;
            t.rotation = u ? of(u.pointers, f) : 0;
            t.maxPointers = i.prevInput ? (t.pointers.length > i.prevInput.maxPointers ? t.pointers.length : i.prevInput.maxPointers) : t.pointers.length;
            ef(i, t);
            e = n.element;
            cr(t.srcEvent.target, e) && (e = t.srcEvent.target);
            t.target = e;
        }
        function ff(n, t) {
            var i = t.center,
                r = n.offsetDelta || {},
                e = n.prevDelta || {},
                o = n.prevInput || {};
            (t.eventType === f || o.eventType === u) && ((e = n.prevDelta = { x: o.deltaX || 0, y: o.deltaY || 0 }), (r = n.offsetDelta = { x: i.x, y: i.y }));
            t.deltaX = e.x + (i.x - r.x);
            t.deltaY = e.y + (i.y - r.y);
        }
        function ef(n, t) {
            var i = n.lastInterval || t,
                c = t.timeStamp - i.timeStamp,
                f,
                o,
                s,
                h;
            if (t.eventType != e && (c > nf || i.velocity === r)) {
                var l = t.deltaX - i.deltaX,
                    a = t.deltaY - i.deltaY,
                    u = dr(c, l, a);
                o = u.x;
                s = u.y;
                f = d(u.x) > d(u.y) ? u.x : u.y;
                h = gr(l, a);
                n.lastInterval = t;
            } else (f = i.velocity), (o = i.velocityX), (s = i.velocityY), (h = i.direction);
            t.velocity = f;
            t.velocityX = o;
            t.velocityY = s;
            t.direction = h;
        }
        function br(n) {
            for (var i = [], t = 0; t < n.pointers.length; ) (i[t] = { clientX: rt(n.pointers[t].clientX), clientY: rt(n.pointers[t].clientY) }), t++;
            return { timeStamp: hi(), pointers: i, center: kr(i), deltaX: n.deltaX, deltaY: n.deltaY };
        }
        function kr(n) {
            var t = n.length;
            if (t === 1) return { x: rt(n[0].clientX), y: rt(n[0].clientY) };
            for (var r = 0, u = 0, i = 0; i < t; ) (r += n[i].clientX), (u += n[i].clientY), i++;
            return { x: rt(r / t), y: rt(u / t) };
        }
        function dr(n, t, i) {
            return { x: t / n || 0, y: i / n || 0 };
        }
        function gr(n, t) {
            return n === t ? gt : d(n) >= d(t) ? (n < 0 ? st : ht) : t < 0 ? ct : lt;
        }
        function ti(n, t, i) {
            i || (i = wr);
            var r = t[i[0]] - n[i[0]],
                u = t[i[1]] - n[i[1]];
            return Math.sqrt(r * r + u * u);
        }
        function pi(n, t, i) {
            i || (i = wr);
            var r = t[i[0]] - n[i[0]],
                u = t[i[1]] - n[i[1]];
            return (Math.atan2(u, r) * 180) / Math.PI;
        }
        function of(n, t) {
            return pi(t[1], t[0], ni) + pi(n[1], n[0], ni);
        }
        function sf(n, t) {
            return ti(t[0], t[1], ni) / ti(n[0], n[1], ni);
        }
        function ii() {
            this.evEl = cf;
            this.evWin = lf;
            this.pressed = !1;
            s.apply(this, arguments);
        }
        function wi() {
            this.evEl = nu;
            this.evWin = tu;
            s.apply(this, arguments);
            this.store = this.manager.session.pointerEvents = [];
        }
        function iu() {
            this.evTarget = pf;
            this.evWin = wf;
            this.started = !1;
            s.apply(this, arguments);
        }
        function bf(n, t) {
            var i = kt(n.touches),
                r = kt(n.changedTouches);
            return t & (u | e) && (i = lr(i.concat(r), "identifier", !0)), [i, r];
        }
        function ri() {
            this.evTarget = uu;
            this.targetIds = {};
            s.apply(this, arguments);
        }
        function kf(n, t) {
            var r = kt(n.touches),
                o = this.targetIds;
            if (t & (f | nt) && r.length === 1) return (o[r[0].identifier] = !0), [r, r];
            var i,
                s,
                h = kt(n.changedTouches),
                c = [],
                l = this.target;
            if (
                ((s = r.filter(function (n) {
                    return cr(n.target, l);
                })),
                t === f)
            )
                for (i = 0; i < s.length; ) (o[s[i].identifier] = !0), i++;
            for (i = 0; i < h.length; ) o[h[i].identifier] && c.push(h[i]), t & (u | e) && delete o[h[i].identifier], i++;
            if (c.length) return [lr(s.concat(c), "identifier", !0), c];
        }
        function ki() {
            s.apply(this, arguments);
            var n = ai(this.handler, this);
            this.touch = new ri(this.manager, n);
            this.mouse = new ii(this.manager, n);
            this.primaryTouch = null;
            this.lastTouches = [];
        }
        function df(n, t) {
            n & f ? ((this.primaryTouch = t.changedPointers[0].identifier), eu.call(this, t)) : n & (u | e) && eu.call(this, t);
        }
        function eu(n) {
            var t = n.changedPointers[0],
                i,
                r,
                u;
            t.identifier === this.primaryTouch &&
                ((i = { x: t.clientX, y: t.clientY }),
                this.lastTouches.push(i),
                (r = this.lastTouches),
                (u = function () {
                    var n = r.indexOf(i);
                    n > -1 && r.splice(n, 1);
                }),
                setTimeout(u, fu));
        }
        function gf(n) {
            for (var r = n.srcEvent.clientX, u = n.srcEvent.clientY, t = 0; t < this.lastTouches.length; t++) {
                var i = this.lastTouches[t],
                    f = Math.abs(r - i.x),
                    e = Math.abs(u - i.y);
                if (f <= bi && e <= bi) return !0;
            }
            return !1;
        }
        function gi(n, t) {
            this.manager = n;
            this.set(t);
        }
        function ne(n) {
            if (g(n, it)) return it;
            var t = g(n, at),
                i = g(n, vt);
            return t && i ? it : t || i ? (t ? at : vt) : g(n, di) ? di : cu;
        }
        function te() {
            if (!su) return !1;
            var t = {},
                i = n.CSS && n.CSS.supports;
            return (
                ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (r) {
                    t[r] = i ? n.CSS.supports("touch-action", r) : !0;
                }),
                t
            );
        }
        function w(n) {
            this.options = y({}, this.defaults, n || {});
            this.id = ku();
            this.manager = null;
            this.options.enable = hr(this.options.enable, !0);
            this.state = fi;
            this.simultaneous = {};
            this.requireFail = [];
        }
        function lu(n) {
            return n & yt ? "cancel" : n & k ? "end" : n & et ? "move" : n & h ? "start" : "";
        }
        function au(n) {
            return n == lt ? "down" : n == ct ? "up" : n == st ? "left" : n == ht ? "right" : "";
        }
        function ei(n, t) {
            var i = t.manager;
            return i ? i.get(n) : n;
        }
        function c() {
            w.apply(this, arguments);
        }
        function oi() {
            c.apply(this, arguments);
            this.pX = null;
            this.pY = null;
        }
        function nr() {
            c.apply(this, arguments);
        }
        function tr() {
            w.apply(this, arguments);
            this._timer = null;
            this._input = null;
        }
        function ir() {
            c.apply(this, arguments);
        }
        function rr() {
            c.apply(this, arguments);
        }
        function si() {
            w.apply(this, arguments);
            this.pTime = !1;
            this.pCenter = !1;
            this._timer = null;
            this._input = null;
            this.count = 0;
        }
        function b(n, t) {
            return (t = t || {}), (t.recognizers = hr(t.recognizers, b.defaults.preset)), new fr(n, t);
        }
        function fr(n, t) {
            this.options = y({}, b.defaults, t || {});
            this.options.inputTarget = this.options.inputTarget || n;
            this.handlers = {};
            this.session = {};
            this.recognizers = [];
            this.oldCssProps = {};
            this.element = n;
            this.input = tf(this);
            this.touchAction = new gi(this, this.options.touchAction);
            yu(this, !0);
            v(
                this.options.recognizers,
                function (n) {
                    var t = this.add(new n[0](n[1]));
                    n[2] && t.recognizeWith(n[2]);
                    n[3] && t.requireFailure(n[3]);
                },
                this
            );
        }
        function yu(n, t) {
            var r = n.element,
                i;
            r.style &&
                (v(n.options.cssProps, function (u, f) {
                    i = dt(r.style, f);
                    t ? ((n.oldCssProps[i] = r.style[i]), (r.style[i] = u)) : (r.style[i] = n.oldCssProps[i] || "");
                }),
                t || (n.oldCssProps = {}));
        }
        function ie(n, i) {
            var r = t.createEvent("Event");
            r.initEvent(n, !0, !0);
            r.gesture = i;
            i.target.dispatchEvent(r);
        }
        var er = ["", "webkit", "Moz", "MS", "ms", "o"],
            wu = t.createElement("div"),
            bu = "function",
            rt = Math.round,
            d = Math.abs,
            hi = Date.now,
            y,
            li,
            sr,
            ar,
            ru,
            uu,
            fu,
            bi,
            vu,
            ur,
            pu;
        y =
            typeof Object.assign != "function"
                ? function (n) {
                      var f, i, t, u;
                      if (n === r || n === null) throw new TypeError("Cannot convert undefined or null to object");
                      for (f = Object(n), i = 1; i < arguments.length; i++) if (((t = arguments[i]), t !== r && t !== null)) for (u in t) t.hasOwnProperty(u) && (f[u] = t[u]);
                      return f;
                  }
                : Object.assign;
        li = or(
            function (n, t, i) {
                for (var f = Object.keys(t), u = 0; u < f.length; ) (!i || (i && n[f[u]] === r)) && (n[f[u]] = t[f[u]]), u++;
                return n;
            },
            "extend",
            "Use `assign`."
        );
        sr = or(
            function (n, t) {
                return li(n, t, !0);
            },
            "merge",
            "Use `assign`."
        );
        ar = 1;
        var yr = "ontouchstart" in n,
            du = dt(n, "PointerEvent") !== r,
            gu = yr && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
            ot = "touch",
            yi = "mouse",
            nf = 25,
            f = 1,
            nt = 2,
            u = 4,
            e = 8,
            gt = 1,
            st = 2,
            ht = 4,
            ct = 8,
            lt = 16,
            l = st | ht,
            tt = ct | lt,
            pr = l | tt,
            wr = ["x", "y"],
            ni = ["clientX", "clientY"];
        s.prototype = {
            handler: function () {},
            init: function () {
                this.evEl && pt(this.element, this.evEl, this.domHandler);
                this.evTarget && pt(this.target, this.evTarget, this.domHandler);
                this.evWin && pt(vr(this.element), this.evWin, this.domHandler);
            },
            destroy: function () {
                this.evEl && wt(this.element, this.evEl, this.domHandler);
                this.evTarget && wt(this.target, this.evTarget, this.domHandler);
                this.evWin && wt(vr(this.element), this.evWin, this.domHandler);
            },
        };
        var hf = { mousedown: f, mousemove: nt, mouseup: u },
            cf = "mousedown",
            lf = "mousemove mouseup";
        o(ii, s, {
            handler: function (n) {
                var t = hf[n.type];
                (t & f && n.button === 0 && (this.pressed = !0), t & nt && n.which !== 1 && (t = u), this.pressed) &&
                    (t & u && (this.pressed = !1), this.callback(this.manager, t, { pointers: [n], changedPointers: [n], pointerType: yi, srcEvent: n }));
            },
        });
        var af = { pointerdown: f, pointermove: nt, pointerup: u, pointercancel: e, pointerout: e },
            vf = { 2: ot, 3: "pen", 4: yi, 5: "kinect" },
            nu = "pointerdown",
            tu = "pointermove pointerup pointercancel";
        n.MSPointerEvent && !n.PointerEvent && ((nu = "MSPointerDown"), (tu = "MSPointerMove MSPointerUp MSPointerCancel"));
        o(wi, s, {
            handler: function (n) {
                var t = this.store,
                    o = !1,
                    h = n.type.toLowerCase().replace("ms", ""),
                    r = af[h],
                    s = vf[n.pointerType] || n.pointerType,
                    c = s == ot,
                    i = ft(t, n.pointerId, "pointerId");
                (r & f && (n.button === 0 || c) ? i < 0 && (t.push(n), (i = t.length - 1)) : r & (u | e) && (o = !0), i < 0) ||
                    ((t[i] = n), this.callback(this.manager, r, { pointers: t, changedPointers: [n], pointerType: s, srcEvent: n }), o && t.splice(i, 1));
            },
        });
        var yf = { touchstart: f, touchmove: nt, touchend: u, touchcancel: e },
            pf = "touchstart",
            wf = "touchstart touchmove touchend touchcancel";
        o(iu, s, {
            handler: function (n) {
                var i = yf[n.type],
                    t;
                (i === f && (this.started = !0), this.started) &&
                    ((t = bf.call(this, n, i)), i & (u | e) && t[0].length - t[1].length == 0 && (this.started = !1), this.callback(this.manager, i, { pointers: t[0], changedPointers: t[1], pointerType: ot, srcEvent: n }));
            },
        });
        ru = { touchstart: f, touchmove: nt, touchend: u, touchcancel: e };
        uu = "touchstart touchmove touchend touchcancel";
        o(ri, s, {
            handler: function (n) {
                var i = ru[n.type],
                    t = kf.call(this, n, i);
                t && this.callback(this.manager, i, { pointers: t[0], changedPointers: t[1], pointerType: ot, srcEvent: n });
            },
        });
        fu = 2500;
        bi = 25;
        o(ki, s, {
            handler: function (n, t, i) {
                var u = i.pointerType == ot,
                    r = i.pointerType == yi;
                if (!r || !i.sourceCapabilities || !i.sourceCapabilities.firesTouchEvents) {
                    if (u) df.call(this, t, i);
                    else if (r && gf.call(this, i)) return;
                    this.callback(n, t, i);
                }
            },
            destroy: function () {
                this.touch.destroy();
                this.mouse.destroy();
            },
        });
        var ou = dt(wu.style, "touchAction"),
            su = ou !== r,
            hu = "compute",
            cu = "auto",
            di = "manipulation",
            it = "none",
            at = "pan-x",
            vt = "pan-y",
            ui = te();
        gi.prototype = {
            set: function (n) {
                n == hu && (n = this.compute());
                su && this.manager.element.style && ui[n] && (this.manager.element.style[ou] = n);
                this.actions = n.toLowerCase().trim();
            },
            update: function () {
                this.set(this.manager.options.touchAction);
            },
            compute: function () {
                var n = [];
                return (
                    v(this.manager.recognizers, function (t) {
                        vi(t.options.enable, [t]) && (n = n.concat(t.getTouchAction()));
                    }),
                    ne(n.join(" "))
                );
            },
            preventDefaults: function (n) {
                var i = n.srcEvent,
                    r = n.offsetDirection;
                if (this.manager.session.prevented) {
                    i.preventDefault();
                    return;
                }
                var t = this.actions,
                    u = g(t, it) && !ui[it],
                    f = g(t, vt) && !ui[vt],
                    e = g(t, at) && !ui[at];
                if (u) {
                    var o = n.pointers.length === 1,
                        s = n.distance < 2,
                        h = n.deltaTime < 250;
                    if (o && s && h) return;
                }
                if (!e || !f) return u || (f && r & l) || (e && r & tt) ? this.preventSrc(i) : void 0;
            },
            preventSrc: function (n) {
                this.manager.session.prevented = !0;
                n.preventDefault();
            },
        };
        var fi = 1,
            h = 2,
            et = 4,
            k = 8,
            p = k,
            yt = 16,
            a = 32;
        w.prototype = {
            defaults: {},
            set: function (n) {
                return y(this.options, n), this.manager && this.manager.touchAction.update(), this;
            },
            recognizeWith: function (n) {
                if (ut(n, "recognizeWith", this)) return this;
                var t = this.simultaneous;
                return (n = ei(n, this)), t[n.id] || ((t[n.id] = n), n.recognizeWith(this)), this;
            },
            dropRecognizeWith: function (n) {
                return ut(n, "dropRecognizeWith", this) ? this : ((n = ei(n, this)), delete this.simultaneous[n.id], this);
            },
            requireFailure: function (n) {
                if (ut(n, "requireFailure", this)) return this;
                var t = this.requireFail;
                return (n = ei(n, this)), ft(t, n) === -1 && (t.push(n), n.requireFailure(this)), this;
            },
            dropRequireFailure: function (n) {
                if (ut(n, "dropRequireFailure", this)) return this;
                n = ei(n, this);
                var t = ft(this.requireFail, n);
                return t > -1 && this.requireFail.splice(t, 1), this;
            },
            hasRequireFailures: function () {
                return this.requireFail.length > 0;
            },
            canRecognizeWith: function (n) {
                return !!this.simultaneous[n.id];
            },
            emit: function (n) {
                function r(i) {
                    t.manager.emit(i, n);
                }
                var t = this,
                    i = this.state;
                i < k && r(t.options.event + lu(i));
                r(t.options.event);
                n.additionalEvent && r(n.additionalEvent);
                i >= k && r(t.options.event + lu(i));
            },
            tryEmit: function (n) {
                if (this.canEmit()) return this.emit(n);
                this.state = a;
            },
            canEmit: function () {
                for (var n = 0; n < this.requireFail.length; ) {
                    if (!(this.requireFail[n].state & (a | fi))) return !1;
                    n++;
                }
                return !0;
            },
            recognize: function (n) {
                var t = y({}, n);
                if (!vi(this.options.enable, [this, t])) {
                    this.reset();
                    this.state = a;
                    return;
                }
                this.state & (p | yt | a) && (this.state = fi);
                this.state = this.process(t);
                this.state & (h | et | k | yt) && this.tryEmit(t);
            },
            process: function () {},
            getTouchAction: function () {},
            reset: function () {},
        };
        o(c, w, {
            defaults: { pointers: 1 },
            attrTest: function (n) {
                var t = this.options.pointers;
                return t === 0 || n.pointers.length === t;
            },
            process: function (n) {
                var t = this.state,
                    i = n.eventType,
                    r = t & (h | et),
                    f = this.attrTest(n);
                return r && (i & e || !f) ? t | yt : r || f ? (i & u ? t | k : t & h ? t | et : h) : a;
            },
        });
        o(oi, c, {
            defaults: { event: "pan", threshold: 10, pointers: 1, direction: pr },
            getTouchAction: function () {
                var t = this.options.direction,
                    n = [];
                return t & l && n.push(vt), t & tt && n.push(at), n;
            },
            directionTest: function (n) {
                var i = this.options,
                    r = !0,
                    u = n.distance,
                    t = n.direction,
                    f = n.deltaX,
                    e = n.deltaY;
                return (
                    t & i.direction || (i.direction & l ? ((t = f === 0 ? gt : f < 0 ? st : ht), (r = f != this.pX), (u = Math.abs(n.deltaX))) : ((t = e === 0 ? gt : e < 0 ? ct : lt), (r = e != this.pY), (u = Math.abs(n.deltaY)))),
                    (n.direction = t),
                    r && u > i.threshold && t & i.direction
                );
            },
            attrTest: function (n) {
                return c.prototype.attrTest.call(this, n) && (this.state & h || (!(this.state & h) && this.directionTest(n)));
            },
            emit: function (n) {
                this.pX = n.deltaX;
                this.pY = n.deltaY;
                var t = au(n.direction);
                t && (n.additionalEvent = this.options.event + t);
                this._super.emit.call(this, n);
            },
        });
        o(nr, c, {
            defaults: { event: "pinch", threshold: 0, pointers: 2 },
            getTouchAction: function () {
                return [it];
            },
            attrTest: function (n) {
                return this._super.attrTest.call(this, n) && (Math.abs(n.scale - 1) > this.options.threshold || this.state & h);
            },
            emit: function (n) {
                if (n.scale !== 1) {
                    var t = n.scale < 1 ? "in" : "out";
                    n.additionalEvent = this.options.event + t;
                }
                this._super.emit.call(this, n);
            },
        });
        o(tr, w, {
            defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
            getTouchAction: function () {
                return [cu];
            },
            process: function (n) {
                var t = this.options,
                    i = n.pointers.length === t.pointers,
                    r = n.distance < t.threshold,
                    o = n.deltaTime > t.time;
                if (((this._input = n), !r || !i || (n.eventType & (u | e) && !o))) this.reset();
                else if (n.eventType & f)
                    this.reset(),
                        (this._timer = ci(
                            function () {
                                this.state = p;
                                this.tryEmit();
                            },
                            t.time,
                            this
                        ));
                else if (n.eventType & u) return p;
                return a;
            },
            reset: function () {
                clearTimeout(this._timer);
            },
            emit: function (n) {
                this.state === p && (n && n.eventType & u ? this.manager.emit(this.options.event + "up", n) : ((this._input.timeStamp = hi()), this.manager.emit(this.options.event, this._input)));
            },
        });
        o(ir, c, {
            defaults: { event: "rotate", threshold: 0, pointers: 2 },
            getTouchAction: function () {
                return [it];
            },
            attrTest: function (n) {
                return this._super.attrTest.call(this, n) && (Math.abs(n.rotation) > this.options.threshold || this.state & h);
            },
        });
        o(rr, c, {
            defaults: { event: "swipe", threshold: 10, velocity: 0.3, direction: l | tt, pointers: 1 },
            getTouchAction: function () {
                return oi.prototype.getTouchAction.call(this);
            },
            attrTest: function (n) {
                var t = this.options.direction,
                    i;
                return (
                    t & (l | tt) ? (i = n.overallVelocity) : t & l ? (i = n.overallVelocityX) : t & tt && (i = n.overallVelocityY),
                    this._super.attrTest.call(this, n) && t & n.offsetDirection && n.distance > this.options.threshold && n.maxPointers == this.options.pointers && d(i) > this.options.velocity && n.eventType & u
                );
            },
            emit: function (n) {
                var t = au(n.offsetDirection);
                t && this.manager.emit(this.options.event + t, n);
                this.manager.emit(this.options.event, n);
            },
        });
        o(si, w, {
            defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 },
            getTouchAction: function () {
                return [di];
            },
            process: function (n) {
                var t = this.options,
                    o = n.pointers.length === t.pointers,
                    s = n.distance < t.threshold,
                    c = n.deltaTime < t.time,
                    i,
                    r,
                    e;
                if ((this.reset(), n.eventType & f && this.count === 0)) return this.failTimeout();
                if (s && c && o) {
                    if (n.eventType != u) return this.failTimeout();
                    if (
                        ((i = this.pTime ? n.timeStamp - this.pTime < t.interval : !0),
                        (r = !this.pCenter || ti(this.pCenter, n.center) < t.posThreshold),
                        (this.pTime = n.timeStamp),
                        (this.pCenter = n.center),
                        r && i ? (this.count += 1) : (this.count = 1),
                        (this._input = n),
                        (e = this.count % t.taps),
                        e === 0)
                    )
                        return this.hasRequireFailures()
                            ? ((this._timer = ci(
                                  function () {
                                      this.state = p;
                                      this.tryEmit();
                                  },
                                  t.interval,
                                  this
                              )),
                              h)
                            : p;
                }
                return a;
            },
            failTimeout: function () {
                return (
                    (this._timer = ci(
                        function () {
                            this.state = a;
                        },
                        this.options.interval,
                        this
                    )),
                    a
                );
            },
            reset: function () {
                clearTimeout(this._timer);
            },
            emit: function () {
                this.state == p && ((this._input.tapCount = this.count), this.manager.emit(this.options.event, this._input));
            },
        });
        b.VERSION = "2.0.8";
        b.defaults = {
            domEvents: !1,
            touchAction: hu,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [[ir, { enable: !1 }], [nr, { enable: !1 }, ["rotate"]], [rr, { direction: l }], [oi, { direction: l }, ["swipe"]], [si], [si, { event: "doubletap", taps: 2 }, ["tap"]], [tr]],
            cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" },
        };
        vu = 1;
        ur = 2;
        fr.prototype = {
            set: function (n) {
                return y(this.options, n), n.touchAction && this.touchAction.update(), n.inputTarget && (this.input.destroy(), (this.input.target = n.inputTarget), this.input.init()), this;
            },
            stop: function (n) {
                this.session.stopped = n ? ur : vu;
            },
            recognize: function (n) {
                var r = this.session,
                    i,
                    f,
                    t,
                    u;
                if (!r.stopped)
                    for (this.touchAction.preventDefaults(n), f = this.recognizers, t = r.curRecognizer, (!t || (t && t.state & p)) && (t = r.curRecognizer = null), u = 0; u < f.length; )
                        (i = f[u]), r.stopped !== ur && (!t || i == t || i.canRecognizeWith(t)) ? i.recognize(n) : i.reset(), !t && i.state & (h | et | k) && (t = r.curRecognizer = i), u++;
            },
            get: function (n) {
                var i, t;
                if (n instanceof w) return n;
                for (i = this.recognizers, t = 0; t < i.length; t++) if (i[t].options.event == n) return i[t];
                return null;
            },
            add: function (n) {
                if (ut(n, "add", this)) return this;
                var t = this.get(n.options.event);
                return t && this.remove(t), this.recognizers.push(n), (n.manager = this), this.touchAction.update(), n;
            },
            remove: function (n) {
                if (ut(n, "remove", this)) return this;
                if (((n = this.get(n)), n)) {
                    var t = this.recognizers,
                        i = ft(t, n);
                    i !== -1 && (t.splice(i, 1), this.touchAction.update());
                }
                return this;
            },
            on: function (n, t) {
                if (n !== r && t !== r) {
                    var i = this.handlers;
                    return (
                        v(bt(n), function (n) {
                            i[n] = i[n] || [];
                            i[n].push(t);
                        }),
                        this
                    );
                }
            },
            off: function (n, t) {
                if (n !== r) {
                    var i = this.handlers;
                    return (
                        v(bt(n), function (n) {
                            t ? i[n] && i[n].splice(ft(i[n], t), 1) : delete i[n];
                        }),
                        this
                    );
                }
            },
            emit: function (n, t) {
                var i, r;
                if ((this.options.domEvents && ie(n, t), (i = this.handlers[n] && this.handlers[n].slice()), i && i.length))
                    for (
                        t.type = n,
                            t.preventDefault = function () {
                                t.srcEvent.preventDefault();
                            },
                            r = 0;
                        r < i.length;

                    )
                        i[r](t), r++;
            },
            destroy: function () {
                this.element && yu(this, !1);
                this.handlers = {};
                this.session = {};
                this.input.destroy();
                this.element = null;
            },
        };
        y(b, {
            INPUT_START: f,
            INPUT_MOVE: nt,
            INPUT_END: u,
            INPUT_CANCEL: e,
            STATE_POSSIBLE: fi,
            STATE_BEGAN: h,
            STATE_CHANGED: et,
            STATE_ENDED: k,
            STATE_RECOGNIZED: p,
            STATE_CANCELLED: yt,
            STATE_FAILED: a,
            DIRECTION_NONE: gt,
            DIRECTION_LEFT: st,
            DIRECTION_RIGHT: ht,
            DIRECTION_UP: ct,
            DIRECTION_DOWN: lt,
            DIRECTION_HORIZONTAL: l,
            DIRECTION_VERTICAL: tt,
            DIRECTION_ALL: pr,
            Manager: fr,
            Input: s,
            TouchAction: gi,
            TouchInput: ri,
            MouseInput: ii,
            PointerEventInput: wi,
            TouchMouseInput: ki,
            SingleTouchInput: iu,
            Recognizer: w,
            AttrRecognizer: c,
            Tap: si,
            Pan: oi,
            Swipe: rr,
            Pinch: nr,
            Rotate: ir,
            Press: tr,
            on: pt,
            off: wt,
            each: v,
            merge: sr,
            extend: li,
            assign: y,
            inherit: o,
            bindFn: ai,
            prefixed: dt,
        });
        pu = typeof n != "undefined" ? n : typeof self != "undefined" ? self : {};
        pu.Hammer = b;
        typeof define == "function" && define.amd
            ? define(function () {
                  return b;
              })
            : typeof module != "undefined" && module.exports
            ? (module.exports = b)
            : (n[i] = b);
    })(window, document, "Hammer"),
    typeof jQuery == "undefined")
)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (n) {
    var t = n.fn.jquery.split(" ")[0].split(".");
    if ((t[0] < 2 && t[1] < 9) || (t[0] == 1 && t[1] == 9 && t[2] < 1)) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
})(jQuery);
+(function (n) {
    "use strict";
    function u(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", (u = new t(this)));
            typeof i == "string" && u[i].call(r);
        });
    }
    var i = '[data-dismiss="alert"]',
        t = function (t) {
            n(t).on("click", i, this.close);
        },
        r;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function (i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove();
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        (u || ((u = f.attr("href")), (u = u && u.replace(/.*(?=#[^\s]*$)/, ""))), (r = n(u)), i && i.preventDefault(), r.length || (r = f.closest(".alert")), r.trigger((i = n.Event("close.bs.alert"))), i.isDefaultPrevented()) ||
            (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e());
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function () {
        return (n.fn.alert = r), this;
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.button"),
                f = typeof i == "object" && i;
            r || u.data("bs.button", (r = new t(this, f)));
            i == "toggle" ? r.toggle() : i && r.setState(i);
        });
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1;
        },
        r;
    t.VERSION = "3.3.1";
    t.DEFAULTS = { loadingText: "loading..." };
    t.prototype.setState = function (t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t = t + "Text";
        u.resetText == null && i.data("resetText", i[f]());
        setTimeout(
            n.proxy(function () {
                i[f](u[t] == null ? this.options[t] : u[t]);
                t == "loadingText" ? ((this.isLoading = !0), i.addClass(r).attr(r, r)) : this.isLoading && ((this.isLoading = !1), i.removeClass(r).removeAttr(r));
            }, this),
            0
        );
    };
    t.prototype.toggle = function () {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length
            ? ((n = this.$element.find("input")),
              n.prop("type") == "radio" && (n.prop("checked") && this.$element.hasClass("active") ? (t = !1) : i.find(".active").removeClass("active")),
              t && n.prop("checked", !this.$element.hasClass("active")).trigger("change"))
            : this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active");
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function () {
        return (n.fn.button = r), this;
    };
    n(document)
        .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
            var r = n(t.target);
            r.hasClass("btn") || (r = r.closest(".btn"));
            i.call(r, "toggle");
            t.preventDefault();
        })
        .on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
            n(t.target)
                .closest(".btn")
                .toggleClass("focus", /^focus(in)?$/.test(t.type));
        });
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), typeof i == "object" && i),
                e = typeof i == "string" ? i : f.slide;
            r || u.data("bs.carousel", (r = new t(this, f)));
            typeof i == "number" ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle();
        });
    }
    var t = function (t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = this.sliding = this.interval = this.$active = this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            this.options.pause != "hover" || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this));
        },
        u,
        r;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 };
    t.prototype.keydown = function (n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return;
            }
            n.preventDefault();
        }
    };
    t.prototype.cycle = function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this;
    };
    t.prototype.getItemIndex = function (n) {
        return (this.$items = n.parent().children(".item")), this.$items.index(n || this.$active);
    };
    t.prototype.getItemForDirection = function (n, t) {
        var i = n == "prev" ? -1 : 1,
            r = this.getItemIndex(t),
            u = (r + i) % this.$items.length;
        return this.$items.eq(u);
    };
    t.prototype.to = function (n) {
        var i = this,
            t = this.getItemIndex((this.$active = this.$element.find(".item.active")));
        if (!(n > this.$items.length - 1) && !(n < 0))
            return this.sliding
                ? this.$element.one("slid.bs.carousel", function () {
                      i.to(n);
                  })
                : t == n
                ? this.pause().cycle()
                : this.slide(n > t ? "next" : "prev", this.$items.eq(n));
    };
    t.prototype.pause = function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), (this.interval = clearInterval(this.interval)), this;
    };
    t.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
    };
    t.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
    };
    t.prototype.slide = function (i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = i == "next" ? "left" : "right",
            v = i == "next" ? "first" : "last",
            a = this,
            o,
            s,
            h,
            c;
        if (!u.length) {
            if (!this.options.wrap) return;
            u = this.$element.find(".item")[v]();
        }
        return u.hasClass("active")
            ? (this.sliding = !1)
            : ((o = u[0]), (s = n.Event("slide.bs.carousel", { relatedTarget: o, direction: f })), this.$element.trigger(s), s.isDefaultPrevented())
            ? void 0
            : ((this.sliding = !0),
              l && this.pause(),
              this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), (h = n(this.$indicators.children()[this.getItemIndex(u)])), h && h.addClass("active")),
              (c = n.Event("slid.bs.carousel", { relatedTarget: o, direction: f })),
              n.support.transition && this.$element.hasClass("slide")
                  ? (u.addClass(i),
                    u[0].offsetWidth,
                    e.addClass(f),
                    u.addClass(f),
                    e
                        .one("bsTransitionEnd", function () {
                            u.removeClass([i, f].join(" ")).addClass("active");
                            e.removeClass(["active", f].join(" "));
                            a.sliding = !1;
                            setTimeout(function () {
                                a.$element.trigger(c);
                            }, 0);
                        })
                        .emulateTransitionEnd(t.TRANSITION_DURATION))
                  : (e.removeClass("active"), u.addClass("active"), (this.sliding = !1), this.$element.trigger(c)),
              l && this.cycle(),
              this);
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function () {
        return (n.fn.carousel = u), this;
    };
    r = function (t) {
        var o,
            r = n(this),
            u = n(r.attr("data-target") || ((o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""))),
            e,
            f;
        u.hasClass("carousel") && ((e = n.extend({}, u.data(), r.data())), (f = r.attr("data-slide-to")), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault());
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function () {
        n('[data-ride="carousel"]').each(function () {
            var t = n(this);
            i.call(t, t.data());
        });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(t) {
        (t && t.which === 3) ||
            (n(e).remove(),
            n(i).each(function () {
                var r = n(this),
                    i = u(r),
                    f = { relatedTarget: this };
                i.hasClass("open") && ((i.trigger((t = n.Event("hide.bs.dropdown", f))), t.isDefaultPrevented()) || (r.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", f)));
            }));
    }
    function u(t) {
        var i = t.attr("data-target"),
            r;
        return i || ((i = t.attr("href")), (i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""))), (r = i && n(i)), r && r.length ? r : t.parent();
    }
    function o(i) {
        return this.each(function () {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", (u = new t(this)));
            typeof i == "string" && u[i].call(r);
        });
    }
    var e = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function (t) {
            n(t).on("click.bs.dropdown", this.toggle);
        },
        f;
    t.VERSION = "3.3.1";
    t.prototype.toggle = function (t) {
        var f = n(this),
            i,
            o,
            e;
        if (!f.is(".disabled, :disabled")) {
            if (((i = u(f)), (o = i.hasClass("open")), r(), !o)) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length) n('<div class="dropdown-backdrop"/>').insertAfter(n(this)).on("click", r);
                if (((e = { relatedTarget: this }), i.trigger((t = n.Event("show.bs.dropdown", e))), t.isDefaultPrevented())) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger("shown.bs.dropdown", e);
            }
            return !1;
        }
    };
    t.prototype.keydown = function (t) {
        var e, o, s, h, f, r;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && ((e = n(this)), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (((o = u(e)), (s = o.hasClass("open")), (!s && t.which != 27) || (s && t.which == 27))) return t.which == 27 && o.find(i).trigger("focus"), e.trigger("click");
            ((h = " li:not(.divider):visible a"), (f = o.find('[role="menu"]' + h + ', [role="listbox"]' + h)), f.length) &&
                ((r = f.index(t.target)), t.which == 38 && r > 0 && r--, t.which == 40 && r < f.length - 1 && r++, ~r || (r = 0), f.eq(r).trigger("focus"));
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = o;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function () {
        return (n.fn.dropdown = f), this;
    };
    n(document)
        .on("click.bs.dropdown.data-api", r)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (n) {
            n.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", i, t.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", i, t.prototype.keydown)
        .on("keydown.bs.dropdown.data-api", '[role="menu"]', t.prototype.keydown)
        .on("keydown.bs.dropdown.data-api", '[role="listbox"]', t.prototype.keydown);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i, r) {
        return this.each(function () {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), typeof i == "object" && i);
            u || f.data("bs.modal", (u = new t(this, e)));
            typeof i == "string" ? u[i](r) : e.show && u.show(r);
        });
    }
    var t = function (t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$backdrop = this.isShown = null;
            this.scrollbarWidth = 0;
            this.options.remote &&
                this.$element.find(".modal-content").load(
                    this.options.remote,
                    n.proxy(function () {
                        this.$element.trigger("loaded.bs.modal");
                    }, this)
                );
        },
        r;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 };
    t.prototype.toggle = function (n) {
        return this.isShown ? this.hide() : this.show(n);
    };
    t.prototype.show = function (i) {
        var r = this,
            u = n.Event("show.bs.modal", { relatedTarget: i });
        if ((this.$element.trigger(u), !this.isShown && !u.isDefaultPrevented())) {
            this.isShown = !0;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass("modal-open");
            this.escape();
            this.resize();
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this));
            this.backdrop(function () {
                var f = n.support.transition && r.$element.hasClass("fade"),
                    u;
                r.$element.parent().length || r.$element.appendTo(r.$body);
                r.$element.show().scrollTop(0);
                r.options.backdrop && r.adjustBackdrop();
                r.adjustDialog();
                f && r.$element[0].offsetWidth;
                r.$element.addClass("in").attr("aria-hidden", !1);
                r.enforceFocus();
                u = n.Event("shown.bs.modal", { relatedTarget: i });
                f
                    ? r.$element
                          .find(".modal-dialog")
                          .one("bsTransitionEnd", function () {
                              r.$element.trigger("focus").trigger(u);
                          })
                          .emulateTransitionEnd(t.TRANSITION_DURATION)
                    : r.$element.trigger("focus").trigger(u);
            });
        }
    };
    t.prototype.hide = function (i) {
        (i && i.preventDefault(), (i = n.Event("hide.bs.modal")), this.$element.trigger(i), this.isShown && !i.isDefaultPrevented()) &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            n(document).off("focusin.bs.modal"),
            this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
            n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal());
    };
    t.prototype.enforceFocus = function () {
        n(document)
            .off("focusin.bs.modal")
            .on(
                "focusin.bs.modal",
                n.proxy(function (n) {
                    this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus");
                }, this)
            );
    };
    t.prototype.escape = function () {
        if (this.isShown && this.options.keyboard)
            this.$element.on(
                "keydown.dismiss.bs.modal",
                n.proxy(function (n) {
                    n.which == 27 && this.hide();
                }, this)
            );
        else this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    };
    t.prototype.resize = function () {
        if (this.isShown) n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this));
        else n(window).off("resize.bs.modal");
    };
    t.prototype.hideModal = function () {
        var n = this;
        this.$element.hide();
        this.backdrop(function () {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal");
        });
    };
    t.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    t.prototype.backdrop = function (i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r,
            u;
        if (this.isShown && this.options.backdrop) {
            if (
                ((r = n.support.transition && f),
                (this.$backdrop = n('<div class="modal-backdrop ' + f + '" />')
                    .prependTo(this.$element)
                    .on(
                        "click.dismiss.bs.modal",
                        n.proxy(function (n) {
                            n.target === n.currentTarget && (this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
                        }, this)
                    )),
                r && this.$backdrop[0].offsetWidth,
                this.$backdrop.addClass("in"),
                !i)
            )
                return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i();
        } else
            !this.isShown && this.$backdrop
                ? (this.$backdrop.removeClass("in"),
                  (u = function () {
                      e.removeBackdrop();
                      i && i();
                  }),
                  n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u())
                : i && i();
    };
    t.prototype.handleUpdate = function () {
        this.options.backdrop && this.adjustBackdrop();
        this.adjustDialog();
    };
    t.prototype.adjustBackdrop = function () {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight);
    };
    t.prototype.adjustDialog = function () {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : "" });
    };
    t.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
    };
    t.prototype.checkScrollbar = function () {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight;
        this.scrollbarWidth = this.measureScrollbar();
    };
    t.prototype.setScrollbar = function () {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth);
    };
    t.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "");
    };
    t.prototype.measureScrollbar = function () {
        var n = document.createElement("div"),
            t;
        return (n.className = "modal-scrollbar-measure"), this.$body.append(n), (t = n.offsetWidth - n.clientWidth), this.$body[0].removeChild(n), t;
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function () {
        return (n.fn.modal = r), this;
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || (f && f.replace(/.*(?=#[^\s]+$)/, ""))),
            e = u.data("bs.modal") ? "toggle" : n.extend({ remote: !/#/.test(f) && f }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function (n) {
            if (!n.isDefaultPrevented())
                u.one("hidden.bs.modal", function () {
                    r.is(":visible") && r.trigger("focus");
                });
        });
        i.call(u, e, this);
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var f = n(this),
                r = f.data("bs.tooltip"),
                u = typeof i == "object" && i,
                e = u && u.selector;
            (r || i != "destroy") && (e ? (r || f.data("bs.tooltip", (r = {})), r[e] || (r[e] = new t(this, u))) : r || f.data("bs.tooltip", (r = new t(this, u))), typeof i == "string" && r[i]());
        });
    }
    var t = function (n, t) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
            this.init("tooltip", n, t);
        },
        i;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
    };
    t.prototype.init = function (t, i, r) {
        var f, e, u, o, s;
        for (
            this.enabled = !0,
                this.type = t,
                this.$element = n(i),
                this.options = this.getOptions(r),
                this.$viewport = this.options.viewport && n(this.options.viewport.selector || this.options.viewport),
                f = this.options.trigger.split(" "),
                e = f.length;
            e--;

        )
            if (((u = f[e]), u == "click")) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else if (u != "manual") {
                o = u == "hover" ? "mouseenter" : "focusin";
                s = u == "hover" ? "mouseleave" : "focusout";
                this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this));
                this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this));
            }
        this.options.selector ? (this._options = n.extend({}, this.options, { trigger: "manual", selector: "" })) : this.fixTitle();
    };
    t.prototype.getDefaults = function () {
        return t.DEFAULTS;
    };
    t.prototype.getOptions = function (t) {
        return (t = n.extend({}, this.getDefaults(), this.$element.data(), t)), t.delay && typeof t.delay == "number" && (t.delay = { show: t.delay, hide: t.delay }), t;
    };
    t.prototype.getDelegateOptions = function () {
        var t = {},
            i = this.getDefaults();
        return (
            this._options &&
                n.each(this._options, function (n, r) {
                    i[n] != r && (t[n] = r);
                }),
            t
        );
    };
    t.prototype.enter = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        if (i && i.$tip && i.$tip.is(":visible")) {
            i.hoverState = "in";
            return;
        }
        if ((i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), (i.hoverState = "in"), !i.options.delay || !i.options.delay.show))
            return i.show();
        i.timeout = setTimeout(function () {
            i.hoverState == "in" && i.show();
        }, i.options.delay.show);
    };
    t.prototype.leave = function (t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        if ((i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), (i.hoverState = "out"), !i.options.delay || !i.options.delay.hide))
            return i.hide();
        i.timeout = setTimeout(function () {
            i.hoverState == "out" && i.hide();
        }, i.options.delay.hide);
    };
    t.prototype.show = function () {
        var c = n.Event("show.bs." + this.type),
            l,
            p,
            h;
        if (this.hasContent() && this.enabled) {
            if ((this.$element.trigger(c), (l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])), c.isDefaultPrevented() || !l)) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = typeof this.options.placement == "function" ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach()
                .css({ top: 0, left: 0, display: "block" })
                .addClass(i)
                .data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            if (y) {
                var w = i,
                    b = this.options.container ? n(this.options.container) : this.$element.parent(),
                    e = this.getPosition(b);
                i = i == "bottom" && f.bottom + s > e.bottom ? "top" : i == "top" && f.top - s < e.top ? "bottom" : i == "right" && f.right + o > e.width ? "left" : i == "left" && f.left - o < e.left ? "right" : i;
                r.removeClass(w).addClass(i);
            }
            p = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(p, i);
            h = function () {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                n == "out" && u.leave(u);
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h();
        }
    };
    t.prototype.applyPlacement = function (t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h,
            f,
            u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top = t.top + o;
        t.left = t.left + s;
        n.offset.setOffset(
            r[0],
            n.extend(
                {
                    using: function (n) {
                        r.css({ top: Math.round(n.top), left: Math.round(n.left) });
                    },
                },
                t
            ),
            0
        );
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        i == "top" && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? (t.left += u.left) : (t.top += u.top);
        var c = /top|bottom/.test(i),
            a = c ? u.left * 2 - l + h : u.top * 2 - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c);
    };
    t.prototype.replaceArrow = function (n, t, i) {
        this.arrow()
            .css(i ? "left" : "top", 50 * (1 - n / t) + "%")
            .css(i ? "top" : "left", "");
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right");
    };
    t.prototype.hide = function (i) {
        function e() {
            r.hoverState != "in" && u.detach();
            r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type);
            i && i();
        }
        var r = this,
            u = this.tip(),
            f = n.Event("hide.bs." + this.type);
        if ((this.$element.trigger(f), !f.isDefaultPrevented()))
            return u.removeClass("in"), n.support.transition && this.$tip.hasClass("fade") ? u.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e(), (this.hoverState = null), this;
    };
    t.prototype.fixTitle = function () {
        var n = this.$element;
        (n.attr("title") || typeof n.attr("data-original-title") != "string") && n.attr("data-original-title", n.attr("title") || "").attr("title", "");
    };
    t.prototype.hasContent = function () {
        return this.getTitle();
    };
    t.prototype.getPosition = function (t) {
        t = t || this.$element;
        var u = t[0],
            r = u.tagName == "BODY",
            i = u.getBoundingClientRect();
        i.width == null && (i = n.extend({}, i, { width: i.right - i.left, height: i.bottom - i.top }));
        var f = r ? { top: 0, left: 0 } : t.offset(),
            e = { scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
            o = r ? { width: n(window).width(), height: n(window).height() } : null;
        return n.extend({}, i, e, o, f);
    };
    t.prototype.getCalculatedOffset = function (n, t, i, r) {
        return n == "bottom"
            ? { top: t.top + t.height, left: t.left + t.width / 2 - i / 2 }
            : n == "top"
            ? { top: t.top - r, left: t.left + t.width / 2 - i / 2 }
            : n == "left"
            ? { top: t.top + t.height / 2 - r / 2, left: t.left - i }
            : { top: t.top + t.height / 2 - r / 2, left: t.left + t.width };
    };
    t.prototype.getViewportAdjustedDelta = function (n, t, i, r) {
        var f = { top: 0, left: 0 },
            e,
            u,
            o,
            s,
            h,
            c;
        return this.$viewport
            ? ((e = (this.options.viewport && this.options.viewport.padding) || 0),
              (u = this.getPosition(this.$viewport)),
              /right|left/.test(n)
                  ? ((o = t.top - e - u.scroll), (s = t.top + e - u.scroll + r), o < u.top ? (f.top = u.top - o) : s > u.top + u.height && (f.top = u.top + u.height - s))
                  : ((h = t.left - e), (c = t.left + e + i), h < u.left ? (f.left = u.left - h) : c > u.width && (f.left = u.left + u.width - c)),
              f)
            : f;
    };
    t.prototype.getTitle = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title);
    };
    t.prototype.getUID = function (n) {
        do n += ~~(Math.random() * 1e6);
        while (document.getElementById(n));
        return n;
    };
    t.prototype.tip = function () {
        return (this.$tip = this.$tip || n(this.options.template));
    };
    t.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
    };
    t.prototype.enable = function () {
        this.enabled = !0;
    };
    t.prototype.disable = function () {
        this.enabled = !1;
    };
    t.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
    };
    t.prototype.toggle = function (t) {
        var i = this;
        t && ((i = n(t.currentTarget).data("bs." + this.type)), i || ((i = new this.constructor(t.currentTarget, this.getDelegateOptions())), n(t.currentTarget).data("bs." + this.type, i)));
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    };
    t.prototype.destroy = function () {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function () {
            n.$element.off("." + n.type).removeData("bs." + n.type);
        });
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function () {
        return (n.fn.tooltip = i), this;
    };
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var f = n(this),
                r = f.data("bs.popover"),
                u = typeof i == "object" && i,
                e = u && u.selector;
            (r || i != "destroy") && (e ? (r || f.data("bs.popover", (r = {})), r[e] || (r[e] = new t(this, u))) : r || f.data("bs.popover", (r = new t(this, u))), typeof i == "string" && r[i]());
        });
    }
    var t = function (n, t) {
            this.init("popover", n, t);
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.1";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function () {
        return t.DEFAULTS;
    };
    t.prototype.setContent = function () {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? (typeof t == "string" ? "html" : "append") : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide();
    };
    t.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
    };
    t.prototype.getContent = function () {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content);
    };
    t.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
    };
    t.prototype.tip = function () {
        return this.$tip || (this.$tip = n(this.options.template)), this.$tip;
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function () {
        return (n.fn.popover = i), this;
    };
})(jQuery);
+(function (n) {
    "use strict";
    function r(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", (r = new t(this)));
            typeof i == "string" && r[i]();
        });
    }
    var t = function (t) {
            this.element = n(t);
        },
        u,
        i;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function () {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if ((i || ((i = t.attr("href")), (i = i && i.replace(/.*(?=#[^\s]*$)/, ""))), !t.parent("li").hasClass("active"))) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", { relatedTarget: t[0] }),
                o = n.Event("show.bs.tab", { relatedTarget: r[0] });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) ||
                ((u = n(i)),
                this.activate(t.closest("li"), f),
                this.activate(u, u.parent(), function () {
                    r.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] });
                    t.trigger({ type: "shown.bs.tab", relatedTarget: r[0] });
                }));
        }
    };
    t.prototype.activate = function (i, r, u) {
        function o() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            e ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu") && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u();
        }
        var f = r.find("> .active"),
            e = u && n.support.transition && ((f.length && f.hasClass("fade")) || !!r.find("> .fade").length);
        f.length && e ? f.one("bsTransitionEnd", o).emulateTransitionEnd(t.TRANSITION_DURATION) : o();
        f.removeClass("in");
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function () {
        return (n.fn.tab = u), this;
    };
    i = function (t) {
        t.preventDefault();
        r.call(n(this), "show");
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i);
})(jQuery);
+(function (n) {
    "use strict";
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.affix"),
                f = typeof i == "object" && i;
            r || u.data("bs.affix", (r = new t(this, f)));
            typeof i == "string" && r[i]();
        });
    }
    var t = function (i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = this.unpin = this.pinnedOffset = null;
            this.checkPosition();
        },
        r;
    t.VERSION = "3.3.1";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = { offset: 0, target: window };
    t.prototype.getState = function (n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (i != null && this.affixed == "top") return u < i ? "top" : !1;
        if (this.affixed == "bottom") return i != null ? (u + this.unpin <= f.top ? !1 : "bottom") : u + e <= n - r ? !1 : "bottom";
        var o = this.affixed == null,
            s = o ? u : f.top,
            h = o ? e : t;
        return i != null && s <= i ? "top" : r != null && s + h >= n - r ? "bottom" : !1;
    };
    t.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return (this.pinnedOffset = i.top - n);
    };
    t.prototype.checkPositionWithEventLoop = function () {
        setTimeout(n.proxy(this.checkPosition, this), 1);
    };
    t.prototype.checkPosition = function () {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = n("body").height();
            if ((typeof r != "object" && (u = f = r), typeof f == "function" && (f = r.top(this.$element)), typeof u == "function" && (u = r.bottom(this.$element)), (i = this.getState(h, s, f, u)), this.affixed != i)) {
                if ((this.unpin != null && this.$element.css("top", ""), (e = "affix" + (i ? "-" + i : "")), (o = n.Event(e + ".bs.affix")), this.$element.trigger(o), o.isDefaultPrevented())) return;
                this.affixed = i;
                this.unpin = i == "bottom" ? this.getPinnedOffset() : null;
                this.$element
                    .removeClass(t.RESET)
                    .addClass(e)
                    .trigger(e.replace("affix", "affixed") + ".bs.affix");
            }
            i == "bottom" && this.$element.offset({ top: h - s - u });
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function () {
        return (n.fn.affix = r), this;
    };
    n(window).on("load", function () {
        n('[data-spy="affix"]').each(function () {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            t.offsetBottom != null && (t.offset.bottom = t.offsetBottom);
            t.offsetTop != null && (t.offset.top = t.offsetTop);
            i.call(r, t);
        });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function r(t) {
        var i,
            r = t.attr("data-target") || ((i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        return n(r);
    }
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), typeof i == "object" && i);
            !r && f.toggle && i == "show" && (f.toggle = !1);
            r || u.data("bs.collapse", (r = new t(this, f)));
            typeof i == "string" && r[i]();
        });
    }
    var t = function (i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n(this.options.trigger).filter('[href="#' + i.id + '"], [data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle();
        },
        u;
    t.VERSION = "3.3.1";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = { toggle: !0, trigger: '[data-toggle="collapse"]' };
    t.prototype.dimension = function () {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height";
    };
    t.prototype.show = function () {
        var f, r, e, u, o, s;
        if (
            !this.transitioning &&
            !this.$element.hasClass("in") &&
            ((r = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing")), !r || !r.length || ((f = r.data("bs.collapse")), !f || !f.transitioning)) &&
            ((e = n.Event("show.bs.collapse")), this.$element.trigger(e), !e.isDefaultPrevented())
        ) {
            if (
                (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)),
                (u = this.dimension()),
                this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0),
                this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                (this.transitioning = 1),
                (o = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse");
                }),
                !n.support.transition)
            )
                return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s]);
        }
    };
    t.prototype.hide = function () {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && ((r = n.Event("hide.bs.collapse")), this.$element.trigger(r), !r.isDefaultPrevented())) {
            if (
                ((i = this.dimension()),
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                (this.transitioning = 1),
                (u = function () {
                    this.transitioning = 0;
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                }),
                !n.support.transition)
            )
                return u.call(this);
            this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION);
        }
    };
    t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    t.prototype.getParent = function () {
        return n(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each(
                n.proxy(function (t, i) {
                    var u = n(i);
                    this.addAriaAndCollapsedClass(r(u), u);
                }, this)
            )
            .end();
    };
    t.prototype.addAriaAndCollapsedClass = function (n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i);
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function () {
        return (n.fn.collapse = u), this;
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : n.extend({}, u.data(), { trigger: this });
        i.call(f, o);
    });
})(jQuery);
+(function (n) {
    "use strict";
    function t(i, r) {
        var u = n.proxy(this.process, this);
        this.$body = n("body");
        this.$scrollElement = n(i).is("body") ? n(window) : n(i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", u);
        this.refresh();
        this.process();
    }
    function i(i) {
        return this.each(function () {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = typeof i == "object" && i;
            r || u.data("bs.scrollspy", (r = new t(this, f)));
            typeof i == "string" && r[i]();
        });
    }
    t.VERSION = "3.3.1";
    t.DEFAULTS = { offset: 10 };
    t.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    };
    t.prototype.refresh = function () {
        var i = "offset",
            r = 0,
            t;
        n.isWindow(this.$scrollElement[0]) || ((i = "position"), (r = this.$scrollElement.scrollTop()));
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        t = this;
        this.$body
            .find(this.selector)
            .map(function () {
                var f = n(this),
                    u = f.data("target") || f.attr("href"),
                    t = /^#./.test(u) && n(u);
                return (t && t.length && t.is(":visible") && [[t[i]().top + r, u]]) || null;
            })
            .sort(function (n, t) {
                return n[0] - t[0];
            })
            .each(function () {
                t.offsets.push(this[0]);
                t.targets.push(this[1]);
            });
    };
    t.prototype.process = function () {
        var i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget,
            n;
        if ((this.scrollHeight != f && this.refresh(), i >= e)) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return (this.activeTarget = null), this.clear();
        for (n = t.length; n--; ) u != r[n] && i >= t[n] && (!t[n + 1] || i <= t[n + 1]) && this.activate(r[n]);
    };
    t.prototype.activate = function (t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy");
    };
    t.prototype.clear = function () {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function () {
        return (n.fn.scrollspy = r), this;
    };
    n(window).on("load.bs.scrollspy.data-api", function () {
        n('[data-spy="scroll"]').each(function () {
            var t = n(this);
            i.call(t, t.data());
        });
    });
})(jQuery);
+(function (n) {
    "use strict";
    function t() {
        var i = document.createElement("bootstrap"),
            t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
            n;
        for (n in t) if (i.style[n] !== undefined) return { end: t[n] };
        return !1;
    }
    n.fn.emulateTransitionEnd = function (t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function () {
            i = !0;
        });
        return (
            (r = function () {
                i || n(u).trigger(n.support.transition.end);
            }),
            setTimeout(r, t),
            this
        );
    };
    n(function () {
        ((n.support.transition = t()), n.support.transition) &&
            (n.event.special.bsTransitionEnd = {
                bindType: n.support.transition.end,
                delegateType: n.support.transition.end,
                handle: function (t) {
                    if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
                },
            });
    });
})(jQuery),
    (function (n) {
        "use strict";
        function r(n, t) {
            return n.position().left + n.width() > 0 && n.position().left < t.width() ? !0 : !1;
        }
        var t = function (t, i) {
                this.element = n(t);
                this.gallerymodal = this.element.find(".modal");
                n(document).on("keyup.bsgallery", this.element, n.proxy(this.keyup, this));
                this.initialize();
                this.options = i;
                this.gallerydata = [];
                this.gallerysourceurl = i.gallerysourceurl;
                this.galleryidx = -1;
                this.galleryid = "";
                this.galleryname = "";
                this.gallerycount = 0;
                this.preloader = '<i class="preloader text-muted far fa-5x fa-circle-notch fa-spin"></i>';
                this.thumbpreloader = '<i class="preloader text-muted far fa-2x fa-circle-notch fa-spin"></i>';
            },
            i = function () {
                this.itemid = "";
                this.itemthumb = "";
                this.itemurl = "";
                this.itemtype = "";
                this.itemtitle = "";
                this.itemdescription = "";
                this.itemimagealttext = "";
            };
        t.prototype = {
            constructor: t,
            initialize: function () {
                var t = this,
                    i = this.gallerymodal;
                n(document).on("click", "a[data-bsgallery]", function (i) {
                    function o() {
                        t.display(u);
                        t.loadThumbs();
                    }
                    i.stopPropagation();
                    i.preventDefault();
                    var r = n(this).attr("data-galleryid"),
                        f = n(this).attr("data-bsgallery"),
                        e = this,
                        u = n('a[data-galleryid="' + r + '"]').index(e);
                    t.galleryidx = u;
                    t.galleryid = r;
                    t.galleryname = f;
                    t.show();
                    t.loadData(r, o);
                });
                i.find(".btn-prev").on("click", function (n) {
                    n.preventDefault();
                    t.prev();
                });
                i.find(".btn-next").on("click", function (n) {
                    n.preventDefault();
                    t.next();
                });
                n(document).on("click", "a.modal-thumbnail", function (r) {
                    r.preventDefault();
                    var u = n(this).index();
                    t.display(u);
                    n("a.modal-thumbnail.active").removeClass("active");
                    n(this).addClass("active");
                    i.find(".modal-dock").collapse("hide");
                });
                i.on("hidden.bs.modal", function () {
                    n("html").removeClass("bs-modal-open");
                    n(this).find(".modal-media iframe").remove();
                });
                i.find(".modal-dock").on("show.bs.collapse", function () {
                    i.addClass("modal-overlay");
                });
                i.find(".modal-dock").on("shown.bs.collapse", function () {
                    t.loadVisibleThumbs();
                });
                i.find(".modal-dock").on("hidden.bs.collapse", function () {
                    i.removeClass("modal-overlay");
                });
                n(window).on("resize.bsgallery", function () {
                    if (n("html").hasClass("bs-modal-open")) {
                        var t = n(".modal-canvas").innerWidth();
                        n(".modal-media").css("width", t * 0.7 + "px");
                        n(window).innerHeight() > n(window).innerWidth() ? n(".modal-col-canvas").css("height", "80%") : n(".modal-col-canvas").css("height", "100%");
                    }
                });
                n(".modal-thumbnails").on("scroll", function () {
                    t.loadVisibleThumbs();
                });
                this.element.attr("tabindex", "1");
            },
            loadData: function (t, r) {
                var u = this;
                u.gallerydata[t]
                    ? r()
                    : ((u.gallerydata[t] = []),
                      u.gallerysourceurl
                          ? (u.gallerymodal.addClass("loading"),
                            u.gallerymodal.find(".modal-media").html('<span class="modal-media-helper"></span>' + u.preloader),
                            n.ajax({
                                type: "POST",
                                cache: !1,
                                dataType: "json",
                                url: u.gallerysourceurl,
                                data: "galleryid=" + t + serializeSecToken(),
                                success: function (f) {
                                    if ((n("body").find(".preloader-backdrop").remove(), f.IsValid)) {
                                        var e = f.Data.galleryitems;
                                        e &&
                                            n.each(e, function (n, r) {
                                                var f = new i();
                                                f.itemid = r.itemid;
                                                f.itemtitle = r.itemtitle;
                                                f.itemdescription = r.itemdescription;
                                                f.itemtype = r.itemtype;
                                                f.itemthumb = r.itemthumb;
                                                f.itemurl = r.itemurl;
                                                f.itemimagealttext = r.itemimagealttext ? r.itemimagealttext : "";
                                                u.gallerydata[t].push(f);
                                            });
                                        r();
                                    }
                                    u.gallerymodal.removeClass("loading");
                                },
                                error: function () {
                                    u.gallerymodal.removeClass("loading");
                                    alert("Error Loading Gallery");
                                },
                            }))
                          : (n("a[data-galleryid='" + t + "']").each(function () {
                                var r = new i();
                                r.itemid = n(this).attr("data-itemid");
                                r.itemtitle = n(this).attr("title");
                                r.itemdescription = n(this).attr("data-description");
                                r.itemtype = n(this).attr("data-gallerytype");
                                r.itemthumb = n(this).attr("data-thumb-src");
                                r.itemurl = n(this).attr("href");
                                r.itemimagealttext = n(this).attr("alt");
                                u.gallerydata[t].push(r);
                            }),
                            r()));
            },
            prev: function () {
                var i = this.galleryid,
                    r = parseInt(this.galleryidx),
                    t = this.gallerydata[i].length,
                    n;
                t > 1 && ((n = r - 1), (n = n < 0 ? t - 1 : n), this.display(n));
            },
            next: function () {
                var i = this.galleryid,
                    r = parseInt(this.galleryidx),
                    t = this.gallerydata[i].length,
                    n;
                t > 1 && ((n = r + 1), (n = n >= t ? 0 : n), this.display(n));
            },
            displayModal: function (t, i) {
                var e = "",
                    o = this,
                    r = o.gallerymodal,
                    s = o.galleryname,
                    c = i.itemdescription,
                    l = i.itemtitle,
                    h = i.itemurl,
                    u,
                    f;
                n.trim(c).length > 0 && (e += c);
                n.trim(l).length > 0 ? r.find(".modal-content .modal-title").show() : r.find(".modal-content .modal-title").hide();
                n.trim(e).length > 0 ? r.find(".modal-content .modal-caption").show() : r.find(".modal-content .modal-caption").hide();
                r.find(".gallery-title").text(s);
                r.find(".modal-content .modal-title").text(l || String.fromCharCode(160));
                r.find(".modal-media").html(t);
                r.find(".modal-caption").html(e);
                r.find(".original-img-link").attr("href", h);
                u = "//www.facebook.com/sharer/sharer.php?s=100&p[url]={0}&p[images][0]={1}&p[title]={2}";
                u = u.replace("{0}", encodeURIComponent(document.location.href));
                u = u.replace("{1}", encodeURIComponent(h));
                u = u.replace("{2}", encodeURIComponent(s));
                f = "//pinterest.com/pin/create/button/?url={0}&media={1}&description={2}";
                f = f.replace("{0}", encodeURIComponent(document.location.href));
                f = f.replace("{1}", encodeURIComponent(h));
                f = f.replace("{2}", encodeURIComponent(s));
                r.find(".btn-facebook-share-link").attr("href", u);
                r.find(".btn-pinterest-share-link").attr("href", f);
                var v = typeof r.find("img")[0] != "undefined",
                    y = v ? r.find("img")[0] : r.find("iframe")[0],
                    a = new Hammer(y);
                a.on("swipeleft", function () {
                    r.find(".btn-next").trigger("click");
                });
                a.on("swiperight", function () {
                    r.find(".btn-prev").trigger("click");
                });
                setTimeout(function () {
                    o.show();
                }, 100);
            },
            loadThumbs: function () {
                var t = this,
                    i = n(".modal-thumbnails");
                i.attr("data-galleryid") != t.galleryid &&
                    (i.children().remove(),
                    n.each(t.gallerydata[t.galleryid], function (r) {
                        var u = this,
                            e = r == t.galleryidx ? " active" : "",
                            f;
                        u.icon = u.itemtype == "video" ? '<span class="video-icon"><i class="fas fa-play-circle fa-2x"></i></span>' : "";
                        f = "<a id='thumb-" + r + '\' href="#" class="modal-thumbnail notloaded' + e + '">' + t.thumbpreloader + "</a>";
                        i.append(n(f).data("galleryitem", u));
                    }),
                    i.attr("data-galleryid", t.galleryid));
            },
            loadVisibleThumbs: function () {
                var t = n(".modal-thumbnails");
                n(".modal-thumbnail.notloaded").each(function () {
                    var u = n(this),
                        i;
                    r(u, t) &&
                        ((i = u.data("galleryitem")),
                        n("<img>")
                            .attr({ src: i.itemthumb })
                            .load(function () {
                                u.html("<img alt='" + i.itemimagealttext + '\' class="img-responsive" src="' + i.itemthumb + '" />' + i.icon);
                            }),
                        u.removeClass("notloaded").data("galleryitem", null));
                });
            },
            display: function (t) {
                var s = '<span class="modal-media-helper"></span>',
                    i = this,
                    u = i.gallerymodal,
                    f = i.galleryid,
                    e,
                    r,
                    h;
                if (((t = parseInt(t)), (e = this.gallerydata[f].length), e > 1 ? u.find(".btn-next,.btn-prev").css({ display: "" }) : u.find(".btn-next,.btn-prev").css({ display: "none" }), t > -1 && t <= e)) {
                    r = i.gallerydata[f][t];
                    i.galleryidx = t;
                    i.gallerycount = i.gallerydata[f].length;
                    var o = r.itemurl,
                        c = r.itemtitle,
                        l = r.itemtype;
                    n(".media-count .current-count").text(parseInt(i.galleryidx) + 1);
                    n(".media-count .total-count").text(i.gallerycount);
                    u.find(".modal-media").html(s + i.preloader);
                    l == "video"
                        ? ((h = "<div class='embed-responsive embed-responsive-16by9'><iframe src=\"" + o + '" height="315" width="560" allowfullscreen="" frameborder="0"></iframe></div>'),
                          i.displayModal(h, r),
                          u.find(".original-img-link").hide())
                        : n("<img>")
                              .attr({ src: o })
                              .load(function () {
                                  var n = this.width,
                                      t = this.height,
                                      f = s + '<img class="img-responsive" alt="' + r.itemimagealttext + '" title="' + c + '" src="' + o + "\" data-src-width='" + n + "' data-src-height='" + t + "' />";
                                  i.displayModal(f, r);
                                  u.find(".original-img-link").show();
                              });
                }
            },
            show: function () {
                n("html").addClass("bs-modal-open");
                this.gallerymodal.modal("show");
                n(window).resize();
            },
            hide: function () {
                this.gallerymodal.modal("hide");
            },
            keyup: function (n) {
                n.keyCode == 37 ? this.prev() : n.keyCode == 39 && this.next();
            },
        };
        n.fn.bsgallery = function (i, r) {
            return this.each(function () {
                var f = n(this),
                    u = f.data("bsgallery"),
                    e = typeof i == "object" && i;
                u || f.data("bsgallery", (u = new t(this, n.extend({}, n.fn.bsgallery.defaults, e))));
                typeof i == "string" && u[i](r);
            });
        };
        n.fn.bsgallery.defaults = {};
        n.fn.bsgallery.Constructor = t;
    })(window.jQuery),
    (function (n) {
        typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" ? n(require("jquery")) : n(jQuery);
    })(function (n, t) {
        function u() {
            return new Date(Date.UTC.apply(Date, arguments));
        }
        function h() {
            var n = new Date();
            return u(n.getFullYear(), n.getMonth(), n.getDate());
        }
        function y(n, t) {
            return n.getUTCFullYear() === t.getUTCFullYear() && n.getUTCMonth() === t.getUTCMonth() && n.getUTCDate() === t.getUTCDate();
        }
        function c(n) {
            return function () {
                return this[n].apply(this, arguments);
            };
        }
        function p(n) {
            return n && !isNaN(n.getTime());
        }
        function w(t, i) {
            function s(n, t) {
                return t.toLowerCase();
            }
            var u = n(t).data(),
                f = {},
                e,
                o = new RegExp("^" + i.toLowerCase() + "([A-Z])"),
                r;
            i = new RegExp("^" + i.toLowerCase());
            for (r in u) i.test(r) && ((e = r.replace(o, s)), (f[e] = u[r]));
            return f;
        }
        function b(t) {
            var u = {},
                i;
            if (r[t] || ((t = t.split("-")[0]), r[t]))
                return (
                    (i = r[t]),
                    n.each(v, function (n, t) {
                        t in i && (u[t] = i[t]);
                    }),
                    u
                );
        }
        var l = (function () {
                var t = {
                    get: function (n) {
                        return this.slice(n)[0];
                    },
                    contains: function (n) {
                        for (var r = n && n.valueOf(), t = 0, i = this.length; t < i; t++) if (this[t].valueOf() === r) return t;
                        return -1;
                    },
                    remove: function (n) {
                        this.splice(n, 1);
                    },
                    replace: function (t) {
                        t && (n.isArray(t) || (t = [t]), this.clear(), this.push.apply(this, t));
                    },
                    clear: function () {
                        this.length = 0;
                    },
                    copy: function () {
                        var n = new l();
                        return n.replace(this), n;
                    },
                };
                return function () {
                    var i = [];
                    return i.push.apply(i, arguments), n.extend(i, t), i;
                };
            })(),
            f = function (t, r) {
                n(t).data("datepicker", this);
                this._process_options(r);
                this.dates = new l();
                this.viewDate = this.o.defaultViewDate;
                this.focusDate = null;
                this.element = n(t);
                this.isInput = this.element.is("input");
                this.inputField = this.isInput ? this.element : this.element.find("input");
                this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1;
                this.hasInput = this.component && this.inputField.length;
                this.component && this.component.length === 0 && (this.component = !1);
                this.isInline = !this.component && this.element.is("div");
                this.picker = n(i.template);
                this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow);
                this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow);
                this._buildEvents();
                this._attachEvents();
                this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu");
                this.o.rtl && this.picker.addClass("datepicker-rtl");
                this.viewMode = this.o.startView;
                this.o.calendarWeeks &&
                    this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (n, t) {
                        return parseInt(t) + 1;
                    });
                this._allow_update = !1;
                this.setStartDate(this._o.startDate);
                this.setEndDate(this._o.endDate);
                this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
                this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
                this.setDatesDisabled(this.o.datesDisabled);
                this.fillDow();
                this.fillMonths();
                this._allow_update = !0;
                this.update();
                this.showMode();
                this.isInline && this.show();
            },
            o,
            a,
            e,
            s,
            v,
            r,
            i;
        f.prototype = {
            constructor: f,
            _resolveViewName: function (n, i) {
                return n === 0 || n === "days" || n === "month"
                    ? 0
                    : n === 1 || n === "months" || n === "year"
                    ? 1
                    : n === 2 || n === "years" || n === "decade"
                    ? 2
                    : n === 3 || n === "decades" || n === "century"
                    ? 3
                    : n === 4 || n === "centuries" || n === "millennium"
                    ? 4
                    : i === t
                    ? !1
                    : i;
            },
            _check_template: function (i) {
                try {
                    if (i === t || i === "") return !1;
                    if ((i.match(/[<>]/g) || []).length <= 0) return !0;
                    var r = n(i);
                    return r.length > 0;
                } catch (u) {
                    return !1;
                }
            },
            _process_options: function (t) {
                var f, o, l, e, c;
                if (
                    ((this._o = n.extend({}, this._o, t)),
                    (f = this.o = n.extend({}, this._o)),
                    (o = f.language),
                    r[o] || ((o = o.split("-")[0]), r[o] || (o = s.language)),
                    (f.language = o),
                    (f.startView = this._resolveViewName(f.startView, 0)),
                    (f.minViewMode = this._resolveViewName(f.minViewMode, 0)),
                    (f.maxViewMode = this._resolveViewName(f.maxViewMode, 4)),
                    (f.startView = Math.min(f.startView, f.maxViewMode)),
                    (f.startView = Math.max(f.startView, f.minViewMode)),
                    f.multidate !== !0 && ((f.multidate = Number(f.multidate) || !1), f.multidate !== !1 && (f.multidate = Math.max(0, f.multidate))),
                    (f.multidateSeparator = String(f.multidateSeparator)),
                    (f.weekStart %= 7),
                    (f.weekEnd = (f.weekStart + 6) % 7),
                    (l = i.parseFormat(f.format)),
                    f.startDate !== -Infinity && (f.startDate = f.startDate ? (f.startDate instanceof Date ? this._local_to_utc(this._zero_time(f.startDate)) : i.parseDate(f.startDate, l, f.language, f.assumeNearbyYear)) : -Infinity),
                    f.endDate !== Infinity && (f.endDate = f.endDate ? (f.endDate instanceof Date ? this._local_to_utc(this._zero_time(f.endDate)) : i.parseDate(f.endDate, l, f.language, f.assumeNearbyYear)) : Infinity),
                    (f.daysOfWeekDisabled = f.daysOfWeekDisabled || []),
                    n.isArray(f.daysOfWeekDisabled) || (f.daysOfWeekDisabled = f.daysOfWeekDisabled.split(/[,\s]*/)),
                    (f.daysOfWeekDisabled = n.map(f.daysOfWeekDisabled, function (n) {
                        return parseInt(n, 10);
                    })),
                    (f.daysOfWeekHighlighted = f.daysOfWeekHighlighted || []),
                    n.isArray(f.daysOfWeekHighlighted) || (f.daysOfWeekHighlighted = f.daysOfWeekHighlighted.split(/[,\s]*/)),
                    (f.daysOfWeekHighlighted = n.map(f.daysOfWeekHighlighted, function (n) {
                        return parseInt(n, 10);
                    })),
                    (f.datesDisabled = f.datesDisabled || []),
                    n.isArray(f.datesDisabled) || (f.datesDisabled = [f.datesDisabled]),
                    (f.datesDisabled = n.map(f.datesDisabled, function (n) {
                        return i.parseDate(n, l, f.language, f.assumeNearbyYear);
                    })),
                    (e = String(f.orientation).toLowerCase().split(/\s+/g)),
                    (c = f.orientation.toLowerCase()),
                    (e = n.grep(e, function (n) {
                        return /^auto|left|right|top|bottom$/.test(n);
                    })),
                    (f.orientation = { x: "auto", y: "auto" }),
                    c && c !== "auto")
                )
                    if (e.length === 1)
                        switch (e[0]) {
                            case "top":
                            case "bottom":
                                f.orientation.y = e[0];
                                break;
                            case "left":
                            case "right":
                                f.orientation.x = e[0];
                        }
                    else
                        (c = n.grep(e, function (n) {
                            return /^left|right$/.test(n);
                        })),
                            (f.orientation.x = c[0] || "auto"),
                            (c = n.grep(e, function (n) {
                                return /^top|bottom$/.test(n);
                            })),
                            (f.orientation.y = c[0] || "auto");
                if (f.defaultViewDate) {
                    var a = f.defaultViewDate.year || new Date().getFullYear(),
                        v = f.defaultViewDate.month || 0,
                        y = f.defaultViewDate.day || 1;
                    f.defaultViewDate = u(a, v, y);
                } else f.defaultViewDate = h();
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function (n) {
                for (var i = 0, f, r, u; i < n.length; i++) {
                    f = n[i][0];
                    n[i].length === 2 ? ((r = t), (u = n[i][1])) : n[i].length === 3 && ((r = n[i][1]), (u = n[i][2]));
                    f.on(u, r);
                }
            },
            _unapplyEvents: function (n) {
                for (var i = 0, f, r, u; i < n.length; i++) (f = n[i][0]), n[i].length === 2 ? ((u = t), (r = n[i][1])) : n[i].length === 3 && ((u = n[i][1]), (r = n[i][2])), f.off(r, u);
            },
            _buildEvents: function () {
                var t = {
                    keyup: n.proxy(function (t) {
                        n.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1 && this.update();
                    }, this),
                    keydown: n.proxy(this.keydown, this),
                    paste: n.proxy(this.paste, this),
                };
                this.o.showOnFocus === !0 && (t.focus = n.proxy(this.show, this));
                this._events = this.isInput
                    ? [[this.element, t]]
                    : this.component && this.hasInput
                    ? [
                          [this.inputField, t],
                          [this.component, { click: n.proxy(this.show, this) }],
                      ]
                    : [[this.element, { click: n.proxy(this.show, this), keydown: n.proxy(this.keydown, this) }]];
                this._events.push(
                    [
                        this.element,
                        "*",
                        {
                            blur: n.proxy(function (n) {
                                this._focused_from = n.target;
                            }, this),
                        },
                    ],
                    [
                        this.element,
                        {
                            blur: n.proxy(function (n) {
                                this._focused_from = n.target;
                            }, this),
                        },
                    ]
                );
                this.o.immediateUpdates &&
                    this._events.push([
                        this.element,
                        {
                            "changeYear changeMonth": n.proxy(function (n) {
                                this.update(n.date);
                            }, this),
                        },
                    ]);
                this._secondaryEvents = [
                    [this.picker, { click: n.proxy(this.click, this) }],
                    [n(window), { resize: n.proxy(this.place, this) }],
                    [
                        n(document),
                        {
                            mousedown: n.proxy(function (n) {
                                this.element.is(n.target) || this.element.find(n.target).length || this.picker.is(n.target) || this.picker.find(n.target).length || this.isInline || this.hide();
                            }, this),
                        },
                    ],
                ];
            },
            _attachEvents: function () {
                this._detachEvents();
                this._applyEvents(this._events);
            },
            _detachEvents: function () {
                this._unapplyEvents(this._events);
            },
            _attachSecondaryEvents: function () {
                this._detachSecondaryEvents();
                this._applyEvents(this._secondaryEvents);
            },
            _detachSecondaryEvents: function () {
                this._unapplyEvents(this._secondaryEvents);
            },
            _trigger: function (t, r) {
                var u = r || this.dates.get(-1),
                    f = this._utc_to_local(u);
                this.element.trigger({
                    type: t,
                    date: f,
                    dates: n.map(this.dates, this._utc_to_local),
                    format: n.proxy(function (n, t) {
                        arguments.length === 0 ? ((n = this.dates.length - 1), (t = this.o.format)) : typeof n == "string" && ((t = n), (n = this.dates.length - 1));
                        t = t || this.o.format;
                        var r = this.dates.get(n);
                        return i.formatDate(r, t, this.o.language);
                    }, this),
                });
            },
            show: function () {
                if (!this.inputField.prop("disabled") && (!this.inputField.prop("readonly") || this.o.enableOnReadonly !== !1))
                    return (
                        this.isInline || this.picker.appendTo(this.o.container),
                        this.place(),
                        this.picker.show(),
                        this._attachSecondaryEvents(),
                        this._trigger("show"),
                        (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && n(this.element).blur(),
                        this
                    );
            },
            hide: function () {
                return this.isInline || !this.picker.is(":visible")
                    ? this
                    : ((this.focusDate = null),
                      this.picker.hide().detach(),
                      this._detachSecondaryEvents(),
                      (this.viewMode = this.o.startView),
                      this.showMode(),
                      this.o.forceParse && this.inputField.val() && this.setValue(),
                      this._trigger("hide"),
                      this);
            },
            destroy: function () {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this;
            },
            paste: function (t) {
                var i;
                if (t.originalEvent.clipboardData && t.originalEvent.clipboardData.types && n.inArray("text/plain", t.originalEvent.clipboardData.types) !== -1) i = t.originalEvent.clipboardData.getData("text/plain");
                else if (window.clipboardData) i = window.clipboardData.getData("Text");
                else return;
                this.setDate(i);
                this.update();
                t.preventDefault();
            },
            _utc_to_local: function (n) {
                return n && new Date(n.getTime() + n.getTimezoneOffset() * 6e4);
            },
            _local_to_utc: function (n) {
                return n && new Date(n.getTime() - n.getTimezoneOffset() * 6e4);
            },
            _zero_time: function (n) {
                return n && new Date(n.getFullYear(), n.getMonth(), n.getDate());
            },
            _zero_utc_time: function (n) {
                return n && new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
            },
            getDates: function () {
                return n.map(this.dates, this._utc_to_local);
            },
            getUTCDates: function () {
                return n.map(this.dates, function (n) {
                    return new Date(n);
                });
            },
            getDate: function () {
                return this._utc_to_local(this.getUTCDate());
            },
            getUTCDate: function () {
                var n = this.dates.get(-1);
                return typeof n != "undefined" ? new Date(n) : null;
            },
            clearDates: function () {
                this.inputField && this.inputField.val("");
                this.update();
                this._trigger("changeDate");
                this.o.autoclose && this.hide();
            },
            setDates: function () {
                var t = n.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, t), this._trigger("changeDate"), this.setValue(), this;
            },
            setUTCDates: function () {
                var t = n.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, n.map(t, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this;
            },
            setDate: c("setDates"),
            setUTCDate: c("setUTCDates"),
            remove: c("destroy"),
            setValue: function () {
                var n = this.getFormattedDate();
                return this.inputField.val(n), this;
            },
            getFormattedDate: function (r) {
                r === t && (r = this.o.format);
                var u = this.o.language;
                return n
                    .map(this.dates, function (n) {
                        return i.formatDate(n, r, u);
                    })
                    .join(this.o.multidateSeparator);
            },
            getStartDate: function () {
                return this.o.startDate;
            },
            setStartDate: function (n) {
                return this._process_options({ startDate: n }), this.update(), this.updateNavArrows(), this;
            },
            getEndDate: function () {
                return this.o.endDate;
            },
            setEndDate: function (n) {
                return this._process_options({ endDate: n }), this.update(), this.updateNavArrows(), this;
            },
            setDaysOfWeekDisabled: function (n) {
                return this._process_options({ daysOfWeekDisabled: n }), this.update(), this.updateNavArrows(), this;
            },
            setDaysOfWeekHighlighted: function (n) {
                return this._process_options({ daysOfWeekHighlighted: n }), this.update(), this;
            },
            setDatesDisabled: function (n) {
                this._process_options({ datesDisabled: n });
                this.update();
                this.updateNavArrows();
            },
            place: function () {
                var r, y, p;
                if (this.isInline) return this;
                var f = this.picker.outerWidth(),
                    s = this.picker.outerHeight(),
                    e = n(this.o.container),
                    h = e.width(),
                    c = this.o.container === "body" ? n(document).scrollTop() : e.scrollTop(),
                    l = e.offset(),
                    a = [];
                this.element.parents().each(function () {
                    var t = n(this).css("z-index");
                    t !== "auto" && t !== 0 && a.push(parseInt(t));
                });
                var v = Math.max.apply(Math, a) + this.o.zIndexOffset,
                    u = this.component ? this.component.parent().offset() : this.element.offset(),
                    w = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    o = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    t = u.left - l.left,
                    i = u.top - l.top;
                return (
                    this.o.container !== "body" && (i += c),
                    this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),
                    this.o.orientation.x !== "auto"
                        ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), this.o.orientation.x === "right" && (t -= f - o))
                        : u.left < 0
                        ? (this.picker.addClass("datepicker-orient-left"), (t -= u.left - 10))
                        : t + f > h
                        ? (this.picker.addClass("datepicker-orient-right"), (t += o - f))
                        : this.picker.addClass("datepicker-orient-left"),
                    (r = this.o.orientation.y),
                    r === "auto" && ((y = -c + i - s), (r = y < 0 ? "bottom" : "top")),
                    this.picker.addClass("datepicker-orient-" + r),
                    r === "top" ? (i -= s + parseInt(this.picker.css("padding-top"))) : (i += w),
                    this.o.rtl ? ((p = h - (t + o)), this.picker.css({ top: i, right: p, zIndex: v })) : this.picker.css({ top: i, left: t, zIndex: v }),
                    this
                );
            },
            _allow_update: !0,
            update: function () {
                if (!this._allow_update) return this;
                var r = this.dates.copy(),
                    t = [],
                    u = !1;
                return (
                    arguments.length
                        ? (n.each(
                              arguments,
                              n.proxy(function (n, i) {
                                  i instanceof Date && (i = this._local_to_utc(i));
                                  t.push(i);
                              }, this)
                          ),
                          (u = !0))
                        : ((t = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val()), (t = t && this.o.multidate ? t.split(this.o.multidateSeparator) : [t]), delete this.element.data().date),
                    (t = n.map(
                        t,
                        n.proxy(function (n) {
                            return i.parseDate(n, this.o.format, this.o.language, this.o.assumeNearbyYear);
                        }, this)
                    )),
                    (t = n.grep(
                        t,
                        n.proxy(function (n) {
                            return !this.dateWithinRange(n) || !n;
                        }, this),
                        !0
                    )),
                    this.dates.replace(t),
                    (this.viewDate = this.dates.length ? new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? new Date(this.o.startDate) : this.viewDate > this.o.endDate ? new Date(this.o.endDate) : this.o.defaultViewDate),
                    u ? this.setValue() : t.length && String(r) !== String(this.dates) && this._trigger("changeDate"),
                    !this.dates.length && r.length && this._trigger("clearDate"),
                    this.fill(),
                    this.element.change(),
                    this
                );
            },
            fillDow: function () {
                var i = this.o.weekStart,
                    t = "<tr>";
                for (
                    this.o.calendarWeeks &&
                    (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function (n, t) {
                        return parseInt(t) + 1;
                    }),
                    (t += '<th class="cw">&#160;</th>'));
                    i < this.o.weekStart + 7;

                )
                    (t += '<th class="dow'), n.inArray(i, this.o.daysOfWeekDisabled) > -1 && (t += " disabled"), (t += '">' + r[this.o.language].daysMin[i++ % 7] + "</th>");
                t += "</tr>";
                this.picker.find(".datepicker-days thead").append(t);
            },
            fillMonths: function () {
                for (var t = this._utc_to_local(this.viewDate), i = "", n = 0, u; n < 12; ) (u = t && t.getMonth() === n ? " focused" : ""), (i += '<span class="month' + u + '">' + r[this.o.language].monthsShort[n++] + "</span>");
                this.picker.find(".datepicker-months td").html(i);
            },
            setRange: function (t) {
                t && t.length
                    ? (this.range = n.map(t, function (n) {
                          return n.valueOf();
                      }))
                    : delete this.range;
                this.fill();
            },
            getClassNames: function (t) {
                var i = [],
                    r = this.viewDate.getUTCFullYear(),
                    f = this.viewDate.getUTCMonth(),
                    u = new Date();
                return (
                    t.getUTCFullYear() < r || (t.getUTCFullYear() === r && t.getUTCMonth() < f) ? i.push("old") : (t.getUTCFullYear() > r || (t.getUTCFullYear() === r && t.getUTCMonth() > f)) && i.push("new"),
                    this.focusDate && t.valueOf() === this.focusDate.valueOf() && i.push("focused"),
                    this.o.todayHighlight && t.getUTCFullYear() === u.getFullYear() && t.getUTCMonth() === u.getMonth() && t.getUTCDate() === u.getDate() && i.push("today"),
                    this.dates.contains(t) !== -1 && i.push("active"),
                    this.dateWithinRange(t) || i.push("disabled"),
                    this.dateIsDisabled(t) && i.push("disabled", "disabled-date"),
                    n.inArray(t.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1 && i.push("highlighted"),
                    this.range &&
                        (t > this.range[0] && t < this.range[this.range.length - 1] && i.push("range"),
                        n.inArray(t.valueOf(), this.range) !== -1 && i.push("selected"),
                        t.valueOf() === this.range[0] && i.push("range-start"),
                        t.valueOf() === this.range[this.range.length - 1] && i.push("range-end")),
                    i
                );
            },
            _fill_yearsView: function (i, r, u, f, e, o, s, h) {
                var w, b, y, k, d, g, a, v, l, p, c;
                for (
                    w = "",
                        b = this.picker.find(i),
                        y = parseInt(e / u, 10) * u,
                        d = parseInt(o / f, 10) * f,
                        g = parseInt(s / f, 10) * f,
                        k = n.map(this.dates, function (n) {
                            return parseInt(n.getUTCFullYear() / f, 10) * f;
                        }),
                        b.find(".datepicker-switch").text(y + "-" + (y + f * 9)),
                        a = y - f,
                        v = -1;
                    v < 11;
                    v += 1
                )
                    (l = [r]),
                        (p = null),
                        v === -1 ? l.push("old") : v === 10 && l.push("new"),
                        n.inArray(a, k) !== -1 && l.push("active"),
                        (a < d || a > g) && l.push("disabled"),
                        a === this.viewDate.getFullYear() && l.push("focused"),
                        h !== n.noop &&
                            ((c = h(new Date(a, 0, 1))),
                            c === t ? (c = {}) : typeof c == "boolean" ? (c = { enabled: c }) : typeof c == "string" && (c = { classes: c }),
                            c.enabled === !1 && l.push("disabled"),
                            c.classes && (l = l.concat(c.classes.split(/\s+/))),
                            c.tooltip && (p = c.tooltip)),
                        (w += '<span class="' + l.join(" ") + '"' + (p ? ' title="' + p + '"' : "") + ">" + a + "</span>"),
                        (a += f);
                b.find("td").html(w);
            },
            fill: function () {
                var p = new Date(this.viewDate),
                    o = p.getUTCFullYear(),
                    k = p.getUTCMonth(),
                    a = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                    it = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                    v = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                    rt = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                    ut = r[this.o.language].today || r.en.today || "",
                    ft = r[this.o.language].clear || r.en.clear || "",
                    et = r[this.o.language].titleFormat || r.en.titleFormat,
                    y,
                    e,
                    f,
                    w,
                    h,
                    c,
                    s,
                    nt,
                    l,
                    tt;
                if (!isNaN(o) && !isNaN(k)) {
                    for (
                        this.picker.find(".datepicker-days .datepicker-switch").text(i.formatDate(p, et, this.o.language)),
                            this.picker
                                .find("tfoot .today")
                                .text(ut)
                                .toggle(this.o.todayBtn !== !1),
                            this.picker
                                .find("tfoot .clear")
                                .text(ft)
                                .toggle(this.o.clearBtn !== !1),
                            this.picker
                                .find("thead .datepicker-title")
                                .text(this.o.title)
                                .toggle(this.o.title !== ""),
                            this.updateNavArrows(),
                            this.fillMonths(),
                            f = u(o, k - 1, 28),
                            w = i.getDaysInMonth(f.getUTCFullYear(), f.getUTCMonth()),
                            f.setUTCDate(w),
                            f.setUTCDate(w - ((f.getUTCDay() - this.o.weekStart + 7) % 7)),
                            h = new Date(f),
                            f.getUTCFullYear() < 100 && h.setUTCFullYear(f.getUTCFullYear()),
                            h.setUTCDate(h.getUTCDate() + 42),
                            h = h.valueOf(),
                            c = [];
                        f.valueOf() < h;

                    ) {
                        if (f.getUTCDay() === this.o.weekStart && (c.push("<tr>"), this.o.calendarWeeks)) {
                            var d = new Date(+f + ((this.o.weekStart - f.getUTCDay() - 7) % 7) * 864e5),
                                g = new Date(Number(d) + ((11 - d.getUTCDay()) % 7) * 864e5),
                                b = new Date(Number((b = u(g.getUTCFullYear(), 0, 1))) + ((11 - b.getUTCDay()) % 7) * 864e5),
                                ot = (g - b) / 6048e5 + 1;
                            c.push('<td class="cw">' + ot + "</td>");
                        }
                        s = this.getClassNames(f);
                        s.push("day");
                        this.o.beforeShowDay !== n.noop &&
                            ((e = this.o.beforeShowDay(this._utc_to_local(f))),
                            e === t ? (e = {}) : typeof e == "boolean" ? (e = { enabled: e }) : typeof e == "string" && (e = { classes: e }),
                            e.enabled === !1 && s.push("disabled"),
                            e.classes && (s = s.concat(e.classes.split(/\s+/))),
                            e.tooltip && (y = e.tooltip));
                        s = n.isFunction(n.uniqueSort) ? n.uniqueSort(s) : n.unique(s);
                        c.push('<td class="' + s.join(" ") + '"' + (y ? ' title="' + y + '"' : "") + ">" + f.getUTCDate() + "</td>");
                        y = null;
                        f.getUTCDay() === this.o.weekEnd && c.push("</tr>");
                        f.setUTCDate(f.getUTCDate() + 1);
                    }
                    this.picker.find(".datepicker-days tbody").empty().append(c.join(""));
                    nt = r[this.o.language].monthsTitle || r.en.monthsTitle || "Months";
                    l = this.picker
                        .find(".datepicker-months")
                        .find(".datepicker-switch")
                        .text(this.o.maxViewMode < 2 ? nt : o)
                        .end()
                        .find("span")
                        .removeClass("active");
                    n.each(this.dates, function (n, t) {
                        t.getUTCFullYear() === o && l.eq(t.getUTCMonth()).addClass("active");
                    });
                    (o < a || o > v) && l.addClass("disabled");
                    o === a && l.slice(0, it).addClass("disabled");
                    o === v && l.slice(rt + 1).addClass("disabled");
                    this.o.beforeShowMonth !== n.noop &&
                        ((tt = this),
                        n.each(l, function (i, r) {
                            var f = new Date(o, i, 1),
                                u = tt.o.beforeShowMonth(f);
                            u === t ? (u = {}) : typeof u == "boolean" ? (u = { enabled: u }) : typeof u == "string" && (u = { classes: u });
                            u.enabled !== !1 || n(r).hasClass("disabled") || n(r).addClass("disabled");
                            u.classes && n(r).addClass(u.classes);
                            u.tooltip && n(r).prop("title", u.tooltip);
                        }));
                    this._fill_yearsView(".datepicker-years", "year", 10, 1, o, a, v, this.o.beforeShowYear);
                    this._fill_yearsView(".datepicker-decades", "decade", 100, 10, o, a, v, this.o.beforeShowDecade);
                    this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, o, a, v, this.o.beforeShowCentury);
                }
            },
            updateNavArrows: function () {
                if (this._allow_update) {
                    var t = new Date(this.viewDate),
                        n = t.getUTCFullYear(),
                        i = t.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            this.o.startDate !== -Infinity && n <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth()
                                ? this.picker.find(".prev").css({ visibility: "hidden" })
                                : this.picker.find(".prev").css({ visibility: "visible" });
                            this.o.endDate !== Infinity && n >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth()
                                ? this.picker.find(".next").css({ visibility: "hidden" })
                                : this.picker.find(".next").css({ visibility: "visible" });
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            (this.o.startDate !== -Infinity && n <= this.o.startDate.getUTCFullYear()) || this.o.maxViewMode < 2
                                ? this.picker.find(".prev").css({ visibility: "hidden" })
                                : this.picker.find(".prev").css({ visibility: "visible" });
                            (this.o.endDate !== Infinity && n >= this.o.endDate.getUTCFullYear()) || this.o.maxViewMode < 2
                                ? this.picker.find(".next").css({ visibility: "hidden" })
                                : this.picker.find(".next").css({ visibility: "visible" });
                    }
                }
            },
            click: function (t) {
                var r, c, o, e, f, s, l, a;
                t.preventDefault();
                t.stopPropagation();
                r = n(t.target);
                r.hasClass("datepicker-switch") && this.showMode(1);
                a = r.closest(".prev, .next");
                a.length > 0 &&
                    ((c = i.modes[this.viewMode].navStep * (a.hasClass("prev") ? -1 : 1)),
                    this.viewMode === 0
                        ? ((this.viewDate = this.moveMonth(this.viewDate, c)), this._trigger("changeMonth", this.viewDate))
                        : ((this.viewDate = this.moveYear(this.viewDate, c)), this.viewMode === 1 && this._trigger("changeYear", this.viewDate)),
                    this.fill());
                r.hasClass("today") && !r.hasClass("day") && (this.showMode(-2), this._setDate(h(), this.o.todayBtn === "linked" ? null : "view"));
                r.hasClass("clear") && this.clearDates();
                r.hasClass("disabled") ||
                    (r.hasClass("day") &&
                        ((o = parseInt(r.text(), 10) || 1),
                        (e = this.viewDate.getUTCFullYear()),
                        (f = this.viewDate.getUTCMonth()),
                        r.hasClass("old") && (f === 0 ? ((f = 11), (e = e - 1), (s = !0), (l = !0)) : ((f = f - 1), (s = !0))),
                        r.hasClass("new") && (f === 11 ? ((f = 0), (e = e + 1), (s = !0), (l = !0)) : ((f = f + 1), (s = !0))),
                        this._setDate(u(e, f, o)),
                        l && this._trigger("changeYear", this.viewDate),
                        s && this._trigger("changeMonth", this.viewDate)),
                    r.hasClass("month") &&
                        (this.viewDate.setUTCDate(1),
                        (o = 1),
                        (f = r.parent().find("span").index(r)),
                        (e = this.viewDate.getUTCFullYear()),
                        this.viewDate.setUTCMonth(f),
                        this._trigger("changeMonth", this.viewDate),
                        this.o.minViewMode === 1 ? (this._setDate(u(e, f, o)), this.showMode()) : this.showMode(-1),
                        this.fill()),
                    (r.hasClass("year") || r.hasClass("decade") || r.hasClass("century")) &&
                        (this.viewDate.setUTCDate(1),
                        (o = 1),
                        (f = 0),
                        (e = parseInt(r.text(), 10) || 0),
                        this.viewDate.setUTCFullYear(e),
                        r.hasClass("year") && (this._trigger("changeYear", this.viewDate), this.o.minViewMode === 2 && this._setDate(u(e, f, o))),
                        r.hasClass("decade") && (this._trigger("changeDecade", this.viewDate), this.o.minViewMode === 3 && this._setDate(u(e, f, o))),
                        r.hasClass("century") && (this._trigger("changeCentury", this.viewDate), this.o.minViewMode === 4 && this._setDate(u(e, f, o))),
                        this.showMode(-1),
                        this.fill()));
                this.picker.is(":visible") && this._focused_from && n(this._focused_from).focus();
                delete this._focused_from;
            },
            _toggle_multidate: function (n) {
                var t = this.dates.contains(n);
                if (
                    (n || this.dates.clear(),
                    t !== -1 ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(t) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(n)) : this.dates.push(n),
                    typeof this.o.multidate == "number")
                )
                    while (this.dates.length > this.o.multidate) this.dates.remove(0);
            },
            _setDate: function (n, t) {
                (t && t !== "date") || this._toggle_multidate(n && new Date(n));
                (t && t !== "view") || (this.viewDate = n && new Date(n));
                this.fill();
                this.setValue();
                (t && t === "view") || this._trigger("changeDate");
                this.inputField && this.inputField.change();
                this.o.autoclose && (!t || t === "date") && this.hide();
            },
            moveDay: function (n, t) {
                var i = new Date(n);
                return i.setUTCDate(n.getUTCDate() + t), i;
            },
            moveWeek: function (n, t) {
                return this.moveDay(n, t * 7);
            },
            moveMonth: function (n, t) {
                var f;
                if (!p(n)) return this.o.defaultViewDate;
                if (!t) return n;
                var i = new Date(n.valueOf()),
                    e = i.getUTCDate(),
                    o = i.getUTCMonth(),
                    s = Math.abs(t),
                    r,
                    u;
                if (((t = t > 0 ? 1 : -1), s === 1))
                    (u =
                        t === -1
                            ? function () {
                                  return i.getUTCMonth() === o;
                              }
                            : function () {
                                  return i.getUTCMonth() !== r;
                              }),
                        (r = o + t),
                        i.setUTCMonth(r),
                        (r < 0 || r > 11) && (r = (r + 12) % 12);
                else {
                    for (f = 0; f < s; f++) i = this.moveMonth(i, t);
                    r = i.getUTCMonth();
                    i.setUTCDate(e);
                    u = function () {
                        return r !== i.getUTCMonth();
                    };
                }
                while (u()) i.setUTCDate(--e), i.setUTCMonth(r);
                return i;
            },
            moveYear: function (n, t) {
                return this.moveMonth(n, t * 12);
            },
            moveAvailableDate: function (n, t, i) {
                do {
                    if (((n = this[i](n, t)), !this.dateWithinRange(n))) return !1;
                    i = "moveDay";
                } while (this.dateIsDisabled(n));
                return n;
            },
            weekOfDateIsDisabled: function (t) {
                return n.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
            },
            dateIsDisabled: function (t) {
                return (
                    this.weekOfDateIsDisabled(t) ||
                    n.grep(this.o.datesDisabled, function (n) {
                        return y(t, n);
                    }).length > 0
                );
            },
            dateWithinRange: function (n) {
                return n >= this.o.startDate && n <= this.o.endDate;
            },
            keydown: function (n) {
                if (!this.picker.is(":visible")) {
                    (n.keyCode === 40 || n.keyCode === 27) && (this.show(), n.stopPropagation());
                    return;
                }
                var u = !1,
                    t,
                    i,
                    r = this.focusDate || this.viewDate;
                switch (n.keyCode) {
                    case 27:
                        this.focusDate ? ((this.focusDate = null), (this.viewDate = this.dates.get(-1) || this.viewDate), this.fill()) : this.hide();
                        n.preventDefault();
                        n.stopPropagation();
                        break;
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7) break;
                        t = n.keyCode === 37 || n.keyCode === 38 ? -1 : 1;
                        this.viewMode === 0
                            ? n.ctrlKey
                                ? ((i = this.moveAvailableDate(r, t, "moveYear")), i && this._trigger("changeYear", this.viewDate))
                                : n.shiftKey
                                ? ((i = this.moveAvailableDate(r, t, "moveMonth")), i && this._trigger("changeMonth", this.viewDate))
                                : n.keyCode === 37 || n.keyCode === 39
                                ? (i = this.moveAvailableDate(r, t, "moveDay"))
                                : this.weekOfDateIsDisabled(r) || (i = this.moveAvailableDate(r, t, "moveWeek"))
                            : this.viewMode === 1
                            ? ((n.keyCode === 38 || n.keyCode === 40) && (t = t * 4), (i = this.moveAvailableDate(r, t, "moveMonth")))
                            : this.viewMode === 2 && ((n.keyCode === 38 || n.keyCode === 40) && (t = t * 4), (i = this.moveAvailableDate(r, t, "moveYear")));
                        i && ((this.focusDate = this.viewDate = i), this.setValue(), this.fill(), n.preventDefault());
                        break;
                    case 13:
                        if (!this.o.forceParse) break;
                        r = this.focusDate || this.dates.get(-1) || this.viewDate;
                        this.o.keyboardNavigation && (this._toggle_multidate(r), (u = !0));
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.setValue();
                        this.fill();
                        this.picker.is(":visible") && (n.preventDefault(), n.stopPropagation(), this.o.autoclose && this.hide());
                        break;
                    case 9:
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.fill();
                        this.hide();
                }
                u && (this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.inputField && this.inputField.change());
            },
            showMode: function (n) {
                n && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + n)));
                this.picker
                    .children("div")
                    .hide()
                    .filter(".datepicker-" + i.modes[this.viewMode].clsName)
                    .show();
                this.updateNavArrows();
            },
        };
        o = function (t, i) {
            n(t).data("datepicker", this);
            this.element = n(t);
            this.inputs = n.map(i.inputs, function (n) {
                return n.jquery ? n[0] : n;
            });
            delete i.inputs;
            e.call(n(this.inputs), i).on("changeDate", n.proxy(this.dateUpdated, this));
            this.pickers = n.map(this.inputs, function (t) {
                return n(t).data("datepicker");
            });
            this.updateDates();
        };
        o.prototype = {
            updateDates: function () {
                this.dates = n.map(this.pickers, function (n) {
                    return n.getUTCDate();
                });
                this.updateRanges();
            },
            updateRanges: function () {
                var t = n.map(this.dates, function (n) {
                    return n.valueOf();
                });
                n.each(this.pickers, function (n, i) {
                    i.setRange(t);
                });
            },
            dateUpdated: function (t) {
                var f;
                if (!this.updating && ((this.updating = !0), (f = n(t.target).data("datepicker")), typeof f != "undefined")) {
                    var i = f.getUTCDate(),
                        e = n.inArray(t.target, this.inputs),
                        r = e - 1,
                        u = e + 1,
                        o = this.inputs.length;
                    if (e !== -1) {
                        if (
                            (n.each(this.pickers, function (n, t) {
                                t.getUTCDate() || t.setUTCDate(i);
                            }),
                            i < this.dates[r])
                        )
                            while (r >= 0 && i < this.dates[r]) this.pickers[r--].setUTCDate(i);
                        else if (i > this.dates[u]) while (u < o && i > this.dates[u]) this.pickers[u++].setUTCDate(i);
                        this.updateDates();
                        delete this.updating;
                    }
                }
            },
            remove: function () {
                n.map(this.pickers, function (n) {
                    n.remove();
                });
                delete this.element.data().datepicker;
            },
        };
        a = n.fn.datepicker;
        e = function (i) {
            var u = Array.apply(null, arguments),
                r;
            if (
                (u.shift(),
                this.each(function () {
                    var h = n(this),
                        t = h.data("datepicker"),
                        c = typeof i == "object" && i;
                    if (!t) {
                        var l = w(this, "date"),
                            a = n.extend({}, s, l, c),
                            v = b(a.language),
                            e = n.extend({}, s, v, l, c);
                        h.hasClass("input-daterange") || e.inputs ? (n.extend(e, { inputs: e.inputs || h.find("input").toArray() }), (t = new o(this, e))) : (t = new f(this, e));
                        h.data("datepicker", t);
                    }
                    typeof i == "string" && typeof t[i] == "function" && (r = t[i].apply(t, u));
                }),
                r === t || r instanceof f || r instanceof o)
            )
                return this;
            if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
            else return r;
        };
        n.fn.datepicker = e;
        s = n.fn.datepicker.defaults = {
            assumeNearbyYear: !1,
            autoclose: !1,
            beforeShowDay: n.noop,
            beforeShowMonth: n.noop,
            beforeShowYear: n.noop,
            beforeShowDecade: n.noop,
            beforeShowCentury: n.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: Infinity,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            maxViewMode: 4,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -Infinity,
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            showOnFocus: !0,
            zIndexOffset: 10,
            container: "body",
            immediateUpdates: !1,
            title: "",
            templates: { leftArrow: "&laquo;", rightArrow: "&raquo;" },
        };
        v = n.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
        n.fn.datepicker.Constructor = f;
        r = n.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                titleFormat: "MM yyyy",
            },
        };
        i = {
            modes: [
                { clsName: "days", navFnc: "Month", navStep: 1 },
                { clsName: "months", navFnc: "FullYear", navStep: 1 },
                { clsName: "years", navFnc: "FullYear", navStep: 10 },
                { clsName: "decades", navFnc: "FullDecade", navStep: 100 },
                { clsName: "centuries", navFnc: "FullCentury", navStep: 1e3 },
            ],
            isLeapYear: function (n) {
                return (n % 4 == 0 && n % 100 != 0) || n % 400 == 0;
            },
            getDaysInMonth: function (n, t) {
                return [31, i.isLeapYear(n) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t];
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
            parseFormat: function (n) {
                if (typeof n.toValue == "function" && typeof n.toDisplay == "function") return n;
                var t = n.replace(this.validParts, "\0").split("\0"),
                    i = n.match(this.validParts);
                if (!t || !t.length || !i || i.length === 0) throw new Error("Invalid date format.");
                return { separators: t, parts: i };
            },
            parseDate: function (e, o, s, c) {
                function et(n, t) {
                    return t === !0 && (t = 10), n < 100 && ((n += 2e3), n > new Date().getFullYear() + t && (n -= 100)), n;
                }
                function ot() {
                    var n = this.slice(0, a[l].length),
                        t = a[l].slice(0, n.length);
                    return n.toLowerCase() === t.toLowerCase();
                }
                var p, st, tt, b;
                if (!e) return t;
                if (e instanceof Date) return e;
                if ((typeof o == "string" && (o = i.parseFormat(o)), o.toValue)) return o.toValue(e, o, s);
                var rt = /([\-+]\d+)([dmwy])/,
                    a = e.match(/([\-+]\d+)([dmwy])/g),
                    ut = { d: "moveDay", m: "moveMonth", w: "moveWeek", y: "moveYear" },
                    ft = { yesterday: "-1d", today: "+0d", tomorrow: "+1d" },
                    v,
                    k,
                    l,
                    d;
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
                    for (e = new Date(), l = 0; l < a.length; l++) (v = rt.exec(a[l])), (k = parseInt(v[1])), (d = ut[v[2]]), (e = f.prototype[d](e, k));
                    return u(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());
                }
                if (typeof ft[e] != "undefined" && ((e = ft[e]), (a = e.match(/([\-+]\d+)([dmwy])/g)), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e))) {
                    for (e = new Date(), l = 0; l < a.length; l++) (v = rt.exec(a[l])), (k = parseInt(v[1])), (d = ut[v[2]]), (e = f.prototype[d](e, k));
                    return u(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());
                }
                a = (e && e.match(this.nonpunctuation)) || [];
                e = new Date();
                var g = {},
                    it = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    y = {
                        yyyy: function (n, t) {
                            return n.setUTCFullYear(c ? et(t, c) : t);
                        },
                        yy: function (n, t) {
                            return n.setUTCFullYear(c ? et(t, c) : t);
                        },
                        m: function (n, t) {
                            if (isNaN(n)) return n;
                            for (t -= 1; t < 0; ) t += 12;
                            for (t %= 12, n.setUTCMonth(t); n.getUTCMonth() !== t; ) n.setUTCDate(n.getUTCDate() - 1);
                            return n;
                        },
                        d: function (n, t) {
                            return n.setUTCDate(t);
                        },
                    },
                    w,
                    nt;
                if (
                    ((y.M = y.MM = y.mm = y.m),
                    (y.dd = y.d),
                    (e = h()),
                    (p = o.parts.slice()),
                    a.length !== p.length &&
                        (p = n(p)
                            .filter(function (t, i) {
                                return n.inArray(i, it) !== -1;
                            })
                            .toArray()),
                    a.length === p.length)
                ) {
                    for (l = 0, st = p.length; l < st; l++) {
                        if (((w = parseInt(a[l], 10)), (v = p[l]), isNaN(w)))
                            switch (v) {
                                case "MM":
                                    nt = n(r[s].months).filter(ot);
                                    w = n.inArray(nt[0], r[s].months) + 1;
                                    break;
                                case "M":
                                    nt = n(r[s].monthsShort).filter(ot);
                                    w = n.inArray(nt[0], r[s].monthsShort) + 1;
                            }
                        g[v] = w;
                    }
                    for (l = 0; l < it.length; l++) (b = it[l]), b in g && !isNaN(g[b]) && ((tt = new Date(e)), y[b](tt, g[b]), isNaN(tt) || (e = tt));
                }
                return e;
            },
            formatDate: function (t, u, f) {
                var e, s, o, h;
                if (!t) return "";
                if ((typeof u == "string" && (u = i.parseFormat(u)), u.toDisplay)) return u.toDisplay(t, u, f);
                for (
                    e = {
                        d: t.getUTCDate(),
                        D: r[f].daysShort[t.getUTCDay()],
                        DD: r[f].days[t.getUTCDay()],
                        m: t.getUTCMonth() + 1,
                        M: r[f].monthsShort[t.getUTCMonth()],
                        MM: r[f].months[t.getUTCMonth()],
                        yy: t.getUTCFullYear().toString().substring(2),
                        yyyy: t.getUTCFullYear(),
                    },
                        e.dd = (e.d < 10 ? "0" : "") + e.d,
                        e.mm = (e.m < 10 ? "0" : "") + e.m,
                        t = [],
                        s = n.extend([], u.separators),
                        o = 0,
                        h = u.parts.length;
                    o <= h;
                    o++
                )
                    s.length && t.push(s.shift()), t.push(e[u.parts[o]]);
                return t.join("");
            },
            headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>',
        };
        i.template =
            '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' +
            i.headTemplate +
            "<tbody></tbody>" +
            i.footTemplate +
            '</table></div><div class="datepicker-months"><table class="table-condensed">' +
            i.headTemplate +
            i.contTemplate +
            i.footTemplate +
            '</table></div><div class="datepicker-years"><table class="table-condensed">' +
            i.headTemplate +
            i.contTemplate +
            i.footTemplate +
            '</table></div><div class="datepicker-decades"><table class="table-condensed">' +
            i.headTemplate +
            i.contTemplate +
            i.footTemplate +
            '</table></div><div class="datepicker-centuries"><table class="table-condensed">' +
            i.headTemplate +
            i.contTemplate +
            i.footTemplate +
            "</table></div></div>";
        n.fn.datepicker.DPGlobal = i;
        n.fn.datepicker.noConflict = function () {
            return (n.fn.datepicker = a), this;
        };
        n.fn.datepicker.version = "1.6.4";
        n(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (t) {
            var i = n(this);
            i.data("datepicker") || (t.preventDefault(), e.call(i, "show"));
        });
        n(function () {
            e.call(n('[data-provide="datepicker-inline"]'));
        });
    }),
    (function (n) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], n) : n(typeof jQuery != "undefined" ? jQuery : window.Zepto);
    })(function (n) {
        "use strict";
        function u(t) {
            var i = t.data;
            t.isDefaultPrevented() || (t.preventDefault(), n(t.target).ajaxSubmit(i));
        }
        function f(t) {
            var r = t.target,
                u = n(r),
                f,
                i,
                e;
            if (!u.is("[type=submit],[type=image]")) {
                if (((f = u.closest("[type=submit]")), f.length === 0)) return;
                r = f[0];
            }
            i = this;
            i.clk = r;
            r.type == "image" &&
                (t.offsetX !== undefined
                    ? ((i.clk_x = t.offsetX), (i.clk_y = t.offsetY))
                    : typeof n.fn.offset == "function"
                    ? ((e = u.offset()), (i.clk_x = t.pageX - e.left), (i.clk_y = t.pageY - e.top))
                    : ((i.clk_x = t.pageX - r.offsetLeft), (i.clk_y = t.pageY - r.offsetTop)));
            setTimeout(function () {
                i.clk = i.clk_x = i.clk_y = null;
            }, 100);
        }
        function t() {
            if (n.fn.ajaxSubmit.debug) {
                var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
            }
        }
        var i = {},
            r;
        i.fileapi = n("<input type='file'/>").get(0).files !== undefined;
        i.formdata = window.FormData !== undefined;
        r = !!n.fn.prop;
        n.fn.attr2 = function () {
            if (!r) return this.attr.apply(this, arguments);
            var n = this.prop.apply(this, arguments);
            return (n && n.jquery) || typeof n == "string" ? n : this.attr.apply(this, arguments);
        };
        n.fn.ajaxSubmit = function (u) {
            function ot(t) {
                for (var r = n.param(t, u.traditional).split("&"), o = r.length, e = [], f, i = 0; i < o; i++) (r[i] = r[i].replace(/\+/g, " ")), (f = r[i].split("=")), e.push([decodeURIComponent(f[0]), decodeURIComponent(f[1])]);
                return e;
            }
            function st(t) {
                for (var o = new FormData(), f, r, s, i = 0; i < t.length; i++) o.append(t[i].name, t[i].value);
                if (u.extraData) for (f = ot(u.extraData), i = 0; i < f.length; i++) f[i] && o.append(f[i][0], f[i][1]);
                return (
                    (u.data = null),
                    (r = n.extend(!0, {}, n.ajaxSettings, u, { contentType: !1, processData: !1, cache: !1, type: e || "POST" })),
                    u.uploadProgress &&
                        (r.xhr = function () {
                            var t = n.ajaxSettings.xhr();
                            return (
                                t.upload &&
                                    t.upload.addEventListener(
                                        "progress",
                                        function (n) {
                                            var t = 0,
                                                i = n.loaded || n.position,
                                                r = n.total;
                                            n.lengthComputable && (t = Math.ceil((i / r) * 100));
                                            u.uploadProgress(n, i, r, t);
                                        },
                                        !1
                                    ),
                                t
                            );
                        }),
                    (r.data = null),
                    (s = r.beforeSend),
                    (r.beforeSend = function (n, t) {
                        t.data = u.formData ? u.formData : o;
                        s && s.call(this, n, t);
                    }),
                    n.ajax(r)
                );
            }
            function ft(i) {
                function ot(n) {
                    var i = null;
                    try {
                        n.contentWindow && (i = n.contentWindow.document);
                    } catch (r) {
                        t("cannot get iframe.contentWindow document: " + r);
                    }
                    if (i) return i;
                    try {
                        i = n.contentDocument ? n.contentDocument : n.document;
                    } catch (r) {
                        t("cannot get iframe.contentDocument: " + r);
                        i = n.document;
                    }
                    return i;
                }
                function st() {
                    function h() {
                        try {
                            var n = ot(a).readyState;
                            t("state = " + n);
                            n && n.toLowerCase() == "uninitialized" && setTimeout(h, 50);
                        } catch (i) {
                            t("Server abort: ", i, " (", i.name, ")");
                            b(tt);
                            g && clearTimeout(g);
                            g = undefined;
                        }
                    }
                    var u = f.attr2("target"),
                        s = f.attr2("action"),
                        y = f.attr("enctype") || f.attr("encoding") || "multipart/form-data",
                        r,
                        i,
                        c;
                    l.setAttribute("target", d);
                    (!e || /post/i.test(e)) && l.setAttribute("method", "POST");
                    s != o.url && l.setAttribute("action", o.url);
                    o.skipEncodingOverride || (e && !/post/i.test(e)) || f.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" });
                    o.timeout &&
                        (g = setTimeout(function () {
                            rt = !0;
                            b(ut);
                        }, o.timeout));
                    r = [];
                    try {
                        if (o.extraData)
                            for (i in o.extraData)
                                o.extraData.hasOwnProperty(i) &&
                                    (n.isPlainObject(o.extraData[i]) && o.extraData[i].hasOwnProperty("name") && o.extraData[i].hasOwnProperty("value")
                                        ? r.push(
                                              n('<input type="hidden" name="' + o.extraData[i].name + '">')
                                                  .val(o.extraData[i].value)
                                                  .appendTo(l)[0]
                                          )
                                        : r.push(
                                              n('<input type="hidden" name="' + i + '">')
                                                  .val(o.extraData[i])
                                                  .appendTo(l)[0]
                                          ));
                        o.iframeTarget || v.appendTo("body");
                        a.attachEvent ? a.attachEvent("onload", b) : a.addEventListener("load", b, !1);
                        setTimeout(h, 15);
                        try {
                            l.submit();
                        } catch (p) {
                            c = document.createElement("form").submit;
                            c.apply(l);
                        }
                    } finally {
                        l.setAttribute("action", s);
                        l.setAttribute("enctype", y);
                        u ? l.setAttribute("target", u) : f.removeAttr("target");
                        n(r).remove();
                    }
                }
                function b(i) {
                    var r, u, w, f, k, d, e, c, l;
                    if (!s.aborted && !lt) {
                        if (((h = ot(a)), h || (t("cannot access response document"), (i = tt)), i === ut && s)) {
                            s.abort("timeout");
                            y.reject(s, "timeout");
                            return;
                        }
                        if (i == tt && s) {
                            s.abort("server abort");
                            y.reject(s, "error", "server abort");
                            return;
                        }
                        if ((h && h.location.href != o.iframeSrc) || rt) {
                            a.detachEvent ? a.detachEvent("onload", b) : a.removeEventListener("load", b, !1);
                            r = "success";
                            try {
                                if (rt) throw "timeout";
                                if (((w = o.dataType == "xml" || h.XMLDocument || n.isXMLDoc(h)), t("isXml=" + w), !w && window.opera && (h.body === null || !h.body.innerHTML) && --ct)) {
                                    t("requeing onLoad callback, DOM not available");
                                    setTimeout(b, 250);
                                    return;
                                }
                                f = h.body ? h.body : h.documentElement;
                                s.responseText = f ? f.innerHTML : null;
                                s.responseXML = h.XMLDocument ? h.XMLDocument : h;
                                w && (o.dataType = "xml");
                                s.getResponseHeader = function (n) {
                                    var t = { "content-type": o.dataType };
                                    return t[n.toLowerCase()];
                                };
                                f && ((s.status = Number(f.getAttribute("status")) || s.status), (s.statusText = f.getAttribute("statusText") || s.statusText));
                                k = (o.dataType || "").toLowerCase();
                                d = /(json|script|text)/.test(k);
                                d || o.textarea
                                    ? ((e = h.getElementsByTagName("textarea")[0]),
                                      e
                                          ? ((s.responseText = e.value), (s.status = Number(e.getAttribute("status")) || s.status), (s.statusText = e.getAttribute("statusText") || s.statusText))
                                          : d &&
                                            ((c = h.getElementsByTagName("pre")[0]),
                                            (l = h.getElementsByTagName("body")[0]),
                                            c ? (s.responseText = c.textContent ? c.textContent : c.innerText) : l && (s.responseText = l.textContent ? l.textContent : l.innerText)))
                                    : k == "xml" && !s.responseXML && s.responseText && (s.responseXML = at(s.responseText));
                                try {
                                    ht = yt(s, k, o);
                                } catch (nt) {
                                    r = "parsererror";
                                    s.error = u = nt || r;
                                }
                            } catch (nt) {
                                t("error caught: ", nt);
                                r = "error";
                                s.error = u = nt || r;
                            }
                            s.aborted && (t("upload aborted"), (r = null));
                            s.status && (r = (s.status >= 200 && s.status < 300) || s.status === 304 ? "success" : "error");
                            r === "success"
                                ? (o.success && o.success.call(o.context, ht, "success", s), y.resolve(s.responseText, "success", s), p && n.event.trigger("ajaxSuccess", [s, o]))
                                : r && (u === undefined && (u = s.statusText), o.error && o.error.call(o.context, s, r, u), y.reject(s, "error", u), p && n.event.trigger("ajaxError", [s, o, u]));
                            p && n.event.trigger("ajaxComplete", [s, o]);
                            p && !--n.active && n.event.trigger("ajaxStop");
                            o.complete && o.complete.call(o.context, s, r);
                            lt = !0;
                            o.timeout && clearTimeout(g);
                            setTimeout(function () {
                                o.iframeTarget ? v.attr("src", o.iframeSrc) : v.remove();
                                s.responseXML = null;
                            }, 100);
                        }
                    }
                }
                var l = f[0],
                    it,
                    nt,
                    o,
                    p,
                    d,
                    v,
                    a,
                    s,
                    k,
                    w,
                    rt,
                    g,
                    y = n.Deferred(),
                    ut,
                    tt,
                    ft,
                    et,
                    ht,
                    h,
                    ct,
                    lt;
                if (
                    ((y.abort = function (n) {
                        s.abort(n);
                    }),
                    i)
                )
                    for (nt = 0; nt < c.length; nt++) (it = n(c[nt])), r ? it.prop("disabled", !1) : it.removeAttr("disabled");
                if (
                    ((o = n.extend(!0, {}, n.ajaxSettings, u)),
                    (o.context = o.context || o),
                    (d = "jqFormIO" + new Date().getTime()),
                    o.iframeTarget
                        ? ((v = n(o.iframeTarget)), (w = v.attr2("name")), w ? (d = w) : v.attr2("name", d))
                        : ((v = n('<iframe name="' + d + '" src="' + o.iframeSrc + '" />')), v.css({ position: "absolute", top: "-1000px", left: "-1000px" })),
                    (a = v[0]),
                    (s = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function () {},
                        getResponseHeader: function () {},
                        setRequestHeader: function () {},
                        abort: function (i) {
                            var r = i === "timeout" ? "timeout" : "aborted";
                            t("aborting upload... " + r);
                            this.aborted = 1;
                            try {
                                a.contentWindow.document.execCommand && a.contentWindow.document.execCommand("Stop");
                            } catch (u) {}
                            v.attr("src", o.iframeSrc);
                            s.error = r;
                            o.error && o.error.call(o.context, s, r, i);
                            p && n.event.trigger("ajaxError", [s, o, r]);
                            o.complete && o.complete.call(o.context, s, r);
                        },
                    }),
                    (p = o.global),
                    p && 0 == n.active++ && n.event.trigger("ajaxStart"),
                    p && n.event.trigger("ajaxSend", [s, o]),
                    o.beforeSend && o.beforeSend.call(o.context, s, o) === !1)
                )
                    return o.global && n.active--, y.reject(), y;
                if (s.aborted) return y.reject(), y;
                k = l.clk;
                k && ((w = k.name), w && !k.disabled && ((o.extraData = o.extraData || {}), (o.extraData[w] = k.value), k.type == "image" && ((o.extraData[w + ".x"] = l.clk_x), (o.extraData[w + ".y"] = l.clk_y))));
                ut = 1;
                tt = 2;
                ft = n("meta[name=csrf-token]").attr("content");
                et = n("meta[name=csrf-param]").attr("content");
                et && ft && ((o.extraData = o.extraData || {}), (o.extraData[et] = ft));
                o.forceSync ? st() : setTimeout(st, 10);
                ct = 50;
                var at =
                        n.parseXML ||
                        function (n, t) {
                            return (
                                window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")), (t.async = "false"), t.loadXML(n)) : (t = new DOMParser().parseFromString(n, "text/xml")),
                                t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t : null
                            );
                        },
                    vt =
                        n.parseJSON ||
                        function (s) {
                            return window.eval("(" + s + ")");
                        },
                    yt = function (t, i, r) {
                        var f = t.getResponseHeader("content-type") || "",
                            e = i === "xml" || (!i && f.indexOf("xml") >= 0),
                            u = e ? t.responseXML : t.responseText;
                        return (
                            e && u.documentElement.nodeName === "parsererror" && n.error && n.error("parsererror"),
                            r && r.dataFilter && (u = r.dataFilter(u, i)),
                            typeof u == "string" && (i === "json" || (!i && f.indexOf("json") >= 0) ? (u = vt(u)) : (i === "script" || (!i && f.indexOf("javascript") >= 0)) && n.globalEval(u)),
                            u
                        );
                    };
                return y;
            }
            var e, b, o, f, a, v, c, y, s, l, h, d, g, nt, ut, p, w;
            if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), this;
            if (
                ((f = this),
                typeof u == "function" ? (u = { success: u }) : u === undefined && (u = {}),
                (e = u.type || this.attr2("method")),
                (b = u.url || this.attr2("action")),
                (o = typeof b == "string" ? n.trim(b) : ""),
                (o = o || window.location.href || ""),
                o && (o = (o.match(/^([^#]+)/) || [])[1]),
                (u = n.extend(!0, { url: o, success: n.ajaxSettings.success, type: e || n.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, u)),
                (a = {}),
                this.trigger("form-pre-serialize", [this, u, a]),
                a.veto)
            )
                return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (u.beforeSerialize && u.beforeSerialize(this, u) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            if (
                ((v = u.traditional),
                v === undefined && (v = n.ajaxSettings.traditional),
                (c = []),
                (s = this.formToArray(u.semantic, c)),
                u.data && ((u.extraData = u.data), (y = n.param(u.data, v))),
                u.beforeSubmit && u.beforeSubmit(s, this, u) === !1)
            )
                return t("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if ((this.trigger("form-submit-validate", [s, this, u, a]), a.veto)) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            l = n.param(s, v);
            y && (l = l ? l + "&" + y : y);
            u.type.toUpperCase() == "GET" ? ((u.url += (u.url.indexOf("?") >= 0 ? "&" : "?") + l), (u.data = null)) : (u.data = l);
            h = [];
            u.resetForm &&
                h.push(function () {
                    f.resetForm();
                });
            u.clearForm &&
                h.push(function () {
                    f.clearForm(u.includeHidden);
                });
            !u.dataType && u.target
                ? ((d = u.success || function () {}),
                  h.push(function (t) {
                      var i = u.replaceTarget ? "replaceWith" : "html";
                      n(u.target)[i](t).each(d, arguments);
                  }))
                : u.success && h.push(u.success);
            u.success = function (n, t, i) {
                for (var o = u.context || this, r = 0, e = h.length; r < e; r++) h[r].apply(o, [n, t, i || f, f]);
            };
            u.error &&
                ((g = u.error),
                (u.error = function (n, t, i) {
                    var r = u.context || this;
                    g.apply(r, [n, t, i, f]);
                }));
            u.complete &&
                ((nt = u.complete),
                (u.complete = function (n, t) {
                    var i = u.context || this;
                    nt.apply(i, [n, t, f]);
                }));
            var et = n("input[type=file]:enabled", this).filter(function () {
                    return n(this).val() !== "";
                }),
                tt = et.length > 0,
                it = "multipart/form-data",
                rt = f.attr("enctype") == it || f.attr("encoding") == it,
                k = i.fileapi && i.formdata;
            for (
                t("fileAPI :" + k),
                    ut = (tt || rt) && !k,
                    u.iframe !== !1 && (u.iframe || ut)
                        ? u.closeKeepAlive
                            ? n.get(u.closeKeepAlive, function () {
                                  p = ft(s);
                              })
                            : (p = ft(s))
                        : (p = (tt || rt) && k ? st(s) : n.ajax(u)),
                    f.removeData("jqxhr").data("jqxhr", p),
                    w = 0;
                w < c.length;
                w++
            )
                c[w] = null;
            return this.trigger("form-submit-notify", [this, u]), this;
        };
        n.fn.ajaxForm = function (i) {
            if (((i = i || {}), (i.delegation = i.delegation && n.isFunction(n.fn.on)), !i.delegation && this.length === 0)) {
                var r = { s: this.selector, c: this.context };
                return !n.isReady && r.s
                    ? (t("DOM not ready, queuing ajaxForm"),
                      n(function () {
                          n(r.s, r.c).ajaxForm(i);
                      }),
                      this)
                    : (t("terminating; zero elements found by selector" + (n.isReady ? "" : " (DOM not ready)")), this);
            }
            if (i.delegation) {
                n(document).off("submit.form-plugin", this.selector, u).off("click.form-plugin", this.selector, f).on("submit.form-plugin", this.selector, i, u).on("click.form-plugin", this.selector, i, f);
                return this;
            }
            return this.ajaxFormUnbind().bind("submit.form-plugin", i, u).bind("click.form-plugin", i, f);
        };
        n.fn.ajaxFormUnbind = function () {
            return this.unbind("submit.form-plugin click.form-plugin");
        };
        n.fn.formToArray = function (t, r) {
            var e = [],
                l,
                h,
                f,
                c,
                u,
                b,
                k,
                a,
                p,
                v;
            if (this.length === 0) return e;
            var o = this[0],
                w = this.attr("id"),
                s = t ? o.getElementsByTagName("*") : o.elements,
                y;
            if ((s && (s = n(s).get()), w && ((y = n(":input[form=" + w + "]").get()), y.length && (s = (s || []).concat(y))), !s || !s.length)) return e;
            for (l = 0, b = s.length; l < b; l++)
                if (((u = s[l]), (f = u.name), f && !u.disabled)) {
                    if (t && o.clk && u.type == "image") {
                        o.clk == u && (e.push({ name: f, value: n(u).val(), type: u.type }), e.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));
                        continue;
                    }
                    if (((c = n.fieldValue(u, !0)), c && c.constructor == Array)) for (r && r.push(u), h = 0, k = c.length; h < k; h++) e.push({ name: f, value: c[h] });
                    else if (i.fileapi && u.type == "file")
                        if ((r && r.push(u), (a = u.files), a.length)) for (h = 0; h < a.length; h++) e.push({ name: f, value: a[h], type: u.type });
                        else e.push({ name: f, value: "", type: u.type });
                    else c !== null && typeof c != "undefined" && (r && r.push(u), e.push({ name: f, value: c, type: u.type, required: u.required }));
                }
            return !t && o.clk && ((p = n(o.clk)), (v = p[0]), (f = v.name), f && !v.disabled && v.type == "image" && (e.push({ name: f, value: p.val() }), e.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }))), e;
        };
        n.fn.formSerialize = function (t) {
            return n.param(this.formToArray(t));
        };
        n.fn.fieldSerialize = function (t) {
            var i = [];
            return (
                this.each(function () {
                    var f = this.name,
                        r,
                        u,
                        e;
                    if (f)
                        if (((r = n.fieldValue(this, t)), r && r.constructor == Array)) for (u = 0, e = r.length; u < e; u++) i.push({ name: f, value: r[u] });
                        else r !== null && typeof r != "undefined" && i.push({ name: this.name, value: r });
                }),
                n.param(i)
            );
        };
        n.fn.fieldValue = function (t) {
            for (var f, i, r = [], u = 0, e = this.length; u < e; u++)
                ((f = this[u]), (i = n.fieldValue(f, t)), i !== null && typeof i != "undefined" && (i.constructor != Array || i.length)) && (i.constructor == Array ? n.merge(r, i) : r.push(i));
            return r;
        };
        n.fieldValue = function (t, i) {
            var a = t.name,
                u = t.type,
                h = t.tagName.toLowerCase(),
                e,
                o,
                r,
                f;
            if (
                (i === undefined && (i = !0),
                i && (!a || t.disabled || u == "reset" || u == "button" || ((u == "checkbox" || u == "radio") && !t.checked) || ((u == "submit" || u == "image") && t.form && t.form.clk != t) || (h == "select" && t.selectedIndex == -1)))
            )
                return null;
            if (h == "select") {
                if (((e = t.selectedIndex), e < 0)) return null;
                var c = [],
                    l = t.options,
                    s = u == "select-one",
                    v = s ? e + 1 : l.length;
                for (o = s ? e : 0; o < v; o++)
                    if (((r = l[o]), r.selected)) {
                        if (((f = r.value), f || (f = r.attributes && r.attributes.value && !r.attributes.value.specified ? r.text : r.value), s)) return f;
                        c.push(f);
                    }
                return c;
            }
            return n(t).val();
        };
        n.fn.clearForm = function (t) {
            return this.each(function () {
                n("input,select,textarea", this).clearFields(t);
            });
        };
        n.fn.clearFields = n.fn.clearInputs = function (t) {
            var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var r = this.type,
                    u = this.tagName.toLowerCase();
                i.test(r) || u == "textarea"
                    ? (this.value = "")
                    : r == "checkbox" || r == "radio"
                    ? (this.checked = !1)
                    : u == "select"
                    ? (this.selectedIndex = -1)
                    : r == "file"
                    ? /MSIE/.test(navigator.userAgent)
                        ? n(this).replaceWith(n(this).clone(!0))
                        : n(this).val("")
                    : t && ((t === !0 && /hidden/.test(r)) || (typeof t == "string" && n(this).is(t))) && (this.value = "");
            });
        };
        n.fn.resetForm = function () {
            return this.each(function () {
                (typeof this.reset != "function" && (typeof this.reset != "object" || this.reset.nodeType)) || this.reset();
            });
        };
        n.fn.enable = function (n) {
            return (
                n === undefined && (n = !0),
                this.each(function () {
                    this.disabled = !n;
                })
            );
        };
        n.fn.selected = function (t) {
            return (
                t === undefined && (t = !0),
                this.each(function () {
                    var r = this.type,
                        i;
                    r == "checkbox" || r == "radio"
                        ? (this.checked = t)
                        : this.tagName.toLowerCase() == "option" && ((i = n(this).parent("select")), t && i[0] && i[0].type == "select-one" && i.find("option").selected(!1), (this.selected = t));
                })
            );
        };
        n.fn.ajaxSubmit.debug = !1;
    }),
    (function (n) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], n) : typeof module != "undefined" && module.exports ? (module.exports = n(require("jquery"))) : n(jQuery);
    })(function (n) {
        var e = -1,
            r = -1,
            i = function (n) {
                return parseFloat(n) || 0;
            },
            o = function (t) {
                var f = 1,
                    e = n(t),
                    u = null,
                    r = [];
                return (
                    e.each(function () {
                        var t = n(this),
                            e = t.offset().top - i(t.css("margin-top")),
                            o = r.length > 0 ? r[r.length - 1] : null;
                        o === null ? r.push(t) : Math.floor(Math.abs(u - e)) <= f ? (r[r.length - 1] = o.add(t)) : r.push(t);
                        u = e;
                    }),
                    r
                );
            },
            u = function (t) {
                var i = { byRow: !0, property: "height", target: null, remove: !1 };
                return typeof t == "object" ? n.extend(i, t) : (typeof t == "boolean" ? (i.byRow = t) : t === "remove" && (i.remove = !0), i);
            },
            t = (n.fn.matchHeight = function (i) {
                var r = u(i),
                    f;
                return r.remove
                    ? ((f = this),
                      this.css(r.property, ""),
                      n.each(t._groups, function (n, t) {
                          t.elements = t.elements.not(f);
                      }),
                      this)
                    : this.length <= 1 && !r.target
                    ? this
                    : (t._groups.push({ elements: this, options: r }), t._apply(this, r), this);
            }),
            f;
        t.version = "master";
        t._groups = [];
        t._throttle = 80;
        t._maintainScroll = !1;
        t._beforeUpdate = null;
        t._afterUpdate = null;
        t._rows = o;
        t._parse = i;
        t._parseOptions = u;
        t._apply = function (r, f) {
            var e = u(f),
                s = n(r),
                c = [s],
                l = n(window).scrollTop(),
                a = n("html").outerHeight(!0),
                h = s.parents().filter(":hidden");
            return (
                h.each(function () {
                    var t = n(this);
                    t.data("style-cache", t.attr("style"));
                }),
                h.css("display", "block"),
                e.byRow &&
                    !e.target &&
                    (s.each(function () {
                        var i = n(this),
                            t = i.css("display");
                        t !== "inline-block" && t !== "flex" && t !== "inline-flex" && (t = "block");
                        i.data("style-cache", i.attr("style"));
                        i.css({ display: t, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px", overflow: "hidden" });
                    }),
                    (c = o(s)),
                    s.each(function () {
                        var t = n(this);
                        t.attr("style", t.data("style-cache") || "");
                    })),
                n.each(c, function (t, r) {
                    var u = n(r),
                        f = 0;
                    if (e.target) f = e.target.outerHeight(!1);
                    else {
                        if (e.byRow && u.length <= 1) {
                            u.css(e.property, "");
                            return;
                        }
                        u.each(function () {
                            var t = n(this),
                                u = t.attr("style"),
                                i = t.css("display"),
                                r;
                            i !== "inline-block" && i !== "flex" && i !== "inline-flex" && (i = "block");
                            r = { display: i };
                            r[e.property] = "";
                            t.css(r);
                            t.outerHeight(!1) > f && (f = t.outerHeight(!1));
                            u ? t.attr("style", u) : t.css("display", "");
                        });
                    }
                    u.each(function () {
                        var t = n(this),
                            r = 0;
                        (e.target && t.is(e.target)) ||
                            (t.css("box-sizing") !== "border-box" && ((r += i(t.css("border-top-width")) + i(t.css("border-bottom-width"))), (r += i(t.css("padding-top")) + i(t.css("padding-bottom")))), t.css(e.property, f - r + "px"));
                    });
                }),
                h.each(function () {
                    var t = n(this);
                    t.attr("style", t.data("style-cache") || null);
                }),
                t._maintainScroll && n(window).scrollTop((l / a) * n("html").outerHeight(!0)),
                this
            );
        };
        t._applyDataApi = function () {
            var t = {};
            n("[data-match-height], [data-mh]").each(function () {
                var i = n(this),
                    r = i.attr("data-mh") || i.attr("data-match-height");
                t[r] = r in t ? t[r].add(i) : i;
            });
            n.each(t, function () {
                this.matchHeight(!0);
            });
        };
        f = function (i) {
            t._beforeUpdate && t._beforeUpdate(i, t._groups);
            n.each(t._groups, function () {
                t._apply(this.elements, this.options);
            });
            t._afterUpdate && t._afterUpdate(i, t._groups);
        };
        t._update = function (i, u) {
            if (u && u.type === "resize") {
                var o = n(window).width();
                if (o === e) return;
                e = o;
            }
            i
                ? r === -1 &&
                  (r = setTimeout(function () {
                      f(u);
                      r = -1;
                  }, t._throttle))
                : f(u);
        };
        n(t._applyDataApi);
        n(window).bind("load", function (n) {
            t._update(!1, n);
        });
        n(window).bind("resize orientationchange", function (n) {
            t._update(!0, n);
        });
    });
jQuery.fn.extend({
    addToList: function (n, t) {
        return this.filter(":input")
            .val(function (i, r) {
                if (n == "" || n == null || n == undefined) return r;
                if (r == "") return n;
                var u = r.split(t);
                return u.push(n), u.join(t);
            })
            .end();
    },
    removeFromList: function (n, t) {
        return this.filter(":input")
            .val(function (i, r) {
                return n == "" || n == null || n == undefined
                    ? r
                    : $.grep(r.split(t), function (t) {
                          return t != n;
                      }).join(t);
            })
            .end();
    },
});
var submitText = '<i class="fa fa-spinner fa-spin"></i> Submitting...',
    trackOutboundLink = function (n, t, i) {
        ga("send", "event", n, t, i);
    };
(String.prototype.format = function () {
    var n = arguments;
    return this.replace(/{(\d+)}/g, function (t, i) {
        return typeof n[i] != "undefined" ? n[i] : t;
    });
}),
    (function (n) {
        n.fn.formUploader = function () {
            var t = n(this),
                i = t.find("input[type='file']"),
                f;
            if (i.length) {
                var r = !1,
                    h = i.prop("multiple") ? !0 : !1,
                    e = parseInt(i.data("size-limit")),
                    o = i.data("size-type"),
                    u = e * 1024;
                if ((o.toLowerCase() === "mb" && (u *= 1024), h)) {
                    f = t.find(".uploads-list");
                    const r = new DataTransfer();
                    i.change(function () {
                        var y = i[0].files,
                            p = y.length,
                            w = n.map(y, function (n) {
                                if (n.size > u) return n;
                            }),
                            k,
                            a,
                            b,
                            h;
                        if (
                            ((p -= w.length),
                            w.length &&
                                ((k = n
                                    .map(w, function (n) {
                                        return n.name + " is larger than " + e + o;
                                    })
                                    .join("\n")),
                                alert(k)),
                            (a = n.map(y, function (n) {
                                if (n.size <= u) return n;
                            })),
                            i.data("file-limit"))
                        ) {
                            var g = parseInt(i.data("file-limit")),
                                nt = f.find(".uploaded-item").length,
                                d = g - nt;
                            a.length >= d && (i.prop("disabled", !0), (p = d));
                        }
                        for (b = [], h = 0; h < p; h++) b.push(a[h]), r.items.add(a[h]);
                        n.each(b, function (n, i) {
                            var r = i,
                                e = v.replace(/#index#/g, r.lastModified),
                                u;
                            f.append(e);
                            u = new FileReader();
                            u.addEventListener(
                                "load",
                                function () {
                                    var i = t.find("#" + r.lastModified),
                                        n = null;
                                    n = s.includes(r.type) ? c.replace(/#url#/g, u.result) : l;
                                    n = n.replace(/#filename#/g, r.name);
                                    i.html(n);
                                },
                                !1
                            );
                            u.readAsDataURL(r);
                        });
                        i[0].files = r.files;
                    });
                    f.on("click", ".btn-remove", function (t) {
                        t.preventDefault();
                        var f = n(this),
                            u = f.closest(".uploaded-item");
                        return (
                            n.each(r.items, function (n, t) {
                                var i = t.getAsFile();
                                if (i.lastModified == u.prop("id")) return r.items.remove(n), !1;
                            }),
                            (i[0].files = r.files),
                            u.remove(),
                            i.is(":disabled") && i.prop("disabled", !1),
                            !1
                        );
                    });
                } else
                    i.click(function (n) {
                        if (t.find(".button-style").hasClass("hide")) return n.preventDefault(), !1;
                        r = !0;
                        t.find(".upload-text").text("Loading...");
                        t.find(".button-style").html(a);
                    }),
                        i.change(function () {
                            var c, f, h;
                            if (((r = !1), (c = i[0].files), (f = c[0]), f.size > u))
                                return t.find(".upload-text").text("Choose File"), t.find(".button-style").text("Browse"), (i[0].value = null), alert(f.name + " is larger than " + e + o), !1;
                            t.find(".upload-text").text(f.name);
                            t.find(".button-style").addClass("hide");
                            t.find(".button-style").text("Browse");
                            h = new FileReader();
                            h.addEventListener(
                                "load",
                                function () {
                                    if (s.includes(f.type)) {
                                        var i = t.find("img");
                                        n(i).prop("src", h.result);
                                        n(i).removeClass("hide");
                                    } else t.find(".file-type").removeClass("hide");
                                    t.find(".link-remove-upload").removeClass("hide");
                                },
                                !1
                            );
                            h.readAsDataURL(f);
                        }),
                        i.focus(function () {
                            r && ((r = !1), t.find(".upload-text").text("Choose File"), t.find(".button-style").text("Browse"));
                        }),
                        t.find(".link-remove-upload").click(function (r) {
                            var f, e, u;
                            return (
                                r.preventDefault(),
                                (f = i[0].files),
                                (e = f[0]),
                                s.includes(e.type) ? ((u = t.find("img")), u.prop("src", ""), u.addClass("hide")) : t.find(".file-type").addClass("hide"),
                                (i[0].value = null),
                                t.find(".upload-text").text("Choose File"),
                                t.find(".button-style").removeClass("hide"),
                                n(this).addClass("hide"),
                                !1
                            );
                        });
            }
            const s = ["image/jpeg", "image/png", "image/gif"];
            var c = "<img src='#url#' /><button class='btn btn-dark btn-remove' type='button'><i class='fal fa-times'></i></button><div class='file-name'>#filename#</div>",
                l = "<i class='fal fa-file-alt'></i><button class='btn btn-dark btn-remove' type='button'><i class='fal fa-times'></i></button><div class='file-name'>#filename#</div>",
                a = "<span class='spinner-border spinner-border-sm' role='status'></span>",
                v = "<div id='#index#' class='uploaded-item flexbox'><span class='spinner-border' role='status'></span><div class='file-name'>Loading...</div></div>";
        };
    })(jQuery);
$(function () {
    function t() {
        $(document).ready(function () {
            var u = $("#quote-form"),
                t,
                i,
                r,
                n;
            u.length > 0 &&
                ((t = $("#variantPage").data("value")),
                getCookie("variantPage") || saveCookie("variantPage", t, 5, "/"),
                $("#variantPage").val(readCookie("variantPage")),
                (i = readCookie("variantPage")),
                i == "true" &&
                    ((r = $("#variantPage").data("phone-id")),
                    (n = $("#variantPage").data("phone-trackable")),
                    getCookie("_dph") ||
                        ($(".number").text(n),
                        $(".gads-tracking-number-mobile").attr("href", "tel:" + n),
                        $(".navbar-phone-number").attr("data-tracking-phone", n),
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            dataType: "json",
                            url: "/ws/parsecallsource/",
                            data: "number=" + n,
                            success: function (t) {
                                if (t.Data.source) {
                                    var i = $(".gads-tracking-number-mobile").attr("onclick").split(",");
                                    i[1] = "'" + t.Data.source + "'";
                                    i[2] = "'" + n + "');";
                                    $(".gads-tracking-number-mobile").attr("onclick", i.join(","));
                                }
                            },
                        }),
                        saveCookie("_dph", r, 5, "/"))));
        });
    }
    function i() {
        $(document).on("click", ".select-date", function (n) {
            n.preventDefault();
            var r = $(this).attr("data-action-field"),
                t = $("#" + r),
                i = t.data("datepicker");
            if (i) i.picker.is(":visible") ? t.datepicker("hide") : t.datepicker("show");
            else
                t.datepicker("show").on("changeDate", function () {
                    t.datepicker("hide");
                });
        });
    }
    function r() {
        $("a[data-toggle='collapse']").click(function (n) {
            n.preventDefault();
            var t = $(this).attr("data-collapse-container");
            $(this).data("hideaftershow") == !0 && $(this).fadeOut();
            $("#" + t)
                .find("div.collapse")
                .each(function () {
                    var n = $(this);
                    n.hasClass("in") && n.collapse("toggle");
                });
        });
    }
    function u() {
        var t = $(".company-blog"),
            n;
        t.hasClass("internal") ||
            ((n = t.children(".blog-post")),
            n.length > 0 &&
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    data: serializeSecToken(!0),
                    url: "/ws/latest-news/",
                    success: function (t) {
                        t.title && (n.find(".post-date").html(t.pubDate), n.find(".post-header a").attr("href", t.link).html(t.title), n.find(".post-entry").html(t.description), n.find(".post-continue").attr("href", t.link));
                    },
                }));
    }
    // function f() {
    //     console.log('function f was run')
    //     var n = $("#price-quote"),
    //         i,
    //         t;
    //     if (n.length) {
    //         console.log('condition n.length line 9546')
    //         $("button.onoffswitch-toggle").on("click", function () {
    //             console.log('switch toggler clicked')
    //             $(this).hasClass("collapsed") ? $("input[name=setappointment]").val("true") : $("input[name=setappointment]").val("false");
    //         });
    //         $(".btn-schedule-appt").on("click", function () {
    //             $("input[name=chksetappointment]").prop("checked", !0);
    //             $("input[name=chksetappointment]").trigger("change");
    //         });
    //         i = getGoogleMapsAPIKey();
    //         t = null;
    //         n.formUploader();
    //         n.find("#price-quote-submit").click(function (i) {
    //             console.log('line 9559 hit')
    //             function u() {
    //                 var u = n.serializeArray().filter(function (n) {
    //                         return n.name === "tocountry" ? (n.value === "" ? !1 : !0) : !0;
    //                     }),
    //                     t = new FormData(),
    //                     i,
    //                     r;
    //                 $.each(u, function (n, i) {
    //                     t.append(i.name, i.value);
    //                 });
    //                 t.append("convertedpage", document.location.href);
    //                 t.append("currentUrl", getCurrentUrl(!0));
    //                 t.append("__RequestVerificationToken", getSecToken());
    //                 n.find("input[type='file']").length &&
    //                     ((i = n.find("input[type='file']")),
    //                     $.each($(i)[0].files, function (n, r) {
    //                         t.append($(i)[0].name, r);
    //                     }),
    //                     (r = $.map($(i)[0].files, function (n) {
    //                         return n.name;
    //                     }).join(",")),
    //                     t.append("filename", r));
    //                     for (var value of t.values()) { console.log(value); }
    //                 $.ajax({
    //                     type: "POST",
    //                     cache: !1,
    //                     dataType: "json",
    //                     url: "/ws/quote/",
    //                     data: t,
    //                     processData: !1,
    //                     contentType: !1,
    //                     success: function (t) {
    //                         var i, u, r;
    //                         if ((removeFeedback(), t.IsValid))
    //                             t.Data && t.Data.redirect
    //                                 ? (window.location = t.Data.redirect)
    //                                 : (t.Data.quoteToken && $("#quoteToken").val(t.Data.quoteToken),
    //                                   t.Data.activityRowKey && $("#activityRowKey").val(t.Data.activityRowKey),
    //                                   t.Data.contactRowKey && $("#contactRowKey").val(t.Data.contactRowKey),
    //                                   saveCookie("address", t.Data.quote.address, 1, "/"),
    //                                   (r = n.attr("action")),
    //                                   n.attr("action", r + (r.indexOf("?") > 0 ? "&" : "?") + "convertedpage=" + encodeURIComponent(document.location.pathname)),
    //                                   n.submit());
    //                         else {
    //                             button.removeAttr("disabled");
    //                             button.html("Request Your Quote");
    //                             $.each(t.ErrFields, function (n, t) {
    //                                 showValidationError(n, t, "price-quote");
    //                             });
    //                             i = "";
    //                             for (u in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[u];
    //                             alert(i);
    //                         }
    //                     },
    //                 });
    //             }
    //             i.preventDefault();
    //             $(".error").removeClass("error");
    //             button = $(this);
    //             button.html("Submitting...");
    //             button.attr("disabled", "disabled");
    //             var r = n.find("#address").length ? n.find("#address").val().trim() : "",
    //                 f = n.find("#zip").length ? n.find("#zip").val().trim() : "";
    //             r !== ""
    //                 ? t.geocode({ address: r }, function (n, i) {
    //                       if (i === "OK") {
    //                           var o = n.length > 0 ? n[0] : null,
    //                               e = new parseGoogleAddress(o);
    //                           e.formatted_address !== "" &&
    //                               ($("#g-address1").val(e.address1),
    //                               $("#g-address2").val(e.address2),
    //                               $("#g-city").val(e.city),
    //                               $("#g-neighborhood").val(e.neighborhood),
    //                               r.toLowerCase().includes(e.state.toLowerCase()) && $("#g-state").val(e.state),
    //                               r.includes(e.zip) && $("#g-zip").val(e.zip),
    //                               r.toLowerCase().includes(e.country.toLowerCase()) && $("#g-country").val(e.country),
    //                               $("#g-latitude").val(e.latitude),
    //                               $("#g-longitude").val(e.longitude),
    //                               $("#g-fromcity").length && $("#g-fromcity").val(e.city),
    //                               $("#g-fromstate").length && $("#g-fromstate").val(e.state),
    //                               $("#g-fromzip").length && $("#g-fromzip").val(e.zip),
    //                               $("#g-county").length && $("#g-county").val(e.county));
    //                       }
    //                       f !== ""
    //                           ? t.geocode({ address: f }, function (n, t) {
    //                                 if (t === "OK") {
    //                                     var r = n.length > 0 ? n[0] : null,
    //                                         i = new parseGoogleAddress(r);
    //                                     i.formatted_address !== "" &&
    //                                         ($("#g-tocity").length && $("#g-tocity").val(i.city),
    //                                         $("#g-tostate").length && $("#g-tostate").val(i.state),
    //                                         $("#g-tozip").length && $("#g-tozip").val(i.zip),
    //                                         $("#g-tocountry").length && $("#g-tocountry").val(i.country));
    //                                 }
    //                                 u();
    //                             })
    //                           : u();
    //                   })
    //                 : u();
    //         });
    //         n.find("#address").on("change", function () {
    //             $("#g-address1").val("");
    //             $("#g-address2").val("");
    //             $("#g-city").val("");
    //             $("#g-state").val("");
    //             $("#g-zip").val("");
    //             $("#g-country").val("");
    //             $("#g-latitude").val("");
    //             $("#g-longitude").val("");
    //             $("#g-fromcity").length && $("#g-fromcity").val("");
    //             $("#g-fromstate").length && $("#g-fromstate").val("");
    //             $("#g-fromzip").length && $("#g-fromzip").val("");
    //             $("#g-county").length && $("#g-county").val("");
    //         });
    //         n.find("#zip").on("change", function () {
    //             $("#g-tocity").val("");
    //             $("#g-tostate").val("");
    //             $("#g-tozip").val("");
    //             $("#g-tocountry").val("");
    //         });
    //         $.getScript("https://maps.googleapis.com/maps/api/js?key=" + i + "&libraries=places", function () {
    //             var f = n.find("#address"),
    //                 i,
    //                 u,
    //                 r;
    //             t = new window.google.maps.Geocoder();
    //             i = new window.google.maps.places.Autocomplete(f.get(0), { types: ["address"] });
    //             i.setComponentRestrictions({ country: ["us", "ca"] });
    //             i.addListener("place_changed", function () {
    //                 var n = i.getPlace();
    //                 f.val(n.formatted_address);
    //             });
    //             n.find("#zip").length &&
    //                 ((u = n.find("#zip")),
    //                 (r = new window.google.maps.places.Autocomplete(u.get(0), { types: ["(regions)"] })),
    //                 r.setComponentRestrictions({ country: ["us", "ca"] }),
    //                 r.addListener("place_changed", function () {
    //                     var n = r.getPlace();
    //                     u.val(n.formatted_address);
    //                 }));
    //         });
    //         n.find("#service").on("change", function () {
    //             var t = $(this);
    //             t.val() == "Residential Move"
    //                 ? (n.find(".optional-hide").hide(), n.find(".residential-group").show())
    //                 : t.val() == "International Move"
    //                 ? (n.find(".optional-hide").hide(), n.find(".international-group").show())
    //                 : n.find(".optional-hide").hide();
    //             $("#zip").val("");
    //             $("#g-tocity").val("");
    //             $("#g-tostate").val("");
    //             $("#g-tozip").val("");
    //             $("#g-tocountry").val("");
    //         });
    //         n.find("#service").trigger("change");
    //     }
    //     $(window).load(function () {
    //         $("#address").attr("autocomplete", "none");
    //     });
    //     $(window).load(function () {
    //         $("#zip").attr("autocomplete", "none");
    //     });
    // }

    function f(){
        console.log('f redefined')
    }

    function e() {
        if ($("#visual-quoter-form").length > 0) {
            var n = $("#visual-quoter-form"),
                t = $("#vq-modal");
            $("#vq-modal")
                .modal({ show: !0, keyboard: !1, backgroundcolor: null })
                .show(function () {
                    $("body").addClass("modal-open-vq");
                });
            $("#btn-user-phone").on("click", function (n) {
                var i = $("#btn-user-phone").text(),
                    r,
                    t;
                n.preventDefault();
                r = "quotetoken=" + getFormVal("visual-quoter-token") + "&phone=" + getFormVal("visual-quoter-user-phone") + "&type=" + getFormVal("visual-quoter-type") + "&sourcetype=phone";
                t = $(this);
                t.html("Submitting...");
                t.attr("disabled", "disabled");
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/sendapplink/",
                    data: r + serializeSecToken(),
                    success: function (n) {
                        var r, u;
                        if ((t.removeAttr("disabled"), t.html(i), n.IsValid)) alert("Message sent to your mobile device."), $("#btn-skip-visual-quoter").trigger("click");
                        else {
                            t.removeAttr("disabled");
                            t.html(i);
                            n.ErrFields.phone && $("#visual-quoter-user-phone").addClass("error");
                            r = "";
                            for (u in n.ErrFields) r += (r == "" ? "" : "\n") + n.ErrFields[u];
                            alert(r);
                        }
                    },
                });
            });
            $("#btn-user-email").on("click", function (n) {
                n.preventDefault();
                var i = "quotetoken=" + getFormVal("visual-quoter-token") + "&email=" + getFormVal("visual-quoter-user-email") + "&type=" + getFormVal("visual-quoter-type") + "&sourcetype=email",
                    t = $(this);
                t.html("Submitting...");
                t.attr("disabled", "disabled");
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/sendapplink/",
                    data: i + serializeSecToken(),
                    success: function (n) {
                        var i, r;
                        if ((t.removeAttr("disabled"), t.html("Get the App"), n.IsValid))
                            alert("Message sent to your email address."), getFormVal("visual-quoter-type") == "claim" ? $("#vq-modal").modal("hide") : $("#btn-skip-visual-quoter").trigger("click");
                        else {
                            n.ErrFields.email && $("#visual-quoter-user-email").addClass("error");
                            i = "";
                            for (r in n.ErrFields) i += (i == "" ? "" : "\n") + n.ErrFields[r];
                            alert(i);
                        }
                    },
                });
            });
            $("#btn-skip-visual-quoter").on("click", function (n) {
                n.preventDefault();
                $("#vq-modal").modal("hide");
                $("body").removeClass("modal-open-vq");
                $("#vq-modal").removeClass("vq-show");
            });
        }
    }
    function o() {
        var n = $("#claim-form"),
            t;
        if ($("#claim-form").length > 0) {
            t = getGoogleMapsAPIKey();
            $(".claims-page .item-group:first .remove-claim-item").hide();
            $(".add-claim-item").on("click", function () {
                var n = $(".claim-items").length,
                    i = n - 1,
                    t = $("#claim-items-" + i)
                        .clone()
                        .attr("id", "claim-items-" + n)
                        .attr("data-claim-number", n)
                        .fadeIn("slow");
                return (
                    t
                        .find(".claim-item-number")
                        .attr("id", "claim-item-number-" + n)
                        .html("Item " + (n + 1)),
                    t.find(".remove-claim-item").attr("data-claim-number", n).attr("style", ""),
                    t
                        .find(".claim-article")
                        .attr("id", "claim-article-" + n)
                        .attr("name", "ClaimItem[" + n + "].Article")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-article-" + n),
                    t
                        .find(".claim-weight")
                        .attr("id", "claim-weight-" + n)
                        .attr("name", "ClaimItem[" + n + "].Weight")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-weight-" + n),
                    t
                        .find(".claim-present-value")
                        .attr("id", "claim-present-value-" + n)
                        .attr("name", "ClaimItem[" + n + "].PresentValue")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-present-value-" + n),
                    t
                        .find(".claim-date-acquired")
                        .attr("id", "claim-date-acquired-" + n)
                        .attr("data-action-field", "claim-date-acquired-" + n)
                        .attr("name", "ClaimItem[" + n + "].DateAcquired")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-date-acquired-" + n),
                    t
                        .find(".claim-orig-cost")
                        .attr("id", "claim-orig-cost-" + n)
                        .attr("name", "ClaimItem[" + n + "].OriginalCost")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-orig-cost-" + n),
                    t
                        .find(".claim-amount-claim")
                        .attr("id", "claim-amount-claim-" + n)
                        .attr("name", "ClaimItem[" + n + "].AmountClaimed")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-amount-claim-" + n),
                    t
                        .find(".claim-damage-desc")
                        .attr("id", "claim-damage-desc-" + n)
                        .attr("name", "ClaimItem[" + n + "].DamageDescription")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-damage-desc-" + n),
                    t
                        .find(".claim-carton-damaged")
                        .attr("id", "claim-carton-damaged-" + n)
                        .attr("name", "ClaimItem[" + n + "].IsCartonDamged")
                        .removeClass("error")
                        .val("")
                        .closest(".form-group")
                        .find("label")
                        .attr("for", "claim-carton-damaged-" + n),
                    $("#claim-items-" + i).after(t),
                    $("#claim-inventory-item-" + n).focus(),
                    !1
                );
            });
            $(".claims-page").on("click", ".remove-claim-item", function () {
                var n = $(this).attr("data-claim-number"),
                    t = $(".claim-items").length;
                return (
                    $("#claim-items-" + n).slideUp("slow", function () {
                        var f, u, i, r;
                        if (($(this).closest(".item-group").remove(), (f = parseInt(t) - parseInt(n) - parseInt(1)), f > 0))
                            for (u = 0; u < f; u++)
                                (i = parseInt(n) + parseInt(u)),
                                    (r = $("#claim-items-" + (parseInt(i) + parseInt(1)))
                                        .attr("id", "claim-items-" + i)
                                        .attr("data-claim-number", i)
                                        .fadeIn("slow")),
                                    r
                                        .find(".claim-item-number")
                                        .attr("id", "claim-item-number-" + i)
                                        .html("Item " + (parseInt(i) + 1)),
                                    r.find(".remove-claim-item").attr("data-claim-number", i),
                                    r
                                        .find(".claim-article")
                                        .attr("id", "claim-article-" + i)
                                        .attr("name", "ClaimItem[" + i + "].Article")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-article-" + i),
                                    r
                                        .find(".claim-weight")
                                        .attr("id", "claim-weight-" + i)
                                        .attr("name", "ClaimItem[" + i + "].Weight")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-weight-" + i),
                                    r
                                        .find(".claim-present-value")
                                        .attr("id", "claim-present-value-" + i)
                                        .attr("name", "ClaimItem[" + i + "].PresentValue")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-present-value-" + i),
                                    r
                                        .find(".claim-date-acquired")
                                        .attr("id", "claim-date-acquired-" + i)
                                        .attr("data-action-field", "claim-date-acquired-" + i)
                                        .attr("name", "ClaimItem[" + i + "].DateAcquired")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-date-acquired-" + i),
                                    r
                                        .find(".claim-orig-cost")
                                        .attr("id", "claim-orig-cost-" + i)
                                        .attr("name", "ClaimItem[" + i + "].OriginalCost")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-orig-cost-" + i),
                                    r
                                        .find(".claim-amount-claim")
                                        .attr("id", "claim-amount-claim-" + i)
                                        .attr("name", "ClaimItem[" + i + "].AmountClaimed")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-amount-claim-" + i),
                                    r
                                        .find(".claim-damage-desc")
                                        .attr("id", "claim-damage-desc-" + i)
                                        .attr("name", "ClaimItem[" + i + "].DamageDescription")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-damage-desc-" + i),
                                    r
                                        .find(".claim-carton-damaged")
                                        .attr("id", "claim-carton-damaged-" + i)
                                        .attr("name", "ClaimItem[" + i + "].IsCartonDamged")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-carton-damaged-" + i),
                                    r
                                        .find(".claim-inventory-item")
                                        .attr("id", "claim-inventory-item-" + i)
                                        .attr("name", "ClaimItem[" + i + "].InventoryNumber")
                                        .closest(".form-group")
                                        .find("label")
                                        .attr("for", "claim-inventory-item-" + i);
                    }),
                    !1
                );
            });
            $("#btn-send-claim").length > 0 &&
                n.find("#btn-send-claim").click(function (t) {
                    t.preventDefault();
                    $(".error").removeClass("error");
                    button = $(this);
                    button.html("Submitting...");
                    button.attr("disabled", "disabled");
                    var i = $("#claim-form").serializeArray();
                    $.post("/ws/postclaim/", i, function (t) {
                        var i, r;
                        if (t.IsValid) t.Data.quoteToken && $("#claim-quotetoken").val(t.Data.quoteToken), n.submit();
                        else {
                            button.removeAttr("disabled");
                            button.html("Send Claim");
                            i = "";
                            for (r in t.ErrFields) $("#" + r).addClass("error"), (i += (i == "" ? "" : "\n") + t.ErrFields[r]);
                            alert(i);
                        }
                    });
                });
            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + t + "&libraries=places", function () {
                var r = n.find("#destination-address"),
                    u = n.find("#origin-address"),
                    t,
                    i;
                geocoder = new window.google.maps.Geocoder();
                t = new window.google.maps.places.Autocomplete(r.get(0), { types: ["address"] });
                i = new window.google.maps.places.Autocomplete(u.get(0), { types: ["address"] });
                t.setComponentRestrictions({ country: "us" });
                i.setComponentRestrictions({ country: "us" });
                t.addListener("place_changed", function () {
                    var n = t.getPlace();
                    r.val(n.formatted_address);
                });
                i.addListener("place_changed", function () {
                    var n = i.getPlace();
                    u.val(n.formatted_address);
                });
            });
        }
    }
    function s() {
        var n = $("#contact-form");
        if (n.length > 0) {
            n.find("#button-submit-form").click(function (t) {
                var i, r, u;
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                i = new FormData(n[0]);
                i.append("contact", "1");
                i.append("convertedpage", document.location.href);
                i.append("__RequestVerificationToken", getSecToken());
                n.find("input[type='file']").length &&
                    ((r = n.find("input[type='file']")),
                    $.each($(r)[0].files, function (n, t) {
                        i.append($(r)[0].name, t);
                    }),
                    (u = $.map($(r)[0].files, function (n) {
                        return n.name;
                    }).join(",")),
                    i.append("filename", u));
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/contact/",
                    data: i,
                    processData: !1,
                    contentType: !1,
                    success: function (t) {
                        var i, r;
                        if ((removeFeedback(), t.IsValid)) n.submit();
                        else {
                            button.removeAttr("disabled");
                            button.html("Send Your Message");
                            $.each(t.ErrFields, function (n, t) {
                                showValidationError(n, t, "contact-form");
                            });
                            i = "";
                            for (r in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[r];
                            alert(i);
                        }
                    },
                });
            });
            $(".modal-send-message").on("show.bs.modal", function (n) {
                var t = $(n.relatedTarget),
                    i = t.data("location"),
                    r = t.data("locationid"),
                    u = $(this);
                u.find(".modal-title").text("Send a Message to " + i);
                $("#input-location").val(i);
                $("#input-locationId").val(r);
            });
        }
    }
    function h() {
        var n = trim(window.location.pathname, "/"),
            t = n.split("/");
        $(".navbar-nav .aMain").each(function () {
            var n = $(this);
            n.attr("href") == "/" + t[0] + "/" && n.addClass("active");
        });
    }
    function c() {
        $(".page-nav-btn-group a").each(function () {
            $(this).attr("href") == window.location.pathname && $(this).addClass("active");
        });
    }
    function l() {
        $.each($(".list-group-item-img > img"), function (n, t) {
            var u = $(t),
                r,
                i;
            u.attr("src").includes("vimeo")
                ? ((r = u.attr("src").split("/")),
                  (i = r[r.length - 1]),
                  i.includes("?") && (i = i.substring(0, i.indexOf("?"))),
                  $.ajax({
                      type: "GET",
                      url: "https://vimeo.com/api/v2/video/" + i + ".json",
                      dataType: "jsonp",
                      success: function (n) {
                          var t = n[0].thumbnail_small;
                          u.attr("src", t);
                      },
                  }))
                : u.attr("src").includes("youtube") && ((r = u.attr("src").split("/")), (i = r[r.length - 1]), u.attr("src", "https://img.youtube.com/vi/" + i + "/0.jpg"));
        });
    }
    function a() {
        var n = $("#email-subscribe");
        n.length > 0 &&
            (n.formUploader(),
            $("#email-subscribe-btn").click(function (t) {
                var i, r, u;
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.data("text", button.html());
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                i = new FormData(n[0]);
                i.append("blogsubscribe", "1");
                i.append("__RequestVerificationToken", getSecToken());
                n.find("input[type='file']").length &&
                    ((r = n.find("input[type='file']")),
                    $.each($(r)[0].files, function (n, t) {
                        i.append($(r)[0].name, t);
                    }),
                    (u = $.map($(r)[0].files, function (n) {
                        return n.name;
                    }).join(",")),
                    i.append("filename", u));
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/blogsubscribe/",
                    data: i,
                    processData: !1,
                    contentType: !1,
                    success: function (n) {
                        var t, i;
                        if ((removeFeedback(), n.IsValid)) window.location = "/thank-you/?" + postData;
                        else {
                            button.removeAttr("disabled");
                            button.html(button.data("text"));
                            $.each(n.ErrFields, function (n, t) {
                                showValidationError(n, t, "email-subscribe");
                            });
                            t = "";
                            for (i in n.ErrFields) t += (t == "" ? "" : "\n") + n.ErrFields[i];
                            alert(t);
                        }
                    },
                });
            }));
    }
    function v() {
        var n = $("#post-comment");
        n.length > 0 &&
            $("#btn-post-comment").click(function (n) {
                n.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                var t =
                    "name=" +
                    getFormVal("input-commenter-name") +
                    "&email=" +
                    getFormVal("input-commenter-email") +
                    "&comment=" +
                    getSafeHtml("textarea-commenter-comment") +
                    "&postid=" +
                    getFormVal("input-post-id") +
                    "&url=" +
                    getFormVal("input-post-url");
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/blogcomment/",
                    data: t + serializeSecToken(),
                    success: function (n) {
                        var t, i;
                        if ((removeFeedback(), button.removeAttr("disabled"), button.html("Post Comment"), n.IsValid)) alert("Thanks for your comment.\nYour comment has been posted for moderation."), window.location.reload(!0);
                        else {
                            n.ErrFields.name && showValidationError("input-commenter-name");
                            n.ErrFields.email && showValidationError("input-commenter-email");
                            n.ErrFields.comment && showValidationError("textarea-commenter-comment");
                            t = "";
                            for (i in n.ErrFields) t += (t == "" ? "" : "\n") + n.ErrFields[i];
                            alert(t);
                        }
                    },
                });
            });
    }
    function y() {
        $(".scroll-to").on("click", function () {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var n = $(this.hash),
                    t = $("#header").height();
                if (((n = n.length ? n : $("[name=" + this.hash.slice(1) + "]")), n.length)) return $("html,body").animate({ scrollTop: n.offset().top - t }, 1e3), !1;
            }
        });
    }
    function p() {
        $(".scroll-to-collapse").on("shown.bs.collapse", function () {
            $("html, body").animate({ scrollTop: $(this).offset().top }, 1e3);
        });
    }
    function w() {
        var n = $("#apply-form"),
            t,
            i;
        n.length > 0 &&
            ((t = n.find("#apply-submit")),
            (i = t.html()),
            n.formUploader(),
            n.find("#apply-submit").click(function (r) {
                var u, f, e;
                r.preventDefault();
                $(".error").removeClass("error");
                t = $(this);
                t.html("Submitting...");
                t.attr("disabled", "disabled");
                u = new FormData(n[0]);
                u.append("__RequestVerificationToken", getSecToken());
                n.find("input[type='file']").length &&
                    ((f = n.find("input[type='file']")),
                    $.each($(f)[0].files, function (n, t) {
                        u.append($(f)[0].name, t);
                    }),
                    (e = $.map($(f)[0].files, function (n) {
                        return n.name;
                    }).join(",")),
                    u.append("filename", e));
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/employment/",
                    data: u,
                    processData: !1,
                    contentType: !1,
                    success: function (r) {
                        var u, o, f, e;
                        if ((removeFeedback(), r.IsValid)) (f = n.attr("action")), f && ((e = n.serialize()), f.indexOf("?") > -1 && (e = "&" + e), (window.location.href = f + e));
                        else {
                            t.removeAttr("disabled");
                            t.html(i);
                            $.each(r.ErrFields, function (n, t) {
                                showValidationError(n, t, "apply-form");
                            });
                            u = "";
                            for (o in r.ErrFields) u += (u == "" ? "" : "\n") + r.ErrFields[o];
                            alert(u);
                        }
                    },
                });
            }));
    }
    function b() {
        $(".rating-selector").each(function (n) {
            var t = $(this).attr("id");
            t = t ? t + "-value" : "rating-hidden-" + (n + 1);
            $("#" + t).length <= 0 && $(this).append('<input id="' + t + '" name="' + t + '" type="hidden" value="5"/>');
            $(this)
                .find("a")
                .each(function () {
                    $(this).on("click", function () {
                        $(this).siblings("a").removeClass("yes-value");
                        $(this).nextAll("a").addClass("yes-value");
                        $(this).addClass("yes-value");
                        var n = 5 - $(this).index();
                        $("#" + t).val(n);
                    });
                });
            $(this).on("mouseenter", function () {
                $(this).find("a").removeClass("yes-value");
            });
            $(this).on("mouseleave", function () {
                var n = $("#" + t).val();
                $(this)
                    .find("a")
                    .each(function (t, i) {
                        t >= 5 - n && n != 0 && $(i).addClass("yes-value");
                    });
            });
        });
    }
    function k() {
        var t = $("#form-review-post"),
            n;
        if (t.length > 0) {
            $(".technician-list a").on("click", function (n) {
                var i = t.find("#input-reviewer-technician-name"),
                    r = t.find("#input-reviewer-technician-rowkey");
                n.preventDefault();
                $(this).hasClass("active")
                    ? ($(this).removeClass("active"), (i[0].value = ""), (r[0].value = ""))
                    : ($(".technician-list a").removeClass("active"), $(this).addClass("active"), (i[0].value = this.innerText), (r[0].value = this.children[1].id));
            });
            t.find("#button-post-review").click(function (n) {
                n.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                buttonhtml = $(this).html();
                button.html(submitText);
                button.attr("disabled", "disabled");
                var i = t.serialize() + "&rating=" + getFormVal("review-rating-value") + "&referrer=" + document.referrer;
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/postreview/",
                    data: i + serializeSecToken(),
                    success: function (n) {
                        var i, r;
                        if ((removeFeedback(), n.IsValid)) n.Data.reviewkey && $("#reviewkey").val(n.Data.reviewkey), t.submit();
                        else {
                            button.removeAttr("disabled");
                            button.html(buttonhtml);
                            $.each(n.ErrFields, function (n, t) {
                                showValidationError(n.toLowerCase(), t, "form-review-post");
                            });
                            i = "";
                            for (r in n.ErrFields) i += (i == "" ? "" : "\n") + n.ErrFields[r];
                            alert(i);
                        }
                    },
                });
            });
            n = window.location.hash;
            n = n ? n : "";
            n = n.slice(1).replace("#", "");
            n == "write-a-review" && $(".btn-write-review").trigger("click");
        }
    }
    function d() {
        var n = $("#review-feedback-form");
        n.length > 0 &&
            n.find("#button-submit-form").click(function (t) {
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                buttonhtml = $(this).html();
                button.html(submitText);
                button.attr("disabled", "disabled");
                var i = n.serialize();
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/postreviewfeedback/",
                    data: i + serializeSecToken(),
                    success: function (t) {
                        removeFeedback();
                        t.IsValid ? n.submit() : (button.removeAttr("disabled"), button.html(buttonhtml), t.ErrFields.feedback && $("#textarea-info-feedback").addClass("error"), alert(getCombinedAlert(t)));
                    },
                });
            });
    }
    function g() {
        $(".open-gallery").on("click", function (n) {
            n.preventDefault();
            $($("a[data-bsgallery]").get(0)).trigger("click");
        });
    }
    function nt() {
        $("#bootstrap-gallery").bsgallery({ gallerysourceurl: "/ws/gallery/" });
    }
    function tt() {
        var n = $("#offer-form"),
            i,
            t;
        if (n.length > 0) {
            if (
                ((i = getGoogleMapsAPIKey()),
                (t = null),
                n.formUploader(),
                n.find("#button-submit-form").click(function (i) {
                    function u() {
                        var t = new FormData(n[0]),
                            i,
                            r;
                        t.append("convertedpage", document.location.href);
                        t.append("__RequestVerificationToken", getSecToken());
                        n.find("input[type='file']").length &&
                            ((i = n.find("input[type='file']")),
                            $.each($(i)[0].files, function (n, r) {
                                t.append($(i)[0].name, r);
                            }),
                            (r = $.map($(i)[0].files, function (n) {
                                return n.name;
                            }).join(",")),
                            t.append("filename", r));
                        $.ajax({
                            type: "POST",
                            cache: !1,
                            dataType: "json",
                            url: "/ws/offer/",
                            data: t,
                            processData: !1,
                            contentType: !1,
                            success: function (t) {
                                var i, u, r;
                                if ((removeFeedback(), t.IsValid))
                                    t.Data && t.Data.redirect
                                        ? (window.location = t.Data.redirect)
                                        : ((r = n.attr("action")), n.attr("action", r + (r.indexOf("?") > 0 ? "&" : "?") + "convertedpage=" + encodeURIComponent(document.location.pathname)), n.submit());
                                else {
                                    button.removeAttr("disabled");
                                    button.html(f);
                                    $.each(t.ErrFields, function (n, t) {
                                        showValidationError(n, t, "offer-form");
                                    });
                                    i = "";
                                    for (u in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[u];
                                    alert(i);
                                }
                            },
                        });
                    }
                    var f, r;
                    i.preventDefault();
                    $(".error").removeClass("error");
                    button = $(this);
                    f = button.html();
                    button.html("Submitting...");
                    button.attr("disabled", "disabled");
                    r = n.find("#address").length ? n.find("#address").val().trim() : "";
                    r !== ""
                        ? t.geocode({ address: r }, function (n, t) {
                              if (t === "OK") {
                                  var f = n.length > 0 ? n[0] : null,
                                      i = new parseGoogleAddress(f);
                                  i.formatted_address !== "" &&
                                      ($("#g-address1").val(i.address1),
                                      $("#g-address2").val(i.address2),
                                      $("#g-city").val(i.city),
                                      $("#g-neighborhood").val(i.neighborhood),
                                      r.toLowerCase().includes(i.state.toLowerCase()) && $("#g-state").val(i.state),
                                      r.includes(i.zip) && $("#g-zip").val(i.zip),
                                      $("#g-county").length && $("#g-county").val(i.county),
                                      r.toLowerCase().includes(i.country.toLowerCase()) && $("#g-country").val(i.country),
                                      $("#g-latitude").val(i.latitude),
                                      $("#g-longitude").val(i.longitude));
                                  u();
                              } else u();
                          })
                        : u();
                }),
                n.find("#homeowner-chckbx").length)
            )
                n.find("#homeowner-chckbx").on("change", function () {
                    var n = $(this);
                    n.is(":checked") ? $("#homeowner").val("Yes") : $("#homeowner").val("No");
                });
            n.find("#address").on("change", function () {
                $("#g-address1").val("");
                $("#g-address2").val("");
                $("#g-city").val("");
                $("#g-state").val("");
                $("#g-zip").val("");
                $("#g-county").val("");
                $("#g-country").val("");
                $("#g-latitude").val("");
                $("#g-longitude").val("");
            });
            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + i + "&libraries=places", function () {
                var r = n.find("#address"),
                    i;
                t = new window.google.maps.Geocoder();
                i = new window.google.maps.places.Autocomplete(r.get(0), { types: ["address"] });
                i.setComponentRestrictions({ country: ["us", "ca"] });
                i.addListener("place_changed", function () {
                    var n = i.getPlace();
                    r.val(n.formatted_address);
                });
            });
        }
    }
    function it() {
        $(".modal-share")
            .on("hidden.bs.modal", function () {
                $("html").removeClass("modal-share-open");
            })
            .on("show.bs.modal", function () {
                $("html").addClass("modal-share-open");
            });
    }
    function rt() {
        var n = $("#survey-form"),
            t,
            i;
        n.length > 0 &&
            ((t = n.find("#survey-review-comments")),
            (i = parseInt($(t).data("minimum"))),
            $(t).keyup(function () {
                var t = $(this)
                        .val()
                        .replace(/(\s|\t|\n|\r|\r\n)/g, "").length,
                    t = i - t;
                t >= 0 ? n.find("#chars").text(t) : n.find("#chars").text(0);
            }),
            $(".survey-question-row").each(function () {
                var n = {};
                n.SurveyQuestionId = $(this).attr("data-id");
                n.AnswerType = $(this).attr("data-answertype");
                $(this).removeAttr("data-id");
                $(this).removeAttr("data-answertype");
                n.SurveyQuestionId && $(this).data("question", n);
            }),
            n.find("#button-submit-form").click(function (t) {
                var r, u, i, f;
                t.preventDefault();
                $(".error").removeClass("error");
                r = $(this);
                u = r.html();
                r.html("Submitting...");
                r.attr("disabled", "disabled");
                i = [];
                $(".survey-question-row").each(function (n, t) {
                    var e = $(t),
                        u = e.data("question"),
                        r,
                        o,
                        f,
                        s;
                    u &&
                        ((r = {}),
                        (r.SurveyQuestionId = u.SurveyQuestionId),
                        u.AnswerType == "SingleChoice"
                            ? ((o = e.find("input[type=radio]:checked").val()), o && ((r.SurveyAnswerId = o), i.push(r)))
                            : u.AnswerType == "MultipleChoice"
                            ? e.find("input[type=checkbox]:checked").each(function () {
                                  var n = $(this).val();
                                  n && i.push({ SurveyQuestionId: u.SurveyQuestionId, SurveyAnswerId: n });
                              })
                            : u.AnswerType == "SingleLine" || u.AnswerType == "MultipleLine"
                            ? ((f = e.find("input[type=text],textarea").val()), f && ((r.AnswerText = f), i.push(r)))
                            : u.AnswerType == "YesNo"
                            ? ((f = e.find("input[type=radio]:checked").val()), f && ((r.AnswerText = f), i.push(r)))
                            : u.AnswerType == "Rating" && ((s = e.find("input[type=radio]:checked").val()), s && ((r.AnswerValue = s), i.push(r))));
                });
                f = n.serialize() + "&rating=" + getFormVal("review-rating-value") + "&referrer=" + document.referrer + "&surveyresponses=" + JSON.stringify(i);
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/survey/",
                    data: f + serializeSecToken(),
                    success: function (t) {
                        var f, i, e;
                        if ((removeFeedback(), t.IsValid)) t.Data && t.Data.redirect ? (window.location = t.Data.redirect) : n.submit();
                        else {
                            r.removeAttr("disabled");
                            r.html(u);
                            t.ErrFields.name && showValidationError("input-user-name");
                            t.ErrFields.email && showValidationError("input-user-email");
                            t.ErrFields.rating && $("#review-rating-value").closest(".survey-question-row").addClass("has-error");
                            t.ErrFields.market && showValidationError("survey-review-location");
                            t.ErrFields.reviewtitle && showValidationError("survey-review-title");
                            t.ErrFields.comment && showValidationError("survey-review-comments");
                            t.Data.questionerrorfields &&
                                ((f = $.parseJSON(t.Data.questionerrorfields)),
                                $.each(f, function (n, t) {
                                    t.question && t.question != "" && $(".survey-question-row:nth(" + t.question.replace("q", "") + ")").addClass("has-error");
                                }));
                            i = "";
                            for (e in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[e];
                            alert(i);
                        }
                    },
                });
            }));
    }
    function ut() {
        var n = $("#service-request-form");
        n.length > 0 &&
            (n.formUploader(),
            n.find("#button-submit-form").click(function (t) {
                var i, r, u;
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                i = new FormData(n[0]);
                i.append("contact", "1");
                i.append("__RequestVerificationToken", getSecToken());
                n.find("input[type='file']").length &&
                    ((r = n.find("input[type='file']")),
                    $.each($(r)[0].files, function (n, t) {
                        i.append($(r)[0].name, t);
                    }),
                    (u = $.map($(r)[0].files, function (n) {
                        return n.name;
                    }).join(",")),
                    i.append("filename", u));
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/service-request/",
                    data: i,
                    processData: !1,
                    contentType: !1,
                    success: function (t) {
                        var i, r;
                        if ((removeFeedback(), t.IsValid)) n.submit();
                        else {
                            button.removeAttr("disabled");
                            button.html("Send Your Message");
                            $.each(t.ErrFields, function (n, t) {
                                showValidationError(n, t, "service-request-form");
                            });
                            i = "";
                            for (r in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[r];
                            alert(i);
                        }
                    },
                });
            }));
    }
    function ft() {
        if ($("#header.keep-on-screen").length) {
            var n = $("#header.keep-on-screen"),
                t = n.offset().top;
            $(window).scroll(function () {
                var n = $(window).scrollTop();
                n > t ? $("body").addClass("fixed-navigation") : $("body").removeClass("fixed-navigation");
            });
        }
    }
    function et() {
        $("#past-projects-gallery").bsgallery({ gallerysourceurl: "/ws/projectgallery/" });
    }
    function ot() {
        var n = $("#form-past-projects");
        if (n.length > 0) {
            var u = getGoogleMapsAPIKey(),
                i = null,
                f = $("#button-post-job").attr("data-thumb"),
                r = new FormData(),
                t = 0;
            $(".past-project-page #zip").on("change", function () {
                $(".project-city-state.collapse.in").length <= 0 && $(".project-city-state").collapse("show");
                var n = getFormVal("zip");
                n != null &&
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        url: "/ws/getcitystate/",
                        data: "zip=" + n + serializeSecToken(),
                        success: function (n) {
                            removeFeedback();
                            n.IsValid && ($("#city").val(n.Data.city), $("#state").val(n.Data.state));
                        },
                    });
            });
            $("#upload-photo-input").on("click", function () {
                if ($(".added-photo").length == 50) return alert("We limit up to 50 images can be added for past projects."), !1;
            });
            $(document).on("click", ".past-project-page .added-photo .btn-remove", function () {
                var n = $(this).parent().parent(),
                    t = n.attr("id");
                return (
                    n.remove(),
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        async: !1,
                        url: "/ws/deleteuploadedprojectimage/?id=" + t,
                        success: function (n) {
                            n.Ok ? (token = n.token) : handleResponseError(n);
                        },
                        error: function () {
                            alert("An error occurred");
                        },
                    }),
                    !1
                );
            });
            $("#upload-photo-input").on("change", function (n) {
                var e, u;
                if ($(".added-photo").length == 50) return !1;
                e = $("#project-pic").html();
                $("#added-photo-container").append(e);
                $(".btn-add-job-photo").addClass("disabled");
                $("#upload-text").text("Uploading...");
                var s = n.target.files,
                    h = $(this)[0].files.length,
                    o = $(this)[0].value,
                    i = o.substring(o.lastIndexOf(".") + 1).toLowerCase();
                if (i == "gif" || i == "png" || i == "jpg" || i == "jpeg")
                    if (typeof FileReader != "undefined")
                        for (u = 0; u < h; u++)
                            r.append("file" + t, s[u]),
                                $.ajax({
                                    type: "POST",
                                    cache: !1,
                                    datatype: "json",
                                    url: "/ws/uploadprojectimage/?id=" + t,
                                    contentType: !1,
                                    processData: !1,
                                    data: r,
                                    success: function (n) {
                                        t = t + 1;
                                        $(".btn-add-job-photo").removeClass("disabled");
                                        $("#upload-text").text("Upload A Photo");
                                        $(".added-photo").last().attr("id", n);
                                        var i = f + n;
                                        $(".added-photo").last().find(".project-img").attr("src", i);
                                        $(".added-photo").last().find(".uploaded-photo").removeClass("hide");
                                    },
                                });
                    else alert("Cannot Upload images.");
                else alert("Plaese select images only");
            });
            n.find("#button-post-job").click(function (t) {
                function r() {
                    var t = [];
                    $("#added-photo-container .added-photo").each(function () {
                        t.push({ ImageName: $(this).attr("id") });
                    });
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        url: "/ws/pastproject/",
                        data: n.serialize() + "&jobimages-addeditems=" + encodeURIComponent(JSON.stringify(t)) + "&isReviewAvailable=" + getCheckVal("addReview") + "&rating=" + getFormVal("review-rating-value"),
                        success: function (t) {
                            var i, r;
                            if ((removeFeedback(), t.IsValid)) n.submit();
                            else {
                                button.removeAttr("disabled");
                                button.html("Post Job");
                                t.ErrFields.Rep && showValidationError("project-select-assign-rep");
                                t.ErrFields.ProjectDate && showValidationError("user-project-date");
                                t.ErrFields.Name && showValidationError("name");
                                t.ErrFields.Phone && showValidationError("phone");
                                t.ErrFields.Email && showValidationError("email");
                                t.ErrFields.Address && showValidationError("address");
                                t.ErrFields.Zip && showValidationError("address");
                                t.ErrFields.City && showValidationError("address");
                                t.ErrFields.State && showValidationError("address");
                                t.ErrFields.Rating && showValidationError("review-rating");
                                t.ErrFields.Location && showValidationError("select-review-location");
                                t.ErrFields.Title && showValidationError("input-reviewer-title");
                                t.ErrFields.Service && showValidationError("user-project-type");
                                i = "";
                                for (r in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[r];
                                alert(i);
                            }
                        },
                    });
                }
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                var u = $("#address").length ? $("#address").val().trim() : "";
                u !== ""
                    ? i.geocode({ address: u }, function (n, t) {
                          if (t === "OK") {
                              var u = n.length > 0 ? n[0] : null,
                                  i = new parseGoogleAddress(u);
                              i.formatted_address !== "" &&
                                  ($("#g-address1").val(i.address1),
                                  $("#g-address2").val(i.address2),
                                  $("#g-city").val(i.city),
                                  $("#g-neighborhood").val(i.neighborhood),
                                  $("#g-state").val(i.state),
                                  $("#g-zip").val(i.zip),
                                  $("#g-county").val(i.county),
                                  $("#g-country").val(i.country),
                                  $("#g-latitude").val(i.latitude),
                                  $("#g-longitude").val(i.longitude));
                              r();
                          } else r();
                      })
                    : r();
            });
            n.find("#address").on("change", function () {
                $("#g-address1").val("");
                $("#g-address2").val("");
                $("#g-city").val("");
                $("#g-state").val("");
                $("#g-zip").val("");
                $("#g-county").val("");
                $("#g-country").val("");
                $("#g-latitude").val("");
                $("#g-longitude").val("");
            });
            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + u + "&libraries=places", function () {
                var r = n.find("#address"),
                    t;
                i = new window.google.maps.Geocoder();
                t = new window.google.maps.places.Autocomplete(r.get(0), { types: ["address"] });
                t.setComponentRestrictions({ country: ["us", "ca"] });
                t.addListener("place_changed", function () {
                    var n = t.getPlace();
                    r.val(n.formatted_address);
                });
            });
        }
    }
    function st() {
        var t = $("#employee").val(),
            n = window.location.href.split("?")[0].toString();
        t && (n = UpdateQueryString("employee", t, n));
        $('input:radio[name="listview"]').change(function () {
            window.location.href = n;
        });
        $('input:radio[name="mapview"]').change(function () {
            n = UpdateQueryString("map", "", n);
            window.location.href = n;
        });
        $("#project-type-filter").on("change", function () {
            n = UpdateQueryString("type", $(this).val(), n);
            window.location.href = n;
        });
    }
    function ht() {
        function y() {
            $("#mapclusterer").is(":visible") &&
                ((e = !0),
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/getpastprojectmarkers/",
                    success: function (n) {
                        $.getScript(n.datascript, function () {
                            h = n;
                            r = window.mappoints;
                            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBfyTTg-r5TZkerX_CT1z-p4H_ETYn8U50", function () {
                                p(n);
                            });
                        });
                    },
                }));
        }
        function p(t) {
            function h() {
                n.setOptions({ scrollwheel: !0 });
            }
            var k = new window.google.maps.LatLng(t.lat, t.lng),
                l,
                e,
                o,
                b;
            for (
                v = new window.google.maps.InfoWindow(),
                    l = t.pastProjectZoomLevel,
                    n = new window.google.maps.Map(document.getElementById("mapclusterer"), { minZoom: 4, zoom: l, center: k, mapTypeId: window.google.maps.MapTypeId.ROADMAP, streetViewControl: !1, mapTypeControl: !1, scrollwheel: !1 }),
                    window.google.maps.event.addListener(n, "click", function () {
                        h();
                    }),
                    window.google.maps.event.addListener(n, "zoom_changed", function () {
                        h();
                    }),
                    window.google.maps.event.addListener(n, "drag", function () {
                        h();
                    }),
                    e = 0;
                e < r.length;
                e++
            ) {
                var i = r[e],
                    y = i.ProjectAssets,
                    d = new window.google.maps.LatLng(i.Latitude, i.Longitude),
                    p = new window.google.maps.MarkerImage(c, new window.google.maps.Size(42, 42));
                ((i.HasReview && i.ReviewStatus === "published") || y > 0) && (p = new window.google.maps.MarkerImage(a, new window.google.maps.Size(42, 42)));
                o = new window.google.maps.Marker({ position: d, icon: p });
                ((i.HasReview && i.ReviewStatus === "published") || y > 0) && s.push(o);
                b = w(r[e]);
                window.google.maps.event.addListener(o, "click", b);
                u.push(o);
            }
            f(u);
        }
        function f(t) {
            o = new MarkerClusterer(n, t, { imagePath: "/img/past-projects/m" });
        }
        function w(n) {
            return function (r) {
                var u;
                r.cancelBubble = !0;
                r.returnValue = !1;
                r.stopPropagation && (r.stopPropagation(), r.preventDefault());
                i == null && (i = this.icon.url);
                t != null && ((u = new window.google.maps.MarkerImage(i, new window.google.maps.Size(42, 42))), t.setIcon(u), (i = this.icon.url));
                t = this;
                u = new window.google.maps.MarkerImage(l, new window.google.maps.Size(42, 42));
                this.setIcon(u);
                $.ajax({
                    type: "POST",
                    cache: !1,
                    url: "/ws/getprojectdetails/?projectId=" + n.ProjectId,
                    error: function (n) {
                        alert(n);
                    },
                    success: function (n) {
                        $("#map-pin-detail-review").remove();
                        var r = $("<div>", { id: "map-pin-detail-review" }).addClass("map-pin-detail"),
                            u = $('<div id="map-detail-inner" class="inner"><a href="#" id="map-pin-details-close" class="close btn pull-right" title="close"><i class="fal fa-times"></i></a></div>').append(n),
                            f = r.append(u);
                        $("#mapclusterer").after(f);
                        $("#map-pin-details-close").on("click", function (n) {
                            if ((n.preventDefault(), t != null)) {
                                var r = new window.google.maps.MarkerImage(i, new window.google.maps.Size(42, 42));
                                t.setIcon(r);
                            }
                            $(this).closest("#map-pin-detail-review").remove();
                        });
                        $(".past-project-page .project-details .set-height").length &&
                            $(".past-project-page .project-details .set-height").each(function () {
                                $(this).height() > 80 && $(this).parent().addClass("expand-me");
                            });
                    },
                });
            };
        }
        var e = !1,
            o,
            h,
            c = "/img/past-projects/map-pin.png",
            l = "/img/past-projects/map-pin-active.png",
            a = "/img/past-projects/map-pin-star.png",
            v,
            t,
            i,
            n,
            r = null,
            u = [],
            s = [];
        if ($("#mapclusterer").length > 0)
            $(window).on("resize", function () {
                var n = $(this);
                e || y();
            });
        $("#mapChange").change(function () {
            ($(this).val() == "allProjects" || $(this).val() == "featuredProjects") && (o.clearMarkers(), $(this).val() === "allProjects" ? f(u) : f(s));
        });
        $(window).trigger("resize");
        $("#search-projects").on("click", function (n) {
            n.preventDefault();
            $.ajax({
                type: "POST",
                cache: !1,
                dataType: "json",
                url: "/ws/getpastprojectsbyarea/?zip=" + getFormVal("search-zip"),
                success: function (n) {
                    removeFeedback();
                    n.IsValid ? (window.location = "/past-projects/?map&zip=" + $("#search-zip").val()) : alert("Invalid Zip Code");
                },
            });
        });
        $(document).on("click", ".map-detail-review .btn-read-review-map", function (n) {
            return n.preventDefault(), $(this).addClass("hide").parent().find("div.map-review-body").removeClass("hide"), !1;
        });
        $(".past-project-page .project-details .set-height").length &&
            $(".past-project-page .project-details .set-height").each(function () {
                $(this).height() > 80 && $(this).parent().addClass("expand-me");
            });
        $(document).on("click", ".past-project-page .project-details .see-more-chat", function (n) {
            return n.preventDefault(), $(this).parent().removeClass("expand-me"), !1;
        });
    }
    function ct() {
        $("#project-assets-gallery").bsgallery({ gallerysourceurl: "/ws/projectgallery/" });
    }
    function lt(n) {
        for (var t = n.length - 1; t >= 0; t--) n[t] = null;
    }
    function at() {
        var t = $("#send-review-form"),
            n;
        if (t.length > 0) {
            n = function () {
                var n = document.getElementById("text-review-site-div");
                n.className.includes("form-group hidden") && (n.className = "form-group");
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    async: !1,
                    url: "/ws/review-text-request-market-change-sites/",
                    data: "market=" + getFormVal("input-text-review-request-market"),
                    success: function (n) {
                        var t = document.getElementById("text-review-select-site"),
                            i,
                            r,
                            u;
                        lt(t);
                        for (i in n) (r = n[i]), (u = new Option(r, i)), (t[t.length] = u);
                    },
                    error: function () {
                        alert("An error occurred with creating site choices");
                    },
                });
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    async: !1,
                    url: "/ws/review-text-request-market-change-links/",
                    data: "market=" + getFormVal("input-text-review-request-market"),
                    success: function (n) {
                        var t = document.getElementById("text-review-link-div"),
                            i,
                            r;
                        t.innerHTML = "\n \n ";
                        for (i in n) (r = '<input type="hidden"value="' + n[i] + '" />'), (t.innerHTML += r);
                    },
                    error: function () {
                        alert("An error occurred with creating site links");
                    },
                });
            };
            $("#input-text-review-request-market")[0].length <= 2 && n();
            $("#input-text-review-request-market").on("change", function () {
                n();
            });
        }
    }
    function vt() {
        var n = $("#send-review-form");
        n.length > 0 &&
            n.find("#button-submit-form").click(function (n) {
                n.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Sending...");
                button.attr("disabled", "disabled");
                var r = document.getElementById("text-review-select-site"),
                    u = $("#text-review-link-div").children(),
                    t = u[r.selectedIndex],
                    i = "";
                typeof t != "undefined" &&
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        async: !1,
                        url: "/ws/shortenlink/",
                        data: "longlink=" + encodeURIComponent(t.value),
                        success: function (n) {
                            i = n;
                        },
                        error: function () {
                            alert("An error occurred with link shortening");
                        },
                    });
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    async: !1,
                    url: "/ws/review-text-request/",
                    data: "phone=" + $("#input-user-phone").val() + "&link=" + encodeURIComponent(i) + "&message=" + encodeURIComponent($("#text-message").val()) + serializeSecToken(),
                    success: function (n) {
                        var t, i;
                        if ((removeFeedback(), n.IsValid)) alert("Review Request Sent!"), button.removeAttr("disabled"), button.html("SEND REVIEW REQUEST");
                        else {
                            button.removeAttr("disabled");
                            button.html("SEND REVIEW REQUEST");
                            n.ErrFields.phone && showValidationError("input-user-phone");
                            n.ErrFields.link && showValidationError("input-text-review-request-market");
                            n.ErrFields.message && showValidationError("text-message");
                            t = "";
                            for (i in n.ErrFields) t += (t == "" ? "" : "\n") + n.ErrFields[i];
                            alert(t);
                        }
                    },
                });
            });
    }
    function yt() {
        function n() {
            $("body").removeClass("modal-exit-intent-open");
            $("#myModal").removeClass("in");
            $("#myModal .modal-backdrop").hide();
            $("body").removeClass("modal-open");
            $("#myModal").css("display", "");
            $("#myModal").attr("shown", !0);
            $("#apexchat_invitation_container_wrapper").removeClass("hide");
            $("#apexchat_invitation_container_minimized_wrapper").removeClass("hide");
        }
        var t = $("#myModal");
        if (t.length) {
            function i() {
                var n = getCookie("_hei");
                return n == null || n === "false";
            }
            function r() {
                if (i()) {
                    $(document).on("mouseleave.exitintent", function (r) {
                        var u = r.relatedTarget || r.toElement;
                        !u &&
                            r.clientY < 20 &&
                            !$("#myModal").is(":visible") &&
                            i() &&
                            $("#myModal").attr("shown") != "true" &&
                            (($("#myModal").attr("intenttype") == "Chat Intent" && window.ApexChat) || $("#myModal").attr("intenttype") != "Chat Intent") &&
                            t
                                .on("show.bs.modal", function () {
                                    $("#apexchat_invitation_container_wrapper").addClass("hide");
                                    $("#apexchat_invitation_container_minimized_wrapper").addClass("hide");
                                    trackOutboundLink($("#myModal").attr("intenttype"), "Triggered", "Yes");
                                })
                                .on("hide.bs.modal", function () {
                                    n();
                                    trackOutboundLink($("#myModal").attr("intenttype"), "Denied", "Yes");
                                    saveCookie("_hei", "true", 1, "/");
                                })
                                .modal({ keyboard: !1, backdrop: "static", show: !0 });
                    });
                    t.find(".btn-intent-primary").on("click", function () {
                        var t = "",
                            i,
                            r;
                        $("#myModal").attr("intenttype") == "Chat Intent"
                            ? ($(document).off("mouseleave.exitintent"),
                              (i = window.ApexChat.Invitation.options.companyId),
                              (r = window.ApexChat.Invitation.options.agentAliasId),
                              window.open(
                                  "http://www.Spectrumchat.com/pages/chat.aspx?companyId=" + i + "&amp;requestedAgentId=" + r + "&originalReferrer=" + document.referrer + "&referrer=" + window.location.href,
                                  "",
                                  "width=440,height=680"
                              ),
                              (t = "Exit Intent - Chat"))
                            : (t = "Exit Intent - Offer");
                        $("#exit-intent-input-name").length == 0 && (n(), saveCookie("_hei", "true", 1, "/"), $("#myModal").attr("intenttype") != "Download Intent" && trackOutboundLink(t, "Completed", "Yes"));
                    });
                }
            }
            setTimeout(function () {
                $(window).bind("load", r());
            }, 7e3);
        }
        $(".download-intent-download").click(function () {
            var t = $("#exit-intent-input-name").val(),
                i = $("#exit-intent-input-email").val();
            button = $(this);
            button.attr("disabled", "disabled");
            $.ajax({
                type: "POST",
                cache: !1,
                dataType: "json",
                url: "/ws/download-exit-intent/",
                data: "name=" + t + "&email=" + i,
                success: function (t) {
                    var i, r;
                    if ((removeFeedback(), t.IsValid))
                        trackOutboundLink("Exit Intent - Download", "Completed", "Yes"),
                            saveCookie("_hei", "true", 1, "/"),
                            n(),
                            $("#downloadablefile").length > 0 ? window.open($("#downloadablefile").val()) : (location.href = $("#redirectLink").val());
                    else {
                        button.removeAttr("disabled");
                        t.ErrFields.name && showValidationError("exit-intent-input-name");
                        t.ErrFields.email && showValidationError("exit-intent-input-email");
                        i = "";
                        for (r in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[r];
                        alert(i);
                    }
                },
            });
        });
    }
    function pt() {
        var t = getCookie("_lp"),
            n;
        t == null && ((t = document.location.href), saveCookie("_lp", document.location.href, 30, "/"));
        n = getCookie("_rp");
        n == null && ((n = document.referrer), saveCookie("_rp", document.referrer, 30, "/"));
    }
    function wt() {
        var n = $("#referral-form"),
            i,
            t;
        if (n.length > 0) {
            i = getGoogleMapsAPIKey();
            t = null;
            n.formUploader();
            n.find("#referral-submit").click(function (i) {
                function e() {
                    var t = new FormData(n[0]),
                        i,
                        u;
                    t.append("__RequestVerificationToken", getSecToken());
                    n.find("input[type='file']").length &&
                        ((i = n.find("input[type='file']")),
                        $.each($(i)[0].files, function (n, r) {
                            t.append($(i)[0].name, r);
                        }),
                        (u = $.map($(i)[0].files, function (n) {
                            return n.name;
                        }).join(",")),
                        t.append("filename", u));
                    $.ajax({
                        type: "POST",
                        cache: !1,
                        dataType: "json",
                        url: "/ws/referral/",
                        data: t,
                        processData: !1,
                        contentType: !1,
                        success: function (t) {
                            var i, u;
                            if ((removeFeedback(), t.IsValid)) n.submit();
                            else {
                                r.removeAttr("disabled");
                                r.html(o);
                                $.each(t.ErrFields, function (n, t) {
                                    showValidationError(n, t, "referral-form");
                                });
                                i = "";
                                for (u in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[u];
                                alert(i);
                            }
                        },
                    });
                }
                var r, o, u, f;
                i.preventDefault();
                $(".error").removeClass("error");
                r = $(this);
                o = r.html();
                r.html("Submitting...");
                r.attr("disabled", "disabled");
                u = $(n).find("#address").length ? $(n).find("#address").val().trim() : "";
                f = $(n).find("#referreraddress").length ? $(n).find("#referreraddress").val().trim() : "";
                u !== ""
                    ? t.geocode({ address: u }, function (n, i) {
                          if (i === "OK") {
                              var o = n.length > 0 ? n[0] : null,
                                  r = new parseGoogleAddress(o);
                              r.formatted_address !== "" &&
                                  ($("#g-address1").val(r.address1),
                                  $("#g-address2").val(r.address2),
                                  $("#g-city").val(r.city),
                                  $("#g-neighborhood").val(r.neighborhood),
                                  u.toLowerCase().includes(r.state.toLowerCase()) && $("#g-state").val(r.state),
                                  u.includes(r.zip) && $("#g-zip").val(r.zip),
                                  u.toLowerCase().includes(r.country.toLowerCase()) && $("#g-country").val(r.country),
                                  $("#g-latitude").val(r.latitude),
                                  $("#g-longitude").val(r.longitude));
                          }
                          f !== ""
                              ? t.geocode({ address: f }, function (n, t) {
                                    if (t === "OK") {
                                        var r = n.length > 0 ? n[0] : null,
                                            i = new parseGoogleAddress(r);
                                        i.formatted_address !== "" &&
                                            ($("#g-referrer-address1").val(i.address1),
                                            $("#g-referrer-address2").val(i.address2),
                                            $("#g-referrer-city").val(i.city),
                                            $("#g-referrer-neighborhood").val(i.neighborhood),
                                            f.toLowerCase().includes(i.state.toLowerCase()) && $("#g-referrer-state").val(i.state),
                                            f.includes(i.zip) && $("#g-referrer-zip").val(i.zip),
                                            f.toLowerCase().includes(i.country.toLowerCase()) && $("#g-referrer-country").val(i.country),
                                            $("#g-referrer-latitude").val(i.latitude),
                                            $("#g-referrer-longitude").val(i.longitude));
                                    }
                                    e();
                                })
                              : e();
                      })
                    : e();
            });
            n.find("#input-referral-address").on("change", function () {
                $("#g-address1").val("");
                $("#g-address2").val("");
                $("#g-city").val("");
                $("#g-state").val("");
                $("#g-zip").val("");
                $("#g-country").val("");
                $("#g-latitude").val("");
                $("#g-longitude").val("");
            });
            n.find("#input-referrer-address").on("change", function () {
                $("#g-referrer-address1").val("");
                $("#g-referrer-address2").val("");
                $("#g-referrer-city").val("");
                $("#g-referrer-state").val("");
                $("#g-referrer-zip").val("");
                $("#g-referrer-country").val("");
                $("#g-referrer-latitude").val("");
                $("#g-referrer-longitude").val("");
            });
            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + i + "&libraries=places", function () {
                var u = n.find("#address"),
                    f = n.find("#referreraddress"),
                    i,
                    r;
                t = new window.google.maps.Geocoder();
                i = new window.google.maps.places.Autocomplete(u.get(0), { types: ["address"] });
                i.setComponentRestrictions({ country: ["us", "ca"] });
                i.addListener("place_changed", function () {
                    var n = i.getPlace();
                    u.val(n.formatted_address);
                });
                r = new window.google.maps.places.Autocomplete(f.get(0), { types: ["address"] });
                r.setComponentRestrictions({ country: ["us", "ca"] });
                r.addListener("place_changed", function () {
                    var n = r.getPlace();
                    f.val(n.formatted_address);
                });
            });
        }
    }
    function bt() {
        var n = {
            section: $(".search-section"),
            applyfilter: function (n) {
                (($this = this), $this.section.length && n.searchbarclassname.length && n.entryclassname.length) &&
                    $this.section.find(n.searchbarclassname).keyup(function (t) {
                        var u, i, r, f;
                        if ((t.preventDefault(), ($this = this), (u = $this.value.toLowerCase()), (i = $(n.entryclassname)), i.length))
                            for (r = 0; r < i.length; r++) (f = $(i[r]).find(n.entryvalclassname)[0].innerText.toLowerCase()), (i[r].style.display = f.indexOf(u) < 0 ? "none" : n.defaultdisplay);
                    });
            },
        };
        n.applyfilter({ searchbarclassname: ".searchbar", entryclassname: ".search-item", entryvalclassname: ".search-item-identifier", defaultdisplay: "" });
    }
    function kt() {
        $(".navflyout-toggle, .mobile-nav-toggle").on("click", function () {
            $("body").hasClass("nav-open") ? $("body").removeClass("nav-open") : $("body").addClass("nav-open");
        });
    }
    function dt() {
        if ($(".quote-form").length) {
            var n = $(".quote-form").offset().top,
                t = n + $(".quote-form").height();
            $(window).scroll(function () {
                var i = $(window).scrollTop(),
                    r = i + $(window).height();
                r > n && i < t ? $(".btn-quote-ft-mobile").removeClass("showme") : $(".btn-quote-ft-mobile").addClass("showme");
            });
        } else $(".btn-quote-ft-mobile").hide();
    }
    function gt() {
        if ($(".triggerAnimate").length)
            $(window).on("scroll", function () {
                var n = $(window).scrollTop(),
                    t = n + $(window).height() - 100;
                $(".triggerAnimate").each(function () {
                    t > $(this).offset().top && $(this).addClass("animate");
                });
            });
    }
    function ni() {
        var n = $("#extreme-weather-quote"),
            t,
            i,
            r,
            u;
        if (n.length > 0) {
            t = 0;
            r = $("#weather-container");
            r.length &&
                ((u = getCookie("address")),
                $.ajax({
                    type: "POST",
                    url: "/ws/retrieve-weather-results/",
                    data: { address: u },
                    timeout: 12e4,
                    success: function (n) {
                        clearInterval(i);
                        e();
                        r.html(n);
                        var t = $("#weather-desc").length ? $("#weather-desc").val() : "";
                        $("#weatherResults").val(t);
                        $(".match-height").matchHeight();
                        deleteCookie("address");
                    },
                    error: function (n) {
                        clearInterval(i);
                        console.log(n);
                    },
                }),
                (i = setInterval(f, 1e3)));
            n.find("#extreme-weather-quote-submit").click(function (t) {
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                var i = n.serialize();
                $.ajax({
                    type: "POST",
                    cache: !1,
                    dataType: "json",
                    url: "/ws/updatequoteappointment/",
                    data: i + "&convertedpage=" + encodeURIComponent(document.location.href) + "&variantPage=" + $("#variantPage").val() + serializeSecToken(),
                    success: function (t) {
                        var i, u, r;
                        if ((removeFeedback(), t.IsValid))
                            t.Data && t.Data.redirect
                                ? (window.location = t.Data.redirect)
                                : (t.Data.quoteToken && $("#quoteToken").val(t.Data.quoteToken),
                                  t.Data.activityRowKey && $("#activityRowKey").val(t.Data.activityRowKey),
                                  t.Data.contactRowKey && $("#contactRowKey").val(t.Data.contactRowKey),
                                  (r = n.attr("action")),
                                  n.attr("action", r + (r.indexOf("?") > 0 ? "&" : "?") + "convertedpage=" + encodeURIComponent(document.location.pathname)),
                                  n.submit());
                        else {
                            button.removeAttr("disabled");
                            button.html("Request Your Quote");
                            i = "";
                            for (u in t.ErrFields) i += (i == "" ? "" : "\n") + t.ErrFields[u];
                            alert(i);
                        }
                    },
                });
            });
            function f() {
                var i = $(".progress-bar"),
                    n;
                t += 1;
                n = Math.floor((t / 120) * 100);
                i.attr("aria-valuenow", n);
                i.css("width", n + "%");
                i.find("span").text(n + "% Complete");
            }
            function e() {
                var n = $(".progress-bar"),
                    i = 100;
                t = 0;
                n.attr("aria-valuenow", i);
                n.css("width", i + "%");
                n.find("span").text(i + "% Complete");
            }
        }
    }
    function n() {
        if ($(".lazyload").length) {
            $(window).on("scroll", function () {
                n();
            });
            n();
            function n() {
                var n = $(window).scrollTop() + $(window).height();
                $(".lazyload").each(function () {
                    var t = $(this).offset().top,
                        i = $(this).attr("data-src");
                    n > t && $(this).removeClass("lazyload").attr("src", i).removeAttr("data-src");
                });
            }
        }
    }
    function ti() {
        $(document).on("click", ".load-images", function (t) {
            var c, r, o;
            t.preventDefault();
            var i = $(this),
                f = i.closest(".page-gallery").find(".row"),
                e = f.find("a"),
                l = i.data("galleryid"),
                u = i.data("count"),
                s = i.data("index"),
                a = i.data("caption"),
                h = i.data("hero");
            if (h.toLowerCase() == "true" && ((c = e.length - 1), (r = u + c), r % 3 != 0)) {
                for (o = 1, r++; r % 3 != 0; ) o++, r++;
                u += o;
            }
            return (
                $.ajax({
                    type: "POST",
                    cache: !1,
                    url: "/ws/load-gallery/",
                    data: { id: l, count: u, index: s, caption: a, hero: h },
                    success: function (t) {
                        f.append(t);
                        e = f.find("a");
                        var r = parseInt(i.data("total"));
                        r == e.length ? i.remove() : i.data("index", parseInt(s) + parseInt(u));
                        n();
                    },
                    error: function (n) {
                        alert("Error Loading Images");
                        console.log(n);
                    },
                }),
                !1
            );
        });
    }
    function ii() {
        var n = $("#nomination-form");
        if (n.length)
            $(document).on("click", "#nomination-submit", function (t) {
                t.preventDefault();
                $(".error").removeClass("error");
                button = $(this);
                button.html("Submitting...");
                button.attr("disabled", "disabled");
                $.post("/ws/nomination/", n.serialize(), function (t) {
                    if ((removeFeedback(), t.IsValid)) n.submit();
                    else {
                        button.removeAttr("disabled");
                        button.html("Submit");
                        var i = "";
                        $.each(t.ErrFields, function (n) {
                            showValidationError(n);
                            i += (i == "" ? "" : "\n") + t.ErrFields[n];
                        });
                        alert(i);
                    }
                });
            });
    }
    function ri() {
        $(".activate-video").on("click", function () {
            var n = $(this).attr("data-thevideo"),
                t = $(this).attr("title");
            $("#modal-video iframe").attr("src", n);
            $("#modal-video .modal-title").text(t);
        });
        $("#modal-video").on("hidden.bs.modal", function () {
            $(this).find("iframe").attr("src", "");
        });
    }
    window.onload = function () {
        for (var r = document.getElementsByClassName("gads-tracking-number"), u, t, f, i, n = 0; n < r.length; n++)
            if (((u = r[n].getAttribute("data-tracking-phone")), _googWcmGet("gads-tracking-number", u), (t = document.getElementsByClassName("gads-tracking-number")), t.length > 0))
                for (f = t[0].innerText, i = document.getElementsByClassName("gads-tracking-number-mobile"), j = 0; j < i.length; j++) i[j].setAttribute("href", "tel:" + f);
    };
    t();
    i();
    r();
    u();
    f();
    e();
    o();
    s();
    h();
    c();
    l();
    a();
    v();
    y();
    p();
    w();
    initUpload();
    b();
    k();
    d();
    g();
    nt();
    tt();
    it();
    rt();
    ft();
    ut();
    ht();
    ot();
    ct();
    vt();
    at();
    st();
    yt();
    et();
    pt();
    wt();
    bt();
    kt();
    dt();
    gt();
    ni();
    n();
    ti();
    ii();
    ri();
    $(".match-height").matchHeight();
});
$(function () {
    function n() {
        $("#customer-portal-form").length > 0 &&
            $("#button-customer-submit").click(function () {
                var n = $(this),
                    i = n.text(),
                    t;
                n.html("Submitting..");
                n.attr("disabled", "disabled");
                t = $("#customer-portal-form").serialize();
                $.ajax({
                    type: "POST",
                    url: "/ws/customer-portal-login/",
                    data: t + serializeSecToken(),
                    success: function (t) {
                        removeFeedback();
                        n.html(i);
                        n.removeAttr("disabled");
                        var r = t.ErrFields;
                        t.IsValid ? window.location.reload() : (showValidationError("password", r.password), alert(getCombinedAlert(t)));
                    },
                    error: function () {
                        alert("An error occurred");
                    },
                });
            });
    }
    n();
});
