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

const areCodeBelongToTheSameFamily = (family, code1, code2) => {
    return Utils.areCodesComparable(family, code1, code2)
}

const isCodeAGroupCode = (code) => {
    return Utils.isGroup(code);
}

const comparePromotedCodes = (arr1, arr2) => {
    return Utils.comparePromotedCodes(arr1, arr2);
}

// I wonder if I can group getApplicable with its other dependent parameters? (isCodeNegativeGroup, isVehicleCodeNegativeGroup, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes)
function compareCodes(isCodeNegativeGroupFn, areBothNegativeGroup, getApplicable, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, code, vehicleCode,) {
    let applicable = Applicable.Unknown;
    const isCodeNegativeGroup = isCodeNegativeGroupFn(code);
    const isVehicleCodeNegativeGroup = isCodeNegativeGroupFn(vehicleCode);

    if (!areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup)) {
        applicable = getApplicable(isCodeNegativeGroup, isVehicleCodeNegativeGroup, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes,  code, vehicleCode);
    }

    return applicable;
}

let compareCodesCurry = R.curry(compareCodes);


function areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    return isCodeNegativeGroup && isVehicleCodeNegativeGroup;
}

function getApplicable(isCodeNegativeGroup, isVehicleCodeNegativeGroup, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, code, vehicleCode) {

    let applicable = Applicable.Unknown;
    let family = getFamily(vehicleCode);
    if (areCodeBelongToTheSameFamily(family, code, vehicleCode)) {
        const isCodeAGroupCode = isCodeAGroupCode(code);
        const isVehicleCodeGroup = isCodeAGroupCode(vehicleCode);
        const CodeMatch = isCodeMatch(comparePromotedCodes, isCodeAGroupCode, isVehicleCodeGroup, code, vehicleCode, family,);
        if (CodeMatch) {
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

function isCodeMatch(comparePromotedCodes, isCodeAGroupCode, isVehicleACodeGroup, code, vehicleCode, family) {
    if (family === FamilyFeatureCodes.Engine) {
        return isCodeMatchEngine(code, vehicleCode);
    } else {
        if (areBothCodesNotAGroupCode(isCodeAGroupCode, isVehicleACodeGroup)) {
            return isCodeMatchB(comparePromotedCodes, code, vehicleCode);
        } else {
            return isCodeMatchC(code, vehicleCode, isCodeAGroupCode, isVehicleACodeGroup);
        }
    }
}

function areBothCodesNotAGroupCode(isCodeGroup, isVehicleCodeGroup) {
    return (!isCodeGroup) && (!isVehicleCodeGroup);
}

function isCodeMatchC(code, vehicleCode, isCodeGroup, isVehicleCodeGroup) {
    let CodeMatch;
    let lexiconGroupMap = getLexiconGroupMap();
    const Codes = isCodeGroup ? Utils.getGroupCodesArray(code, lexiconGroupMap) : [code];
    const vehicleCodes = isVehicleCodeGroup ? Utils.getGroupCodesArray(vehicleCode, lexiconGroupMap) : [vehicleCode];
    if (isComparePromotedCodes()) {//DEV-9062, for promoted minor features the earlier code was not checking if belongs to a group or not.
        CodeMatch = comparePromotedCodes(vehicleCodes, Codes); //This comparison will ignore the first 3 characters if is promoted
    } else {
        CodeMatch = ArrayUtils.containsMatchIgnoreCase(vehicleCodes, Codes);
    }
    return CodeMatch;
}

function isCodeMatchB(comparePromotedCodes, code, vehicleCode) {
    if (isComparePromotedCodes()) {
        return comparePromotedCodes([vehicleCode], [code]);
    } else {
        //both codes are single  codes
        if (vehicleCode === code || (code.startsWith("X") && code.endsWith("0"))) {
            return true;
        }
    }
    return false;
}

function isCodeMatchEngine(code, vehicleCode) {
    let CodeMatch;
    let lexiconGroupMap = getLexiconGroupMap();
    const Codes = Utils.getGroupCodesArray(code, lexiconGroupMap);
    const vehicleCodes = Utils.getGroupCodesArray(vehicleCode, lexiconGroupMap);
    CodeMatch = (Codes.length > 0 && vehicleCodes.length > 0) ? Utils.compareEngineCodes(vehicleCodes, Codes) : true;
    return CodeMatch;
}

compareCodesCurry(isCodeNegativeGroupFn, areBothNegativeGroup, getApplicable, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes)("code1")("code2");