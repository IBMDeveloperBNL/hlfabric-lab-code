"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
const funding_1 = require("./funding");
let ProjectPledge = class ProjectPledge {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ProjectPledge.prototype, "pledgeNumber", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ProjectPledge.prototype, "name", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ProjectPledge.prototype, "description", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], ProjectPledge.prototype, "fundsRequired", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ProjectPledge.prototype, "status", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ProjectPledge.prototype, "aidOrg", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", funding_1.Funding)
], ProjectPledge.prototype, "funds", void 0);
ProjectPledge = __decorate([
    fabric_contract_api_1.Object()
], ProjectPledge);
exports.ProjectPledge = ProjectPledge;
//# sourceMappingURL=projectpledge.js.map