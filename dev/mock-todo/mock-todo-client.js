"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTodoClient = void 0;
/** A TodoClient for the mock server */
var MockTodoClient = /** @class */ (function () {
    function MockTodoClient(baseUrl, options) {
        if (options === void 0) { options = {}; }
        this.baseUrl = baseUrl;
        this.options = options;
    }
    /**
     * TODO implement authorization code flow
     * 1. Authorization url (redirect_uri, client_id, scope, state, response_type)
     * 2. Authenticated by code (grant_type, client_id, client_secret, code, redirect_uri)
     */
    // async getAuthorizationUrl() {}
    // async getTokenByCode() {}
    MockTodoClient.prototype.getTodoLists = function (_a) {
        var query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_b) {
                queryString = this.toQueryString(query);
                return [2 /*return*/, this.request("/todo/lists?".concat(queryString))];
            });
        });
    };
    MockTodoClient.prototype.getTodoListTasks = function (_a) {
        var listId = _a.listId, query = _a.query;
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_b) {
                queryString = this.toQueryString(query);
                return [2 /*return*/, this.request("/todo/lists/".concat(listId, "/tasks?").concat(queryString))];
            });
        });
    };
    MockTodoClient.prototype.patchTodoListTask = function (_a) {
        var id = _a.id, listId = _a.listId, patch = _a.patch;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.request("/todo/lists/".concat(listId, "/tasks/").concat(id), {
                        method: 'PATCH',
                        body: JSON.stringify(patch),
                    })];
            });
        });
    };
    /** Apply authentication header using token logic */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MockTodoClient.prototype.onRequest = function (_request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /** Perform request with some base configuration */
    MockTodoClient.prototype.request = function (path, options) {
        if (path === void 0) { path = '/'; }
        return __awaiter(this, void 0, void 0, function () {
            var url, requestOptions, response, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(path, this.baseUrl);
                        requestOptions = __assign(__assign({ method: 'GET' }, options), { headers: Object.assign(this.getHeaders(), this.options.headers) });
                        return [4 /*yield*/, this.onRequest(requestOptions)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fetch(url.href, __assign({}, requestOptions))];
                    case 3:
                        response = _a.sent();
                        result = response.json();
                        return [2 /*return*/, result];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error(err_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**  */
    MockTodoClient.prototype.getHeaders = function () {
        var _a;
        return __assign({ 'content-type': 'application/json' }, (_a = this.options) === null || _a === void 0 ? void 0 : _a.headers);
    };
    MockTodoClient.prototype.toQueryString = function (queryParams) {
        return new URLSearchParams(queryParams).toString();
    };
    return MockTodoClient;
}());
exports.MockTodoClient = MockTodoClient;
