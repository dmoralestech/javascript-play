/**
 * Created by dmorales on 3/03/2017.
 */

var R = require('ramda');

var Applicable = {
    Unknown: 0,
    False: 1,
    True: 2
}

function isComparePromotedCodes() {
    //Need to implement this
    return true;
}

const isCodeNegativeGroupFn = (code) => {
    return Utils.isNegativeGroup(code);
}

const getFamily = (code) => {
    return Utils.getFamily(code)
}

const areCodeBelongToTheSameFamily = (objData) => {
    return Utils.areCodesComparable(objData.family, objData.codeSource, objData.codeVehicle)
}

const isCodeAGroupCode = (code) => {
    return Utils.isGroup(code);
}

const comparePromotedCodes = (objData) => {
    return Utils.comparePromotedCodes([objData.codeSource], [objData.codeVehicle]);
}

// I wonder if I can group getApplicable with its other dependent parameters? (isCodeNegativeGroup, isVehicleCodeNegativeGroup, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes)
function compareCodes(isCodeNegativeGroupFn, areBothNegativeGroup, getApplicable, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, objData) {
    let applicable = Applicable.Unknown;
    const isCodeNegativeGroup = isCodeNegativeGroupFn(objData.codeSource);
    const isVehicleCodeNegativeGroup = isCodeNegativeGroupFn(objData.codeVehicle);

    if (!areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup)) {
        applicable = getApplicable(isCodeNegativeGroup, isVehicleCodeNegativeGroup, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, objData);
    }

    return applicable;
}

let compareCodesCurry = R.curry(compareCodes);


function areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    return isCodeNegativeGroup && isVehicleCodeNegativeGroup;
}

function getApplicable(isCodeNegativeGroup, isVehicleCodeNegativeGroup, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB , isCodeMatchC, objData) {

    let applicable = Applicable.Unknown;
    if (areCodeBelongToTheSameFamily(objData)) {
        const isCodeAGroupCode = isCodeAGroupCode(objData.codeSource);
        const isVehicleCodeGroup = isCodeAGroupCode(objData.codeVehicle);
        const codeMatch = isCodeMatch(comparePromotedCodes, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB , isCodeMatchC, isCodeAGroupCode, isVehicleCodeGroup, objData);
        if (codeMatch) {
            applicable = getApplicableA(isCodeNegativeGroup, isVehicleCodeNegativeGroup);
        } else {
            applicable = getApplicableB(isCodeNegativeGroup, isVehicleCodeNegativeGroup);
        }
    }
    return applicable;
}

function getApplicableA(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    let applicable;
    if (isCodeNegativeGroup || isVehicleCodeNegativeGroup) {
        // a match in a negative group
        applicable = Applicable.False;
    } else {
        // a match in a positive group / single 
        applicable = Applicable.True;
    }

    return applicable;
}

function getApplicableB(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    let applicable;
    if (isCodeNegativeGroup || isVehicleCodeNegativeGroup) {
        // no match in a negative group
        applicable = Applicable.True;
    } else {
        // a match in a positive group / single 
        applicable = Applicable.False;
    }

    return applicable;
}

function isCodeMatch(comparePromotedCodes, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB , isCodeMatchC,  isCodeAGroupCode, isVehicleACodeGroup, objData) {
    if (objData.family === FamilyFeatureCodes.Engine) {
        return isCodeMatchEngineFn(objData);
    } else {
        if (areBothCodesNotAGroupCode(isCodeAGroupCode, isVehicleACodeGroup)) {
            return isCodeMatchB(comparePromotedCodes, objData);
        } else {
            return isCodeMatchC(isCodeAGroupCode, isVehicleACodeGroup, objData);
        }
    }
}

function areBothCodesNotAGroupCode(isCodeGroup, isVehicleCodeGroup) {
    return (!isCodeGroup) && (!isVehicleCodeGroup);
}

function isCodeMatchC(isCodeGroup, isVehicleCodeGroup, objData) {
    let codeMatch;
    let lexiconGroupMap = getLexiconGroupMap();
    const Codes = isCodeGroup ? Utils.getGroupCodesArray(objData.codeSource, lexiconGroupMap) : [objData.codeSource];
    const vehicleCodes = isVehicleCodeGroup ? Utils.getGroupCodesArray(objData.vehicleCode, lexiconGroupMap) : [objData.vehicleCode];
    if (isComparePromotedCodes()) {//DEV-9062, for promoted minor features the earlier code was not checking if belongs to a group or not.
        codeMatch = comparePromotedCodes(vehicleCodes, Codes); //This comparison will ignore the first 3 characters if is promoted
    } else {
        codeMatch = ArrayUtils.containsMatchIgnoreCase(vehicleCodes, Codes);
    }
    return codeMatch;
}

function isCodeMatchB(comparePromotedCodes, objData) {
    if (isComparePromotedCodes()) {
        return comparePromotedCodes(objData);
    } else {
        //both codes are single  codes
        if (objData.codeVehicle === objData.codeSource || (objData.codeSource.startsWith("X") && objData.codeSource.endsWith("0"))) {
            return true;
        }
    }
    return false;
}

function isCodeMatchEngine(objData) {
    let codeMatch;
    let lexiconGroupMap = getLexiconGroupMap();
    const codes = Utils.getGroupCodesArray(objData.codeSource, lexiconGroupMap);
    const vehicleCodes = Utils.getGroupCodesArray(objData.codeVehicle, lexiconGroupMap);
    codeMatch = (codes.length > 0 && vehicleCodes.length > 0) ? Utils.compareEngineCodes(vehicleCodes, codes) : true;
    return codeMatch;
}

compareCodesCurry(isCodeNegativeGroupFn, areBothNegativeGroup, getApplicable, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, isCodeMatchEngine, areBothCodesNotAGroupCode, isCodeMatchB , isCodeMatchC,)({
    codeSource: "code1",
    codeVehicle: "code2",
    family: "EN"
});