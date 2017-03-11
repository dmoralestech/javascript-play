/**
 * Created by dmorales on 3/03/2017.
 */

// var R = require('ramda');

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

// let compareCodesCurry = R.curry(compareCodes);


function areBothNegativeGroup(isCodeNegativeGroup, isVehicleCodeNegativeGroup) {
    return isCodeNegativeGroup && isVehicleCodeNegativeGroup;
}

function getApplicable(isCodeNegativeGroup, isVehicleCodeNegativeGroup, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB, isCodeMatchC, objData) {

    let applicable = Applicable.Unknown;
    if (areCodeBelongToTheSameFamily(objData)) {
        const isCodeAGroupCode = isCodeAGroupCode(objData.codeSource); // returns a boolean
        const isVehicleCodeGroup = isCodeAGroupCode(objData.codeVehicle); //returns a boolean
        const codeMatch = isCodeMatch(comparePromotedCodes, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB, isCodeMatchC, isCodeAGroupCode, isVehicleCodeGroup, objData);
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

function isCodeMatch(comparePromotedCodes, isCodeMatchEngineFn, areBothCodesNotAGroupCode, isCodeMatchB, isCodeMatchC, isCodeAGroupCode, isVehicleACodeGroup, objData) {
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

// compareCodesCurry(isCodeNegativeGroupFn, areBothNegativeGroup, getApplicable, getFamily, areCodeBelongToTheSameFamily, isCodeAGroupCode, comparePromotedCodes, isCodeMatch, getApplicableA, getApplicableB, isCodeMatchEngine, areBothCodesNotAGroupCode, isCodeMatchB, isCodeMatchC,)({
//     codeSource: "code1",
//     codeVehicle: "code2",
//     family: "EN"
// });


// function compareCodes(validateFn, moreProcessingFn, doStuffOnCodeAFn, doStuffOnCodeBFn, doSomething1Fn, doSomething2Fn, codeA, codeB, param1, param2) {
//
//     let result = null;
//     if (validateFn(codeA, codeB)) {
//         const isCodeAValid = doStuffOnCodeAFn(codeA);  // returns a boolean
//         const isCodeBValid = doStuffOnCodeBFn(codeB);  // returns a boolean
//         const isItAMatch = moreProcessingFn(isCodeAValid, isCodeBValid, codeA, codeB); // returns a boolean
//         if (isItAMatch) {
//             result = doSomething1Fn (param1, param2);
//         } else {
//             result = doSomething2Fn (param1, param2);
//         }
//     }
//     return result;
// }


function matchCode(codeA, codeB) {
    let hashMapData = createMap();
    const arrayA = createArrayFromCode(codeA, hashMapData);
    const arrayB = createArrayFromCode(codeB, hashMapData);
    return (arrayA.length > 0 && arrayB.length > 0) ? compareArrays(arrayA, arrayA) : true;
}

function compareCodesV0(validateFn, moreProcessingFn, doStuffOnCodeAFn, doStuffOnCodeBFn, doSomething1Fn, doSomething2Fn, codeA, codeB, param1, param2) {

    const fn = (param1, param2) => moreProcessingFn(doStuffOnCodeAFn(codeA), doStuffOnCodeBFn(codeB), codeA, codeB)
        ? doSomething1Fn(param1, param2)
        : doSomething2Fn(param1, param2)

    return validateFn(codeA, codeB) ? fn(param1, param2) : null;

}

function compareCodesV1(validateFn, moreProcessingFn, doStuffOnCodeAFn, doStuffOnCodeBFn, doSomething1Fn, doSomething2Fn, codeA, codeB, param1, param2) {
    return validateFn(codeA, codeB)
        ? (moreProcessingFn(doStuffOnCodeAFn(codeA), doStuffOnCodeBFn(codeB), codeA, codeB)
            ? doSomething1Fn
            : doSomething2Fn
    )(param1, param2)
        : null;
}


function compareCodesV1_2(validateFn, moreProcessingFn, [doStuffOnCodeAFn, doStuffOnCodeBFn], [doSomething1Fn, doSomething2Fn], [codeA, codeB], [param1, param2]) {
    return validateFn([codeA, codeB])
        ? (moreProcessingFn([doStuffOnCodeAFn(codeA), doStuffOnCodeBFn(codeB)], [codeA, codeB])
            ? doSomething1Fn
            : doSomething2Fn
    )([param1, param2])
        : null;
}


function compareCodesV2(validateFn, moreProcessingFn, doStuffOnCodeAFn, doStuffOnCodeBFn, doSomething1Fn, doSomething2Fn) {
    return function (codeA, codeB) {
        return validateFn(codeA, codeB)
            ? moreProcessingFn(doStuffOnCodeAFn(codeA), doStuffOnCodeBFn(codeB), codeA, codeB)
            ? doSomething1Fn
            : doSomething2Fn
            : function (param1, param2) {
            return null;
        };
    };
}

const bimap = ([f, g]) => ([x, y]) => [f(x), g(y)];
const fst = ([x, _]) => x;
const snd = ([_, y]) => y;
const compose = f => g => x => f(g(x));
const bind = f => g => x => f(g(x), x);
const cond = pred => then => other => x => pred(x) ? then(x) : other(x);
const k = x => _ => x;
const validateFn = (codeA, codeB) => {
    return true;
};
const doStuffOnCodeAFn = (codeB) => {
    return true;
};
const doStuffOnCodeBFn = (codeB) => {
    return false;
};
const moreProcessingFn = (isCodeAValid, isCodeBValid, codeA, codeB) => {
};
const doSomething1Fn = (param1, param2) => {
    return true;
};
const doSomething2Fn = (param1, param2) => {
    return true
};

function compareCodesv4(validate, moreProcessing, doStuff, doSomething) {
    return cond(validate)
    (cond(bind(moreProcessing)(compose(bimap)(doStuff)))
    (fst(doSomething))
    (snd(doSomething)))
    (k(k(null)))
}


const curryCompareCodes = compareCodesv4(validateFn, moreProcessingFn,
    [doStuffOnCodeAFn, doStuffOnCodeBFn],
    [doSomething1Fn, doSomething2Fn])


//console.log("curry results", curryCompareCodes(['A', 'B'], ['C', 'D']));

console.log(bimap([doStuffOnCodeAFn, doStuffOnCodeBFn]) (['A', 'B']));