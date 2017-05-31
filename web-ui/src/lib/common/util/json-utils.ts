export function decycle(object, replacer) {


    var objects = new WeakMap();     // object to path mappings

    return (function derez(value, path) {

// The derez function recurses through the object, producing the deep copy.

        var old_path;   // The path of an earlier occurance of value
        var nu;         // The new object or array

// If a replacer function was provided, then call it to get a replacement value.

        if (replacer !== undefined) {
            value = replacer(value);
        }

// typeof null === "object", so go on if this value is really an object but not
// one of the weird builtin objects.

        if (
            typeof value === "object" && value !== null &&
            !(value instanceof Boolean) &&
            !(value instanceof Date) &&
            !(value instanceof Number) &&
            !(value instanceof RegExp) &&
            !(value instanceof String)
        ) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a {"$ref":PATH} object. This uses an
// ES6 WeakMap.

            old_path = objects.get(value);
            if (old_path !== undefined) {
                return {$ref: old_path};
            }

// Otherwise, accumulate the unique value and its path.

            objects.set(value, path);

// If it is an array, replicate the array.

            if (Array.isArray(value)) {
                nu = [];
                value.forEach(function (element, i) {
                    nu[i] = derez(element, path + "[" + i + "]");
                });
            } else {

// If it is an object, replicate the object.

                nu = {};
                Object.keys(value).forEach(function (name) {
                    nu[name] = derez(
                        value[name],
                        path + "[" + JSON.stringify(name) + "]"
                    );
                });
            }
            return nu;
        }
        return value;
    }(object, "$"));
}
