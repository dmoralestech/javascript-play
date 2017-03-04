/**
 * Created by dmorales on 3/03/2017.
 */


var R = require('ramda');

const isNegativeAvsGroup = (code) => { return isNegativeAvsGroup(code) };


function compareAVSCodes(codeFromSource, codeFromUser, avsFamily, lexiconAVSGroupMap, isComparePromotedAvsCodes) {
    var applicable = Applicable.Unknown;
    var isAvsCodeNegativeGroup = isNegativeAvsGroup(codeFromSource);
    var isVehicleCodeNegativeGroup = isNegativeAvsGroup(codeFromUser);

    if (isAvsCodeNegativeGroup && isVehicleCodeNegativeGroup) {
        applicable = Applicable.Unknown;
    } else {

        var isMatch = false;

        if (areAvsCodesComparable(avsFamily, codeFromSource, codeFromUser)) {
            var flag1 = isAvsGroup(codeFromSource);
            var flag2 = isAvsGroup(codeFromUser);

            var codeArray;
            var code2Array;
            if (avsFamily.equalsIgnoreCase(FamilyFeatureCodes.Engine)) {
                codeArray = getAvsGroupCodesArray(codeFromSource, lexiconAVSGroupMap);
                code2Array = getAvsGroupCodesArray(codeFromUser, lexiconAVSGroupMap);
                isMatch = (codeArray.length > 0 && code2Array.length > 0) ? compareEngineCodes(code2Array, codeArray) : true;
            } else {
                if ((!flag1) && (!flag2)) {
                    if (isComparePromotedAvsCodes) {
                        isMatch = comparePromotedCodes(codeFromUser, codeFromSource);
                    } else {
                        //both codes are single avs codes
                        if (codeFromUser.equalsIgnoreCase(codeFromSource) || (codeFromSource.startsWith("X") && codeFromSource.endsWith("0"))) {
                            isMatch = true;
                        }
                    }
                } else {
                    codeArray = flag1 ? getAvsGroupCodesArray(codeFromSource, lexiconAVSGroupMap) : [];
                    code2Array = flag2 ? getAvsGroupCodesArray(codeFromUser, lexiconAVSGroupMap) : [];
                    if (isComparePromotedAvsCodes) {
                        isMatch = comparePromotedCodes(code2Array, codeArray);
                    } else {
                        isMatch = ArrayUtils.containsMatchIgnoreCase(code2Array, codeArray);
                    }
                }
            }

            if (isMatch) {
                if (isAvsCodeNegativeGroup || isVehicleCodeNegativeGroup) {
                    // a match in a negative group
                    applicable = Applicable.False;
                } else {
                    // a match in a positive group / single avs
                    applicable = Applicable.True;
                }
            } else {
                if (isAvsCodeNegativeGroup || isVehicleCodeNegativeGroup) {
                    // no match in a negative group
                    applicable = Applicable.True;
                } else {
                    // a match in a positive group / single avs
                    applicable = Applicable.False;
                }
            }
        }
    }

    return applicable;
}
