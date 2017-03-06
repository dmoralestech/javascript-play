/**
 * Created by dmorales on 3/03/2017.
 */

var Applicable = {
    Unknown: 0,
    False: 1,
    True: 2
}

function isComparePromotedCodes() {
    //TODO:
    return true;
}

function compareCodes(code, vehicleCode) {
    let applicable;
    const isCodeNegativeGroup = Utils.isNegativeGroup(code);
    const isVehicleCodeNegativeGroup = Utils.isNegativeGroup(vehicleCode);

    if (areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup)) {
        // 16 bit logic does not attempt to compare a -ve  against a -ve vehicle
        applicable = Applicable.Unknown;
    } else {

        applicable = getApplicable(code, vehicleCode, isCodeNegativeGroup, isVehicleCodeNegativeGroup);
    }

    return applicable;

}

function areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    return isCodeNegativeGroup && isVehicleCodeNegativeGroup;
}

function getApplicable(code, vehicleCode, isCodeNegativeGroup, isVehicleCodeNegativeGroup) {

    let applicable = Applicable.Unknown;
    let family = getFamily(vehicleCode);
    if (Utils.areCodesComparable(family, code, vehicleCode)) {
        const isCodeAGroupCode = Utils.isGroup(code);
        const isVehicleCodeGroup = Utils.isGroup(vehicleCode);
        const CodeMatch = isCodeMatch(code, vehicleCode, family, isCodeAGroupCode, isVehicleCodeGroup);
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

function isCodeMatch(code, vehicleCode, family, isCodeAGroupCode, isVehicleACodeGroup) {
    if (family.equalsIgnoreCase(FamilyFeatureCodes.Engine)) {
        return isCodeMatchEngine(code, vehicleCode);
    } else {
        if (areBothCodesNotAGroupCode(isCodeAGroupCode, isVehicleACodeGroup)) {
            return isCodeMatchB(code, vehicleCode );
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

function sCodeMatchB(code, vehicleCode) {
    if (isComparePromotedCodes()) {
        return comparePromotedCodes([vehicleCode], [code]);
    } else {
        //both codes are single  codes
        if (vehicleCode.equalsIgnoreCase(code) || (code.startsWith("X") && code.endsWith("0"))) {
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
